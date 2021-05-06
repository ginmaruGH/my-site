---
pubDate: 2021-05-06
modDate: 2021-05-06
title: "Unit Testing（ユニットテスト）"
description: "単体テストは、コードをデプロイする前にコードのエラーから保護するための優れた方法です。Gatsbyには、すぐに使用できる単体テストのサポートは含まれていませんが、起動して実行するのに数ステップしかかかりません。しかし、Gatsbyビルドプロセスにはいくつかの機能があり、標準のJestセットアップが完全に機能しないことを意味します。このガイドでは、設定方法を説明します。"
thumbnail: "../../../src/images/gatsby-icon.png"
category: "Gatsby-Docs"
tags:
  - Gatsby
  - GatsbyDocs
  - GatsbyDocs-HowToGuides
  - GatsbyDocs-HowToGuides-Testing
---

<https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/>

Unit testing is a great way to protect against errors in your code before you deploy it. While Gatsby does not include support for unit testing out of the box, it only takes a few steps to get up and running. However, there are a few features of the Gatsby build process that mean the standard Jest setup doesn’t quite work. This guide shows you how to set it up.

## Setting up your environment <br />（環境のセットアップ）

The most popular testing framework for React is [Jest](https://jestjs.io/), which was created by Facebook. While Jest is a general-purpose JavaScript unit testing framework, it has lots of features that make it work particularly well with React.

> Note: For this guide, you will be starting with `gatsby-starter-default`, but the concepts should be the same or very similar for your site.

  <details open><summary>Google翻訳</summary><div>

  Reactのもっとも人気のあるテストフレームワークは、Facebookによって作成された[Jest](https://jestjs.io/)です。
  Jestは汎用のJavaScriptユニットテストフレームワークですが、Reactでとくにうまく機能する多くの機能があります。

  >注：このガイドでは、gatsby-starter-defaultから始めますが、概念は同じか非常に似ているサイトである必要があります。
  </dvi></details>

### 1. Installing dependencies <br />（依存関係のインストール）

First, you need to install `Jest` and some more required packages. Install `babel-jes`t and `babel-preset-gatsby` to ensure that the babel preset(s) that are used match what are used internally for your Gatsby site.

  <details open><summary>Google翻訳</summary><div>

  まず、 `Jest`とその他の必要なパッケージをインストールする必要があります。`babel-jest`と`babel-preset-gatsby`をインストールして、使用されるbabelプリセットがGatsbyサイトで内部的に使用されているものと一致することを確認します。
  </dvi></details>

```bash
npm install --save-dev jest babel-jest react-test-renderer babel-preset-gatsby identity-obj-proxy
```

### 2. Creating a configuration file for Jest <br />（Jestの構成ファイルの作成）

Because Gatsby handles its own Babel configuration, you will need to manually tell Jest to use `babel-jest`. The easiest way to do this is to add a `jest.config.js`. You can set up some useful defaults at the same time:

  <details open><summary>Google翻訳</summary><div>

  Gatsbyは独自のBabel構成を処理するため、手動でJestに `babel-jest`を使用するように指示する必要があります。
  これを行うもっとも簡単な方法は、 `jest.config.js`を追加することです。いくつかの便利なデフォルトを同時に設定できます。
  </dvi></details>

<div class="filename">jest.config.js</div>

```js
module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
}
```

Go over the content of this configuration file:

- The `transform` section tells Jest that all `js` or `jsx` files need to be transformed using a `jest-preprocess.js` file in the project root. Go ahead and create this file now. This is where you set up your Babel config. You can start with the following minimal config:

  <details open><summary>Google翻訳</summary><div>

  この構成ファイルの内容を確認します。

  - `transform`セクションは、プロジェクトルートの`jest-preprocess.js`ファイルを使用してすべての `js`または`jsx`ファイルを変換する必要があることをJestに通知します。さあ、このファイルを今すぐ作成してください。
  ここで、Babel構成を設定します。次の最小限の構成から始めることができます。
  </dvi></details>

<div class="filename">jest-preprocess.js</div>

```js
const babelOptions = {
  presets: ["babel-preset-gatsby"],
}

module.exports = require("babel-jest").createTransformer(babelOptions)
```

- The next option is `moduleNameMapper`. This section works a bit like webpack rules and tells Jest how to handle imports. You are mainly concerned here with mocking static file imports, which Jest can’t handle. A mock is a dummy module that is used instead of the real module inside tests. It is good when you have something that you can’t or don’t want to test. You can mock anything, and here you are mocking assets rather than code. For stylesheets you need to use the package `identity-obj-proxy`. For all other assets, you need to use a manual mock called `file-mock.js`. You need to create this yourself. The convention is to create a directory called `__mocks__` in the root directory for this. Note the pair of double underscores in the name.

  <details open><summary>Google翻訳</summary><div>

  - 次のオプションは `moduleNameMapper`です。 このセクションはwebpackルールのように機能し、Jestにインポートの処理方法を説明します。
  ここでは主に静的ファイルのインポートのモックに関心がありますが、`Jest`は処理できません。
  モックは、テスト内で実際のモジュールの代わりに使用されるダミーモジュールです。 テストできない、またはテストしたくないものがある場合に適しています。
  何でもモックできます。ここでは、コードではなくアセットをモックしています。
  スタイルシートの場合は、パッケージ `identity-obj-proxy`を使用する必要があります。
  ほかのすべてのアセットについては、 `file-mock.js`と呼ばれる手動モックを使用する必要があります。
  これは自分で作成する必要があります。慣例では、このためのルートディレクトリに `__mocks__`というディレクトリを作成します。名前の二重下線のペアに注意してください。
  </dvi></details>

<div class="filename">__mocks__/file-mock.js</div>

```js
module.exports = "test-file-stub"
```

- The next config setting is `testPathIgnorePatterns`. You are telling Jest to ignore any tests in the `node_modules` or `.cache` directories.

- The next option is very important and is different from what you’ll find in other Jest guides. The reason that you need `transformIgnorePatterns` is because Gatsby includes un-transpiled ES6 code. By default Jest doesn’t try to transform code inside `node_modules`, so you will get an error like this:

  <details open><summary>Google翻訳</summary><div>

  - 次の設定は `testPathIgnorePatterns`です。`node_modules`または`.cache`ディレクトリ内のテストを無視するようにJestに指示しています。

  - 次のオプションは非常に重要であり、ほかのJestガイドにあるものとは異なります。`transformIgnorePatterns`が必要な理由は、GatsbyにトランスパイルされていないES6コードが含まれているためです。デフォルトでは、Jestは `node_modules`内のコードを変換しようとしません。したがって、次のようなエラーが発生します。
  </dvi></details>

<div class="filename">TEXT</div>

```txt
/my-app/node_modules/gatsby/cache-dir/gatsby-browser-entry.js:1
({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import React from "react"
                                                                                            ^^^^^^
SyntaxError: Unexpected token import
```

This is because `gatsby-browser-entry.js` isn’t being transpiled before running in Jest.
You can fix this by changing the default `transformIgnorePatterns` to exclude the `gatsby` module.

<details open><summary>Google翻訳</summary><div>

これは、 `gatsby-browser-entry.js`がJestで実行される前にトランスパイルされていないためです。
これを修正するには、デフォルトの `transformIgnorePatterns`を変更して、`gatsby`モジュールを除外します。
</dvi></details>

- The `globals` section sets `__PATH_PREFIX__`, which is usually set by Gatsby, and which some components need.

  <details open><summary>Google翻訳</summary><div>

  `globals`セクションは`__PATH_PREFIX__`を設定します。これは通常Gatsbyによって設定されますが、一部のコンポーネントに必要です。
  </dvi></details>

- You need to set `testURL` to a valid URL, because some DOM APIs such as `localStorage` are unhappy with the default (`about:blank`).

  > Note: if you’re using Jest 23.5.0 or later, `testURL` will default to `http://localhost` so you can skip this setting.

  <details open><summary>Google翻訳</summary><div>

  `localStorage`などの一部のDOM APIはデフォルト（`about：blank`）に不満があるため、 `testURL`を有効なURLに設定する必要があります。

   > 注：Jest 23.5.0以降を使用している場合、 `testURL`はデフォルトで`http://localhost`に設定されるため、この設定をスキップできます。
  </dvi></details>

- There’s one more global that you need to set, but as it’s a function you can’t set it here in the JSON. The `setupFiles` array lets you list files that will be included before all tests are run, so it’s perfect for this.

  <details open><summary>Google翻訳</summary><div>

    - 設定する必要のあるグローバルがもう1つありますが、これは関数であるため、ここではJSONで設定できません。`setupFiles`配列を使用すると、すべてのテストが実行される前に含まれるファイルを一覧表示できます。これに最適です
  </dvi></details>

<div class="filename">loadershim.js</div>

```js
global.___loader = {
  enqueue: jest.fn(),
}
```

### 3. Useful mocks to complete your testing environment <br />（テスト環境を完成させるための便利なモック）

**Mocking `gatsby`**

Finally, it’s a good idea to mock the `gatsby` module itself. This may not be needed at first, but will make things a lot easier if you want to test components that use `Link` or GraphQL.

  <details open><summary>Google翻訳</summary><div>

  さいごに、 `gatsby`モジュール自体のモックをオススメします。さいしょは必要ないかもしれません、ただし、 `Link`またはGraphQLを使用するコンポーネントをテストする場合は、作業がはるかに簡単になります。
  </dvi></details>

<div class="filename">__mocks__/gatsby.js</div>

```js
const React = require("react")
const gatsby = jest.requireActual("gatsby")
module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    // これらのpropsは `a`タグには無効です
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
}
```

This mocks the `graphql()` function, `Link` component, and `StaticQuery` component.

  <details open><summary>Google翻訳</summary><div>

  これは、 `graphql()`関数、 `Link`コンポーネント、および`StaticQuery`コンポーネントをモックします。
  </dvi></details>

## Writing tests（テストを書く）

A full guide to unit testing is beyond the scope of this guide, but you can start with a snapshot test to check that everything is working.

First, create the test file. You can either put these in a `__tests__` directory, or put them elsewhere (usually next to the component itself), with the extension `.spec.js` or `.test.js`. The decision comes down to your own preference. In this guide, you will use the `__tests__` folder convention. To test the header component, create a header.js file in `src/components/__tests__/`:

  <details open><summary>Google翻訳</summary><div>

  まず、テストファイルを作成します。 これらを `__tests__`ディレクトリに置くことができます。
  または、拡張子が`.spec.js`または`.test.js`の別の場所（通常はコンポーネント自体の隣）に配置します。
  決定はあなた自身の好みによります。このガイドでは、 `__tests__`フォルダー規則を使用します。
  headerコンポーネントをテストするには、 `src/components/__tests__/`にheader.jsファイルを作成します。
  </dvi></details>

<div class="filename">src/components/__tests__/header.js</div>

```js
import React from "react"
import renderer from "react-test-renderer"
import Header from "../header"
describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Header siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

This is a very brief snapshot test, which uses `react-test-renderer` to render the component, and then generates a snapshot of it on the first run. It then compares future snapshots against this, which means you can quickly check for regressions. Visit [the Jest docs](https://jestjs.io/docs/en/getting-started) to learn more about other tests that you can write.

  <details open><summary>Google翻訳</summary><div>

  これは非常に簡単なスナップショットテストです。
  これは `react-test-renderer`を使用してコンポーネントをレンダリングし、最初の実行時にそのスナップショットを生成します。
  次に、将来のスナップショットをこれと比較します。これは、リグレッションをすばやく確認できることを意味します。
  [Jest docs](https://jestjs.io/docs/en/getting-started)にアクセスして、作成できる他のテストの詳細を確認してください。
  </dvi></details>

## Running tests（テストの実行）

If you look inside `package.json` you will probably find that there is already a script for `test`, which just outputs an error message. Change this to use the `jest` executable that you now have available, like so:

  <details open><summary>Google翻訳</summary><div>

  `package.json`の内部を見ると、おそらく`test`のスクリプトがすでにあります。エラーメッセージを出力するだけです。次のように、現在利用可能な `jest`実行可能ファイルを使用するように変更します。
  </dvi></details>

<div class="filename">package.json</div>

```json
"scripts": {
  "test": "jest"
}
```

This means you can now run tests by typing `npm test`. If you want you could also run with a flag that triggers watch mode to watch files and run tests when they are changed: `npm test -- --watch`.

  <details open><summary>Google翻訳</summary><div>

  これは、`npm test`と入力してテストを実行できます。
  必要に応じて、監視モードをトリガーしてファイルを監視し、ファイルが変更されたときにテストを実行するフラグを使用して実行することもできます。： `npm test -- --watch`
  </dvi></details>

Run the tests again now and it should all work! You may get a message about the snapshot being written. This is created in a `__snapshots__` directory next to your tests. If you take a look at it, you will see that it is a JSON representation of the `<Header />` component. You should check your snapshot files into a source control system (for example, a GitHub repo) so that any changes are tracked in history. This is particularly important to remember if you are using a continuous integration system such as Travis or CircleCI to run tests, as these will fail if the snapshot is not checked into source control.

  <details open><summary>Google翻訳</summary><div>

  今すぐテストを再実行すると、すべて機能するはずです。 書き込まれているスナップショットに関するメッセージが表示されます。
  これは、テストの横の `__snapshots__`ディレクトリに作成されます。
  これを見ると、 `<Header />`コンポーネントのJSON表現であることがわかります。スナップショットファイルをソース管理システム（GitHubリポジトリなど）にチェックインして、変更が履歴で追跡されるようにする必要があります。
　これは、TravisやCircleCIなどの継続的インテグレーションシステムを使用してテストを実行している場合に覚えておくことがとくに重要です。
　スナップショットがソース管理にチェックインされていない場合、これらは失敗します。
  </dvi></details>

If you make changes that mean you need to update the snapshot, you can do this by running `npm test -- -u`.

  <details open><summary>Google翻訳</summary><div>
  </dvi></details>

## Using TypeScript（TypeScriptの使用）

If you are using TypeScript, you need to install typings packages and make two changes to your config.

  <details open><summary>Google翻訳</summary><div>

  スナップショットを更新する必要がある変更を加えた場合、`npm test --- u`を実行します。
  </dvi></details>

```bash
npm install --save-dev @types/jest @types/react-test-renderer
```

Update the transform in `jest.config.js` to run `jest-preprocess` on files in your project’s root directory.

> Note: `<rootDir>` is replaced by Jest with the root directory of the project. Don’t change it.

  <details open><summary>Google翻訳</summary><div>

  `jest.config.js`の変換を更新して、プロジェクトのルートディレクトリ内のファイルに対して`jest-preprocess`を実行します。

  >注： `<rootDir>`は、プロジェクトのルートディレクトリを持つJestに置き換えられます。 変更しないでください。
  </dvi></details>

<div class="filename">jest.config.js</div>

```js
"^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
```

Also update `jest-preprocess.js` with the following Babel preset to look like this:

  <details open><summary>Google翻訳</summary><div>

  また、 `jest-preprocess.js`をBabelプリセットで次のように更新します。
  </dvi></details>

<div class="filename">jest-preprocess.js</div>

```js
const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
}
```

Once this is changed, you can write your tests in TypeScript using the `.ts` or `.tsx` extensions.

  <details open><summary>Google翻訳</summary><div>
  </dvi></details>

### Using tsconfig paths（tsconfigパスの使用）

If you are using [tsconfig paths](https://www.typescriptlang.org/tsconfig#paths) there is a single change to your config.

  <details open><summary>Google翻訳</summary><div>

  これが変更されると、 `.ts`または`.tsx`拡張子を使用してTypeScriptでテストを記述できます。
  </dvi></details>

<1> Add [ts-jest](https://github.com/kulshekhar/ts-jest)

```bash
npm install --save-dev ts-jest
```

<2> Update `jest.config.js` to import and map `tsconfig.json` paths <br />
（`jest.config.js`を更新して、`tsconfig.json`パスをインポートしてマッピングします）

<div class="filename">jest.config.js</div>

```js
const { compilerOptions } = require("./tsconfig.json")
const { pathsToModuleNameMapper } = require("ts-jest/utils")
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/",
})
```

<3> Add paths to `jest.config.js` moduleNameMapper <br />
（`jest.config.js`にパスを追加します  moduleNameMapper）

<div class="filename">jest.config.js</div>

```js
moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/tests/file-mock.js`,
    ...paths,
  },
```

### Other resources（その他のリソース）

If you need to make changes to your Babel config, you can edit the config in `jest-preprocess.js`. You may need to enable some of the plugins used by Gatsby, though remember you may need to install the Babel 7 versions. See the [Gatsby Babel config guide](https://www.gatsbyjs.com/docs/how-to/custom-configuration/babel) for some examples.

  <details open>
  <summary>Google翻訳</summary>
  <div>

  Babelの設定を変更する必要がある場合は、 `jest-preprocess.js`で設定を編集できます。Gatsbyが使用するプラグインの一部を有効にする必要があります。
  Babel7バージョンをインストールする必要があるかもしれないことを覚えておいてください。いくつかの例については、[Gatsby Babel構成ガイド](https://www.gatsbyjs.com/docs/how-to/custom-configuration/babel)を参照してください。
  </dvi>
  </details>

For more information on Jest testing, visit [the Jest site](https://jestjs.io/docs/en/getting-started).

  <details open><summary>Google翻訳</summary><div>

  Jestテストの詳細については、[Jestサイト](https://jestjs.io/docs/en/getting-started)にアクセスしてください。
  </dvi></details>

For an example encapsulating all of these techniques—and a full unit test suite with [@testing-library/react](https://github.com/testing-library/react-testing-library), check out the [using-jest](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-jest) example.

  <details open><summary>Google翻訳</summary><div>

  例として
  これらすべてのテクニックをカプセル化、およびフルユニットテストスイートの例を確認してください。

  [@tests-library/react](https://github.com/testing-library/react-testing-library),
  [using-jest](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-jest)
  </dvi></details>

[Edit this page on GitHub](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/how-to/testing/unit-testing.md)
