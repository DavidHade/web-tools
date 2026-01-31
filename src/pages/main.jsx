import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Layout } from "@/components/Layout.jsx";
import { DarkModeProvider, useDarkMode } from "@/contexts/DarkModeContext.jsx"
import { Binary, Braces, FileCode, Key, Palette, Code2, QrCode, FileText } from "lucide-react";
import { Tool } from "@/components/ui/tool.jsx";

const tools = [
    {
        path: '/json.html',
        label: 'JSON Formatter',
        description: 'Format, minify, and validate JSON data',
        icon: Braces,
        longDescription: 'Format, minify, and beautify JSON with syntax validation. Perfect for developers working with APIs and data.',
    },
    {
        path: '/base64.html',
        label: 'Base64 Encoder/Decoder',
        description: 'Encode and decode Base64 strings',
        icon: Binary,
        longDescription: 'Encode text and data to Base64 or decode Base64 strings back to readable format.',
    },
    {
        path: '/javascript.html',
        label: 'JavaScript Minifier',
        description: 'Minify, beautify, and validate JavaScript',
        icon: FileCode,
        longDescription: 'Minify JavaScript to reduce file size and improve performance. Beautify and validate code.',
    },
    {
        path: '/css.html',
        label: 'CSS Minifier',
        description: 'Minify, beautify, and validate CSS',
        icon: Palette,
        longDescription: 'Minify CSS stylesheets to optimize website performance and reduce bandwidth usage.',
    },
    {
        path: '/xml.html',
        label: 'XML Converter',
        description: 'Format & validate XML, convert to JSON',
        icon: Code2,
        longDescription: 'Convert XML to JSON, format, and validate XML syntax. Perfect for working with data interchange formats.',
    },
    {
        path: '/qr.html',
        label: 'QR Code Generator',
        description: 'Generate QR codes from text or URLs',
        icon: QrCode,
        longDescription: 'Create QR codes from any text or URL, download as PNG images, and easily share encoded data.',
    },
    {
        path: '/pdf.html',
        label: 'PDF Tools',
        description: 'Merge, split, convert PDFs to .docx or images',
        icon: FileText,
        longDescription: 'Merge multiple PDFs, split into multiple pages, and convert PDF to .docx or images.',
    },
    {
        path: '/jwt.html',
        label: 'JWT Debugger',
        description: 'Decode and verify JWT tokens',
        icon: Key,
        longDescription: 'Decode and verify JSON Web Tokens with support for multiple hashing algorithms.',
    },
]

function MainContent() {
  const { isDarkMode } = useDarkMode()
  
  return (
    <Layout navigation={null}>
      <main className="container mx-auto px-4 py-12 flex-1">
        <article className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Web Developer Tools
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Free online tools for developers. Format JSON, encode/decode Base64, minify CSS & JavaScript, debug JWT tokens, and more.
            </p>
          </section>

          {/* Tools Grid */}
          <section className="space-y-6">
            <h2 className={`text-2xl font-bold sr-only ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Available Tools</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((toolInfo) => (
                <Tool key={toolInfo.path} toolInfo={toolInfo} />
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className={`space-y-6 pt-8 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Why Use Web Tools?</h2>
            <ul className="grid gap-4 md:grid-cols-3">
              <li className="flex gap-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>✓</span>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Free & Fast</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>No installation required. Use online instantly.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>✓</span>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Secure</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Your data stays on your device. No server uploads.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>✓</span>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Developer Friendly</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Built by developers for developers.</p>
                </div>
              </li>
            </ul>
          </section>
        </article>
      </main>
    </Layout>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <MainContent />
    </DarkModeProvider>
  </React.StrictMode>
)
