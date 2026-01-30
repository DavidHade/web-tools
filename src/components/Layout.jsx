import { Braces, Binary, FileCode, Palette, Key, Wrench } from 'lucide-react'
import { Navigation } from "@/components/Navigation.jsx";

export function Layout({ children, navigation = <Navigation/> }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Web Tools</span>
            </a>
            
            {/* Navigation Tabs */}
            {navigation}
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
