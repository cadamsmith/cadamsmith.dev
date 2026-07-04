// Resume layout. Pure presentation — all data comes from build/data.json,
// which the Gleam CLI writes from the site's content collections.
// `/build/data.json` is resolved against the Typst root (tools/resume, set via
// `typst compile --root .`).

#let data = json("/build/data.json")
#let profile = data.profile
#let accent = rgb("#1a1a1a")
#let muted = rgb("#666666")
#let rule = rgb("#1a1a1a")

#set document(title: profile.name + " — Resume", author: profile.name)
#set page(paper: "us-letter", margin: (x: 1.7cm, y: 1.2cm))
#set text(
  font: ("Seravek", "Helvetica Neue", "Arial", "Liberation Sans"),
  size: 10.5pt,
  fill: rgb("#1a1a1a"),
  hyphenate: false,
)
#set par(leading: 0.58em, spacing: 0.56em)

// --- Reusable pieces --------------------------------------------------------

#let section(title) = {
  v(7pt)
  text(size: 10.5pt, weight: "bold", fill: accent, tracking: 0.6pt)[#upper(title)]
  v(2pt)
  line(length: 100%, stroke: 0.9pt + rule)
  v(3pt)
}

// Company-first block: company + location on one line, then each role with its
// dates, optional italic description, and bullets. Used for both experience and
// education (education roles simply have no summary/bullets).
#let company_block(co) = {
  grid(
    columns: (1fr, auto),
    align: (left, right),
    text(weight: "bold")[#co.company],
    text(fill: muted, size: 9pt)[#co.location],
  )
  for role in co.roles {
    v(2pt)
    grid(
      columns: (1fr, auto),
      align: (left, right),
      text(weight: "regular")[#role.title],
      text(fill: muted, size: 9pt)[#role.dates],
    )
    if role.summary != "" {
      text(style: "italic", size: 9.5pt)[#role.summary]
    }
    if role.bullets.len() > 0 {
      v(1pt)
      set list(marker: text(fill: accent)[•], indent: 4pt, spacing: 0.55em)
      list(..role.bullets)
    }
  }
  v(6pt)
}

// --- Header -----------------------------------------------------------------

#align(center)[
  #text(size: 23pt, weight: "bold", tracking: 0.3pt)[#profile.name]
  #v(3pt)
  #text(size: 9pt)[
    #profile.location
    #h(7pt) #text(fill: muted)[|] #h(7pt)
    #link("mailto:" + profile.email)[#profile.email]
    #for l in profile.links {
      [ #h(7pt) #text(fill: muted)[|] #h(7pt) #link("https://" + l.url)[#l.url]]
    }
  ]
]

// --- Body -------------------------------------------------------------------

#section("Skills")
#v(3pt)
#for g in data.skills {
  block(above: 0pt, below: 6pt)[#text(weight: "bold")[#g.group:] #g.items.join(", ")]
}

#section("Experience")
#for co in data.experience {
  company_block(co)
}

#section("Projects")
#for p in data.projects {
  grid(
    columns: (1fr, auto),
    align: (left, right),
    link("https://" + p.url)[#text(weight: "bold")[#p.name]],
    text(fill: muted, size: 9pt)[#p.technologies.join(", ")],
  )
  v(1pt)
  p.description
  v(4pt)
}

#section("Education")
#for co in data.education {
  company_block(co)
}
