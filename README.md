# Nova Scala

**Nova Scala** provides syntax highlighting and autocompletion for the Scala
language in the [Nova Editor](https://nova.app/).

## Generating the libtree-sitter-scala.dylib library

Follow the instructions at [Nova Tree Sitter Reference](https://docs.nova.app/syntax-reference/tree-sitter/) to create a parser for the Scala syntax.

The steps are:

1. Checkout the latest tag from the [tree-sitter-scala](https://github.com/tree-sitter/tree-sitter-scala/) library with the command `git checkout tags/v{latest} -b v{latest}` in the `tree-sitter-scala` directory.
2. Run `tree-sitter generate` in the `tree-sitter-scala` directory.
3. Download the Nova parser build tools from [Nova Build Script](https://docs.nova.app/syntax-reference/build_script.zip) and unzip to the root directory.
4. Copy the `Makefile` and `compile_parser.sh` files from the build scripts folder into the `tree-sitter-scala` directory.
5. Run `./compile_parser.sh . path/to/Nova.app` from the `tree-sitter-scala` directory.
6. Copy the generated `libtree-sitter-scala.dylib` file into `scala.novaextension/Syntaxes/libtree-sitter-scala.dylib` and replace the existing library.

## Signing The Tree Sitter Library

In order for the extension to be published, the Tree Sitter Library needs to be
signed.

From the root directory run
`codesign -s - ./scala.novaextension/Syntaxes/libtree-sitter-scala.dylib`
