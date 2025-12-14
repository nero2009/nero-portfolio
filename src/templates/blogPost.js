import React, { Component, useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Share from '../components/share'
import Layout from '../components/layout'
import Back from '../images/back-arrow.svg'
import SEO from '../components/seo'
import FloatingShare from '../components/floatingshare'
import Me from '../images/chiefThatsit.png'

const _ = require('lodash')

const Template = ({ data }) => {
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const body = document.documentElement;
    const article = document.getElementsByClassName('article')[0];
    const contentY = article.offsetTop;
    const height = article.clientHeight;

    const scrollListenerShare = () => {
      const y = body.scrollTop - contentY + 110;
      const show = y >= 0 && y <= height - 340;
      if (showShare !== show) {
        setShowShare(show);
      }
    };

    window.addEventListener('scroll', scrollListenerShare);
    return () => {
      window.removeEventListener('scroll', scrollListenerShare);
    };
  }, [showShare]);

  const blog = data.markdownRemark;
  const date = new Date(blog.frontmatter.date);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <Layout>
      <div className="layout-container">
        <header>
          <Link to="/" className="article-back-button">
            <img src={Back} alt="back button" width={20} height={20}/>
            Back to articles
          </Link>
          <h1 className="article__title">{blog.frontmatter.title}</h1>
        </header>

        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h4 className="article__author">Written by {blog.frontmatter.author}</h4>
            <h4 className="article__date">{date.toLocaleDateString('en-US', options)}</h4>
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
                to={`/tags/${_.kebabCase(tag)}/`}
                className="article__tag"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <article className="article" dangerouslySetInnerHTML={{ __html: blog.html }} />
        <FloatingShare
          show={showShare}
          title={blog.frontmatter.title}
          url={`${data.site.siteMetadata.siteUrl}${blog.frontmatter.path}`}
        />
        <div className="divider" />
        <footer className="article__footer">
          <p>
            Personal Blog of{' '}
            <a href="https://twitter.com/finallynero" target="__blank" rel="noopener">
              Oghenero Adaware
            </a>
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Template

export const Head = ({ data, location }) => {
  const blog = data?.markdownRemark
  const siteUrl = data?.site?.siteMetadata?.siteUrl || 'https://finallynero.dev'
  const articleUrl = `${siteUrl}${blog?.frontmatter?.path || location?.pathname || ''}`
  
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
      <SEO
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
