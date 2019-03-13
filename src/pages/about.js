import React from 'react'
import Layout from '../components/layout'
import Progress from '../../assets/progress.svg'

const about = () => {
  return (
    <Layout>
      <div className="layout-container" style={{ textAlign: 'center' }}>
        <div>
          <Progress style={{ width: '70%' }} />
        </div>
        <p style={{ marginTop: -30, fontSize: 20, color: '#3f3d56' }}>
          Work in progress
        </p>
      </div>
    </Layout>
  )
}

export default about
