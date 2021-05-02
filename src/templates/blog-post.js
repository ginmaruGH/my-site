import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/Layout"
import Blurb from "../components/Blurb"
import Seo from "../components/SEO"
import { slugify } from "../utils/helpers"


const BlogPostTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const post = data.markdownRemark
  const { tags, thumbnail, title, description, dateTime, pubDate } = post.frontmatter

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post container"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="article-header">
          {/* <div className="container"> */}
          <div className="thumb">
            {thumbnail && (
              <GatsbyImage
                image={thumbnail.childImageSharp.gatsbyImageData}
                alt="thumbnail"
                className="post-thumbnail"
              />
            )}
            <h1>{title}</h1>
            <div className="post-meta">
              <time dateTime={dateTime}>{pubDate}</time>
              {tags && (
                <div className="tags">
                  {tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/tags/${slugify(tag)}`}
                      className={`tag-${tag}`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
          {description && <p className="description">{description}</p>}
        </header>

        <section
          className="article-post"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />

        <hr />

        <Blurb />
      </article>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
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
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        dateTime: pubDate
        pubDate(formatString: "MMMM DD, YYYY")
        description
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
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
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
