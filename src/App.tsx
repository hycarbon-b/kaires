import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import Sidebar from "./components/Sidebar"
import ChatPage from "./pages/ChatPage"
import ImageWorkbench from "./pages/ImageWorkbench"

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden" style={{ background: "#07070a" }}>
          <Sidebar />
          <main className="flex-1 min-w-0 overflow-hidden dot-bg">
            <Routes>
              <Route path="/" element={<Navigate to="/chat" replace />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:id" element={<ChatPage />} />
              <Route path="/image" element={<ImageWorkbench />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}