import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Base64Tool from "@/components/Base64Tool.jsx";
import { Layout } from "@/components/Layout.jsx";
import { DarkModeProvider } from "@/contexts/DarkModeContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Layout>
        <Base64Tool />
      </Layout>
    </DarkModeProvider>
  </React.StrictMode>,
)
