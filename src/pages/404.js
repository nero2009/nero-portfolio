import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <div className="layout-container not-found">
      <p className="blog-page__text">404</p>
      <h1 className="not-found__title">page not found</h1>
      <p className="not-found__text">
        That route doesn&#39;t exist. Head{' '}
        <Link to="/" className="simple-link">
          home
        </Link>
        .
      </p>
    </div>
  </Layout>
)

export const Head = ({ location }) => (
  <Seo title="404: Not found | Oghenero Adaware" pathname={location?.pathname} />
)

export default NotFoundPage
