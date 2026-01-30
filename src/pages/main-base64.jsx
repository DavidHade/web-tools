import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Base64Tool from "@/components/Base64Tool.jsx";
import {Layout} from "@/components/Layout.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Layout>
          <Base64Tool />
      </Layout>
  </React.StrictMode>,
)
