# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Closing tag for Terminals with single quotes

### Added
- Support for alternative characters: `|` -> `/`, `!`, `[ ]` -> `(/ /)`,
  `{ }` -> `(: :)`
- Table of contents, showing structure in alphabet, or as
  hierarchy overview at the bottom.

## [1.4.0] - 2018-11-03
### Added
- Optimize EBNF syntax as `[ a | b ]` in diagram as single choice with
  integrated skip
- Optimize EBNF syntax as `[ a | ( b | c ) ]` in diagram as single choice
- Optimize EBNF syntax as `[ a | [ b | c ] ]` in diagram as single choice with
  integrated skip
- Demo file to demontrate markup and optimizations
- Auto linking plain links in comments
- HTML escaping in definition inline comments
- Syntax highlight in text presentation of EBNF
- Improved 'breaking' of EBNF over multiple lines

### Fixed
- Issue with optimizer in repeating elements `a, b, c, { d, b, c }`. the
  repetition showed `c, b` instead of `b, c`

## [1.3.0] - 2018-11-02
### Added
- Add support for comments within statements, that will be rendered
  within the diagram
- Option `--title` to add a title to the output document
- Show different start/end indicators if diagram is 'complex' (refers to
  other definitions)
- Better optimization of repeating elements. `a, b, c, { d, b, c }` will
  display `a` followed by a loop containing `b, c` with `d` as repeater.
- Extra example file, based on json.org

### Fixed
- Text dedenting issue in comments before sending comments to markdown parser

## [1.2.0] - 2018-11-01
### Added
- Show validation warnings for duplicate declarations
- Show validation warnings for missing references
- Option `--validate` to exit with status code 2 if document has
  warnings
- Option `--quite` to suppress output to console
- Optimize EBNF syntax as `( a ), { a }` in diagram as `a+` (one or more)
- Optimize EBNF syntax as `a | { b }` in diagram as choice with "skip",
  "a", or one or more "b"
- Optimize EBNF syntax as `a | [ b ]` in diagram as choice with "skip",
  "a", or "b"

### Changed
- Long choice lists are now spread over multiple columns, if the
  length exceeds 10.
- Updated styling of document

## [1.1.0] - 2018-10-30
### Added
- `--target` option to specify output file
- Parse and render EBNF comments as markdown
- Add references to other definitions (reference To)
- Improved exception display and exit status code
- Support for `? special sequences ?`
- Support for `4 * "repeatable"` (now fully ISO compliant... I think)
- Let non-terminals link to definition in diagram
- Indent multi-line statements in EBNF output
- Optimize EBNF syntax as `a, { a }` in diagram as `a+` (one or more)

## [1.0.0] - 2018-10-29
### Added
- Parser to parse ISO/IEC 14977 EBNF files (limited support only)
- HTML output file based on filename of input file
- list definitions that reference another defintion (referenced From)