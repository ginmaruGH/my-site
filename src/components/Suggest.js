import React from "react"
import { Link } from "gatsby"
import { slugEditing, shortMonthNameDate } from "../utils/helpers"

const Suggested = ({ previous, next }) => {

  const prevSlug = previous
    ? slugEditing(previous.fields.slug)
    : null
  const prevDateTime = previous
    ? previous.frontmatter.published
    : null
  const prevDate = previous
    ? shortMonthNameDate(previous.frontmatter.pubDate)
    : null

  const nextSlug = next
    ? slugEditing(next.fields.slug)
    : null
  const nextDateTime = next
    ? next.frontmatter.published
    : null
  const nextDate = next
    ? shortMonthNameDate(next.frontmatter.pubDate)
    : null

  return (
    <nav className="blog-post-nav container">
      <ul className="suggest">
        <li className="suggest-prev suggest-item">
          {previous && (
            <Link to={`/blog${prevSlug}`} rel="prev">
              <div className="arrow-sign">&laquo;</div>
              <time dateTime={prevDateTime}>
                {prevDate}
              </time>
              <p>{previous.frontmatter.title}</p>
            </Link>
          )}
        </li>
        <li className="suggest-next suggest-item">
          {next && (
            <Link to={`/blog${nextSlug}`} rel="next">
              <p>{next.frontmatter.title}</p>
              <time dateTime={nextDateTime}>
                {nextDate}
              </time>
              <div className="arrow-sign">&raquo;</div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Suggested
