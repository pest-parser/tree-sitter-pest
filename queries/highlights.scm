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
  "NEWLINE"
  "PEEK"
  "PEEK_ALL"
  "POP"
  "POP_ALL"
  "PUSH"
  "SOI"
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
