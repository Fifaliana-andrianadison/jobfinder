import { useState, useEffect, useMemo, useCallback } from "react"
import type { Job, CategoryKey } from "../lib/types"
import { classifyJob } from "../lib/types"
import { fetchJobs } from "../lib/fetchJobs"

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [techFilter, setTechFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<CategoryKey | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const data = await fetchJobs()
        if (!cancelled) setJobs(data)
      } catch {
        if (!cancelled) setError("Erreur lors du chargement des offres")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const allTechs = useMemo(() => {
    const techSet = new Set<string>()
    for (const job of jobs) {
      if (job.techStack && job.techStack !== "Not specified") {
        const techs = job.techStack.split(/[,/()]+/).map(t => t.trim())
        for (const tech of techs) if (tech) techSet.add(tech)
      }
    }
    return Array.from(techSet).sort()
  }, [jobs])

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryKey, number> = { frontend: 0, backend: 0, fullstack: 0, mobile: 0, devops: 0, data: 0 }
    for (const job of jobs) {
      const cat = classifyJob(job)
      counts[cat]++
    }
    return counts
  }, [jobs])

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.techStack.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTech =
        !techFilter ||
        job.techStack.toLowerCase().includes(techFilter.toLowerCase())
      const matchesCategory =
        categoryFilter === "all" || classifyJob(job) === categoryFilter
      return matchesSearch && matchesTech && matchesCategory
    })
  }, [jobs, searchQuery, techFilter, categoryFilter])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)

  const paginatedJobs = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return filteredJobs.slice(start, start + itemsPerPage)
  }, [filteredJobs, safePage])

  const totalCompanies = useMemo(() => {
    return new Set(jobs.map(j => j.companyName)).size
  }, [jobs])

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q)
    setCurrentPage(1)
  }, [])

  const handleTechFilter = useCallback((t: string) => {
    setTechFilter(t)
    setCurrentPage(1)
  }, [])

  const handleCategoryFilter = useCallback((cat: CategoryKey | "all") => {
    setCategoryFilter(cat)
    setCurrentPage(1)
    window.scrollTo({ top: 600, behavior: "smooth" })
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 600, behavior: "smooth" })
  }, [])

  return {
    jobs,
    loading,
    error,
    searchQuery,
    techFilter,
    categoryFilter,
    currentPage: safePage,
    totalPages,
    paginatedJobs,
    filteredJobs,
    allTechs,
    totalCompanies,
    categoryCounts,
    handleSearch,
    handleTechFilter,
    handleCategoryFilter,
    handlePageChange,
  }
}
