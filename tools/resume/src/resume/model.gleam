//// Domain types plus the data-shaping and JSON encoding that turns raw
//// content-collection records into the flat structure the Typst template renders.

import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/string

// --- Types (mirror the Astro content collections) ---------------------------

pub type DateRange {
  // `start` / `end` are ISO `YYYY-MM-DD` or the literal `PRESENT`.
  DateRange(start: String, end: String)
}

pub type TimelineEntry {
  TimelineEntry(
    title: String,
    company: String,
    group: String,
    date_ranges: List(DateRange),
    bullets: List(String),
    // Optional italic role-description line; empty when absent.
    summary: String,
    order: Int,
    location: String,
    // Resume-only title override; ignored by the site. Empty = use `title`.
    resume_title: String,
  )
}

pub type Skill {
  Skill(
    name: String,
    group: String,
    order: Int,
    // Resume-only overrides; ignored by the site. `resume_name` replaces the
    // display name on the resume (empty = use `name`); `exclude_from_resume`
    // drops the skill from the resume entirely.
    resume_name: String,
    exclude_from_resume: Bool,
  )
}

pub type Project {
  Project(
    name: String,
    emoji: String,
    description: String,
    technologies: List(String),
    url: String,
    order: Int,
    include_in_resume: Bool,
  )
}

pub type Link {
  Link(label: String, url: String)
}

pub type Profile {
  Profile(
    name: String,
    headline: String,
    location: String,
    email: String,
    summary: String,
    links: List(Link),
  )
}

// --- Date helpers -----------------------------------------------------------

// erlang:date() -> {Year, Month, Day}; used to resolve the `PRESENT` literal.
@external(erlang, "erlang", "date")
fn erlang_date() -> #(Int, Int, Int)

fn month_abbrev(month: Int) -> String {
  // months is 1-indexed conceptually; guard against bad input.
  case list.drop(month_names(), month - 1) {
    [name, ..] -> name
    [] -> ""
  }
}

fn month_names() -> List(String) {
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
}

// Parse the year + month out of an ISO `YYYY-MM-DD` string.
fn parse_ym(iso: String) -> #(Int, Int) {
  let year = iso |> string.slice(0, 4) |> parse_int
  let month = iso |> string.slice(5, 2) |> parse_int
  #(year, month)
}

fn parse_int(s: String) -> Int {
  case int.parse(s) {
    Ok(n) -> n
    Error(_) -> 0
  }
}

// Render a single ISO date (or PRESENT) as e.g. "Jun. 2025" / "Present".
fn label_date(iso: String) -> String {
  case iso {
    "PRESENT" -> "Present"
    _ -> {
      let #(year, month) = parse_ym(iso)
      let name = month_abbrev(month)
      // "May" is a full word, not an abbreviation — no trailing period.
      let sep = case name {
        "May" -> " "
        _ -> ". "
      }
      name <> sep <> int.to_string(year)
    }
  }
}

// Render every date range, joined by commas — e.g. the co-op's three stints
// become "Jan. 2021 – May 2021, Aug. 2021 – Dec. 2021, May 2022 – Aug. 2022".
pub fn format_dates(ranges: List(DateRange)) -> String {
  ranges
  |> list.map(fn(r) { label_date(r.start) <> " – " <> label_date(r.end) })
  |> string.join(", ")
}

// Total years of experience, floored, summed across all Work date ranges.
pub fn years_experience(entries: List(TimelineEntry)) -> Int {
  let #(today_y, today_m, _) = erlang_date()
  entries
  |> list.filter(fn(e) { e.group == "Work" })
  |> list.flat_map(fn(e) { e.date_ranges })
  |> list.fold(0.0, fn(acc, r) {
    let #(sy, sm) = parse_ym(r.start)
    let #(ey, em) = case r.end {
      "PRESENT" -> #(today_y, today_m)
      _ -> parse_ym(r.end)
    }
    acc +. frac(ey, em) -. frac(sy, sm)
  })
  |> float_floor
}

fn frac(year: Int, month: Int) -> Float {
  int.to_float(year) +. int.to_float(month - 1) /. 12.0
}

fn float_floor(f: Float) -> Int {
  // Truncate toward zero; experience totals are always non-negative.
  float_truncate(f)
}

@external(erlang, "erlang", "trunc")
fn float_truncate(f: Float) -> Int

// --- Skills grouping --------------------------------------------------------

// Explicit group display order for the resume. Groups not listed here fall to
// the end (in first-appearance order).
const skill_group_order = [
  "Languages", "Frameworks & Libraries", "Data & Cloud", "Tools",
]

fn group_rank(name: String) -> Int {
  skill_group_order |> list.take_while(fn(g) { g != name }) |> list.length
}

// The name a skill shows under on the resume: `resume_name` when set, else `name`.
fn resume_label(s: Skill) -> String {
  case s.resume_name {
    "" -> s.name
    other -> other
  }
}

// Group skills by `group` in the pinned `skill_group_order`, with items within
// a group sorted by `order`. Skills flagged `exclude_from_resume` are dropped.
pub fn group_skills(skills: List(Skill)) -> List(#(String, List(String))) {
  let sorted =
    skills
    |> list.filter(fn(s) { !s.exclude_from_resume })
    |> list.sort(fn(a, b) { int.compare(a.order, b.order) })
  let groups =
    list.fold(sorted, [], fn(acc, s) {
      case list.contains(acc, s.group) {
        True -> acc
        False -> list.append(acc, [s.group])
      }
    })
    |> list.sort(fn(a, b) { int.compare(group_rank(a), group_rank(b)) })
  list.map(groups, fn(g) {
    let items =
      list.filter_map(sorted, fn(s) {
        case s.group == g {
          True -> Ok(resume_label(s))
          False -> Error(Nil)
        }
      })
    #(g, items)
  })
}

// --- JSON encoding ----------------------------------------------------------

pub fn to_json_string(
  profile: Profile,
  work: List(TimelineEntry),
  education: List(TimelineEntry),
  skills: List(Skill),
  projects: List(Project),
) -> String {
  // Most-recent-first ordering for the resume.
  let work = list.sort(work, fn(a, b) { int.compare(b.order, a.order) })
  let education =
    list.sort(education, fn(a, b) { int.compare(b.order, a.order) })
  // Only projects explicitly flagged for the resume, in `order`.
  let projects =
    projects
    |> list.filter(fn(p) { p.include_in_resume })
    |> list.sort(fn(a, b) { int.compare(a.order, b.order) })

  json.object([
    #("profile", encode_profile(profile)),
    #("experience", encode_companies(work)),
    #("education", encode_companies(education)),
    #("skills", encode_skills(group_skills(skills))),
    #("projects", json.array(projects, encode_project)),
  ])
  |> json.to_string
}

// Group entries by company (preserving the incoming most-recent-first order),
// so a company with multiple roles renders under a single header.
fn encode_companies(entries: List(TimelineEntry)) -> Json {
  let names =
    list.fold(entries, [], fn(acc, e) {
      case list.contains(acc, e.company) {
        True -> acc
        False -> list.append(acc, [e.company])
      }
    })
  json.array(names, fn(company) {
    let roles = list.filter(entries, fn(e) { e.company == company })
    let location = case roles {
      [first, ..] -> first.location
      [] -> ""
    }
    json.object([
      #("company", json.string(company)),
      #("location", json.string(location)),
      #("roles", json.array(roles, encode_role)),
    ])
  })
}

fn encode_role(e: TimelineEntry) -> Json {
  let title = case e.resume_title {
    "" -> e.title
    other -> other
  }
  json.object([
    #("title", json.string(title)),
    #("dates", json.string(format_dates(e.date_ranges))),
    #("summary", json.string(e.summary)),
    #("bullets", json.array(e.bullets, json.string)),
  ])
}

fn encode_profile(p: Profile) -> Json {
  json.object([
    #("name", json.string(p.name)),
    #("headline", json.string(p.headline)),
    #("location", json.string(p.location)),
    #("email", json.string(p.email)),
    #(
      "links",
      json.array(p.links, fn(l) {
        json.object([
          #("label", json.string(l.label)),
          #("url", json.string(l.url)),
        ])
      }),
    ),
  ])
}

fn encode_skills(groups: List(#(String, List(String)))) -> Json {
  json.array(groups, fn(g) {
    let #(name, items) = g
    json.object([
      #("group", json.string(name)),
      #("items", json.array(items, json.string)),
    ])
  })
}

fn encode_project(p: Project) -> Json {
  json.object([
    #("name", json.string(p.name)),
    #("emoji", json.string(p.emoji)),
    #("description", json.string(p.description)),
    #("technologies", json.array(p.technologies, json.string)),
    #("url", json.string(p.url)),
  ])
}
