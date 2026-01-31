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

export { Textarea }
