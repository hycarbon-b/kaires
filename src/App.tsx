import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import ChatPage from './pages/Chat'
import ApiPage from './pages/Api'
import FinLabPage from './pages/FinLab'
import KairosAppPage from './pages/KairosApp'
import ShowcasePage from './pages/Showcase'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#07070a] text-stone-100 antialiased">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/fin-lab" element={<FinLabPage />} />
          <Route path="/app" element={<KairosAppPage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
