export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    tags: post.node.frontmatter.tags,
    categories: post.node.frontmatter.categories,
    title: post.node.frontmatter.title,
    description: post.node.frontmatter.description,
    topic: post.node.frontmatter.topic,
    ...(options.thumbnails && {
      thumbnail: post.node.frontmatter.thumbnail.childImageSharp.fixed,
    }),
  }))
}

export function slugify(string) {
  return (
    string &&
    string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

export const slugEditing = (string) => {
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

export const shortMonthNameDate = (date) => {
  const dateArr = date.split(" ")
  dateArr[0] = `${dateArr[0].slice(0, 3)}.`
  const result = dateArr.join(" ")
  return result
}
