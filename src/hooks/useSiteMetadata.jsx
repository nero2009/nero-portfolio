import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          image
          social {
            title
            link
            icon
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}