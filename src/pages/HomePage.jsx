import { Braces, Binary, FileCode, Palette, Key, Wrench } from 'lucide-react'

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
    path: '/jwt.html',
    label: 'JWT Debugger',
    description: 'Decode and verify JWT tokens',
    icon: Key,
    longDescription: 'Decode and verify JSON Web Tokens with support for multiple hashing algorithms.',
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
              <Wrench className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Web Tools</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <article className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Web Developer Tools
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Free online tools for developers. Format JSON, encode/decode Base64, minify CSS & JavaScript, debug JWT tokens, and more.
            </p>
          </section>

          {/* Tools Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 sr-only">Available Tools</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <article
                    key={tool.path}
                    className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg"
                  >
                    <a href={tool.path} className="absolute inset-0 z-0" aria-label={`Go to ${tool.label}`}></a>
                    <div className="relative z-10 space-y-4 pointer-events-none">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                        <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {tool.label}
                        </h3>
                        <p className="text-sm text-slate-600 mt-2">{tool.description}</p>
                        <p className="text-xs text-slate-500 mt-3">{tool.longDescription}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 h-1 w-full bg-gradient-to-r from-blue-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                  </article>
                )
              })}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="space-y-6 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-slate-900">Why Use Web Tools?</h2>
            <ul className="grid gap-4 md:grid-cols-3">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">✓</span>
                <div>
                  <h3 className="font-semibold text-slate-900">Free & Fast</h3>
                  <p className="text-sm text-slate-600">No installation required. Use online instantly.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">✓</span>
                <div>
                  <h3 className="font-semibold text-slate-900">Secure</h3>
                  <p className="text-sm text-slate-600">Your data stays on your device. No server uploads.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">✓</span>
                <div>
                  <h3 className="font-semibold text-slate-900">Developer Friendly</h3>
                  <p className="text-sm text-slate-600">Built by developers for developers.</p>
                </div>
              </li>
            </ul>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-slate-500">
            Web Tools © {new Date().getFullYear()} • <a href="https://github.com/davidhade/web-tools" className="hover:text-slate-700">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
