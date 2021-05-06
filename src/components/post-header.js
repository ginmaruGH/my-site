import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload, faEdit } from "@fortawesome/free-solid-svg-icons"

import { slugify } from "../utils/helpers"

const PostHeader = ({ data }) => {
  const {
    published,
    pubDate,
    modified,
    modDate,
    title,
    description,
    tags,
    thumbnail,
  } = data.markdownRemark.frontmatter
  const pubTime = new Date(published).getTime()
  const modTime = new Date(modified).getTime()
  const modDateShow = (pubTime < modTime) ? true : false

  return (
    <header className="article-header">
      <div className="thumb">
        {thumbnail && (
          <GatsbyImage
            image={thumbnail.childImageSharp.gatsbyImageData}
            alt="thumbnail"
            className="post-thumbnail"
          />
        )}
        <h1 className="post-title">{title}</h1>
        <div className="published-modified">
          <time className="published" dateTime={published}>
            <FontAwesomeIcon icon={faUpload} className="icon" />
            {pubDate}
          </time>
          {modDateShow && (
            <time className="modified" dateTime={modified}>
              <FontAwesomeIcon icon={faEdit} className="icon" />
              {modDate}
            </time>
          )}
        </div>
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

      {description &&
        <p className="description">{description}</p>
      }
    </header>
  )
}

export default PostHeader
