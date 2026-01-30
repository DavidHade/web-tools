import React from "react";

export function Tool({toolInfo}){
    const Icon = toolInfo.icon
    return (
        <article
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg"
        >
            <a href={toolInfo.path} className="absolute inset-0 z-0" aria-label={`Go to ${toolInfo.label}`}></a>
            <div className="relative z-10 space-y-4 pointer-events-none">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {toolInfo.label}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2">{toolInfo.description}</p>
                    <p className="text-xs text-slate-500 mt-3">{toolInfo.longDescription}</p>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 h-1 w-full bg-gradient-to-r from-blue-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
        </article>
    )
}