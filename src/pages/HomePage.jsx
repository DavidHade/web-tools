import { Braces, Binary, FileCode, Palette, Key, Wrench } from 'lucide-react'

const tools = [
  {
    path: '/json.html',
    label: 'JSON Formatter',
    description: 'Format, minify, and validate JSON data',
    icon: Braces,
  },
  {
    path: '/base64.html',
    label: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    icon: Binary,
  },
  {
    path: '/javascript.html',
    label: 'JavaScript Minifier',
    description: 'Minify, beautify, and validate JavaScript',
    icon: FileCode,
  },
  {
    path: '/css.html',
    label: 'CSS Minifier',
    description: 'Minify, beautify, and validate CSS',
    icon: Palette,
  },
  {
    path: '/jwt.html',
    label: 'JWT Debugger',
    description: 'Decode and verify JWT tokens',
    icon: Key,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Web Tools</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Web Developer Tools
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Free online tools for developers. Format JSON, encode/decode Base64, minify CSS & JavaScript, debug JWT tokens, and more.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <a
                  key={tool.path}
                  href={tool.path}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tool.label}
                      </h2>
                      <p className="text-sm text-slate-600 mt-2">{tool.description}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 h-1 w-full bg-gradient-to-r from-blue-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                </a>
              )
            })}
          </div>
        </div>
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
