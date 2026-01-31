import * as React from "react"
import { cn } from "@/lib/utils"
import { useDarkMode } from "@/contexts/DarkModeContext"

const Card = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isDarkMode } = useDarkMode()
    return (
      <div
        ref={ref}
        className={cn(
          `rounded-xl border shadow ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }`,
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isDarkMode } = useDarkMode()
    return (
      <h3
        ref={ref}
        className={cn(`font-semibold leading-none tracking-tight ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`, className)}
        {...props}
      />
    )
  }
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isDarkMode } = useDarkMode()
    return (
      <p
        ref={ref}
        className={cn(`text-sm ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`, className)}
        {...props}
      />
    )
  }
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
