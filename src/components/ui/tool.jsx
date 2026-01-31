import React from "react";
import { useDarkMode } from "@/contexts/DarkModeContext.jsx"

export function Tool({toolInfo}){
    const Icon = toolInfo.icon
    const { isDarkMode } = useDarkMode()
    
    return (
        <article
            className={`group relative overflow-hidden rounded-lg border p-6 transition-all hover:shadow-lg ${
                isDarkMode 
                    ? 'border-slate-700 bg-slate-800 hover:border-blue-500' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
        >
            <a href={toolInfo.path} className="absolute inset-0 z-0" aria-label={`Go to ${toolInfo.label}`}></a>
            <div className="relative z-10 space-y-4 pointer-events-none">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                    isDarkMode
                        ? 'bg-blue-900 group-hover:bg-blue-800'
                        : 'bg-blue-100 group-hover:bg-blue-200'
                }`}>
                    <Icon className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                </div>
                <div>
                    <h3 className={`text-lg font-semibold transition-colors ${
                        isDarkMode 
                            ? 'text-white group-hover:text-blue-400' 
                            : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                        {toolInfo.label}
                    </h3>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {toolInfo.description}
                    </p>
                    <p className={`text-xs mt-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {toolInfo.longDescription}
                    </p>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 h-1 w-full bg-gradient-to-r from-blue-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
        </article>
    )
}