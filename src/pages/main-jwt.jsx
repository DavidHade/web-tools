import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import JwtTool from "@/components/JwtTool.jsx";
import {Layout} from "@/components/Layout.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Layout>
          <JwtTool />
      </Layout>
  </React.StrictMode>,
)
