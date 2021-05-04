import React from "react"
import { Link } from "gatsby"
import { slugEditing, shortMonthNameDate } from "../utils/helpers"

const Cell = ({ node }) => {
  let pubDate = node.frontmatter.pubDate
  if (pubDate) {
    pubDate = shortMonthNameDate(pubDate)
  }
  const postSlug = slugEditing(`${node.fields.slug}`)

  return (
    <article className="post" key={node.id}>
      <div className="post-row">
        <Link className="post-link" to={`/blog${postSlug}`}>
          <h3>{node.frontmatter.title}</h3>
          <time dateTime={node.frontmatter.dateTime}>{pubDate}</time>
        </Link>
        <p
          className="paragraph"
          dangerouslySetInnerHTML={{
            __html: node.excerpt,
          }}
          itemProp="description"
        />
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
