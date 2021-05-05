import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/SEO"
import PostHeader from "../components/PostHeader"
import Blurb from "../components/Blurb"
import Suggest from "../components/Suggest"

const BlogPostTemplate = ({ data, location }) => {
  const { previous, next } = data
  const original =
    data.markdownRemark.frontmatter.thumbnail.childImageSharp.original
  const metadata = {
    path: location.pathname,
    title: data.markdownRemark.frontmatter.title,
    desc: data.markdownRemark.frontmatter.description,
    imgSrc: original.src,
    imgWidth: original.width,
    imgHeight: original.height,
  }

  return (
    <Layout className="post-page">
      <Seo postMeta={metadata} />
      <article
        className="blog-post container"
        itemScope
        itemType="http://schema.org/Article"
      >
        <PostHeader data={data} />
        <section
          className="article-post"
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html
          }}
          itemProp="articleBody"
        />
        <hr />
      </article>
      <Blurb />
      <Suggest previous={previous} next={next} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      html
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
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 200, height: 200, layout: CONSTRAINED)
            original {
              src
              width
              height
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        published: pubDate
        pubDate(formatString: "MMMM DD, YYYY")
        modified: modDate
        modDate(formatString: "MMMM DD, YYYY")
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        published: pubDate
        pubDate(formatString: "MMMM DD, YYYY")
        modified: modDate
        modDate(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
