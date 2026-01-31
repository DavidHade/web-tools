import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Trash2, CheckCircle, AlertCircle, ArrowRightLeft, Lock, Unlock, Upload, Download, FileUp, X } from 'lucide-react'
import { TextareaResult } from './ui/textarea'
import { useDarkMode } from '@/contexts/DarkModeContext'

function Base64Tool() {
  const { isDarkMode } = useDarkMode()
  const fileInputRef = useRef(null)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [uploadedFile, setUploadedFile] = useState(null)

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

  const detectFileType = (bytes) => {
    // Common file signatures (magic numbers)
    const signatures = {
      // Images
      'image/png': [0x89, 0x50, 0x4E, 0x47],
      'image/jpeg': [0xFF, 0xD8, 0xFF],
      'image/gif': [0x47, 0x49, 0x46],
      'image/webp': [0x52, 0x49, 0x46, 0x46],
      'image/svg+xml': [0x3C, 0x3F, 0x78, 0x6D, 0x6C], // <?xml
      // Documents
      'application/pdf': [0x25, 0x50, 0x44, 0x46], // %PDF
      'application/msword': [0xD0, 0xCF, 0x11, 0xE0], // DOC
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [0x50, 0x4B, 0x03, 0x04], // DOCX (ZIP)
      'application/vnd.ms-excel': [0xD0, 0xCF, 0x11, 0xE0], // XLS
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [0x50, 0x4B, 0x03, 0x04], // XLSX
      'application/zip': [0x50, 0x4B, 0x03, 0x04],
      'application/x-rar-compressed': [0x52, 0x61, 0x72, 0x21],
      // Audio
      'audio/mpeg': [0x49, 0x44, 0x33], // ID3
      'audio/wav': [0x52, 0x49, 0x46, 0x46],
      // Video
      'video/mp4': [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70],
      // Text/Code
      'application/json': [0x7B]
    }

    for (const [mimeType, signature] of Object.entries(signatures)) {
      let matches = true
      for (let i = 0; i < signature.length && i < bytes.length; i++) {
        if (bytes[i] !== signature[i]) {
          matches = false
          break
        }
      }
      if (matches) {
        return mimeType
      }
    }

    return 'application/octet-stream'
  }

  const getFileExtension = (mimeType) => {
    const extensionMap = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'application/zip': 'zip',
      'application/x-rar-compressed': 'rar',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'video/mp4': 'mp4',
      'application/json': 'json',
    }
    return extensionMap[mimeType] || 'bin'
  }

  const decode = () => {
    try {
      // First, try to decode as binary data (for files)
      const binaryString = atob(input)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      
      // Check if it looks like text (UTF-8)
      let isText = true
      try {
        const decoded = decodeURIComponent(escape(atob(input)))
        setOutput(decoded)
      } catch {
        isText = false
      }
      
      // If it's binary data or user wants to download, prompt for download
      if (!isText || uploadedFile) {
        const mimeType = detectFileType(bytes)
        const extension = getFileExtension(mimeType)
        const fileName = uploadedFile 
          ? uploadedFile.split('.')[0] + '.' + extension
          : 'decoded-file.' + extension
        
        const blob = new Blob([bytes], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        setMessage({ type: 'success', text: 'Decoded and downloaded successfully!' })
      } else {
        setMessage({ type: 'success', text: 'Decoded successfully!' })
      }
    } catch (e) {
      setMessage({ type: 'error', text: `Invalid Base64 string: ${e.message}` })
      setOutput('')
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const binary = new Uint8Array(reader.result)
        let binaryString = ''
        for (let i = 0; i < binary.length; i++) {
          binaryString += String.fromCharCode(binary[i])
        }
        const encoded = btoa(binaryString)
        setOutput(encoded)
        setUploadedFile(file.name)
        setMessage({ type: 'success', text: `File "${file.name}" uploaded and encoded successfully!` })
      } catch (error) {
        setMessage({ type: 'error', text: `File upload error: ${error.message}` })
      }
    }
    reader.onerror = () => {
      setMessage({ type: 'error', text: 'Error reading file' })
    }
    reader.readAsArrayBuffer(file)
  }

  const downloadFile = () => {
    if (!output || !uploadedFile) {
      setMessage({ type: 'error', text: 'No file to download' })
      return
    }

    try {
      const binaryString = atob(output)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const blob = new Blob([bytes], { type: 'application/octet-stream' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `decoded-${uploadedFile}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setMessage({ type: 'success', text: 'File downloaded successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: `Download error: ${error.message}` })
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
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
            <CardDescription>Enter text, Base64 string, or upload a file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode or Base64 to decode..."
              className="h-[40vh] resize-none overflow-y-auto"
            />

            {/* File Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
                    isDarkMode
                        ? 'border-slate-600 hover:border-slate-500 bg-slate-950'
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }}
                onDragOver={(e) => e.preventDefault()}
            >
              <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="*/*"
              />
              <div className="flex flex-col items-center gap-2 text-center">
                <FileUp className={`h-8 w-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                    Click to upload or drag and drop
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    Any file type supported
                  </p>
                </div>
              </div>
            </div>

            {uploadedFile && (
                <div className="mt-4 space-y-2">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>Uploaded File</p>
                  <div className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
                    <span className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>{uploadedFile}</span>
                    <Button
                        onClick={() => {
                          setUploadedFile(null)
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                          setInput('')
                          setMessage({ type: '', text: '' })
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
            )}
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
              className="resize-both overflow-y-auto"
              style={{ height: uploadedFile ? '67.5vh' : '57vh' }}
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
            <Button onClick={() => fileInputRef.current?.click()} variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
            <Button onClick={downloadFile} variant="outline" disabled={!output || !uploadedFile}>
              <Download className="mr-2 h-4 w-4" />
              Download
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
