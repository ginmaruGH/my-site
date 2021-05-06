import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ location }) => {
  const metadata = {
    pagePath: location.pathname,
    pageTitle: "ごめんなさい。ページが見つかりません。",
    pageDesc: "Page-404: Not Found",
  }

  return (
    <Layout className="page-404">
      <Seo postMeta={metadata} />
      <h1 style={{ padding: "5vh 0", textAlign: "center" }}>
        404: Not Found
      </h1>
      <h4 style={{ paddingBottom: "10vh", textAlign: "center" }}>
        You just hit a route that doesn&#39;t exist... the sadness.
        <br />
        <br />
        お探しのページは見つかりませんでした。
      </h4>
      <p></p>
    </Layout>
  )
}

export default NotFoundPage

