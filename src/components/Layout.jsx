import { Braces, Binary, FileCode, Palette, Key, Wrench, Moon, Sun } from 'lucide-react'
import { Navigation } from "@/components/Navigation.jsx"
import { useDarkMode } from "@/contexts/DarkModeContext.jsx"

export function Layout({ children, navigation = <Navigation/> }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full border-b ${isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Web Tools</span>
            </a>
            
            <div className="flex items-center gap-4">
              {/* Navigation Tabs */}
              {navigation}
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                    : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container mx-auto px-4 py-8 flex-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className={`border-t ${isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-4 py-4">
          <p className={`text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Web Tools © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
