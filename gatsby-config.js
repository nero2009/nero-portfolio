require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Oghenero Adaware - Software Engineer`,
    description: `Personal blog and portfolio of Oghenero Adaware. Articles about software engineering, web development, and technical insights.`,
    author: `Oghenero Adaware`,
    siteUrl: `https://www.finallynero.dev`,
    image: `/images/logo-icon.svg`,
    social: [
      { title: 'Github', link: 'https://github.com/nero2009', icon: 'github' },
      {
        title: 'Twitter',
        link: 'https://twitter.com/finallynero',
        icon: 'twitter',
      },
      {
        title: 'Linkedin',
        link: 'https://www.linkedin.com/in/adaware-oghenero-529200ba/',
        icon: 'linkedin',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
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
        siteUrl: `https://www.finallynero.dev`,
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
        logo: 'src/images/logo-icon.svg',
        icon: 'src/images/logo-icon.svg',
      },
    },
    `gatsby-plugin-offline`,
  ],
}
