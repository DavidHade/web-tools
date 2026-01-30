import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import JsonTool from "@/components/JsonTool.jsx";
import {Layout} from "@/components/Layout.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Layout>
          <JsonTool />
      </Layout>
  </React.StrictMode>,
)
