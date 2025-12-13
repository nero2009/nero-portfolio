require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Oghenero Adaware - Software Engineer | Full Stack Developer`,
    description: `Oghenero Adaware (finallynero) - Software Engineer specializing in TypeScript, React, Node.js, React Native, Python, and AI. Personal blog, portfolio, and technical articles about web development, mobile apps, and software engineering best practices.`,
    author: `Oghenero Adaware`,
    // Keep this consistent with your real, preferred domain (and make sure the other domain 301-redirects to it).
    siteUrl: `https://finallynero.dev`,
    // Used for OpenGraph/Twitter cards. Must be a real, publicly reachable path.
    // The manifest plugin generates these icons at /icons/* during build.
    image: `/icons/icon-512x512.png`,
    keywords: `Oghenero Adaware, finallynero, Software Engineer, Full Stack Developer, React Developer, Node.js Developer, TypeScript, React Native, Python Developer, WebRTC, AI Engineer, Frontend Developer, Backend Developer, Web Development, Mobile Development`,
    social: [
      { title: 'Github', link: 'https://github.com/nero2009', icon: 'github' },
      {
        title: 'Twitter',
        link: 'https://twitter.com/finallynero',
        icon: 'twitter',
      },
      {
        title: 'Linkedin',
        link: '',
        icon: 'linkedin',
      },
    ],
  },
  plugins: [

    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
        host: `https://finallynero.dev`,
        sitemap: `https://finallynero.dev/sitemap-index.xml`,
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: process.env.ANALYTICS_ID,
        head: false,
        anonymize: true,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
          {
            resolve: '@weknow/gatsby-remark-codepen',
            options: {
              theme: 'dark',
              height: 400,
            },
          },
          `@weknow/gatsby-remark-twitter`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://finallynero.dev`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'finallynero-portfolio',
        short_name: 'finallynero',
        start_url: '/',
        background_color: '#94B2C6',
        theme_color: '#94B2C6',
        display: 'minimal-ui',
        icon: 'src/images/logo-icon.svg',
      },
    },
    `gatsby-plugin-offline`,
  ],
}
