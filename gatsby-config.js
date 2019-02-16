module.exports = {
  siteMetadata: {
    title: `Finallynero Portfolio`,
    description: `Open source`,
    author: `@finallynero`,
    social: [
      { title: 'Github', link: 'https://github.com/nero2009',  icon: 'github' },
      { title: 'Twitter', link: 'https://twitter.com/finallynero',  icon: 'twitter' },
      { title: 'Linkedin', link: 'https://linkedin.com/in/dantehemerson',  icon: 'linkedin' },
      // { title: 'Dev', link: 'https://dev.to/dantehemerson',  icon: 'dev' },
   ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
          rule: {
            include: /assets/
          }
      }
  },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
