import React, { Component, useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Share from '../components/share'
import Layout from '../components/layout'
import Back from '../images/back-arrow.svg'
import SEO from '../components/seo'
import FloatingShare from '../components/floatingshare'
import Me from '../images/chiefThatsit.png'

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
      <SEO title={blog.frontmatter.title} description={blog.frontmatter.description} />

      <div className="layout-container">
        <header>
          <Link to="/blogs/" className="article-back-button">
            <img src={Back} alt="back button" className="article-back-button__text" />
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
        <article className="article" dangerouslySetInnerHTML={{ __html: blog.html }} />
        <FloatingShare
          show={showShare}
          title={blog.frontmatter.title}
          url={`${data.site.siteMetadata.siteUrl}${blog.frontmatter.path}`}
        />
        <div className="divider" />
        <footer className="article__footer">
          <img src={Me} alt="chiefThatsit" />
          <p>
            Personal Blog of{' '}
            <a href="https://twitter.com/finallynero" target="__blank" rel="noopener">
              Nero Adaware
            </a>
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Template


export const articleQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date
        description
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
