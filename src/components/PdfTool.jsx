import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Trash2, CheckCircle, AlertCircle, Upload, Download, Combine, Scissors, X, FileText } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import { PDFDocument } from 'pdf-lib'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { WorkerMessageHandler } from "pdfjs-dist/build/pdf.worker.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    WorkerMessageHandler,
    import.meta.url
).toString();

function PdfTool() {
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)
  const [showSplitModal, setShowSplitModal] = useState(false)
  const [splitConfig, setSplitConfig] = useState({
    numParts: 2,
    parts: [5, 5]
  })
  const [totalPages, setTotalPages] = useState(0)

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    const pdfFiles = uploadedFiles.filter(file => file.type === 'application/pdf')
    
    if (pdfFiles.length !== uploadedFiles.length) {
      setMessage({ type: 'error', text: 'Please upload only PDF files' })
      return
    }

    if (pdfFiles.length > 0) {
      setFiles(prev => [...prev, ...pdfFiles])
      setMessage({ type: 'success', text: `${pdfFiles.length} PDF file(s) uploaded successfully` })
    }
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const mergePdfs = async () => {
    if (files.length < 2) {
      setMessage({ type: 'error', text: 'Please upload at least 2 PDF files to merge' })
      return
    }

    setLoading(true)
    try {
      const mergedPdf = await PDFDocument.create()

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach(page => mergedPdf.addPage(page))
      }

      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'merged.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setMessage({ type: 'success', text: 'PDFs merged successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: `Merge failed: ${e.message}` })
    } finally {
      setLoading(false)
    }
  }

  const splitPdf = async () => {
    if (files.length === 0) {
      setMessage({ type: 'error', text: 'Please upload a PDF file to split' })
      return
    }

    try {
      const file = files[0]
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pageCount = pdf.getPageCount()
      setTotalPages(pageCount)
      
      // Initialize split config with equal parts
      const defaultParts = 2
      const pagesPerPart = Math.floor(pageCount / defaultParts)
      const remainder = pageCount % defaultParts
      const parts = Array(defaultParts).fill(pagesPerPart)
      parts[0] += remainder
      
      setSplitConfig({
        numParts: defaultParts,
        parts: parts
      })
      setShowSplitModal(true)
    } catch (e) {
      setMessage({ type: 'error', text: `Failed to load PDF: ${e.message}` })
    }
  }

  const updateNumParts = (newNum) => {
    const pageCount = totalPages
    const pagesPerPart = Math.floor(pageCount / newNum)
    const remainder = pageCount % newNum
    const parts = Array(newNum).fill(pagesPerPart)
    parts[0] += remainder
    
    setSplitConfig({
      numParts: newNum,
      parts: parts
    })
  }

  const updatePartPages = (index, value) => {
    const newParts = [...splitConfig.parts]
    newParts[index] = Math.max(0, Math.min(totalPages, parseInt(value) || 0))
    setSplitConfig({
      ...splitConfig,
      parts: newParts
    })
  }

  const performSplit = async () => {
    setLoading(true)
    try {
      const file = files[0]
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      
      let pageIndex = 0
      for (let partNum = 0; partNum < splitConfig.numParts; partNum++) {
        const pagesInPart = splitConfig.parts[partNum]
        const singlePartPdf = await PDFDocument.create()
        
        for (let i = 0; i < pagesInPart; i++) {
          const [copiedPage] = await singlePartPdf.copyPages(pdf, [pageIndex])
          singlePartPdf.addPage(copiedPage)
          pageIndex++
        }
        
        const pdfBytes = await singlePartPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `part_${partNum + 1}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }

      setMessage({ type: 'success', text: `PDF split into ${splitConfig.numParts} parts!` })
      setShowSplitModal(false)
    } catch (e) {
      setMessage({ type: 'error', text: `Split failed: ${e.message}` })
    } finally {
      setLoading(false)
    }
  }

  const convertToImages = async () => {
    if (files.length === 0) {
      setMessage({ type: 'error', text: 'Please upload a PDF file to convert' })
      return
    }

    setLoading(true)
    try {
      const file = files[0]
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise
      const pageCount = pdf.numPages

      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const scale = 2
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({
          canvasContext: context,
          viewport,
        }).promise

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `page_${pageNum}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        })
      }

      setMessage({ type: 'success', text: `Converted ${pageCount} PDF page(s) to images!` })
    } catch (e) {
      setMessage({ type: 'error', text: `Conversion failed: ${e.message}` })
    } finally {
      setLoading(false)
    }
  }

  const convertToDocx = async () => {
    if (files.length === 0) {
      setMessage({ type: 'error', text: 'Please upload a PDF file to convert' })
      return
    }

    setLoading(true)
    try {
      const file = files[0]
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise
      const pageCount = pdf.numPages

      // Extract text from all pages
      const docSections = [
        new Paragraph({
          text: `Converted from: ${file.name}`,
          run: new TextRun({ bold: true, size: 24 })
        }),
        new Paragraph({ text: '' })
      ]

      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map(item => item.str).join(' ')

        // Add page number header
        if (pageNum > 1) {
          docSections.push(new Paragraph({ text: '' }))
        }
        docSections.push(
          new Paragraph({
            text: `Page ${pageNum}`,
            run: new TextRun({ bold: true, size: 20 })
          })
        )
        docSections.push(new Paragraph(pageText))
      }

      // Create DOCX document
      const doc = new Document({
        sections: [{
          children: docSections
        }]
      })

      // Generate and download
      const blob = await Packer.toBlob(doc)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `converted_${file.name.replace('.pdf', '')}.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setMessage({ type: 'success', text: `PDF converted to DOCX successfully! Extracted ${pageCount} page(s).` })
    } catch (e) {
      setMessage({ type: 'error', text: `DOCX conversion failed: ${e.message}` })
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setFiles([])
    setMessage({ type: '', text: '' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PDF Tools</h1>
        <p className="text-muted-foreground mt-2">Merge, split, and convert PDF files</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Upload PDF Files</CardTitle>
          <CardDescription>Select one or more PDF files to process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors relative">
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer block relative z-10 pointer-events-none">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF files only</p>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">Uploaded Files ({files.length})</p>
              <div className="space-y-1">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <Button
                      onClick={() => removeFile(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">PDF Operations</CardTitle>
          <CardDescription>Choose an operation to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={mergePdfs} disabled={loading || files.length < 2}>
              <Combine className="mr-2 h-4 w-4" />
              Merge PDFs
            </Button>
            <Button onClick={splitPdf} variant="secondary" disabled={loading || files.length === 0}>
              <Scissors className="mr-2 h-4 w-4" />
              Split PDF
            </Button>
            <Button onClick={convertToImages} variant="outline" disabled={loading || files.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              To Images
            </Button>
            <Button onClick={convertToDocx} variant="outline" disabled={loading || files.length === 0}>
              <FileText className="mr-2 h-4 w-4" />
              To DOCX
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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Features</CardTitle>
          <CardDescription>All operations are processed client-side</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            These PDF operations are now fully functional and run directly in your browser:
          </p>
          <ul className="text-sm text-gray-600 mt-3 space-y-1 ml-4">
            <li>✓ Merge multiple PDFs into one</li>
            <li>✓ Split PDF pages into separate files</li>
            <li>✓ Convert PDF pages to images (PNG)</li>
            <li>✓ Convert PDF to DOCX (Word document)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Split Configuration Modal */}
      {showSplitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-lg">Split PDF Configuration</CardTitle>
                <CardDescription>Total Pages: {totalPages}</CardDescription>
              </div>
              <Button
                onClick={() => setShowSplitModal(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Number of Parts */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Number of Parts</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="2"
                    max={totalPages}
                    value={splitConfig.numParts}
                    onChange={(e) => updateNumParts(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="2"
                    max={totalPages}
                    value={splitConfig.numParts}
                    onChange={(e) => updateNumParts(Math.max(2, Math.min(totalPages, parseInt(e.target.value) || 2)))}
                    className="w-16 px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              {/* Pages Per Part */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pages Per Part</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {splitConfig.parts.map((pages, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-12">Part {index + 1}:</span>
                      <input
                        type="number"
                        min="0"
                        max={totalPages}
                        value={pages}
                        onChange={(e) => updatePartPages(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-xs text-gray-500 w-8 text-right">{pages}/{totalPages}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Total: {splitConfig.parts.reduce((sum, p) => sum + p, 0)}/{totalPages} pages
                </p>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                <p className="font-medium mb-2">Split Preview:</p>
                {splitConfig.parts.map((pages, index) => (
                  pages > 0 && (
                    <p key={index}>
                      Part {index + 1}: {pages} page{pages !== 1 ? 's' : ''}
                    </p>
                  )
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => setShowSplitModal(false)}
                  variant="outline"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={performSplit}
                  disabled={loading || splitConfig.parts.reduce((sum, p) => sum + p, 0) !== totalPages}
                >
                  {loading ? 'Splitting...' : 'Split PDF'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default PdfTool
