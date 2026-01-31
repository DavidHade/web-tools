import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CssTool from "@/components/CssTool.jsx";
import { Layout } from "@/components/Layout.jsx";
import { DarkModeProvider } from "@/contexts/DarkModeContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Layout>
        <CssTool />
      </Layout>
    </DarkModeProvider>
  </React.StrictMode>,
)
