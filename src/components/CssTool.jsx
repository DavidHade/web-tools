import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Trash2, CheckCircle, AlertCircle, Minimize2, Maximize2, Check } from 'lucide-react'

function CssTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const minifyCss = () => {
    try {
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,>~+])\s*/g, '$1')
        .replace(/;}/g, '}')
        .replace(/{\s/g, '{')
        .replace(/\s}/g, '}')
        .trim()

      setOutput(minified)
      setMessage({ type: 'success', text: 'CSS minified successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Error: ${e.message}` })
      setOutput('')
    }
  }

  const beautifyCss = () => {
    try {
      let code = input
        .replace(/\s+/g, ' ')
        .trim()

      let result = ''
      let indent = 0
      let inSelector = true

      for (let i = 0; i < code.length; i++) {
        const char = code[i]

        if (char === '{') {
          result += ' {\n'
          indent++
          result += '  '.repeat(indent)
          inSelector = false
        } else if (char === '}') {
          indent--
          result += '\n' + '  '.repeat(indent) + '}\n'
          if (indent === 0) {
            result += '\n'
          } else {
            result += '  '.repeat(indent)
          }
          inSelector = true
        } else if (char === ';') {
          result += ';\n' + '  '.repeat(indent)
        } else if (char === ':' && !inSelector) {
          result += ': '
        } else if (char === ',' && inSelector) {
          result += ',\n'
        } else if (char === ' ' && result.endsWith('\n' + '  '.repeat(indent))) {
          continue
        } else {
          result += char
        }
      }

      setOutput(result.trim())
      setMessage({ type: 'success', text: 'CSS beautified successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Error: ${e.message}` })
      setOutput('')
    }
  }

  const validateCss = () => {
    try {
      const openBraces = (input.match(/{/g) || []).length
      const closeBraces = (input.match(/}/g) || []).length

      if (openBraces !== closeBraces) {
        throw new Error(`Unbalanced braces: ${openBraces} opening, ${closeBraces} closing`)
      }

      const blocks = input.split('}').filter(b => b.trim())
      for (const block of blocks) {
        const parts = block.split('{')
        if (parts.length > 1) {
          const selector = parts[0].trim()
          const rules = parts[1].trim()
          if (!selector) {
            throw new Error('Empty selector found')
          }
          if (rules && !rules.includes(':') && rules.length > 0) {
            throw new Error(`Invalid rule format in "${selector}" block`)
          }
        }
      }

      setMessage({ type: 'success', text: 'CSS appears to be valid!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Validation Error: ${e.message}` })
    }
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
    setMessage({ type: 'success', text: 'Copied to clipboard!' })
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setMessage({ type: '', text: '' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CSS Minifier & Beautifier</h1>
        <p className="text-muted-foreground mt-2">Minify, beautify, and validate CSS code</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>Paste your CSS code</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder=".container { display: flex; }"
              className="h-[40vh] resize-none overflow-y-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Output</CardTitle>
            <CardDescription>Processed CSS</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="h-[40vh] resize-none overflow-y-auto bg-muted/50"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={minifyCss}>
              <Minimize2 className="mr-2 h-4 w-4" />
              Minify
            </Button>
            <Button onClick={beautifyCss} variant="secondary">
              <Maximize2 className="mr-2 h-4 w-4" />
              Beautify
            </Button>
            <Button onClick={validateCss} variant="outline">
              <Check className="mr-2 h-4 w-4" />
              Validate
            </Button>
            <Button onClick={copyOutput} variant="outline" disabled={!output}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button onClick={clearAll} variant="ghost">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>

          {message.text && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'success'} className="mt-4">
              {message.type === 'error' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CssTool
