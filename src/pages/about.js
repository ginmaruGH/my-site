import React from "react"
// import { graphql } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const About = ({ location }) => {
  const metaAbout = {
    pagePath: location.pathname,
    pageTitle: "Elementary Elementary について",
    pageDesc: "Web制作・開発での学びや試行錯誤の記録です。 (^ ^);",
    // pageImgSrc: childImageSharp.original.src,
    // pageImgWidth: childImageSharp.original.width,
    // pageImgHeight: childImageSharp.original.height,
  }

  return (
    <Layout className="about">
      <Seo postMeta={metaAbout} />
      <article className="container">
        <h1 style={{ marginTop: `3rem` }}>About me</h1>
        <p>
          はじめまして、<span>Ginmaru</span>と申します。
        </p>
        <p>
          Web制作・開発について学んだこと取り組んだことなどをアウトプットするために開設しました。
        </p>
        <p>Web初学者の<strong>「学習・活動」記録</strong>です。</p>
        <p>記事は「学習・活動」記録（備忘録）として常体で書いてまいります。ご理解いただきたく存じます。</p>
        <p>40代後半のおじさんですが、自身の成長を信じ、年齢に抗い挑戦します。</p>
        <p>拙文ながら、どなたかのヒントになれれば幸いです。</p>
        <h2>Tools</h2>
        <p>私が使用しているツールです。</p>

        <h3>Software</h3>
        <ul>
          <li>
            Coding:
            {` `}
            <a href="https://azure.microsoft.com/ja-jp/products/visual-studio-code/">
              Visual Studio Code
            </a>
            {` `}
            with
            <a href="https://github.com/taniarascia/new-moon">
              {" "}
              New Moon Theme
            </a>
          </li>
          <li>
            Terminal:
            {` `}
            <a href="https://iterm2.com/">iTerm2</a>
          </li>
          <li>
            Design:{" "}
            <a href="https://affinity.serif.com/ja-jp/"> Affinity series</a>
            <ul>
              <li>
                <a href="https://affinity.serif.com/ja-jp/publisher/">
                  Publisher
                </a>
              </li>
              <li>
                <a href="https://affinity.serif.com/ja-jp/designer/">
                  Designer
                </a>
              </li>
              <li>
                <a href="https://affinity.serif.com/ja-jp/photo/">Photo</a>
              </li>
            </ul>
          </li>
        </ul>

        <h3>Hardware</h3>
        <ul>
          <li>Coding PC: MacBook Pro (15-inch, 2019)</li>
          <li>Spare Machine: Windows 10 Desk-Top</li>
        </ul>

        <h3>This Site</h3>
        <ul>
          <li>
            <a href="https://www.gatsbyjs.com/">Gatsby</a>
          </li>
          <li>
            <a href="https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog">
              Gatsby Start Blog
            </a>
          </li>
          <li>
            Reference:
            <a href="https://www.taniarascia.com/"> Tania Rascia</a>
          </li>
        </ul>
        <p>このサイトは上記をベースに、これからカスタマイズしていきます。</p>

        <h3>Skill</h3>
        <ul>
          <li>HTML/CSS (BEM)</li>
          <li>Bootstrap</li>
          <li>Sass (SCSS)</li>
          <li>Pug(Jade)</li>
          <li>JavaScript/jQuery</li>
          <li>webpack</li>
          <li>GitHub</li>
        </ul>
      </article>
    </Layout>
  )
}

export default About
