import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type ThemeData = {
  theme: boolean
  setDarkTheme: () => void
  SunEmoji: () => JSX.Element
  MoonEmoji: () => JSX.Element
}

export const ThemeContext = createContext({} as ThemeData)

type ThemeContextProviderProps = {
  children: ReactNode
}

function SunEmoji() {
  return (
    <>&nbsp;☀️</>
  )
}

function MoonEmoji() {
  return (
    <>&nbsp;🌙</>
  )
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme) {
      if (theme === 'dark') {
        setTheme(true)
      }
    }
  }, [])

  function setDarkTheme() {
    setTheme(!theme)
  }

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', 'dark')
      addParamOnDocument('dark')
    } else {
      localStorage.setItem('theme', 'light')
      addParamOnDocument('light')
    }
  }, [theme])

  function addParamOnDocument(colorScheme: string) {
    document.documentElement.setAttribute('data-theme', colorScheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setDarkTheme, SunEmoji, MoonEmoji }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
