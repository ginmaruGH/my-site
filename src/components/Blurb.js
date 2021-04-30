import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as Styles from "./styles/Blurb.module.css"

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

  return (
    <div className={Styles.container}>
      <section className={Styles.bio}>
        <StaticImage
          className={Styles.avatar}
          layout="fixed"
          formats={["AUTO", "WEBP", "AVIF"]}
          src="../../static/gorilla.jpg"
          width={60}
          height={60}
          quality={95}
          alt="Profile picture"
        />

        {author?.name && (
          <div>
            <p>
              Written by <span>{author.name}</span>. {` `}
              <a href={`https://twitter.com/${social?.twitter || ``}`}>
                Twitter
              </a>
            </p>
            <p>{author?.summary || null}</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Bio
