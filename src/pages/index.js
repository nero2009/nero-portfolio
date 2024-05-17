import React from 'react'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <Hero />
  </Layout>
)

export const Head = () => (
  <SEO title="Home" description={'Home page of Nero Adaware website'} />
)

export default IndexPage
