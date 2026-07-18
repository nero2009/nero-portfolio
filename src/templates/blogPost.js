import React, {  useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Share from '../components/share'
import Layout from '../components/layout'
import Seo from '../components/seo'
import FloatingShare from '../components/floatingshare'
import kebabCase from '../utils/kebabCase'

const BackArrow = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 -6.5 36 36"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          transform="translate(-342.000000, -159.000000)"
          fill="#252528"
          fill-rule="nonzero"
        >
          <g id="square-filled" transform="translate(50.000000, 120.000000)">
            <path
              d="M317.108012,39.2902857 L327.649804,49.7417043 L327.708994,49.7959169 C327.889141,49.9745543 327.986143,50.2044182 328,50.4382227 L328,50.5617773 C327.986143,50.7955818 327.889141,51.0254457 327.708994,51.2040831 L327.6571,51.2479803 L317.108012,61.7097143 C316.717694,62.0967619 316.084865,62.0967619 315.694547,61.7097143 C315.30423,61.3226668 315.30423,60.6951387 315.694547,60.3080911 L324.702666,51.3738496 L292.99947,51.3746291 C292.447478,51.3746291 292,50.9308997 292,50.3835318 C292,49.8361639 292.447478,49.3924345 292.99947,49.3924345 L324.46779,49.3916551 L315.694547,40.6919089 C315.30423,40.3048613 315.30423,39.6773332 315.694547,39.2902857 C316.084865,38.9032381 316.717694,38.9032381 317.108012,39.2902857 Z M327.115357,50.382693 L316.401279,61.0089027 L327.002151,50.5002046 L327.002252,50.4963719 L326.943142,50.442585 L326.882737,50.382693 L327.115357,50.382693 Z"
              id="left-arrow"
              transform="translate(310.000000, 50.500000) scale(-1, 1) translate(-310.000000, -50.500000) "
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

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
          <Link to="/" className="article-back-button">
            <BackArrow />
          </Link>
          <h1 className="article__title">{blog.frontmatter.title}</h1>
        </header>

        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h4 className="article__author">
              Written by {blog.frontmatter.author}
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
            <span className="article__tags-label">Tags:</span>
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

export const Head = ({ data, location }) => {
  const blog = data?.markdownRemark
  const siteUrl = data?.site?.siteMetadata?.siteUrl || 'https://finallynero.dev'
  const articleUrl = `${siteUrl}${blog?.frontmatter?.path ||
    location?.pathname ||
    ''}`

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
