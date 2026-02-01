import {cn} from "@/lib/utils.js";
import {Binary, Braces, FileCode, Key, Palette, Code2, QrCode, FileText, Menu, X} from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext.jsx"
import { useState, useRef, useEffect } from "react";

const tabs = [
    { path: '/json', label: 'JSON', icon: Braces },
    { path: '/base64', label: 'Base64', icon: Binary },
    { path: '/javascript', label: 'JavaScript', icon: FileCode },
    { path: '/css', label: 'CSS', icon: Palette },
    { path: '/xml', label: 'XML', icon: Code2 },
    { path: '/qr', label: 'QR', icon: QrCode },
    { path: '/pdf', label: 'PDF', icon: FileText },
    { path: '/jwt', label: 'JWT', icon: Key },
]

function isCurrentPage(path) {
    return window.location.pathname === path
}

function Tab({ tabKey, tabInfo, customCss, icon }) {
    const isActive = isCurrentPage(tabInfo.path)
    const { isDarkMode } = useDarkMode()
    return (
        <a
            key={tabKey}
            href={tabInfo.path}
            className={cn(
                customCss,
                isActive
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                        ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
        >
            {icon}<span>{tabInfo.label}</span>
        </a>
    )
}

export function Navigation(){
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const { isDarkMode } = useDarkMode()

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return(
        <nav className="flex items-center justify-between relative">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
                {tabs.map(tab => {
                    const Icon = tab.icon
                    return (
                        <Tab
                            key={tab.path}
                            tabInfo={tab}
                            customCss="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors" 
                            icon={<Icon className="h-4 w-4" />}
                        />
                    )
                })}
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden w-full" ref={menuRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isDarkMode
                            ? "text-slate-300 hover:bg-slate-800"
                            : "text-slate-600 hover:bg-slate-100"
                    )}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className={cn(
                        "absolute top-full left-0 min-w-48 mt-2 rounded-lg shadow-lg z-50",
                        isDarkMode ? "bg-slate-900" : "bg-white"
                    )}>
                        {tabs.map(tab => {
                            const Icon = tab.icon
                            return (
                                <Tab
                                    key={tab.path}
                                    tabInfo={tab}
                                    customCss="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b last:border-b-0"
                                    icon={<Icon className="h-5 w-5 shrink-0" />}
                                />
                            )
                        })}
                    </div>
                )}
            </div>
        </nav>
    )
}




