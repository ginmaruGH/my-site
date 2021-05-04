import React, { useMemo } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Posts from "../components/Posts"
import SEO from "../components/SEO"

import { getSimplifiedPosts } from "../utils/helpers"
import config from "../utils/config"

export default function TagTemplate({ data, pageContext }) {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.nodes
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? " post found." : " posts found."

  const metadata = {
    url: location.pathname,
    title: post.frontmatter.title,
    desc: post.frontmatter.description,
    imgSrc: original.src,
    imgWidth: original.width,
    imgHeight: original.height,
  }

  return (
    <Layout>
      <SEO postMeta={metadata} />
      <header>
        <div className="container">
          <h1>Posts tagged: {tag}</h1>
          <p className="subtitle">
            <span className="count">{totalCount}</span>
            {message}
          </p>
        </div>
      </header>
      <section className="container">
        <Posts data={simplifiedPosts} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___pubDate], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`
