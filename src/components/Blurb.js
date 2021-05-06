import * as React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  // const data = useStaticQuery(graphql`
  //   query BioQuery {
  //     site {
  //       siteMetadata {
  //         author {
  //           name
  //           summary
  //         }
  //         social {
  //           twitter
  //         }
  //       }
  //     }
  //   }
  // `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const authorSummary = `I'm unused to  PC and Web, learning now!`

  return (
    <section className="blurb">
      <div className="container">
        <figure>
          <StaticImage
            className="blurb-avatar"
            layout="constrained"
            formats={["AUTO", "WEBP", "AVIF"]}
            src="../../static/gorilla.jpg"
            maxwidth={100}
            maxheight={100}
            quality={95}
            alt="Profile picture"
          />
        </figure>
        <div className="blurb-text">
          <p>
            Written by <span>Ginmaru.</span> {` `}
            <a href={`https://twitter.com/@gin_maru_`}>Twitter</a>
            <br />
            {authorSummary}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Bio
