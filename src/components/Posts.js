import React from "react"
import { Link } from "gatsby"
import { slugEditing, shortMonthNameDate } from "../utils/helpers"

const Cell = ({ node }) => {

  const pubDate = node.frontmatter.pubDate
    ? shortMonthNameDate(node.frontmatter.pubDate)
    : null

  const postSlug = slugEditing(`${node.fields.slug}`)
  return (
    <article className="post" key={node.id}>
      <div className="post-row">
        <Link className="post-link" to={`/blog${postSlug}`}>
          <h3>{node.frontmatter.title}</h3>
          <time dateTime={node.frontmatter.published}>{pubDate}</time>
        </Link>
        {node.excerpt && (
          <p
            className="paragraph"
            itemProp="description"
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description,
            }}
          />
        )}
      </div>
    </article>
  )
}

const Posts = ({ data }) => {
  return (
    <div className="posts">
      {data.map(node => (
        <Cell key={node.id} node={node} />
      ))}
    </div>
  )
}

export default Posts
