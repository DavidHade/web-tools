import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from '@/components/Layout'
import XmlTool from '@/components/XmlTool'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Layout>
          <XmlTool />
      </Layout>
  </React.StrictMode>,
)

