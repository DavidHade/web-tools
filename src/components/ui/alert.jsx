import * as React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { useDarkMode } from "@/contexts/DarkModeContext"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm flex items-center gap-3 [&>svg]:flex-shrink-0 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive [&>svg]:text-destructive",
        success:
          "border-green-500/50 text-green-700 bg-green-50 [&>svg]:text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(
  ({ className, variant, ...props }, ref) => {
    const { isDarkMode } = useDarkMode()
    
    let darkVariantClasses = ""
    if (isDarkMode) {
      if (variant === "destructive") {
        darkVariantClasses = "border-red-900 text-red-400"
      } else if (variant === "success") {
        darkVariantClasses = "border-green-900 text-green-400 bg-green-950"
      }
    }
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), darkVariantClasses, className)}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }
