import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="container">
        <div className="copy">
          &copy; 2021
          {` `}
          <Link to={"/"}>elel-jp.com</Link>,
          Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
