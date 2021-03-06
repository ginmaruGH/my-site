const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// ============================================================================
// Post-page, Tags, Tags-page
// ============================================================================
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagPosts = path.resolve(`./src/templates/tag-posts.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___pubDate], order: ASC }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
        tagsGroup: group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts!!!`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // --------------------------------------------------------------------------
  // Post-page
  // --------------------------------------------------------------------------

  if (posts.length > 0) {
    posts.forEach((post, i) => {
      const previousPostId = i === 0 ? null : posts[i - 1].id
      const nextPostId = i === posts.length - 1 ? null : posts[i + 1].id

      createPage({
        path: `/blog${slugEditing(post.fields.slug)}`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // --------------------------------------------------------------------------------------
  // Tags-page
  // --------------------------------------------------------------------------------------

  const tags = result.data.allMarkdownRemark.tagsGroup

  tags.forEach(tag => {
    createPage({
      path: `/tags/${slugify(tag.fieldValue)}/`,
      component: tagPosts,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
} //end exports.onCreateNode

// ============================================================================
// Slugs
// ============================================================================

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}

// Helpers
function slugify(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

const slugEditing = (string) => {
  const textArr = string.split("/")
  const index = textArr.length
  let result
  if (index > 3) {
    result = `/${textArr[index - 2]}/`
  } else {
    result = string
  }

  return result
}




