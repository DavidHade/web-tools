import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Layout } from '@/components/Layout'
import PdfTool from '@/components/PdfTool'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Layout>
          <PdfTool />
      </Layout>
  </React.StrictMode>,
)
