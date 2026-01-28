import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import JsonPage from './pages/JsonPage'
import Base64Page from './pages/Base64Page'
import JavaScriptPage from './pages/JavaScriptPage'
import CssPage from './pages/CssPage'
import JwtPage from './pages/JwtPage'

// Handle GitHub Pages 404 redirect
if (window.location.pathname.endsWith('/index.html')) {
  const queryParams = new URLSearchParams(window.location.search)
  const redirectPath = queryParams.get('p')
  if (redirectPath) {
    window.history.replaceState(null, '', '/web-tools' + redirectPath)
  }
}

function App() {
  return (
    <BrowserRouter basename="/web-tools/">
      <Routes>
        <Route path="/" element={<Navigate to="/json" replace />} />
        <Route path="/json" element={<JsonPage />} />
        <Route path="/base64" element={<Base64Page />} />
        <Route path="/javascript" element={<JavaScriptPage />} />
        <Route path="/css" element={<CssPage />} />
        <Route path="/jwt" element={<JwtPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
