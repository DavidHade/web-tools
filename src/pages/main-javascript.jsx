import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import JavaScriptTool from "@/components/JavaScriptTool.jsx";
import {Layout} from "@/components/Layout.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Layout>
          <JavaScriptTool />
      </Layout>
  </React.StrictMode>
)
