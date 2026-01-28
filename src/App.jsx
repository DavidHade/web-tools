import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { Braces, Binary, FileCode, Palette, Key, Wrench } from 'lucide-react'
import JsonTool from './components/JsonTool'
import Base64Tool from './components/Base64Tool'
import JavaScriptTool from './components/JavaScriptTool'
import CssTool from './components/CssTool'
import JwtTool from './components/JwtTool'
import { cn } from '@/lib/utils'

const tabs = [
  { path: '/json', label: 'JSON', icon: Braces, component: JsonTool },
  { path: '/base64', label: 'Base64', icon: Binary, component: Base64Tool },
  { path: '/javascript', label: 'JavaScript', icon: FileCode, component: JavaScriptTool },
  { path: '/css', label: 'CSS', icon: Palette, component: CssTool },
  { path: '/jwt', label: 'JWT', icon: Key, component: JwtTool },
]

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Wrench className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">Web Tools</span>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="flex items-center gap-1">
                {tabs.map(tab => (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )
                    }
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/json" replace />} />
            {tabs.map(tab => (
              <Route key={tab.path} path={tab.path} element={<tab.component />} />
            ))}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4">
            <p className="text-center text-sm text-slate-500">
              Built with React • All processing happens in your browser
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

export default App
