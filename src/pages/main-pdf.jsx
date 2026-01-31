import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Layout } from '@/components/Layout'
import { DarkModeProvider } from '@/contexts/DarkModeContext'

const PdfTool = lazy(() => import('@/components/PdfTool'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
        <Layout>
            <Suspense fallback={<div className="p-8 text-center">Loading PDF Tool...</div>}>
                <PdfTool />
            </Suspense>
        </Layout>
    </DarkModeProvider>
  </React.StrictMode>,
)
