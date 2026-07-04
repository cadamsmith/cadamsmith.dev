//// Reads the Astro content collections (markdown files with YAML frontmatter)
//// and the resume profile, decoding them into the typed records in `model`.

import glaml.{type Node, NodeBool, NodeInt, NodeMap, NodeSeq, NodeStr}
import gleam/list
import gleam/result
import gleam/string
import resume/model.{
  type DateRange, type Link, type Profile, type Project, type Skill,
  type TimelineEntry, DateRange, Link, Profile, Project, Skill, TimelineEntry,
}
import simplifile

// --- Public collection readers ----------------------------------------------

pub fn read_timeline(
  content_dir: String,
) -> Result(List(TimelineEntry), String) {
  use nodes <- result.try(read_collection(content_dir <> "/timeline"))
  Ok(
    list.map(nodes, fn(n) {
      TimelineEntry(
        title: get_str(n, "title"),
        company: get_str(n, "company"),
        group: get_str(n, "group"),
        date_ranges: get_date_ranges(n),
        bullets: get_str_list(n, "bullets"),
        summary: get_str(n, "summary"),
        order: get_int(n, "order"),
        location: get_str(n, "location"),
        resume_title: get_str(n, "resumeTitle"),
      )
    }),
  )
}

pub fn read_skills(content_dir: String) -> Result(List(Skill), String) {
  use nodes <- result.try(read_collection(content_dir <> "/skills"))
  Ok(
    list.map(nodes, fn(n) {
      Skill(
        name: get_str(n, "name"),
        group: get_str(n, "group"),
        order: get_int(n, "order"),
        resume_name: get_str(n, "resumeName"),
        exclude_from_resume: get_bool(n, "excludeFromResume"),
      )
    }),
  )
}

pub fn read_projects(content_dir: String) -> Result(List(Project), String) {
  use nodes <- result.try(read_collection(content_dir <> "/projects"))
  Ok(
    list.map(nodes, fn(n) {
      Project(
        name: get_str(n, "name"),
        emoji: get_str(n, "emoji"),
        description: get_str(n, "description"),
        // `resumeTechnologies` is a resume-only override; fall back to the
        // site's `technologies` when it is absent.
        technologies: case get_str_list(n, "resumeTechnologies") {
          [] -> get_str_list(n, "technologies")
          override -> override
        },
        url: get_str(n, "githubUrl"),
        order: get_int(n, "order"),
        include_in_resume: get_bool(n, "includeInResume"),
      )
    }),
  )
}

pub fn read_profile(path: String) -> Result(Profile, String) {
  use content <- result.try(read_file(path))
  use root <- result.try(parse_frontmatter(content))
  Ok(Profile(
    name: get_str(root, "name"),
    headline: get_str(root, "headline"),
    location: get_str(root, "location"),
    email: get_str(root, "email"),
    summary: get_str(root, "summary"),
    links: get_links(root),
  ))
}

// --- File + frontmatter plumbing --------------------------------------------

// Reads every `.md` file in a directory and returns each file's root YAML node.
fn read_collection(dir: String) -> Result(List(Node), String) {
  use names <- result.try(read_dir(dir))
  names
  |> list.filter(string.ends_with(_, ".md"))
  |> list.sort(string.compare)
  |> list.try_map(fn(name) {
    use content <- result.try(read_file(dir <> "/" <> name))
    parse_frontmatter(content)
  })
}

// Takes the YAML block between the first pair of `---` fences. A plain YAML
// file (no fences, e.g. profile.yaml) is returned as-is.
fn frontmatter(content: String) -> String {
  case string.split(content, "---") {
    [_, block, ..] -> block
    _ -> content
  }
}

fn parse_frontmatter(content: String) -> Result(Node, String) {
  case glaml.parse_string(frontmatter(content)) {
    Ok([doc, ..]) -> Ok(glaml.document_root(doc))
    Ok([]) -> Error("empty YAML document")
    Error(_) -> Error("failed to parse YAML")
  }
}

// --- Node field extraction --------------------------------------------------

fn map_get(node: Node, key: String) -> Result(Node, Nil) {
  case node {
    NodeMap(pairs) ->
      list.find_map(pairs, fn(pair) {
        case pair {
          #(NodeStr(k), v) if k == key -> Ok(v)
          _ -> Error(Nil)
        }
      })
    _ -> Error(Nil)
  }
}

fn get_str(node: Node, key: String) -> String {
  case map_get(node, key) {
    Ok(NodeStr(s)) -> s
    _ -> ""
  }
}

fn get_int(node: Node, key: String) -> Int {
  case map_get(node, key) {
    Ok(NodeInt(n)) -> n
    _ -> 0
  }
}

// Missing/non-boolean values default to False.
fn get_bool(node: Node, key: String) -> Bool {
  case map_get(node, key) {
    Ok(NodeBool(b)) -> b
    _ -> False
  }
}

fn get_str_list(node: Node, key: String) -> List(String) {
  case map_get(node, key) {
    Ok(NodeSeq(items)) ->
      list.filter_map(items, fn(item) {
        case item {
          NodeStr(s) -> Ok(s)
          _ -> Error(Nil)
        }
      })
    _ -> []
  }
}

fn get_date_ranges(node: Node) -> List(DateRange) {
  case map_get(node, "dateRanges") {
    Ok(NodeSeq(items)) ->
      list.map(items, fn(item) {
        DateRange(
          start: get_str(item, "startDate"),
          end: get_str(item, "endDate"),
        )
      })
    _ -> []
  }
}

fn get_links(node: Node) -> List(Link) {
  case map_get(node, "links") {
    Ok(NodeSeq(items)) ->
      list.map(items, fn(item) {
        Link(label: get_str(item, "label"), url: get_str(item, "url"))
      })
    _ -> []
  }
}

// --- simplifile wrappers with String errors ---------------------------------

fn read_file(path: String) -> Result(String, String) {
  case simplifile.read(path) {
    Ok(content) -> Ok(content)
    Error(_) -> Error("could not read file: " <> path)
  }
}

fn read_dir(path: String) -> Result(List(String), String) {
  case simplifile.read_directory(path) {
    Ok(names) -> Ok(names)
    Error(_) -> Error("could not read directory: " <> path)
  }
}
