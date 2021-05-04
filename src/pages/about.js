import React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const About = ({ data, location }) => {
  const metadata = {
    pagePath: location.pathname,
    pageTitle: "Elementary Elementary について",
    pageDesc: "WebにもPCにも不慣れなおっさんの暗中模索の記録 (^ ^);",
    // pageImgSrc: childImageSharp.original.src,
    // pageImgWidth: childImageSharp.original.width,
    // pageImgHeight: childImageSharp.original.height,
  }

  return (
    <Layout className="about">
      <Seo postMeta={metadata} />
      <article className="container">

        <h1>About me</h1>

        <h2>Tools</h2>
        <p>私が使用しているツールです。</p>

        <h3>Software</h3>
        <ul>
          <li>Coding: Visual Studio Code with New Moon Theme</li>
          <li>Terminal: iTerm2</li>
          <li>Design: Affinity series
            <ul>
              <li>Publisher</li>
              <li>Designer</li>
              <li>Photo</li>
            </ul>
          </li>
        </ul>

        <h3>Hardware</h3>
        <ul>
          <li>Coding PC: MacBook Pro (15-inch, 2019)</li>
        </ul>

      </article>
    </Layout>
  )
}

export default About
