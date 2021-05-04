import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Posts from "../components/Posts"
import SEO from "../components/SEO"

const TagPage = ({ data, pageContext, location }) => {

  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.nodes
  const message = totalCount === 1 ? " post found." : " posts found."
  const metadata = {
    url: location.pathname,
    title: `Tag: ${tag}`,
    desc: `"${tag}"タグの記事一覧です。`,
  }

  return (
    <Layout className="tag-page">
      <SEO postMeta={metadata} />
      <article
        className="blog-post container"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <div className="container">
            <h1>Posts tagged: [{tag}]</h1>
            <p className="subtitle">
              <span className="count">{totalCount}</span>
              {message}
            </p>
          </div>
        </header>

        <section className="container index">
          <Posts data={posts} />
        </section>

      </article>
    </Layout>
  )
}

export default TagPage

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
          pubDate(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`
