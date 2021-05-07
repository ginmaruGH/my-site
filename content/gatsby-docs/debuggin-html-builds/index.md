---
pubDate: 2021-05-06
modDate: 2021-05-07
title: "Debugging HTML Build (HTMLビルドのデバッグ)"
description: "Debugging HTML Build (HTMLビルドのデバッグ）についてGoogle翻訳をもとにまとめる。"
thumbnail: "../../../src/images/gatsby-icon.png"
category: "Gatsby-Docs"
tags:
  - Gatsby
  - GatsbyDocs
  - HowToGuides
  - LocalDevelopment
  - AdditionalGuides
---

<https://www.gatsbyjs.com/docs/debugging-html-builds/>

Errors while building static HTML files (the build-time React SSR process) generally happen for one of the following reasons:

<details open><summary>Google翻訳</summary><div>

静的HTMLファイルのビルド中のエラー（ビルド時のReact SSRプロセス）は、通常、次のいずれかの理由で発生します。
</dvi></details>

<1> Some of your code references “browser globals” like `window` or `document` that aren’t available in Node.js. If this is your problem you should see an error above like “window is not defined”. To fix this, find the offending code and either a) check before calling the code if window is defined so the code doesn’t run while Gatsby is building (see code sample below) or b) if the code is in the render function of a React.js component, move that code into a [`componentDidMount` lifecycle](https://reactjs.org/docs/react-component.html#componentdidmount) or into a [`useEffect` hook](https://reactjs.org/docs/hooks-reference.html#useeffect), which ensures the code doesn’t run unless it’s in the browser.

<details open><summary>Google翻訳</summary><div>

1. 一部のコードは、Node.jsでは使用できない`window`や`document`などの“browser globals”を参照しています。
これが問題である場合は、“window is not defined”などのエラーが表示されるはずです。
これを修正するには、問題のあるコードを見つけて、

    a）Gatsbyのビルド中にコードが実行されないようにwindowが定義されているかどうかをコードを呼び出す前に確認します（以下のコードサンプルを参照）。

    b）コードがReact.jsコンポーネントのレンダリング関数にある場合、そのコードを[componentDidMountライフサイクル](https://reactjs.org/docs/react-component.html#componentdidmount)または[useEffectフック](https://reactjs.org/docs/hooks-reference.html#useeffect)に移動します。これにより、ブラウザにない限りコードが実行されなくなります。
</dvi></details>

<2> Check that each of your JS files listed in your `pages` directory (and any sub-directories) are exporting either a React component or string. Gatsby treats any JS file listed under the `pages` dir as a page component, so it must have a default export that’s a component or string.

<details open><summary>Google翻訳</summary><div>

2. `pages`ディレクトリ（およびサブディレクトリ）にリストされている各JSファイルがReactコンポーネントまたは文字列をエクスポートしていることを確認してください。
Gatsbyは、`pages`ディレクトリの下にリストされているJSファイルをページコンポーネントとして扱います。
したがって、コンポーネントまたは文字列であるデフォルトのエクスポートが必要です。
</dvi></details>

<3> You mix up `import` and `require` calls in the same file. This might lead to “WebpackError: Invariant Violation: Minified React error #130” since [webpack 4 is stricter than v3](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v1-to-v2/#convert-to-either-pure-commonjs-or-pure-es6). The solution is to only use `import` and this also extends to `gatsby-ssr` and `gatsby-browser` files.

<details open><summary>Google翻訳</summary><div>

3. 同じファイルで`import`呼び出しと`require`呼び出しを混同します。
これにより、"WebpackError：Invariant Violation：Minified React error＃130"につながる可能性があります[webpack4はv3よりも厳密](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v1-to-v2/#convert-to-either-pure-commonjs-or-pure-es6)。
解決策は`import`のみを使用することであり、これは`gatsby-ssr`および`gatsby-browser`ファイルにも拡張されます。
</dvi></details>

<4> Your app doesn’t correctly [hydrate](https://reactjs.org/docs/react-dom.html) in the client, which results in gatsby develop and gatsby build being inconsistent. It’s possible that a change in a file like `gatsby-ssr` or `gatsby-browser` has a structure that is not reflected in the other file, meaning that there is a mismatch between client and server output.

<details open><summary>Google翻訳</summary><div>

4. アプリがクライアントで正しく[ハイドレイト](https://reactjs.org/docs/react-dom.html)されないため、gatsby developとgatsby buildの一貫性が失われます。
`gatsby-ssr`や `gatsby-browser`のようなファイルの変更が、他のファイルに反映されていない構造を持っている可能性があります。
これは、クライアントとサーバーの出力に不一致があることを意味します。
</dvi></details>

<5> Some other reason :-) #1 is the most common reason building static files fail. If it’s another reason, you have to be a bit more creative in figuring out the problem.

<details open><summary>Google翻訳</summary><div>

  5. 他のいくつかの理由：-）＃1は、スタティックファイルの構築が失敗するもっとも一般的な理由です。
べつの理由なら、あなたは問題を理解する上でもう少し創造的でなければなりません。
</dvi></details>

---

## How to check if `window` is defined <br />（`window`が定義されているかどうかを確認する方法）

When referencing `window` in a React component.

<details open><summary>Google翻訳</summary><div>

Reactコンポーネントで`window`を参照する場合。
</dvi></details>

<div class="filename">JSX</div>

```jsx
import * as React from "react"
// Check if window is defined (so if in the browser or in node.js).
// windowが定義されているかどうかを確認（ブラウザまたはnode.jsの場合）
const isBrowser = typeof window !== "undefined"
export default function MyComponent() {
  let loggedIn = false
  if (isBrowser) {
    window.localstorage.getItem("isLoggedIn") === "true"
  }
  return <div>Am I logged in? {loggedIn}</div>
}
```

When requiring a module:

<details open><summary>Google翻訳</summary><div>

モジュールが必要な場合：
</dvi></details>

<div class="filename">JS</div>

```js
// Requiring a function causes an error during builds as the code tries to reference window
// 関数を要求すると、コードがwindowを参照しようとするため、ビルド中にエラーが発生する
const module = require("module") // Error
// Wrap the require in check for window
// windowのチェックでrequireをラップする
if (typeof window !== `undefined`) {
  const module = require("module")
}
```

In case the module needs to be defined for the code to run, you can use a ternary operator

<details open><summary>Google翻訳</summary><div>

コードを実行するためにモジュールを定義する必要がある場合は、三項演算子を使用できます
</dvi></details>

<div class="filename">JS</div>

```js
const module = typeof window !== `undefined` ? require("module") : null
```

## Fixing third-party modules <br />（サードパーティモジュールの修正）

So, the worst has happened and you’re using an npm module that expects `window` to be defined. You may be able to file an issue and get the module patched, but what to do in the mean time?

<details open><summary>Google翻訳</summary><div>

このように、最悪の事態が発生し、 `window`が定義されることを期待するnpmモジュールを使用しています。
問題を報告してモジュールにパッチを適用できる場合があります。しかし、その間に何をすべきでしょうか？
</dvi></details>

One solution is to [customize](https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config) your webpack configuration to replace the offending module with a dummy module during server rendering.

<details open><summary>Google翻訳</summary><div>

1つの解決策は、サーバーのレンダリング中に問題のモジュールをダミーモジュールに置き換えるようにwebpack構成を[カスタマイズ](https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config)することです。
</dvi></details>

`gatsby-node.js` in the project root:

<details open><summary>Google翻訳</summary><div>

プロジェクトルートの `gatsby-node.js`：
</dvi></details>

<div class="filename">gatsby-node.js</div>

```js
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
```

Another solution is to use a package like [loadable-components](https://github.com/gregberge/loadable-components). The module that tries to use `window` will be dynamically loaded only on the client side (and not during SSR).

<details open><summary>Google翻訳</summary><div>

別の解決策は、[loadable-components](https://github.com/gregberge/loadable-components)のようなパッケージを使用することです。
`window`を使おうとするモジュールは、クライアント側でのみ動的にロードされます（SSR中はロードされません）。
</dvi></details>

[Edit this page on GitHub](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/debugging-html-builds.md)
