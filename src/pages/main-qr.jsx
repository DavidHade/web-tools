import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from '@/components/Layout'
import QrTool from '@/components/QrTool'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Layout>
          <QrTool />
      </Layout>
  </React.StrictMode>,
)
