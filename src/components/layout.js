import * as React from "react"
import HeaderNav from "./HeaderNav"
import Footer from "./Footer"

import "@fontsource/dm-mono"
import "@fontsource/dm-mono/500.css"
import "@fontsource/dm-sans"
import "@fontsource/dm-sans/700.css"
import "@fontsource/m-plus-rounded-1c"
import "@fontsource/m-plus-rounded-1c/700.css"
import "../styles/normalize.css"
import "../styles/style.css"
import "../styles/new-moon.css"

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
