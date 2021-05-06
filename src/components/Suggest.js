import React from "react"
import { Link } from "gatsby"
import { slugEditing, shortMonthNameDate } from "../utils/helpers"

const Suggested = ({ previous, next }) => {

  let prevSlug
  let nextSlug
  let prevDateTime
  let nextDateTime
  let prevDate
  let nextDate

  if (previous) {
    prevSlug = slugEditing(previous.fields.slug)
    prevDateTime = previous.frontmatter.published
    prevDate = shortMonthNameDate(previous.frontmatter.pubDate)
  }
  if (next) {
    nextSlug = slugEditing(next.fields.slug)
    nextDateTime = next.frontmatter.published
    nextDate = shortMonthNameDate(next.frontmatter.pubDate)
  }

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
