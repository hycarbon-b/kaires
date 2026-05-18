import { Sun } from 'lucide-react'

export default function ThemeToggle() {
  return (
    <button
      title="KAIROS APP"
      className="p-2 rounded-lg text-stone-600 hover:text-stone-400 transition-colors"
    >
      <Sun size={15} />
    </button>
  )
}
