import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Trash2, CheckCircle, AlertCircle, Minimize2, Maximize2, Check } from 'lucide-react'
import { TextareaResult } from './ui/textarea'

function JavaScriptTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const minifyJs = () => {
    try {
      let minified = input
        .replace(/(?<!:)\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}();,=+\-*/<>!&|:?])\s*/g, '$1')
        .replace(/\b(var|let|const|function|return|if|else|for|while|do|switch|case|break|continue|new|typeof|instanceof|in|of)\b/g, ' $1 ')
        .replace(/\s+/g, ' ')
        .trim()

      setOutput(minified)
      setMessage({ type: 'success', text: 'JavaScript minified! (Basic minification)' })
    } catch (e) {
      setMessage({ type: 'error', text: `Error: ${e.message}` })
      setOutput('')
    }
  }

  const beautifyJs = () => {
    try {
      let code = input
      let result = ''
      let indent = 0
      let inString = false
      let stringChar = ''
      let i = 0

      const addNewline = () => {
        result += '\n' + '  '.repeat(indent)
      }

      while (i < code.length) {
        const char = code[i]
        const nextChar = code[i + 1]

        if ((char === '"' || char === "'" || char === '`') && code[i - 1] !== '\\') {
          if (!inString) {
            inString = true
            stringChar = char
          } else if (char === stringChar) {
            inString = false
          }
          result += char
          i++
          continue
        }

        if (inString) {
          result += char
          i++
          continue
        }

        if (char === '{' || char === '[') {
          result += char
          indent++
          addNewline()
        } else if (char === '}' || char === ']') {
          indent--
          addNewline()
          result += char
        } else if (char === ';') {
          result += char
          if (nextChar !== '}') {
            addNewline()
          }
        } else if (char === ',') {
          result += char
          if (indent > 0) {
            addNewline()
          } else {
            result += ' '
          }
        } else if (char === ':') {
          result += ': '
        } else {
          result += char
        }
        i++
      }

      setOutput(result.trim())
      setMessage({ type: 'success', text: 'JavaScript beautified! (Basic formatting)' })
    } catch (e) {
      setMessage({ type: 'error', text: `Error: ${e.message}` })
      setOutput('')
    }
  }

  const validateJs = () => {
    try {
      new Function(input)
      setMessage({ type: 'success', text: 'Valid JavaScript syntax!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Syntax Error: ${e.message}` })
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
        <h1 className="text-3xl font-bold tracking-tight">JavaScript Minifier & Beautifier</h1>
        <p className="text-muted-foreground mt-2">Minify, beautify, and validate JavaScript code</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>Paste your JavaScript code</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="const hello = () => { console.log('Hello!'); };"
              className="h-[40vh] resize-none overflow-y-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Output</CardTitle>
            <CardDescription>Processed code</CardDescription>
          </CardHeader>
          <CardContent>
            <TextareaResult
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="h-[40vh] resize-none overflow-y-auto"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={minifyJs}>
              <Minimize2 className="mr-2 h-4 w-4" />
              Minify
            </Button>
            <Button onClick={beautifyJs} variant="secondary">
              <Maximize2 className="mr-2 h-4 w-4" />
              Beautify
            </Button>
            <Button onClick={validateJs} variant="outline">
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

export default JavaScriptTool
