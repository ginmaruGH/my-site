import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as Styles from "./styles/HeaderNav.module.css"

const Header = () => {
  return (
    <header className={Styles.container}>
      <div className="logo">
        <Link to={`/`}>
          <StaticImage
            layout="fixed"
            formats={["AUTO", "WEBP", "AVIF"]}
            src="../../static/elel_logo_250x60.jpg"
            width={250}
            height={60}
            quality={95}
            alt="Elementary Elementary"
          />
        </Link>
      </div>
      <nav className={Styles.nav}>
        <ul>
          <li>
            <Link to={`/blog/`}>BLOG</Link>
          </li>
          <li>
            <Link to={`/about/`}>ABOUT</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
