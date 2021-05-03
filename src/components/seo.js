/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ postPath, postMeta }) => {
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

  let url
  let title
  let description
  let imgUrl
  let imgWidth
  let imgHeight

  if (postMeta.url) {
    url = `${site.siteMetadata.siteUrl}${postMeta.url}`
  } else {
    url = site.siteMetadata.siteUrl
  }

  if (postMeta.title) {
    title = `${postMeta.title} | ${site.siteMetadata.title}`
  } else {
    title = site.siteMetadata.title
  }

  if (postMeta.desc) {
    description = postMeta.desc
  } else {
    description = site.siteMetadata.description
  }

  if (postMeta.imgSrc) {
    imgUrl = `${site.siteMetadata.siteUrl}${postMeta.src}`
  } else {
    imgUrl = `${site.siteMetadata.siteUrl}/elel_thumbnail.jpg`
  }

  if (postMeta.imgWidth) {
    imgWidth = postMeta.imgWidth
  } else {
    imgWidth = 1280
  }

  if (postMeta.imgHeight) {
    imgHeight = postMeta.imgHeight
  } else {
    imgHeight = 640
  }

  return (
    <Helmet>
      <html lang={site.siteMetadata.lang} />
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={site.siteMetadata.locale} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
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

Seo.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default Seo
