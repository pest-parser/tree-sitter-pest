/* eslint-disable arrow-parens */
/* eslint-disable camelcase */
/* eslint-disable-next-line spaced-comment */
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
const CONST = /[A-Z][A-Z0-9_]*/;
const IDENTIFIER = /[a-zA-Z_][a-zA-Z0-9_]*/;
const NUMBER = /[0-9]+/;
const INTEGER = /[+-]?[0-9]+/;

module.exports = grammar({
  name: "pest",

  extras: ($) => [/\s/, $.line_comment, $.block_comment],

  conflicts: (_) => [],

  precedences: (_) => [],

  rules: {
    pest: ($) => repeat($.grammar_rule),

    grammar_rule: ($) =>
      seq(
        field("name", choice($.identifier, $.const)),
        "=",
        optional($.modifier),
        "{",
        $.expression,
        "}",
      ),

    push: ($) => seq("PUSH", "(", $.expression, ")"),

    push_literal: ($) => seq("PUSH_LITERAL", "(", $.string, ")"),

    peek_slice: (_) =>
      seq("PEEK", "[", optional(INTEGER), "..", optional(INTEGER), "]"),

    builtin: (_) =>
      choice(
        "ANY",
        "DROP",
        "EOI",
        "NEWLINE",
        "PEEK",
        "PEEK_ALL",
        "POP",
        "POP_ALL",
        "SOI",
      ),

    const: (_) => CONST,

    identifier: (_) => IDENTIFIER,

    modifier: (_) => choice("_", "@", "$", "!"),

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
        $.push,
        $.push_literal,
        $.peek_slice,
        $.identifier,
        $.string,
        $.insensitive_string,
        $.range,
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
                  /u\{[0-9a-fA-F]+\}/,
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
            /u\{[0-9a-fA-F]+\}/,
            /x[0-9a-fA-F]{2}/,
          ),
        ),
      ),

    insensitive_string: ($) => seq("^", $.string),

    node_tag: ($) => seq("#", $.tag_id, "="),

    tag_id: (_) => IDENTIFIER,

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
        // repeat_exact
        seq("{", NUMBER, "}"),
        // repeat_min
        seq("{", NUMBER, ",", "}"),
        // repeat_max
        seq("{", ",", NUMBER, "}"),
        // repeat_min_max
        seq("{", NUMBER, ",", NUMBER, "}"),
      ),

    comment: ($) => choice($.block_comment, $.line_comment),

    line_comment: (_) => token(seq(choice("///", "//!", "//"), /.*/)),

    block_comment: (_) => seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
  },
});
