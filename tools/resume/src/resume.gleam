//// Resume generator CLI.
////
//// Reads the site's content collections + profile.yaml, shapes them into a
//// flat JSON model, and renders `public/resume.pdf` via a Typst template.
////
////     gleam run -- generate
////
//// Run from the `tools/resume` directory. Requires the `typst` binary on PATH.

import argv
import gleam/io
import gleam/list
import gleam/result
import resume/content
import resume/model
import shellout
import simplifile

// Paths are relative to the `tools/resume` working directory.
const content_dir = "../../src/content"

const profile_path = "profile.yaml"

const build_dir = "build"

const data_path = "build/data.json"

const template_path = "templates/resume.typ"

const output_path = "../../public/resume.pdf"

pub fn main() {
  case argv.load().arguments {
    ["generate"] -> run()
    _ -> {
      io.println("usage: gleam run -- generate")
      io.println(
        "  reads the site content collections and renders " <> output_path,
      )
    }
  }
}

fn run() -> Nil {
  case generate() {
    Ok(_) -> io.println("✓ wrote " <> output_path)
    Error(msg) -> {
      io.println_error("✗ " <> msg)
      halt(1)
    }
  }
}

fn generate() -> Result(Nil, String) {
  use profile <- result.try(content.read_profile(profile_path))
  use timeline <- result.try(content.read_timeline(content_dir))
  use skills <- result.try(content.read_skills(content_dir))
  use projects <- result.try(content.read_projects(content_dir))

  let #(work, education) = list.partition(timeline, fn(e) { e.group == "Work" })

  let data = model.to_json_string(profile, work, education, skills, projects)

  use _ <- result.try(ensure_dir(build_dir))
  use _ <- result.try(write_file(data_path, data))
  use _ <- result.try(compile_pdf())
  Ok(Nil)
}

fn compile_pdf() -> Result(Nil, String) {
  // `--root .` makes the tools/resume dir the Typst project root so the
  // template can load the git-ignored build/data.json.
  case
    shellout.command(
      run: "typst",
      with: ["compile", "--root", ".", template_path, output_path],
      in: ".",
      opt: [],
    )
  {
    Ok(_) -> Ok(Nil)
    Error(#(_code, message)) -> Error("typst failed:\n" <> message)
  }
}

fn ensure_dir(path: String) -> Result(Nil, String) {
  case simplifile.create_directory_all(path) {
    Ok(_) -> Ok(Nil)
    Error(_) -> Error("could not create directory: " <> path)
  }
}

fn write_file(path: String, contents: String) -> Result(Nil, String) {
  case simplifile.write(to: path, contents: contents) {
    Ok(_) -> Ok(Nil)
    Error(_) -> Error("could not write file: " <> path)
  }
}

@external(erlang, "erlang", "halt")
fn halt(code: Int) -> Nil
