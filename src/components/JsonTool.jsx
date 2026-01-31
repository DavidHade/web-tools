import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Trash2, CheckCircle, AlertCircle, Minimize2, Maximize2, Check, Code2 } from 'lucide-react'

function JsonTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const jsonToXml = (json, nodeName = 'root', pretty = true, indent = 0) => {
    const indentStr = pretty ? '  '.repeat(indent) : ''
    const newline = pretty ? '\n' : ''

    if (json === null || json === undefined) {
      return `${indentStr}<${nodeName} />${newline}`
    }

    if (typeof json !== 'object') {
      return `${indentStr}<${nodeName}>${json}</${nodeName}>${newline}`
    }

    if (Array.isArray(json)) {
      let xml = ''
      json.forEach((item) => {
        xml += jsonToXml(item, nodeName, pretty, indent)
      })
      return xml
    }

    let xml = `${indentStr}<${nodeName}>${newline}`
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const value = json[key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            xml += jsonToXml(item, key, pretty, indent + 1)
          })
        } else if (typeof value === 'object' && value !== null) {
          xml += jsonToXml(value, key, pretty, indent + 1)
        } else {
          const safeValue = String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
          xml += `${indentStr}  <${key}>${safeValue}</${key}>${newline}`
        }
      }
    }
    xml += `${indentStr}</${nodeName}>${newline}`
    return xml
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setMessage({ type: 'success', text: 'JSON formatted successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Invalid JSON: ${e.message}` })
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setMessage({ type: 'success', text: 'JSON minified successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Invalid JSON: ${e.message}` })
      setOutput('')
    }
  }

  const validateJson = () => {
    try {
      JSON.parse(input)
      setMessage({ type: 'success', text: 'Valid JSON!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Invalid JSON: ${e.message}` })
    }
  }

  const convertToXml = () => {
    try {
      const parsed = JSON.parse(input)
      const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + jsonToXml(parsed, 'root', true, 0)
      setOutput(xml)
      setMessage({ type: 'success', text: 'Converted to XML successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Invalid JSON: ${e.message}` })
      setOutput('')
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
        <h1 className="text-3xl font-bold tracking-tight">JSON Formatter</h1>
        <p className="text-muted-foreground mt-2">Format, minify, validate, and convert JSON data to XML</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>Paste your JSON here</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"key": "value"}'
              className="h-[40vh] resize-none overflow-y-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Output</CardTitle>
            <CardDescription>Formatted result</CardDescription>
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
            <Button onClick={formatJson}>
              <Maximize2 className="mr-2 h-4 w-4" />
              Format
            </Button>
            <Button onClick={minifyJson} variant="secondary">
              <Minimize2 className="mr-2 h-4 w-4" />
              Minify
            </Button>
            <Button onClick={validateJson} variant="outline">
              <Check className="mr-2 h-4 w-4" />
              Validate
            </Button>
            <Button onClick={convertToXml} variant="outline">
              <Code2 className="mr-2 h-4 w-4" />
              To XML
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

export default JsonTool
