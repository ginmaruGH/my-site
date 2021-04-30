import * as React from "react"
import { Link } from "gatsby"
import HeaderNav from "./HeaderNav"
import Footer from "./Footer"

import "@fontsource/m-plus-rounded-1c"
import "@fontsource/m-plus-rounded-1c/500.css" // Weight 500.
import "@fontsource/m-plus-rounded-1c/700.css" // Weight 500.
import "@fontsource/dm-mono"
import "@fontsource/dm-mono/500.css"
import "@fontsource/dm-sans"
import "@fontsource/dm-sans/500.css"
import "./styles/normalize.css"
import "./styles/style.css"
import "prismjs/themes/prism.css"

const Layout = ({ children }) => {

  return (
    <>
      <HeaderNav />

      <main>{children}</main>

      <Footer />
    </>
  )
}

export default Layout
