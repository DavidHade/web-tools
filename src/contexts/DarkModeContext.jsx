import React, { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {}
})

// Lazy initializer function to get initial dark mode state from localStorage
function getInitialDarkMode() {
  if (typeof window === 'undefined') return false
  
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    return savedMode === 'true'
  }
  
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode)
  const [isHydrated, setIsHydrated] = useState(false)

  // Apply dark mode class to DOM after hydration
  useEffect(() => {
    setIsHydrated(true)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  // Update localStorage when dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false')
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, isHydrated }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider')
  }
  return context
}
