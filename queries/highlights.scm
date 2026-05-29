; Comments
(line_comment) @comment
(block_comment) @comment

; Strings and characters
[
  (string)
  (character)
] @string

; Ranges
(range) @string.special

; Brackets
[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation

; Infix operators
[
  "~"
  "|"
] @operator

; Postfix / range operators
[
  "+"
  "*"
  "?"
  ".."
] @operator

; Prefix operators (predicates)
[
  "&"
  "!"
] @operator

; Modifiers (_, @, $, !)
(modifier) @type

; Rule references — general catch-all (identifiers and consts in terms)
(identifier) @constant
(const) @constant

; Built-in rules (ANY, SOI, EOI, PEEK, POP, etc.) — override @constant
(builtin) @constant.builtin

; PUSH / PUSH_LITERAL / PEEK slice keywords
(push "PUSH" @keyword)
(push_literal "PUSH_LITERAL" @keyword)
(peek_slice "PEEK" @keyword)

; Insensitive string: ^"..."
(insensitive_string "^" @operator)
(insensitive_string (string) @string)

; Assignment — override @operator for "=" inside grammar_rule
(grammar_rule "=" @punctuation)

; Node tags: #name = → @type (yellow in Ayu, orange in Light, gray in Tomorrow)
; distinct from @constant (orange in Ayu) in all themes
(node_tag) @type
(tag_id) @type

; Rule names in declarations — LAST so they override @constant above
(grammar_rule (identifier) @function)
(grammar_rule (const) @function)
