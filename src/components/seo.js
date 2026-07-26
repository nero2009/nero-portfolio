import React from 'react'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const toAbsoluteUrl = (siteUrl, value) => {
  if (!value) return undefined
  return /^https?:\/\//.test(value) ? value : `${siteUrl}${value}`
}

const Seo = ({
  title,
  description,
  pathname,
  author,
  image,
  imageAlt,
  type = 'website',
  children,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    image: defaultImage,
    personImage,
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    author: author || 'Oghenero Adaware',
    image: toAbsoluteUrl(siteUrl, image || defaultImage),
    imageAlt:
      imageAlt || 'finallynero.dev — Oghenero Adaware, Software Engineer',
  }
  const personImageUrl = toAbsoluteUrl(siteUrl, personImage)

  const schemaOrgJSONLD = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: defaultTitle,
      description: defaultDescription,
      inLanguage: 'en',
      author: { '@id': `${siteUrl}/#person` },
      publisher: { '@id': `${siteUrl}/#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Oghenero Adaware',
      alternateName: ['finallynero', 'Nero Adaware'],
      givenName: 'Oghenero',
      familyName: 'Adaware',
      url: siteUrl,
      image: personImageUrl,
      sameAs: [
        'https://www.linkedin.com/in/finallynero/',
        'https://github.com/nero2009',
        'https://twitter.com/finallynero',
        'https://finallynero.dev',
      ],
      jobTitle: 'Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Software Engineering',
      },
      knowsAbout: [
        'TypeScript',
        'Node.js',
        'React',
        'React Native',
        'Python',
        'WebRTC',
        'Artificial Intelligence',
        'Web Development',
        'Mobile Development',
        'Software Engineering',
        'Golang',
        'Full Stack Development',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Software Engineer',
        occupationLocation: {
          '@type': 'Country',
          name: 'Nigeria',
        },
        skills: 'TypeScript, React, Node.js, Python, React Native, WebRTC, AI',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': seo.url,
      url: seo.url,
      name: seo.title,
      description: seo.description,
      inLanguage: 'en',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#person` },
      mainEntity: { '@id': `${siteUrl}/#person` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
        ],
      },
    },
  ]

  return (
    <>
      <title>{seo.title}</title>
      <link rel="canonical" href={seo.url} />
      <link rel="author" href="/humans.txt" />
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={type} />
      {seo.image ? (
        <>
          <meta property="og:image" content={seo.image} />
          <meta property="og:image:secure_url" content={seo.image} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={seo.imageAlt} />
        </>
      ) : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image ? (
        <>
          <meta name="twitter:image" content={seo.image} />
          <meta name="twitter:image:alt" content={seo.imageAlt} />
        </>
      ) : null}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      {children}
    </>
  )
}

export default Seo
