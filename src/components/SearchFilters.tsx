import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, X, Briefcase, Command, ChevronRight, Sparkles, Code2 } from "lucide-react"
import type { Job } from "../lib/types"
import { findTechIcons, getIconForTech } from "../lib/techIcons"

interface SearchFiltersProps {
  searchQuery: string
  techFilter: string
  allTechs: string[]
  filteredJobs: Job[]
  onSearch: (q: string) => void
  onTechFilter: (t: string) => void
  onSelectJob: (title: string) => void
}

export default function SearchFilters({
  searchQuery, techFilter, allTechs, filteredJobs,
  onSearch, onTechFilter, onSelectJob
}: SearchFiltersProps) {
  const [focused, setFocused] = useState(false)
  const [techPanel, setTechPanel] = useState(false)
  const [techSearch, setTechSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const techRef = useRef<HTMLDivElement>(null)

  const isMac = typeof navigator !== "undefined" && navigator.platform?.includes("Mac")

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      if (containerRef.current && !containerRef.current.contains(target) && techRef.current && !techRef.current.contains(target)) {
        setFocused(false)
        setTechPanel(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setFocused(true)
      }
      if (e.key === "Escape") { setFocused(false); setTechPanel(false) }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1) return []
    return filteredJobs.slice(0, 8)
  }, [filteredJobs, searchQuery])

  const techResults = useMemo(() => {
    const list = techSearch
      ? allTechs.filter(t => t.toLowerCase().includes(techSearch.toLowerCase()))
      : allTechs
    return list.slice(0, 60)
  }, [allTechs, techSearch])

  const highlight = (text: string, query: string) => {
    if (!query) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-indigo-600 font-semibold bg-indigo-50/80 rounded px-0.5">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    )
  }

  const topTechs = useMemo(() => {
    const freq: Record<string, number> = {}
    for (const job of filteredJobs.length > 0 ? filteredJobs : []) {
      const techs = job.techStack.split(/[,/()]+/).map(t => t.trim().toLowerCase())
      for (const t of techs) if (t && t !== "not specified") freq[t] = (freq[t] || 0) + 1
    }
    if (filteredJobs.length === 0) return allTechs.slice(0, 3)
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t]) => t)
  }, [allTechs, filteredJobs])

  const ci = (icon: string) => icon ? `${icon} colored` : ""

  return (
    <section className="py-10 -mt-24 relative z-30 bg-gradient-to-b from-gray-900/5 via-white/50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="flex-1 relative min-w-0" ref={containerRef}>
            <div
              className={`relative bg-white rounded-2xl shadow-xl border transition-all duration-300 ${
                focused ? "border-indigo-300 shadow-2xl shadow-indigo-200/30 ring-2 ring-indigo-500/10" : "border-gray-200/80"
              }`}
            >
              <div className="flex items-center px-4 py-3 gap-3">
                <Search className={`w-5 h-5 shrink-0 transition-colors ${focused ? "text-indigo-500" : "text-gray-400"}`} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Rechercher un poste remote, une entreprise, une technologie..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  onFocus={() => setFocused(true)}
                  className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-900 font-medium"
                />
                {searchQuery && (
                  <button onClick={() => { onSearch(""); inputRef.current?.focus() }}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-gray-100/80 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-500 shrink-0">
                  {isMac ? <Command className="w-2.5 h-2.5" /> : "Ctrl"} <span className="text-[11px]">K</span>
                </kbd>
              </div>

              <AnimatePresence>
                {focused && searchQuery && searchResults.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100 overflow-hidden"
                  >
                    <div className="px-3 py-2 bg-gray-50/50 border-b border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">
                        <Sparkles className="w-3 h-3 inline mr-1 text-indigo-500" />
                        {filteredJobs.length} résultat{filteredJobs.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {searchResults.map((job, i) => {
                        const icons = findTechIcons(job.techStack)
                        return (
                          <button key={i}
                            onClick={() => { onSelectJob(job.jobTitle); setFocused(false) }}
                            className="w-full text-left px-4 py-3 hover:bg-indigo-50/40 transition-colors border-b border-gray-50 last:border-0 group flex items-center gap-3"
                          >
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center shrink-0 group-hover:from-indigo-100 group-hover:to-indigo-200 transition-colors">
                              <Briefcase className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">{highlight(job.jobTitle, searchQuery)}</p>
                              <p className="text-xs text-gray-500 mt-0.5 truncate">
                                {highlight(job.companyName, searchQuery)}
                                {job.salaryRange && job.salaryRange !== "Not specified" && (
                                  <span className="ml-2 text-emerald-600 font-medium">{job.salaryRange}</span>
                                )}
                              </p>
                              {icons.length > 0 && (
                                <div className="flex gap-1.5 mt-1.5">
                                  {icons.slice(0, 4).map((icon, idx) => (
                                    <i key={idx} className={`${ci(icon)} text-sm bg-white/80 rounded-md px-1`} />
                                  ))}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors shrink-0" />
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2" ref={techRef}>
            <div className="flex items-center">
              {topTechs.map((tech, i) => {
                const icon = getIconForTech(tech)
                const isActive = techFilter.toLowerCase() === tech.toLowerCase()
                return (
                  <button key={tech}
                    onClick={() => { onTechFilter(isActive ? "" : tech); setTechPanel(false) }}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                      isActive
                        ? "border-indigo-500 bg-indigo-100 shadow-md shadow-indigo-200/50 scale-110 z-10 ring-2 ring-indigo-500/20"
                        : "border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-indigo-300"
                    }`}
                    style={{ zIndex: 3 - i, marginLeft: i === 0 ? 0 : -10 }}
                    title={`${tech}${isActive ? " (actif)" : ""}`}
                  >
                    {icon ? <i className={`${ci(icon)} text-2xl`} /> : <span className="text-[9px] font-bold text-gray-500 uppercase">{tech.slice(0, 2)}</span>}
                  </button>
                )
              })}
              <button onClick={() => setTechPanel(!techPanel)}
                className="relative w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 bg-white/80 hover:bg-white hover:border-indigo-400 hover:shadow-md transition-all duration-200 -ml-3 hover:-translate-y-1"
                style={{ zIndex: 0 }}
                title="Toutes les technologies"
              >
                <Code2 className="w-5 h-5 text-indigo-500" />
              </button>
            </div>

            {techFilter && (
              <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2.5 py-1.5 rounded-full flex items-center gap-1"
              >
                {getIconForTech(techFilter) && <i className={`${ci(getIconForTech(techFilter)!)} text-sm`} />}
                {techFilter}
                <button onClick={() => onTechFilter("")} className="ml-0.5 hover:bg-indigo-100 rounded-full p-0.5"><X className="w-2.5 h-2.5" /></button>
              </motion.span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {techPanel && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="relative mt-3 w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Chercher une technologie..." value={techSearch}
                    onChange={(e) => setTechSearch(e.target.value)} autoFocus
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto p-3">
                <div className="flex flex-wrap gap-2">
                  {techResults.map((tech) => {
                    const icon = getIconForTech(tech)
                    const isActive = techFilter.toLowerCase() === tech.toLowerCase()
                    return (
                      <button key={tech} onClick={() => { onTechFilter(isActive ? "" : tech); setTechPanel(false) }}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5"
                        }`}
                      >
                        {icon && <i className={`${ci(icon)} text-xl`} />}
                        <span>{tech}</span>
                        {isActive && <X className="w-3 h-3 ml-1" />}
                      </button>
                    )
                  })}
                </div>
                {techResults.length === 0 && <p className="text-center py-8 text-sm text-gray-400">Aucune technologie trouvée</p>}
              </div>
              <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">{allTechs.length} technologies disponibles</span>
                <button onClick={() => { onTechFilter(""); setTechPanel(false); setTechSearch("") }}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Réinitialiser</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
