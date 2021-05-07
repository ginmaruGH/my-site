---
pubDate: 2021-05-08
modDate: 2021-05-08
title: "markdownlint Rules"
thumbnail: "../../src/images/markdownlint-128.png"
tags:
  - Markdown
  - Lint
  - VSCode
  - Extensions
category: ""
description: "VSCodeの拡張機能でもあるmarkdownlintのルールの概要"
---

[VS Code](https://code.visualstudio.com/)で`Markdown`ファイルを編集していて、[`markdownlint`](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)からよく叱られるので、反省の意を込めて[markdownlint-Rules](https://github.com/DavidAnson/markdownlint/blob/v0.23.1/doc/Rules.md#md022)の要点をまとめることにする。

<https://github.com/DavidAnson/markdownlint/blob/v0.23.1/doc/Rules.md#md022>

## Rules

リンクサイトには、すべてのルールが説明されている。
ルールの説明と誤った例、修正した例などが記載されている。


### MD001 - 見出しレベルは1レベルずつ上げる

見出しレベルをスキップしない。

```md
<!-- bad -->
# 見出し 1

### 見出し 3
```

ネストした小見出しも同様に、レベルはスキップしない。

```md
# 見出し 1

## 見出し 2

### 見出し 3

#### 見出し 4

## 小見出し 2

### 小見出し 3
```

※見出しはドキュメントの構造を表すため、見出しレベルがスキップすると混乱をまねく。アクセスビリティの観点からも同じ。


## MD003 - 見出しスタイルを統一する

マークダウンの見出しスタイル

- consistent
- atx
- atx_closed
- setext
- setext_with_atx
- setext_with_atx_closed

見出しスタイルを混合させない。

```md
<!-- bad -->
# ATX-style 見出し1

## Closed-ATX-style 見出し2 ##

Setext-style 見出し1
===============
```

スタイルを統一させる

```md
<!-- good -->
# ATX-style 見出し1

## ATX-style 見出し2
```

`setext_with_atx`と`setext_with_atx_closed`では見出し3から`atx-style`のスタイルが使える。

```md
<!-- ok -->
Setext-style 見出し1
===============

Setext-style 見出し2
---------------

### ATX-style 見出し3
```

※ドキュメント内でスタイルの使用法を一貫する。


## MD004 - 箇条書きリストのスタイルを統一する

```md
<!-- bad -->
* Item 1
+ Item 2
- Item 3
```

```md
<!-- good -->
* Item 1
* Item 2
* Item 3
```

入れ子で違いを持たせることはあり。

```md
<!-- good -->
* Item 1
  + Item 2
    - Item 3
  + Item 4
* Item 4
  + Item 5
```


## MD005 - リストアイテムのインデントに一貫性を保つ

```md
<!-- bad -->
* Item 1
  * Nested Item 1
  * Nested Item 2
   * A misaligned item
```

```md
<!-- good -->
* Item 1
  * Nested Item 1
  * Nested Item 2
  * Nested Item 3
```


## MD009 - 行末のスペース

- 空白行のない改行は一文とみなされる。

```md
Text text text
テスト・テスト・テスト
```

Text text text
テスト・テスト・テスト

---

- 改行したい文末に半角スペースを2つ入れると改行できる。

>編集を加えると、スペースが取り消されることが多分にある

```md
Text text text[2space]
テスト・テスト・テスト
```

Text text text
テスト・テスト・テスト

---

- 改行したい文末に`<br />`要素を入れて改行する

```md
Text text text <br />
テスト・テスト・テスト
```

Text text text <br />
テスト・テスト・テスト

---

- 段落をかえるには、空行を入れる

```md
Text text text

テスト・テスト・テスト
```

Text text text

テスト・テスト・テスト

---


## MD011 - 逆リンク構文

```md
<!-- bad -->
(Incorrect link syntax)[https://www.example.com/]
```

```md
<!-- good -->
[Correct link syntax](https://www.example.com/)
```

[Correct link syntax](https://www.example.com/)

## MD012 - 複数の連続する空白行

空行が2行以上あると注意される

パラメーター: maximum (number; default 1)

`setting.json`で変更可能

<https://github.com/DavidAnson/markdownlint/blob/main/README.md#optionsconfig>

<div class="filename">setting.json</div>

```json
  "markdownlint.config": {
      "MD012": {"maximum": 3},
  },
```

## MD023 - Headings must start at the beginning of the line

Tags: headings, headers, spaces

Aliases: heading-start-left, header-start-left

Fixable: Most violations can be fixed by tooling

This rule is triggered when a heading is indented by one or more spaces:

Some text

  # Indented heading

To fix this, ensure that all headings start at the beginning of the line:

Some text

# Heading

Rationale: Headings that don't start at the beginning of the line will not be parsed as headings, and will instead appear as regular text.


MD024 - Multiple headings with the same content
Tags: headings, headers

Aliases: no-duplicate-heading, no-duplicate-header

Parameters: siblings_only, allow_different_nesting (boolean; default false)

This rule is triggered if there are multiple headings in the document that have the same text:

# Some text

## Some text
To fix this, ensure that the content of each heading is different:

# Some text

## Some more text
If the parameter siblings_only (alternatively allow_different_nesting) is set to true, heading duplication is allowed for non-sibling headings (common in changelogs):

# Change log

## 1.0.0

### Features

## 2.0.0

### Features
Rationale: Some markdown parsers generate anchors for headings based on the heading name; headings with the same content can cause problems with that.


MD025 - Multiple top-level headings in the same document
Tags: headings, headers

Aliases: single-title, single-h1

Parameters: level, front_matter_title (number; default 1, string; default "^\s*"?title"?\s*[:=]")

This rule is triggered when a top-level heading is in use (the first line of the file is an h1 heading), and more than one h1 heading is in use in the document:

# Top level heading

# Another top-level heading
To fix, structure your document so there is a single h1 heading that is the title for the document. Subsequent headings must be lower-level headings (h2, h3, etc.):

# Title

## Heading

## Another heading
Note: The level parameter can be used to change the top-level (ex: to h2) in cases where an h1 is added externally.

If YAML front matter is present and contains a title property (commonly used with blog posts), this rule treats that as a top level heading and will report a violation for any subsequent top-level headings. To use a different property name in the front matter, specify the text of a regular expression via the front_matter_title parameter. To disable the use of front matter by this rule, specify "" for front_matter_title.

Rationale: A top-level heading is an h1 on the first line of the file, and serves as the title for the document. If this convention is in use, then there can not be more than one title for the document, and the entire document should be contained within this heading.


MD026 - Trailing punctuation in heading
Tags: headings, headers

Aliases: no-trailing-punctuation

Parameters: punctuation (string; default ".,;:!。，；：！")

Fixable: Most violations can be fixed by tooling

This rule is triggered on any heading that has one of the specified normal or full-width punctuation characters as the last character in the line:

# This is a heading.
To fix this, remove the trailing punctuation:

# This is a heading
Note: The punctuation parameter can be used to specify what characters count as punctuation at the end of a heading. For example, you can change it to ".,;:" to allow headings that end with an exclamation point. ? is allowed by default because of how common it is in headings of FAQ-style documents. Setting the punctuation parameter to "" allows all characters - and is equivalent to disabling the rule.

Note: The trailing semicolon of HTML entity references like &copy;, &#169;, and &#x000A9; is ignored by this rule.

Rationale: Headings are not meant to be full sentences. More information: https://cirosantilli.com/markdown-style-guide#punctuation-at-the-end-of-headers


MD027 - Multiple spaces after blockquote symbol
Tags: blockquote, whitespace, indentation

Aliases: no-multiple-space-blockquote

Fixable: Most violations can be fixed by tooling

This rule is triggered when blockquotes have more than one space after the blockquote (>) symbol:

>  This is a blockquote with bad indentation
>  there should only be one.
To fix, remove any extraneous space:

> This is a blockquote with correct
> indentation.
Rationale: Consistent formatting makes it easier to understand a document.


MD028 - Blank line inside blockquote
Tags: blockquote, whitespace

Aliases: no-blanks-blockquote

This rule is triggered when two blockquote blocks are separated by nothing except for a blank line:

> This is a blockquote
> which is immediately followed by

> this blockquote. Unfortunately
> In some parsers, these are treated as the same blockquote.
To fix this, ensure that any blockquotes that are right next to each other have some text in between:

> This is a blockquote.

And Jimmy also said:

> This too is a blockquote.
Alternatively, if they are supposed to be the same quote, then add the blockquote symbol at the beginning of the blank line:

> This is a blockquote.
>
> This is the same blockquote.
Rationale: Some markdown parsers will treat two blockquotes separated by one or more blank lines as the same blockquote, while others will treat them as separate blockquotes.


MD029 - Ordered list item prefix
Tags: ol

Aliases: ol-prefix

Parameters: style ("one", "ordered", "one_or_ordered", "zero"; default "one_or_ordered")

This rule is triggered for ordered lists that do not either start with '1.' or do not have a prefix that increases in numerical order (depending on the configured style). The less-common pattern of using '0.' as a first prefix or for all prefixes is also supported.

Example valid list if the style is configured as 'one':

1. Do this.
1. Do that.
1. Done.
Examples of valid lists if the style is configured as 'ordered':

1. Do this.
2. Do that.
3. Done.
0. Do this.
1. Do that.
2. Done.
All three examples are valid when the style is configured as 'one_or_ordered'.

Example valid list if the style is configured as 'zero':

0. Do this.
0. Do that.
0. Done.
Example invalid list for all styles:

1. Do this.
3. Done.
This rule supports 0-prefixing ordered list items for uniform indentation:

...
08. Item
09. Item
10. Item
11. Item
...
Note: This rule will report violations for cases like the following where an improperly-indented code block (or similar) appears between two list items and "breaks" the list in two:

1. First list

```text
Code block
```

1. Second list
The fix is to indent the code block so it becomes part of the preceding list item as intended:

1. First list

   ```text
   Code block
   ```

2. Still first list
Rationale: Consistent formatting makes it easier to understand a document.


MD030 - Spaces after list markers
Tags: ol, ul, whitespace

Aliases: list-marker-space

Parameters: ul_single, ol_single, ul_multi, ol_multi (number; default 1)

Fixable: Most violations can be fixed by tooling

This rule checks for the number of spaces between a list marker (e.g. '-', '*', '+' or '1.') and the text of the list item.

The number of spaces checked for depends on the document style in use, but the default is 1 space after any list marker:

* Foo
* Bar
* Baz

1. Foo
1. Bar
1. Baz

1. Foo
   * Bar
1. Baz
A document style may change the number of spaces after unordered list items and ordered list items independently, as well as based on whether the content of every item in the list consists of a single paragraph or multiple paragraphs (including sub-lists and code blocks).

For example, the style guide at https://cirosantilli.com/markdown-style-guide#spaces-after-list-marker specifies that 1 space after the list marker should be used if every item in the list fits within a single paragraph, but to use 2 or 3 spaces (for ordered and unordered lists respectively) if there are multiple paragraphs of content inside the list:

* Foo
* Bar
* Baz
vs.

*   Foo

    Second paragraph

*   Bar
or

1.  Foo

    Second paragraph

1.  Bar
To fix this, ensure the correct number of spaces are used after the list marker for your selected document style.

Rationale: Violations of this rule can lead to improperly rendered content.


MD031 - Fenced code blocks should be surrounded by blank lines
Tags: code, blank_lines

Aliases: blanks-around-fences

Parameters: list_items (boolean; default true)

Fixable: Most violations can be fixed by tooling

This rule is triggered when fenced code blocks are either not preceded or not followed by a blank line:

Some text
```
Code block
```

```
Another code block
```
Some more text
To fix this, ensure that all fenced code blocks have a blank line both before and after (except where the block is at the beginning or end of the document):

Some text

```
Code block
```

```
Another code block
```

Some more text
Set the list_items parameter to false to disable this rule for list items. Disabling this behavior for lists can be useful if it is necessary to create a tight list containing a code fence.

Rationale: Aside from aesthetic reasons, some parsers, including kramdown, will not parse fenced code blocks that don't have blank lines before and after them.


MD032 - Lists should be surrounded by blank lines
Tags: bullet, ul, ol, blank_lines

Aliases: blanks-around-lists

Fixable: Most violations can be fixed by tooling

This rule is triggered when lists (of any kind) are either not preceded or not followed by a blank line:

Some text
* Some
* List

1. Some
2. List
Some text
To fix this, ensure that all lists have a blank line both before and after (except where the block is at the beginning or end of the document):

Some text

* Some
* List

1. Some
2. List

Some text
Rationale: Aside from aesthetic reasons, some parsers, including kramdown, will not parse lists that don't have blank lines before and after them.


MD033 - Inline HTML
Tags: html

Aliases: no-inline-html

Parameters: allowed_elements (array of string; default empty)

This rule is triggered whenever raw HTML is used in a markdown document:

<h1>Inline HTML heading</h1>
To fix this, use 'pure' markdown instead of including raw HTML:

# Markdown heading
Note: To allow specific HTML elements, use the 'allowed_elements' parameter.

Rationale: Raw HTML is allowed in markdown, but this rule is included for those who want their documents to only include "pure" markdown, or for those who are rendering markdown documents in something other than HTML.


MD034 - Bare URL used
Tags: links, url

Aliases: no-bare-urls

Fixable: Most violations can be fixed by tooling

This rule is triggered whenever a URL is given that isn't surrounded by angle brackets:

For more information, see https://www.example.com/.
To fix this, add angle brackets around the URL:

For more information, see <https://www.example.com/>.
Note: To use a bare URL without it being converted into a link, enclose it in a code block, otherwise in some markdown parsers it will be converted:

`https://www.example.com`
Note: The following scenario does not trigger this rule to avoid conflicts with MD011/no-reversed-links:

[https://www.example.com]
The use of quotes around a bare link will not trigger this rule, either:

"https://www.example.com"
'https://www.example.com'
Rationale: Without angle brackets, the URL isn't converted into a link by many markdown parsers.


MD035 - Horizontal rule style
Tags: hr

Aliases: hr-style

Parameters: style ("consistent", "---", "***", or other string specifying the horizontal rule; default "consistent")

This rule is triggered when inconsistent styles of horizontal rules are used in the document:

---

- - -

***

* * *

****
To fix this, ensure any horizontal rules used in the document are consistent, or match the given style if the rule is so configured:

---

---
Note: by default, this rule is configured to just require that all horizontal rules in the document are the same and will trigger if any of the horizontal rules are different than the first one encountered in the document. If you want to configure the rule to match a specific style, the parameter given to the 'style' option is a string containing the exact horizontal rule text that is allowed.

Rationale: Consistent formatting makes it easier to understand a document.


MD036 - Emphasis used instead of a heading
Tags: headings, headers, emphasis

Aliases: no-emphasis-as-heading, no-emphasis-as-header

Parameters: punctuation (string; default ".,;:!?。，；：！？")

This check looks for instances where emphasized (i.e. bold or italic) text is used to separate sections, where a heading should be used instead:

**My document**

Lorem ipsum dolor sit amet...

_Another section_

Consectetur adipiscing elit, sed do eiusmod.
To fix this, use markdown headings instead of emphasized text to denote sections:

# My document

Lorem ipsum dolor sit amet...

## Another section

Consectetur adipiscing elit, sed do eiusmod.
Note: This rule looks for single-line paragraphs that consist entirely of emphasized text. It won't fire on emphasis used within regular text, multi-line emphasized paragraphs, or paragraphs ending in punctuation (normal or full-width). Similarly to rule MD026, you can configure what characters are recognized as punctuation.

Rationale: Using emphasis instead of a heading prevents tools from inferring the structure of a document. More information: https://cirosantilli.com/markdown-style-guide#emphasis-vs-headers.


MD037 - Spaces inside emphasis markers
Tags: whitespace, emphasis

Aliases: no-space-in-emphasis

Fixable: Most violations can be fixed by tooling

This rule is triggered when emphasis markers (bold, italic) are used, but they have spaces between the markers and the text:

Here is some ** bold ** text.

Here is some * italic * text.

Here is some more __ bold __ text.

Here is some more _ italic _ text.
To fix this, remove the spaces around the emphasis markers:

Here is some **bold** text.

Here is some *italic* text.

Here is some more __bold__ text.

Here is some more _italic_ text.
Rationale: Emphasis is only parsed as such when the asterisks/underscores aren't surrounded by spaces. This rule attempts to detect where they were surrounded by spaces, but it appears that emphasized text was intended by the author.


MD038 - Spaces inside code span elements
Tags: whitespace, code

Aliases: no-space-in-code

Fixable: Most violations can be fixed by tooling

This rule is triggered for code span elements that have spaces adjacent to the backticks:

`some text `

` some text`
To fix this, remove any spaces adjacent to the backticks:

`some text`
Note: A single leading and trailing space is allowed by the specification and automatically trimmed (to allow for embedded backticks):

`` `backticks` ``
Note: A single leading or trailing space is allowed if used to separate code span markers from an embedded backtick:

`` ` embedded backtick``
Rationale: Violations of this rule can lead to improperly rendered content.


MD039 - Spaces inside link text
Tags: whitespace, links

Aliases: no-space-in-links

Fixable: Most violations can be fixed by tooling

This rule is triggered on links that have spaces surrounding the link text:

[ a link ](https://www.example.com/)
To fix this, remove the spaces surrounding the link text:

[a link](https://www.example.com/)
Rationale: Consistent formatting makes it easier to understand a document.


MD040 - Fenced code blocks should have a language specified
Tags: code, language

Aliases: fenced-code-language

This rule is triggered when fenced code blocks are used, but a language isn't specified:

```
#!/bin/bash
echo Hello world
```
To fix this, add a language specifier to the code block:

```bash
#!/bin/bash
echo Hello world
```
Rationale: Specifying a language improves content rendering by using the correct syntax highlighting for code. More information: https://cirosantilli.com/markdown-style-guide#option-code-fenced.


MD041 - First line in a file should be a top-level heading
Tags: headings, headers

Aliases: first-line-heading, first-line-h1

Parameters: level, front_matter_title (number; default 1, string; default "^\s*"?title"?\s*[:=]")

This rule is intended to ensure documents have a title and is triggered when the first line in the file isn't a top-level (h1) heading:

This is a file without a heading
To fix this, add a top-level heading to the beginning of the file:

# File with heading

This is a file with a top-level heading
Because it is common for projects on GitHub to use an image for the heading of README.md and that is not well-supported by Markdown, HTML headings are also permitted by this rule. For example:

<h1 align="center"><img src="https://placekitten.com/300/150"/></h1>

This is a file with a top-level HTML heading
Note: The level parameter can be used to change the top-level (ex: to h2) in cases where an h1 is added externally.

If YAML front matter is present and contains a title property (commonly used with blog posts), this rule will not report a violation. To use a different property name in the front matter, specify the text of a regular expression via the front_matter_title parameter. To disable the use of front matter by this rule, specify "" for front_matter_title.

Rationale: The top-level heading often acts as the title of a document. More information: https://cirosantilli.com/markdown-style-guide#top-level-header.


MD042 - No empty links
Tags: links

Aliases: no-empty-links

This rule is triggered when an empty link is encountered:

[an empty link]()
To fix the violation, provide a destination for the link:

[a valid link](https://example.com/)
Empty fragments will trigger this rule:

[an empty fragment](#)
But non-empty fragments will not:

[a valid fragment](#fragment)
Rationale: Empty links do not lead anywhere and therefore don't function as links.


MD043 - Required heading structure
Tags: headings, headers

Aliases: required-headings, required-headers

Parameters: headings, headers (array of string; default null for disabled)

If headings is not provided, headers (deprecated) will be used.

This rule is triggered when the headings in a file do not match the array of headings passed to the rule. It can be used to enforce a standard heading structure for a set of files.

To require exactly the following structure:

# Head
## Item
### Detail
Set the headings parameter to:

[
    "# Head",
    "## Item",
    "### Detail"
]
To allow optional headings as with the following structure:

# Head
## Item
### Detail (optional)
## Foot
### Notes (optional)
Use the special value "*" meaning "zero or more unspecified headings" or the special value "+" meaning "one or more unspecified headings" and set the headings parameter to:

[
    "# Head",
    "## Item",
    "*",
    "## Foot",
    "*"
]
When an error is detected, this rule outputs the line number of the first problematic heading (otherwise, it outputs the last line number of the file).

Note that while the headings parameter uses the "## Text" ATX heading style for simplicity, a file may use any supported heading style.

Rationale: Projects may wish to enforce a consistent document structure across a set of similar content.


MD044 - Proper names should have the correct capitalization
Tags: spelling

Aliases: proper-names

Parameters: names, code_blocks (string array; default null, boolean; default true)

Fixable: Most violations can be fixed by tooling

This rule is triggered when any of the strings in the names array do not have the specified capitalization. It can be used to enforce a standard letter case for the names of projects and products.

For example, the language "JavaScript" is usually written with both the 'J' and 'S' capitalized - though sometimes the 's' or 'j' appear in lower-case. To enforce the proper capitalization, specify the desired letter case in the names array:

[
    "JavaScript"
]
Set the code_blocks parameter to false to disable this rule for code blocks.

Rationale: Incorrect capitalization of proper names is usually a mistake.


MD045 - Images should have alternate text (alt text)
Tags: accessibility, images

Aliases: no-alt-text

This rule is triggered when an image is missing alternate text (alt text) information.

Alternate text is commonly specified inline as:

![Alternate text](image.jpg)
Or with reference syntax as:

![Alternate text][ref]

...

[ref]: image.jpg "Optional title"
Guidance for writing alternate text is available from the W3C, Wikipedia, and other locations.

Rationale: Alternate text is important for accessibility and describes the content of an image for people who may not be able to see it.


MD046 - Code block style
Tags: code

Aliases: code-block-style

Parameters: style ("consistent", "fenced", "indented"; default "consistent")

This rule is triggered when unwanted or different code block styles are used in the same document.

In the default configuration this rule reports a violation for the following document:

Some text.

    # Indented code

More text.

```ruby
# Fenced code
```

More text.
To fix violations of this rule, use a consistent style (either indenting or code fences).

The specified style can be specific (fenced, indented) or simply require that usage be consistent within the document (consistent).

Rationale: Consistent formatting makes it easier to understand a document.


MD047 - Files should end with a single newline character
Tags: blank_lines

Aliases: single-trailing-newline

Fixable: Most violations can be fixed by tooling

This rule is triggered when there is not a single newline character at the end of a file.

An example that triggers the rule:

# Heading

This file ends without a newline.[EOF]
To fix the violation, add a newline character to the end of the file:

# Heading

This file ends with a newline.
[EOF]
Rationale: Some programs have trouble with files that do not end with a newline. More information: https://unix.stackexchange.com/questions/18743/whats-the-point-in-adding-a-new-line-to-the-end-of-a-file.


MD048 - Code fence style
Tags: code

Aliases: code-fence-style

Parameters: style ("consistent", "tilde", "backtick"; default "consistent")

This rule is triggered when the symbols used in the document for fenced code blocks do not match the configured code fence style:

```ruby
# Fenced code
```

~~~ruby
# Fenced code
~~~
To fix this issue, use the configured code fence style throughout the document:

```ruby
# Fenced code
```

```ruby
# Fenced code
```
The configured list style can be a specific symbol to use (backtick, tilde), or can require that usage be consistent within the document.

Rationale: Consistent formatting makes it easier to understand a document.
