import * as React from "react"
import { cn } from "@/lib/utils"
import { useDarkMode } from "@/contexts/DarkModeContext"

const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isDarkMode } = useDarkMode()
    return (
      <textarea
        className={cn(
          `flex min-h-[200px] w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono ${
            isDarkMode
              ? 'bg-slate-950 border-slate-600 text-slate-100 placeholder:text-slate-500'
              : 'bg-white border-gray-300 text-slate-900 placeholder:text-slate-400'
          }`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

const TextareaResult = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isDarkMode } = useDarkMode()
    return (
      <textarea
        className={cn(
          `flex min-h-[200px] w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono ${
            isDarkMode
              ? 'bg-slate-950 border-slate-600 text-slate-100 placeholder:text-slate-500 opacity-75'
              : 'bg-white border-gray-300 text-slate-900 placeholder:text-slate-400 bg-muted/50'
          }`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextareaResult.displayName = "TextareaResult"

const TextPre = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isDarkMode } = useDarkMode()
    return (
      <pre className={cn(
          `${isDarkMode
              ? 'text-sm font-mono bg-slate-950 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap'
              : 'text-sm font-mono bg-muted/50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap'
          }`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextPre.displayName = "TextPre"

export { Textarea, TextareaResult, TextPre }
