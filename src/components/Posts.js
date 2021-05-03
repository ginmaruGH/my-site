import React from "react"
import { Link } from "gatsby"

const Cell = ({ node }) => {
  let pubDate = node.frontmatter.pubDate
  if (pubDate) {
    const dateArr = node.frontmatter.pubDate.split(" ")
    dateArr[0] = `${dateArr[0].slice(0, 3)}.`
    pubDate = dateArr.join(" ")
  }

  return (
    <article className="post" key={node.id}>
      <div className="post-row">
        <Link className="post-link" to={node.fields.slug}>
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
