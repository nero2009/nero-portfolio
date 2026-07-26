/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const kebabCase = require('./src/utils/kebabCase')
const {
  generateSocialImages,
  IMAGE_DIRECTORY,
} = require('./lib/socialImages')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('./src/templates/blogPost.js')
  const tagTemplate = path.resolve('./src/templates/tag.js')

  const res = await graphql(`
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
  `)

  if (res.errors) {
    throw res.errors
  }

  const posts = res.data.allMarkdownRemark.edges
  const socialImages = await generateSocialImages({
    posts: posts.map(({ node }) => ({
      path: node.frontmatter.path,
      title: node.frontmatter.title,
    })),
    outputDirectory: path.resolve('public', IMAGE_DIRECTORY),
  }).catch(error => {
    reporter.panicOnBuild(`Could not generate social images: ${error.message}`, error)
  })

  reporter.info(
    `Generated ${posts.length} Blog social images and one Site social image.`
  )

  // Create blog post pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: postTemplate,
      context: {
        // Avoid reserved "path" in Gatsby page context (it already exists on the page object).
        slug: node.frontmatter.path,
        socialImagePath: socialImages.blogImagePaths.get(node.frontmatter.path),
      },
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
  tags = [...new Set(tags)]

  // Create page for each tag
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}
