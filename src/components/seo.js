/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ postMeta }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            lang
            local
            title
            description
            siteUrl
            social {
              twitter
              facebook
            }
          }
        }
      }
    `
  )

  const pagePath = postMeta.path
    ? (`${site.siteMetadata.siteUrl}${postMeta.path}`)
    : (site.siteMetadata.siteUrl)

  const title = postMeta.title
    ? (`${postMeta.title} | ${site.siteMetadata.title}`)
    : (site.siteMetadata.title)

  const description = postMeta.desc
    ? (postMeta.desc)
    : (site.siteMetadata.description)

  const imgUrl = postMeta.imgSrc
    ? (`${site.siteMetadata.siteUrl}${postMeta.imgSrc}`)
    : (`${site.siteMetadata.siteUrl}/elel_thumbnail.jpg`)

  const imgWidth = postMeta.imgWidth
    ? (postMeta.imgWidth)
    : (1280)

  const imgHeight = postMeta.imgHeight
    ? (postMeta.imgHeight)
    : (640)

  return (
    <Helmet>
      <html lang={site.siteMetadata.lang} />
      <title>{title}</title>
      <link rel="canonical" href={pagePath} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={site.siteMetadata.locale} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pagePath} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={imgWidth} />
      <meta property="og:image:height" content={imgHeight} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.social.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        property="og:fb:app_id"
        content={site.siteMetadata.social.facebook}
      />
    </Helmet>
  )
}

// Seo.defaultProps = {
//   lang: `ja`,
//   meta: [],
//   description: ``,
// }

// Seo.propTypes = {
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   description: PropTypes.string,
//   title: PropTypes.string.isRequired,
// }

export default Seo
