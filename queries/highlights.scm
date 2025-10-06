(line_comment) @comment
(block_comment) @comment

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket



((identifier) @variable)
((builtin) @type)
((const) @constant)

[
  (string)
  (character)
] @string

[
    "~"
    "|"
] @function

[
  "="
  "+"
  "*"
  "&"
  "_"
  "^"
  "@"
  "$"
  "!"
  "?"
  ".."
] @operator

[
  (string)
  (character)
] @string

[
  "ANY"
  "DROP"
  "EOI"
  "PEEK"
  "PEEK_ALL"
  "POP"
  "POP_ALL"
  "SOI"
  "ASCII_DIGIT"
  "ASCII_NONZERO_DIGIT"
  "ASCII_BIN_DIGIT"
  "ASCII_OCT_DIGIT"
  "ASCII_HEX_DIGIT"
  "ASCII_ALPHA_LOWER"
  "ASCII_ALPHA_UPPER"
  "ASCII_ALPHA"
  "ASCII_ALPHANUMERIC"
  "ASCII"
  "NEWLINE"
] @keyword

[
  "~"
  "|"
  "="
  "+"
  "*"
  "&"
  "_"
  "^"
  "@"
  "$"
  "!"
  "?"
  ".."
] @operator
