import { motion } from "motion/react"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-30  h-30 bg-gradient-to-br rounded-xl flex items-center justify-center ">
            <img src="/logo-job.png" alt="JobFinder" />
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#jobs" className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full">Jobs</a>
          <a href="#stats" className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full">Statistics</a>
          <a href="#categories" className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full">Categories</a>
          <a href="/" className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors px-3 py-1.5 border border-gray-200 rounded-lg hover:border-indigo-200">Français</a>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3"
        >
          <a href="#jobs" onClick={() => setOpen(false)} className="block text-sm text-gray-600 hover:text-indigo-600 font-medium py-2">Jobs</a>
          <a href="#stats" onClick={() => setOpen(false)} className="block text-sm text-gray-600 hover:text-indigo-600 font-medium py-2">Statistics</a>
          <a href="#categories" onClick={() => setOpen(false)} className="block text-sm text-gray-600 hover:text-indigo-600 font-medium py-2">Categories</a>
          <a href="/" onClick={() => setOpen(false)} className="block text-sm text-indigo-600 font-medium py-2 border-t border-gray-100 pt-3 mt-3">Français</a>
        </motion.div>
      )}
    </motion.header>
  )
}
