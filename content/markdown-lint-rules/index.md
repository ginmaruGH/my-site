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
  - markdownlint
category: ""
description: "VSCodeの拡張機能のmarkdownlintのルールの概要"
---

[VS Code](https://code.visualstudio.com/)で`Markdown`ファイルを編集していて、[`markdownlint`](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)からよく叱られるので、反省の意を込めて[markdownlint-Rules](https://github.com/DavidAnson/markdownlint/blob/v0.23.1/doc/Rules.md)のよく指摘される箇所を調べてみる。

<https://github.com/DavidAnson/markdownlint/blob/v0.23.1/doc/Rules.md>

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


## MD005 - リストアイテムのインデントを統一する

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

- 改行したい文末に`<br />`要素を入れて改行する。

```md
Text text text <br />
テスト・テスト・テスト
```

Text text text <br />
テスト・テスト・テスト

---

- 段落を改めるには、空行を入れる。

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

空行が2行以上あると注意される。`setting.json`で変更可能。

パラメーター: maximum (number; default 1)



<https://github.com/DavidAnson/markdownlint/blob/main/README.md#optionsconfig>

空行3行までは許可にする。

<div class="filename">setting.json</div>

```json
  "markdownlint.config": {
      "MD012": {"maximum": 3},
  },
```

## MD022 - 見出しは空白行で囲む

```md
<!-- bad-->
文章文章文章

## 見出し2
文章文章文章
```

```md
<!-- good -->
文章文章文章

## 見出し2

文章文章文章
```

## MD023 - 見出しはインデントをしない

```md
<!-- bad -->

  ## 見出し2

文章文章文章
```

```md
<!-- good -->

## 見出し2

文章文章文章
```

## MD024 - 同じ内容の見出しをつくらない

```md
<!-- bad -->
# mardowslintについて

## markdownlintについて
```

```md
<!-- good -->
# mardowslintについて

## markdownlintの設定について
```

以下の書き方はOK。

```md
<!-- good -->
# VS Codeの拡張機能（見出し1）

## markdown All in Oneについて（見出し2）

### 設定（見出し3）

## markdownlintについて（見出し2）

### 設定（見出し3）
```



## MD025 - `H1`はドキュメントに1つ

```md
<!-- bad -->
# 見出し1

# 見出し1
```

```md
<!-- good -->
# 見出し1

## 見出し2

## 別の見出し2
```



## MD026 - 見出しに句読点はつけない

```md
<!-- bad -->

# Heading1.

# 見出し1です。
```

```md
<!-- good -->

# Heading1

# 見出し1です
```

`setting.json`で変更可能。

パラメーター: punctuation (string; default ".,;:!。、；：！")

半角・全角のコロン`:`、`：`、と感嘆符（exclamation）`!`、`！`を許可（監視項目から削除）に設定する。

<div class="filename">setting.json</div>

```json
"markdownlint.config": {
    "MD026": {"punctuation": ".,;。、；"},
},
```

```md
### Rules: markdownlint

### markdownlintを攻略！
```

### Rules: markdownlint

### markdownlintを攻略！



## MD027 - `>` Blockquote（ブロック引用）のあとにスペースを入れない

表示できてしまうが、ルールに従う。

```md
<!-- bad -->
> This is a blockquote with bad indentation
> there should only be one.
```

> This is a blockquote with bad indentation
> there should only be one.

```md
<!-- good -->
>This is a blockquote with correct
>indentation.
```

>This is a blockquote with correct
>indentation.



## MD028 - `>` Blockquote（引用ブロック）内の空白行

引用ブロック内の段落を変える場合は`>`を使う

```md
<!-- bad -->
>これはブロッククォート
>これもブロッククオート

>新しい段落に改めたい。
>新しい段落の続き。
```

>これはブロッククォート
>これもブロッククオート

>新しい段落に改めたい。
>新しい段落の続き。

```md
<!-- good -->
>これはブロッククォート
>これもブロッククオート
>
>新しい段落を改まった。
>新しい段落の続き。
```

>これはブロッククォート
>これもブロッククオート
>
>新しい段落改まった。
>新しい段落の続き。


## MD029 - 番号つきリストアイテムのプレフィックス

使いづらいので`false`に設定

<div class="filename">setting.json</div>

```json
"markdownlint.config": {
    "MD029": false,
},
```


## MD030 - リストマーカーのあとにスペースを1つ入れる


```md
<!-- bad -->
1.item
2.item
3.item

---

-memo1
-memo2
-memo3
```

1.item
2.item
3.item

---

-memo1
-memo2
-memo3

---

```md
<!-- good -->
1. item
2. item
3. item
---
- memo1
- memo2
- memo3
```

1. item
2. item
3. item

---

- memo1
- memo2
- memo3

※別のリストとして複数のリストを表示する場合、段落をはさむ。空白行では同じリストをみなされる。

```md
<!-- 1つのリストとして表示されてしまう -->
- Foo
- Bar
- Baz

1. Foo
2. Bar
3. Baz

1. Foo
   - Bar
2. Baz
```

- Foo
- Bar
- Baz

1. Foo
2. Bar
3. Baz

1. Foo
   - Bar
2. Baz

段落をはさむ

```md
- Foo
- Bar
- Baz

段落

1. Foo
2. Bar
3. Baz
```

- Foo
- Bar
- Baz

段落

1. Foo
2. Bar
3. Baz



## MD031 - 囲まれたコードブロックは空白行で囲む


````md
<!-- bad -->
text
```md
コードブロック1
```

```md
コードブロック2
```
text
````

````md
<!-- good -->
text

```md
コードブロック1
```

```md
コードブロック2
```

text
````


## MD032 - リストは空白行で囲む

```md
<!-- bad -->
text
- item
- item

---

1. item
2. item
text
```

```md
<!-- good -->
text

- item
- item

---

1. item
2. item

text
```



## MD033 - インラインHTML

デフォルトではインラインHTMLタグを使用すると注意される。`false`に設定する。

<div class="filename">setting.json</div>

```json
"markdownlint.config": {
    "MD033": false,
},
```



## MD034 - 裸のURLが使用されました

`<>`タグで囲む。

```md
<!-- bad -->
詳細については、https://www.example.com/を参照してください。
```

```md
<!-- good -->
詳細については、<https://www.example.com/>を参照してください。
```



## MD035 - horizontal rule（水平線スタイル）は統一する

水平線を表すスタイルはどれか1つに統一する。表示される水平線はすべて同じ。

```md
<!-- 水平線スタイルいろいろ -->
---
- - -
***
* * *
****
```

---

- - -

***

* * *

****



## MD036 - 見出しの代わりに強調表示を使わない

強調表示を見出しに使わない。

```md
**強調表示**を見出しにしない。
```

**強調表示**を見出しにしない。



## MD037 - 強調表示内のスペース

強調表示の内側にスペースを入れない。

```md
<!-- bad -->
Here is some ** bold ** text.

Here is some __ bold __ text.

Here is some * italic * text.

Here is some _ italic _ text.
```

```md
<!-- good -->
Here is some **bold** text.

Here is some __bold__ text.

Here is some *italic* text.

Here is some _italic_ text.
```

Here is some **bold** text.

Here is some __bold__ text.

Here is some *italic* text.

Here is some _italic_ text.



## MD038 - インラインコード要素内のスペース

バッククオートで囲んで単語とバッククオートの間にスペースを入れない。

```md
<!-- bad -->
` some text`

`some text `
```

```md
<!-- good -->
`some text`

`some text`
```

バッククオートをインラインコードとして表示する

```md
`` ` `` バックオートのインライン表示

`` `backqoute` ``と`` `backthicks` ``は同義らしい。
```

`` ` `` バックオートのインライン表示

`` `backquote` ``と`` `backtick` ``は同義らしい。



## MD039 - リンクテキスト内のスペース

MD038を同じで、余計なスペースを入れない。

```md
<!-- bad -->
[ a link](https://www.example.com/)

[a link ](https://www.example.com/)
```

```md
<!-- good -->
[a link](https://www.example.com/)
```



## MD040 - コードブロックには言語を指定する

````md
<!-- bad -->
```
#!/bin/bash
echo Hello world
```
````

````md
<!-- good -->
```bash
#!/bin/bash
echo Hello world
```
````



## MD041 - ファイルの最初の行は最上位の見出しにする

基本的にMarkdownファイル最初の行はH1の見出しにする。

GitHubプロジェクトのREADMEにも対応してHTMLタグもOK。

```md
＃ 見出し付きのファイル

これは、最上位の見出しを持つファイルです
```

```md
<h1 align="center"><img src="https://placekitten.com/300/150"/></h1>

これは、トップレベルのHTML見出しを持つファイルです
```



## MD042 - 空のリンクは使用しない

```md
<!-- bad -->
[an empty link]()
```

```md
<!-- good -->
[a valid link](https://example.com/)
```

```md
<!-- 注意される -->
[an empty fragment](#)
```

```md
[a valid fragment](#fragment)
```



## MD043 - 必要な見出し構造

見出し構造を設定できる。設定はしない。



## MD044 - 固有名詞は正しい大文字で表記する

[テキスト校正くん](https://marketplace.visualstudio.com/items?itemName=ICS.japanese-proofreading)が目を光らせているので問題なし。

<https://github.com/ics-creative/project-japanese-proofreading>

## MD045 - 画像にはalternate text（代替テキスト）が必要

`<img src="sample.jpg" alt="sample">` イメージタグでいうところの、`alt`。


```md
![Alternate text](image.jpg)
```

代替テキストはアクセスビリティにとっても重要なので、画像コンテンツが表示されなかった場合の説明は必要。

.

## MD046 - コードブロックスタイル

以下のような、インデントによるコードブロックと` ``` `によるコードブロックの使用を混在しない。

````md
```md
テキスト

    # インデントコードブロック

```ruby
# 囲われたコードブロック
```

テキスト
```
````

Some text.

    # インデントコードブロック

```ruby
# 囲われたコードブロック
```

More text.



## MD047 - ファイルは単一の改行文字で終了する

ファイルの最終行を空行にする。自動で設定されている。

```md
This file ends with a newline.
[EOF]
```


## MD048 - コードフェンススタイル

正しいコードフェンス（コードブロック）でスタイルを統一する。

````md
<!-- good -->
```ruby
# フェンスで囲まれたコード
```
````

```md
<!-- bad -->
~~~ruby
# フェンスで囲まれたコード
~~~
```

## おわりに

Markdownの記法にはルールがある。スタイルを一貫させて、ドキュメントの可読性を保つためにも気をつけたい。

このサイトの記事はMarkdownで書いているが、CSSでスタイリングをしているのでルールから外れているものがあるかもしれない。

Markdownのルールに縛られる限りではないが、スタイルの一貫性を保つためにも今後のテーマづくりに活かしたい。
