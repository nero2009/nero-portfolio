import React, {  useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Share from '../components/share'
import Layout from '../components/layout'
import Seo from '../components/seo'
import FloatingShare from '../components/floatingshare'
import BackArrow from '../components/backArrow'
import kebabCase from '../utils/kebabCase'

const Template = ({ data }) => {
  const [showShare, setShowShare] = useState(false)

  useEffect(() => {
    const body = document.documentElement
    const article = document.getElementsByClassName('article')[0]
    const contentY = article.offsetTop
    const height = article.clientHeight

    const scrollListenerShare = () => {
      const y = body.scrollTop - contentY + 110
      const show = y >= 0 && y <= height - 340
      if (showShare !== show) {
        setShowShare(show)
      }
    }

    window.addEventListener('scroll', scrollListenerShare)
    return () => {
      window.removeEventListener('scroll', scrollListenerShare)
    }
  }, [showShare])

  const blog = data.markdownRemark
  const date = new Date(blog.frontmatter.date)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return (
    <Layout>
      <div className="layout-container">
        <header>
          <Link to="/" className="article-back-button" aria-label="Back to home">
            <BackArrow />
          </Link>
          <h1 className="article__title">{blog.frontmatter.title}</h1>
        </header>

        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h4 className="article__author">
              {blog.frontmatter.author}
            </h4>
            <h4 className="article__date">
              {date.toLocaleDateString('en-US', options)}
            </h4>
          </div>
          <div>
            <Share
              title={blog.frontmatter.title}
              url={`${data.site.siteMetadata.siteUrl}${blog.frontmatter.path}`}
            />
          </div>
        </div>
        {blog.frontmatter.tags && blog.frontmatter.tags.length > 0 && (
          <div className="article__tags">
            {blog.frontmatter.tags.map(tag => (
              <Link
                key={tag}
                to={`/tags/${kebabCase(tag)}/`}
                className="article__tag"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <article
          className="article"
          dangerouslySetInnerHTML={{ __html: blog.html }}
        />
        <FloatingShare
          show={showShare}
          title={blog.frontmatter.title}
          url={`${data.site.siteMetadata.siteUrl}${blog.frontmatter.path}`}
        />
        <div className="divider" />
        <footer className="article__footer">
          <p>
            Personal Blog of{' '}
            <a
              href="https://www.linkedin.com/in/adaware-oghenero/"
              target="__blank"
              rel="noopener"
            >
              Oghenero Adaware
            </a>
          </p>
        </footer>
      </div>
    </Layout>
  )
}

export default Template

export const Head = ({ data, location, pageContext }) => {
  const blog = data?.markdownRemark
  const siteUrl = data?.site?.siteMetadata?.siteUrl || 'https://finallynero.dev'
  const articleUrl = `${siteUrl}${blog?.frontmatter?.path ||
    location?.pathname ||
    ''}`
  const socialImageUrl = pageContext?.socialImagePath
    ? `${siteUrl}${pageContext.socialImagePath}`
    : undefined

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog?.frontmatter?.title,
    description: blog?.frontmatter?.description,
    author: {
      '@type': 'Person',
      name: 'Oghenero Adaware',
      url: siteUrl,
      sameAs: [
        'https://www.linkedin.com/in/adaware-oghenero-529200ba/',
        'https://github.com/nero2009',
        'https://twitter.com/finallynero',
      ],
    },
    datePublished: blog?.frontmatter?.date,
    dateModified: blog?.frontmatter?.date,
    image: socialImageUrl
      ? {
          '@type': 'ImageObject',
          url: socialImageUrl,
          width: 1200,
          height: 630,
        }
      : undefined,
    publisher: {
      '@type': 'Person',
      name: 'Oghenero Adaware',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    url: articleUrl,
    inLanguage: 'en',
  }

  return (
    <>
      <Seo
        title={`${blog?.frontmatter?.title || 'Article'} | Oghenero Adaware`}
        description={blog?.frontmatter?.description}
        author="Oghenero Adaware"
        pathname={location?.pathname}
        image={pageContext?.socialImagePath}
        imageAlt={blog?.frontmatter?.title}
        type="article"
      />
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </>
  )
}

export const articleQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        path
        title
        author
        date
        description
        tags
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
