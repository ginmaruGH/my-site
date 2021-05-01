import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const blurbText = ` Written by <span>${author.name}.</span>`

  return (
    <section className="blurb">
      <div className="container">
        <figure>
          <StaticImage
            className="blurb-avatar"
            layout="constrained"
            formats={["AUTO", "WEBP", "AVIF"]}
            src="../../static/gorilla.jpg"
            maxWidth={100}
            maxHeight={100}
            quality={95}
            alt="Profile picture"
          />
        </figure>

        {author?.name && (
          <div className="blurb-text">
            <p>
              Written by <span>{author.name}.</span> {` `}
              <a href={`https://twitter.com/${social?.twitter || ``}`}>
                Twitter
              </a>
              <br />
            {author?.summary || null}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Bio
