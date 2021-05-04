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

      </article>
    </Layout>
  )
}

export default About
