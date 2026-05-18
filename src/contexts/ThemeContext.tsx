import { createContext, useContext, ReactNode } from "react"

interface ThemeCtxValue { isDark: boolean; toggle: () => void }
const ThemeCtx = createContext<ThemeCtxValue>({ isDark: true, toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeCtx.Provider value={{ isDark: true, toggle: () => {} }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeCtx)
}