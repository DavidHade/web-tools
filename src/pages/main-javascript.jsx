import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import JavaScriptTool from "@/components/JavaScriptTool.jsx";
import { Layout } from "@/components/Layout.jsx";
import { DarkModeProvider } from "@/contexts/DarkModeContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Layout>
        <JavaScriptTool />
      </Layout>
    </DarkModeProvider>
  </React.StrictMode>
)
