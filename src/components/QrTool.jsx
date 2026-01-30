import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Trash2, CheckCircle, AlertCircle, Download } from 'lucide-react'

function QrTool() {
  const [input, setInput] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const generateQrCode = async () => {
    try {
      if (!input.trim()) {
        setMessage({ type: 'error', text: 'Please enter text or URL to generate QR code' })
        return
      }

      // Use QR Server API (free, no authentication needed)
      const encodedInput = encodeURIComponent(input)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedInput}`
      
      setQrCode(qrUrl)
      setMessage({ type: 'success', text: 'QR code generated successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Error generating QR code: ${e.message}` })
      setQrCode('')
    }
  }

  const downloadQrCode = async () => {
    try {
      if (!qrCode) {
        setMessage({ type: 'error', text: 'Please generate a QR code first' })
        return
      }

      const response = await fetch(qrCode)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'qrcode.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      setMessage({ type: 'success', text: 'QR code downloaded successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Download failed: ${e.message}` })
    }
  }

  const copyQrUrl = () => {
    if (!qrCode) {
      setMessage({ type: 'error', text: 'Please generate a QR code first' })
      return
    }
    navigator.clipboard.writeText(qrCode)
    setMessage({ type: 'success', text: 'QR code URL copied to clipboard!' })
  }

  const clearAll = () => {
    setInput('')
    setQrCode('')
    setMessage({ type: '', text: '' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
        <p className="text-muted-foreground mt-2">Generate QR codes from text or URLs</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>Enter text or URL</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter text, URL, or any data to encode...'
              className="h-[40vh] resize-none overflow-y-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">QR Code</CardTitle>
            <CardDescription>Generated QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[40vh] bg-muted/50 rounded-lg flex items-center justify-center overflow-auto">
              {qrCode ? (
                <img 
                  src={qrCode} 
                  alt="Generated QR Code" 
                  className="max-w-full max-h-full"
                />
              ) : (
                <p className="text-muted-foreground text-center">QR code will appear here</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={generateQrCode}>
              Generate QR Code
            </Button>
            <Button onClick={downloadQrCode} variant="secondary" disabled={!qrCode}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={copyQrUrl} variant="outline" disabled={!qrCode}>
              <Copy className="mr-2 h-4 w-4" />
              Copy URL
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
              <AlertDescription className="m-0">{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default QrTool
