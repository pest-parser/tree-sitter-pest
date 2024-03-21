/* eslint-disable arrow-parens */
/* eslint-disable camelcase */
/* eslint-disable-next-line spaced-comment */
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
const IDENTIFIER = /[a-z_][a-z0-9_]*/;
const CONST = /[A-Z_][A-Z0-9_]+/;
const NUMBER = /[0-9]+/;

module.exports = grammar({
  name: "pest",

  extras: ($) => [/\s/, $.line_comment, $.block_comment],

  conflicts: (_) => [],

  precedences: (_) => [],

  rules: {
    pest: ($) => repeat($.grammar_rule),

    grammar_rule: ($) =>
      seq(
        field("name", $.identifier),
        "=",
        optional($.modifier),
        "{",
        $.expression,
        "}",
      ),

    identifier: ($) => IDENTIFIER,

    modifier: (_) => choice("_", "@", "$"),

    expression: ($) =>
      seq(optional("|"), $.term, repeat(seq($.infix_operator, $.term))),

    term: ($) =>
      seq(
        optional($.node_tag),
        repeat($.prefix_operator),
        $._node,
        repeat($.postfix_operator),
      ),

    _node: ($) => choice(seq("(", $.expression, ")"), $._terminal),

    _terminal: ($) =>
      choice(
        $._push,
        $._peek_slice,
        $.identifier,
        $.string,
        $._insensitive_string,
        $.range,
        $._pop,
        $.const,
        $.builtin,
      ),

    range: ($) => seq($.character, "..", $.character),

    character: (_) =>
      token(
        seq(
          "'",
          optional(
            choice(
              seq(
                "\\",
                choice(
                  /[^xu]/,
                  /u[0-9a-fA-F]{4}/,
                  /u{[0-9a-fA-F]+}/,
                  /x[0-9a-fA-F]{2}/,
                ),
              ),
              /[^\\']/,
            ),
          ),
          "'",
        ),
      ),

    string: ($) =>
      seq(
        '"',
        repeat(choice($._unescaped_double_string_fragment, $._escape_sequence)),
        '"',
      ),

    _unescaped_double_string_fragment: (_) =>
      token.immediate(prec(1, /[^"\\\r\n]+/)),

    _escape_sequence: (_) =>
      token.immediate(
        seq(
          "\\",
          choice(
            /[^xu]/,
            /u[0-9a-fA-F]{4}/,
            /u{[0-9a-fA-F]+}/,
            /x[0-9a-fA-F]{2}/,
          ),
        ),
      ),

    _insensitive_string: ($) => seq("^", $.string),

    _push: ($) => seq("PUSH", "(", $.expression, ")"),

    _peek_slice: (_) =>
      seq("PEEK", "[", optional(NUMBER), "..", optional(NUMBER), "]"),

    _pop: (_) => seq("POP"),

    builtin: (_) => choice("ANY", "SOI", "EOI", "NEWLINE"),

    const: ($) => CONST,

    node_tag: ($) => seq("#", $.identifier),

    infix_operator: (_) => choice("~", "|"),

    prefix_operator: (_) =>
      choice(
        // positive_predicate_operator
        "&",
        // negative_predicate_operator
        "!",
      ),

    postfix_operator: (_) =>
      choice(
        // optional_operator
        "?",
        // repeat_operator
        "*",
        // repeat_once_operator
        "+",
        // repeat_exact, repeat_min, repeat_max, repeat_min_max
        seq("[", optional(","), NUMBER, optional(","), "]"),
      ),

    comment: ($) => choice($.block_comment, $.line_comment),

    line_comment: (_) => token(seq(choice("///", "//!", "//"), /.*/)),

    block_comment: (_) => seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
  },
});
