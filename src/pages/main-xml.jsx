import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from '@/components/Layout'
import XmlTool from '@/components/XmlTool'
import { DarkModeProvider } from '@/contexts/DarkModeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Layout>
        <XmlTool />
      </Layout>
    </DarkModeProvider>
  </React.StrictMode>,
)

