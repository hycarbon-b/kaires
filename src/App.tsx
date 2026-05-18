import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Sidebar from "./components/Sidebar"
import ChatPage from "./pages/ChatPage"
import ImageWorkbench from "./pages/ImageWorkbench"
import AuthPage from "./pages/AuthPage"
import AccountPage from "./pages/AccountPage"

function RequireAuth({ children }: { children: ReactNode }) {
  const { account, loading } = useAuth()
  if (loading) return <div className="h-screen" style={{ background: "#07070a" }} />
  if (!account) return <Navigate to="/login" replace />
  return children
}

function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#07070a" }}>
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-hidden dot-bg">
        <Routes>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/image" element={<ImageWorkbench />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/*" element={<RequireAuth><AppShell /></RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}