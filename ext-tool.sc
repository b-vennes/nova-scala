#!/usr/bin/env -S scala-cli shebang

//> using scala 3
//> using toolkit typelevel:0.1.26

import fs2.io.file.CopyFlag
import fs2.io.file.CopyFlags

import cats.syntax.all.*
import cats.effect.*
import com.monovore.decline.*
import com.monovore.decline.effect.*
import cats.effect.unsafe.implicits.global
import fs2.io.process.ProcessBuilder
import fs2.io.{stdout, stderr}
import fs2.io.file.{Files, Path}

val metalsVersion: String = "1.3.0"

extension (path: Path)
  def sh(command: String, args: String*): IO[Unit] =
    ProcessBuilder(command, args.toList)
      .withWorkingDirectory(path)
      .spawn[IO]
      .use: process =>
        process.stdout.through(stdout[IO])
          .concurrently(process.stderr.through(stderr[IO]))
          .compile
          .drain
          .productR(process.exitValue)
          .map(_ === 0)
          .ifM(
            IO.unit,
            IO.raiseError(RuntimeException(s"Subprocess '$command' failed."))
          )

def build(novaPath: Path): IO[ExitCode] = for
  _ <- IO.println("Building Scala Nova extension")
  currentDirectory <- Files[IO].currentWorkingDirectory
  extensionDirectory = currentDirectory / "scala.novaextension"
  _ <- Files[IO].copy(
    currentDirectory / "TreeSitterParserBuild" / "Makefile",
    currentDirectory / "tree-sitter-scala" / "Makefile",
    CopyFlags(CopyFlag.ReplaceExisting)
  )
  _ <- (currentDirectory / "TreeSitterParserBuild").sh(
    "./compile_parser.sh",
    (currentDirectory / "tree-sitter-scala").show,
    novaPath.absolute.show
  )
  _ <- Files[IO].copy(
    currentDirectory / "tree-sitter-scala" / "libtree-sitter-scala.dylib",
    extensionDirectory / "Syntaxes" / "libtree-sitter-scala.dylib",
    CopyFlags(CopyFlag.ReplaceExisting)
  )
yield ExitCode.Success

CommandIOApp.run[IO](
  "ex-tool.sc",
  "Tool for building and publishing the Scala Nova extension.",
  helpFlag = true
)(
  Opts.subcommand(
    Command(
      "build",
      "Build the extension directory with compiled executables.",
      helpFlag = true
    )(
      Opts.option[String]("nova-path", "Path to Nova.app")
        .map(Path.apply)
        .map(build)
    )
  ),
  args.toList
).unsafeRunSync()
