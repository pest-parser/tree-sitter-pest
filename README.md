# tree-sitter-pest

The [Pest](https://pest.rs) grammar for the [tree-sitter](https://tree-sitter.github.io/tree-sitter/).

## Usage

```bash
cargo add tree-sitter-pest
```

## Development

Requires [tree-sitter-cli](https://tree-sitter.github.io/tree-sitter/creating-parsers/):

```bash
cargo install --locked tree-sitter-cli
npm install
```

### Generate & Build

Regenerate the parser from `grammar.js` and compile the shared library:

```bash
tree-sitter generate -l
tree-sitter build
```

### Test

Run the test corpus in `test/corpus/`:

```bash
tree-sitter test
```

### Parse a file

Parse a `.pest` file and print the syntax tree:

```bash
tree-sitter parse examples/grammar.pest
```

Check for errors in a file:

```bash
tree-sitter parse myfile.pest 2>&1 | grep -E "ERROR|MISSING"
```

### Highlight

Preview syntax highlighting:

```bash
tree-sitter highlight examples/grammar.pest
```

### Playground

Build the WASM module and launch the interactive playground:

```bash
tree-sitter build --wasm
tree-sitter playground
```

## License

MIT
