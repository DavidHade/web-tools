import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Trash2, CheckCircle, AlertCircle, ArrowRightLeft, Lock, Unlock } from 'lucide-react'
import { TextareaResult } from './ui/textarea'

function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
      setMessage({ type: 'success', text: 'Encoded successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Encoding error: ${e.message}` })
      setOutput('')
    }
  }

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
      setMessage({ type: 'success', text: 'Decoded successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Invalid Base64 string: ${e.message}` })
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

  const swapInputOutput = () => {
    setInput(output)
    setOutput(input)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Base64 Encoder / Decoder</h1>
        <p className="text-muted-foreground mt-2">Encode or decode Base64 strings with UTF-8 support</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>Enter text or Base64 string</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode or Base64 to decode..."
              className="h-[40vh] resize-none overflow-y-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Output</CardTitle>
            <CardDescription>Result</CardDescription>
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
            <Button onClick={encode}>
              <Lock className="mr-2 h-4 w-4" />
              Encode
            </Button>
            <Button onClick={decode} variant="secondary">
              <Unlock className="mr-2 h-4 w-4" />
              Decode
            </Button>
            <Button onClick={swapInputOutput} variant="outline">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Swap
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

export default Base64Tool
