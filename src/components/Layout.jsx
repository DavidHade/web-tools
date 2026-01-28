import { Braces, Binary, FileCode, Palette, Key, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { path: '/web-tools/json.html', label: 'JSON', icon: Braces },
  { path: '/web-tools/base64.html', label: 'Base64', icon: Binary },
  { path: '/web-tools/javascript.html', label: 'JavaScript', icon: FileCode },
  { path: '/web-tools/css.html', label: 'CSS', icon: Palette },
  { path: '/web-tools/jwt.html', label: 'JWT', icon: Key },
]

function isCurrentPage(path) {
  return window.location.pathname === path
}

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="/web-tools/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Web Tools</span>
            </a>
            
            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                const isActive = isCurrentPage(tab.path)
                return (
                  <a
                    key={tab.path}
                    href={tab.path}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-slate-500">
            Web Tools © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
