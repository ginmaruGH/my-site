import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/Layout"
import Blurb from "../components/Blurb"
import Seo from "../components/SEO"
import { slugify } from "../utils/helpers"

const BlogPostTemplate = ({ data, location }) => {
  const { previous, next } = data
  const post = data.markdownRemark
  const { dateTime, pubDate, description, tags, thumbnail } = post.frontmatter
  const original = post.frontmatter.thumbnail.childImageSharp.original
  const metadata = {
    url: location.pathname,
    title: post.frontmatter.title,
    desc: post.frontmatter.description,
    imgSrc: original.src,
    imgWidth: original.width,
    imgHeight: original.height,
  }
  console.log("data:")
  console.log(data)
  return (
    <Layout>
      <Seo postMeta={metadata} />
      <article
        className="blog-post container"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="article-header">
          <div className="thumb">
            {thumbnail && (
              <GatsbyImage
                image={thumbnail.childImageSharp.gatsbyImageData}
                alt="thumbnail"
                className="post-thumbnail"
              />
            )}
            <h1>{post.frontmatter.title}</h1>
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
          {description && <p className="description">{description}</p>}
        </header>

        <section
          className="article-post"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />

        <hr />

      </article>
        <Blurb />

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
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
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
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        dateTime: pubDate
        pubDate(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 150, height: 150, layout: CONSTRAINED)
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
        dateTime: pubDate
        pubDate(formatString: "MMMM DD, YYYY")
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        dateTime: pubDate
        pubDate(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
