import {cn} from "@/lib/utils.js";
import {Binary, Braces, FileCode, Key, Palette, Code2} from "lucide-react";

const tabs = [
    { path: '/json.html', label: 'JSON', icon: Braces },
    { path: '/base64.html', label: 'Base64', icon: Binary },
    { path: '/javascript.html', label: 'JavaScript', icon: FileCode },
    { path: '/css.html', label: 'CSS', icon: Palette },
    { path: '/xml.html', label: 'XML', icon: Code2 },
    { path: '/jwt.html', label: 'JWT', icon: Key },
]

function isCurrentPage(path) {
    return window.location.pathname === path
}

export function Navigation(){
    return(
        <nav className="flex items-center gap-1">
            {tabs.map(tab => {
                const Icon = tab.icon
                const isActive = isCurrentPage(tab.path)
                return (
                    <a
                        key={tab.path}
                        href={tab.path}
                        className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </a>
                )
            })}
        </nav>
    )
}




