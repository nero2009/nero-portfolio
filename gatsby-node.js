/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const _ = require('lodash')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('./src/templates/blogPost.js')
  const tagTemplate = path.resolve('./src/templates/tag.js')

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              date
              author
              tags
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    const posts = res.data.allMarkdownRemark.edges

    // Create blog post pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {
          // Avoid reserved "path" in Gatsby page context (it already exists on the page object).
          slug: node.frontmatter.path,
        }
      })
    })

    // Create tag pages
    let tags = []
    posts.forEach(({ node }) => {
      if (node.frontmatter.tags) {
        tags = tags.concat(node.frontmatter.tags)
      }
    })

    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Create page for each tag
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
  })
}
