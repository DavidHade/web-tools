import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea, TextPre } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Copy, Trash2, CheckCircle, AlertCircle, Unlock, FileText, ShieldCheck, ShieldX, Eye, EyeOff } from 'lucide-react'
import { useDarkMode } from "@/contexts/DarkModeContext"
import { clsx } from "clsx";

function JwtTool() {
  const [input, setInput] = useState('')
  const [secret, setSecret] = useState('')
  const [showSecret, setShowSecret] = useState(false)
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [signatureValid, setSignatureValid] = useState(null)
  const [algorithm, setAlgorithm] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const { isDarkMode } = useDarkMode()
  
  const base64UrlDecode = (str) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padding = base64.length % 4
    if (padding) {
      base64 += '='.repeat(4 - padding)
    }
    return decodeURIComponent(escape(atob(base64)))
  }

  const base64UrlEncode = (arrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  const getHashAlgorithm = (alg) => {
    const algorithms = {
      'HS256': 'SHA-256',
      'HS384': 'SHA-384',
      'HS512': 'SHA-512'
    }
    return algorithms[alg] || null
  }

  const verifySignature = async () => {
    if (!input.trim() || !secret) {
      setMessage({ type: 'error', text: 'Please provide both JWT and secret key' })
      return
    }

    try {
      const parts = input.trim().split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }

      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]))
      const alg = decodedHeader.alg

      const hashAlg = getHashAlgorithm(alg)
      if (!hashAlg) {
        setMessage({ type: 'error', text: `Unsupported algorithm: ${alg}. Supported: HS256, HS384, HS512` })
        setSignatureValid(null)
        return
      }

      // Create the signing input (header.payload)
      const signingInput = `${parts[0]}.${parts[1]}`
      
      // Import the secret key
      const encoder = new TextEncoder()
      const keyData = encoder.encode(secret)
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: hashAlg },
        false,
        ['sign']
      )

      // Sign the input
      const signatureBuffer = await crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        encoder.encode(signingInput)
      )

      // Convert to base64url
      const expectedSignature = base64UrlEncode(signatureBuffer)
      const actualSignature = parts[2]

      if (expectedSignature === actualSignature) {
        setSignatureValid(true)
        setMessage({ type: 'success', text: 'Signature is valid! ✓' })
      } else {
        setSignatureValid(false)
        setMessage({ type: 'error', text: 'Signature is invalid! The token may have been tampered with.' })
      }
    } catch (e) {
      setSignatureValid(false)
      setMessage({ type: 'error', text: `Verification error: ${e.message}` })
    }
  }

  const decodeJwt = () => {
    try {
      const parts = input.trim().split('.')
      
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. JWT must have 3 parts separated by dots.')
      }

      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]))
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]))
      
      setHeader(JSON.stringify(decodedHeader, null, 2))
      setPayload(JSON.stringify(decodedPayload, null, 2))
      setSignature(parts[2])
      setAlgorithm(decodedHeader.alg || 'Unknown')
      setSignatureValid(null)
      
      if (decodedPayload.exp) {
        const expDate = new Date(decodedPayload.exp * 1000)
        const now = new Date()
        if (expDate < now) {
          setMessage({ type: 'error', text: `Token expired on ${expDate.toLocaleString()}` })
        } else {
          setMessage({ type: 'success', text: `Token valid until ${expDate.toLocaleString()}` })
        }
      } else {
        setMessage({ type: 'success', text: 'JWT decoded successfully! (No expiration set)' })
      }
    } catch (e) {
      setMessage({ type: 'error', text: `Error decoding JWT: ${e.message}` })
      setHeader('')
      setPayload('')
      setSignature('')
      setAlgorithm('')
      setSignatureValid(null)
    }
  }

  const copyPart = async (part, name) => {
    await navigator.clipboard.writeText(part)
    setMessage({ type: 'success', text: `${name} copied to clipboard!` })
  }

  const clearAll = () => {
    setInput('')
    setSecret('')
    setHeader('')
    setPayload('')
    setSignature('')
    setAlgorithm('')
    setSignatureValid(null)
    setMessage({ type: '', text: '' })
  }

  const loadSample = () => {
    // This is a valid JWT signed with secret "your-256-bit-secret"
    const sampleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    setInput(sampleJwt)
    setSecret('your-256-bit-secret')
    setSignatureValid(null)
    setMessage({ type: 'success', text: 'Sample JWT loaded with secret. Click Decode then Verify Signature.' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">JWT Decoder</h1>
        <p className="text-muted-foreground mt-2">Decode and inspect JSON Web Tokens</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">JWT Token</CardTitle>
          <CardDescription>Paste your JWT token to decode and verify</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setSignatureValid(null); }}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="h-[25vh] resize-none overflow-y-auto"
          />
          
          <div className="space-y-2">
            <Label htmlFor="secret">Secret Key (for HMAC signature verification)</Label>
            <div className="relative">
              <input
                id="secret"
                type={showSecret ? 'text' : 'password'}
                value={secret}
                onChange={(e) => { setSecret(e.target.value); setSignatureValid(null); }}
                placeholder="Enter your secret key..."
                className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500">Supports HS256, HS384, HS512 algorithms</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={decodeJwt}>
              <Unlock className="mr-2 h-4 w-4" />
              Decode
            </Button>
            <Button onClick={verifySignature} variant="secondary" disabled={!signature}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Verify Signature
            </Button>
            <Button onClick={loadSample} variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Load Sample
            </Button>
            <Button onClick={clearAll} variant="ghost">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>

          {message.text && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'success'}>
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

      {(header || payload || signature) && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">Header</CardTitle>
                  <Badge variant="outline" className="text-red-600 border-red-200">JOSE</Badge>
                </div>
                <Button size="sm" variant="ghost" onClick={() => copyPart(header, 'Header')}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <TextPre>
                {header}
              </TextPre>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">Payload</CardTitle>
                  <Badge variant="outline" className="text-violet-600 border-violet-200">Claims</Badge>
                </div>
                <Button size="sm" variant="ghost" onClick={() => copyPart(payload, 'Payload')}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <TextPre>
                {payload}
              </TextPre>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-l-4 border-l-cyan-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">Signature</CardTitle>
                  <Badge variant="outline" className="text-cyan-600 border-cyan-200">{algorithm}</Badge>
                  {signatureValid === true && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      Valid
                    </Badge>
                  )}
                  {signatureValid === false && (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      <ShieldX className="h-3 w-3 mr-1" />
                      Invalid
                    </Badge>
                  )}
                </div>
                <Button size="sm" variant="ghost" onClick={() => copyPart(signature, 'Signature')}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className={clsx(
                  'text-sm font-mono p-4 rounded-lg overflow-x-auto break-all', isDarkMode ? 'bg-slate-950' : 'bg-gray-100'
              )}>
                {signature}
              </pre>
              
              {signatureValid === null && (
                <Alert className="bg-amber-50 border-amber-200">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Enter your secret key above and click "Verify Signature" to validate this token.
                  </AlertDescription>
                </Alert>
              )}
              {signatureValid === true && (
                <Alert className="bg-green-50 border-green-200">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Signature verified successfully! This token has not been tampered with.
                  </AlertDescription>
                </Alert>
              )}
              {signatureValid === false && (
                <Alert className="bg-red-50 border-red-200">
                  <ShieldX className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Signature verification failed! The token may have been tampered with or the secret is incorrect.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default JwtTool
