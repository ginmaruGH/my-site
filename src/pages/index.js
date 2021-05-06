import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Blurb from "../components/Blurb"
import Posts from "../components/Posts"
import Seo from "../components/SEO"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  const Section = ({ title, children, ...props }) => (
    <section {...props} className="container index">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )

  return (
    <Layout className="main-page">
      <Seo postMeta />
      <Blurb />
      {/* <Section title="Summaries(Plans)">
      </Section> */}
      <Section title="All Posts">
        <Posts data={posts} />
      </Section>

    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___pubDate], order: DESC }
      skip: 0
      limit: 1000
    ) {
      nodes {
        id
        excerpt(format: HTML, pruneLength: 60, truncate: true)
        fields {
          slug
        }
        frontmatter {
          published: pubDate
          pubDate(formatString: "MMMM DD, YYYY")
          modified: modDate
          modDate(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
