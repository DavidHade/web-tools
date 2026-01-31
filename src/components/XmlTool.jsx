import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {Textarea, TextareaResult} from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Trash2, CheckCircle, AlertCircle, Maximize2, Code2, Check } from 'lucide-react'

function XmlTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const xmlToJson = (xmlString) => {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml')

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML: ' + xmlDoc.getElementsByTagName('parsererror')[0].textContent)
      }

      const convert = (node) => {
        if (node.nodeType === 3) {
          const text = node.textContent.trim()
          return text ? text : null
        }

        const result = {}

        if (node.attributes && node.attributes.length > 0) {
          result['@attributes'] = {}
          for (let attr of node.attributes) {
            result['@attributes'][attr.name] = attr.value
          }
        }

        let hasChild = false
        for (let child of node.childNodes) {
          if (child.nodeType === 1) {
            hasChild = true
            const childName = child.nodeName
            const childValue = convert(child)

            if (result[childName]) {
              if (!Array.isArray(result[childName])) {
                result[childName] = [result[childName]]
              }
              result[childName].push(childValue)
            } else {
              result[childName] = childValue
            }
          }
        }

        if (!hasChild) {
          const text = node.textContent.trim()
          if (text) {
            return Object.keys(result).length > 0
              ? { ...result, '#text': text }
              : text
          }
          return Object.keys(result).length > 0 ? result : null
        }

        return result
      }

      const json = {
        [xmlDoc.documentElement.nodeName]: convert(xmlDoc.documentElement)
      }

      return JSON.stringify(json, null, 2)
    } catch (e) {
      throw new Error(`XML parsing error: ${e.message}`)
    }
  }

  const validateXml = () => {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(input, 'text/xml')

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        const errorMsg = xmlDoc.getElementsByTagName('parsererror')[0].textContent
        setMessage({ type: 'error', text: `Invalid XML: ${errorMsg}` })
        return
      }

      setMessage({ type: 'success', text: 'Valid XML!' })
    } catch (e) {
      setMessage({ type: 'error', text: `XML Error: ${e.message}` })
    }
  }

  const convertToJson = () => {
    try {
      const json = xmlToJson(input)
      setOutput(json)
      setMessage({ type: 'success', text: 'Converted to JSON successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
      setOutput('')
    }
  }

  const formatXml = () => {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(input, 'text/xml')

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML')
      }

      const formatted = new XMLSerializer().serializeToString(xmlDoc)
      const prettified = prettifyXml(formatted)
      setOutput(prettified)
      setMessage({ type: 'success', text: 'XML formatted successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Invalid XML: ${e.message}` })
      setOutput('')
    }
  }

  const prettifyXml = (xml) => {
    let result = ''
    let indent = 0
    const tab = '  '

    xml.replace(/></g, '>\n<').split('\n').forEach((node) => {
      let currentIndent = indent

      if (node.match(/^<\/\w/)) {
        indent = Math.max(0, indent - 1)
        currentIndent = indent
      }

      if (node.match(/^<\?xml/) || node.match(/^<!DOCTYPE/)) {
        result += node + '\n'
      } else if (node.match(/^</)) {
        result += tab.repeat(currentIndent) + node + '\n'
        if (!node.match(/\/>$/) && !node.match(/^<\//)) {
          indent++
        }
      } else if (node.trim()) {
        result += tab.repeat(currentIndent) + node + '\n'
      }
    })

    return result.trim()
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
        <h1 className="text-3xl font-bold tracking-tight">XML Converter</h1>
        <p className="text-muted-foreground mt-2">Transform XML to JSON, validate and format XML</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>Paste your XML here</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='<?xml version="1.0"?><root><item>value</item></root>'
              className="h-[40vh] resize-none overflow-y-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Output</CardTitle>
            <CardDescription>Converted result</CardDescription>
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
            <Button onClick={formatXml}>
              <Maximize2 className="mr-2 h-4 w-4" />
              Format
            </Button>
            <Button onClick={convertToJson} variant="secondary">
              <Code2 className="mr-2 h-4 w-4" />
              To JSON
            </Button>
            <Button onClick={validateXml} variant="outline">
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

export default XmlTool
