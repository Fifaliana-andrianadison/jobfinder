import { useState, useEffect } from "react"
import { useJobs } from "./hooks/useJobs"
import { getPexelsPhotos } from "./lib/pexels"
import type { Job } from "./lib/types"
import Header from "./components/Header"
import HeroBanner from "./components/HeroBanner"
import SearchFilters from "./components/SearchFilters"
import JobList from "./components/JobList"
import StatsCounter from "./components/StatsCounter"
import JobCategories from "./components/JobCategories"
import Footer from "./components/Footer"
import JobDetailModal from "./components/JobDetailModal"

export default function AppFrench() {
  const {
    jobs,
    loading,
    error,
    searchQuery,
    techFilter,
    categoryFilter,
    currentPage,
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
  } = useJobs()

  const [pexelsImages, setPexelsImages] = useState<string[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  useEffect(() => {
    getPexelsPhotos().then(setPexelsImages)
  }, [])

  const uniqueTechs = new Set<string>()
  for (const job of jobs) {
    if (job.techStack && job.techStack !== "Not specified") {
      const techs = job.techStack.split(/[,/()]+/).map(t => t.trim())
      for (const tech of techs) if (tech) uniqueTechs.add(tech)
    }
  }

  const hasActiveFilter = !!(searchQuery || techFilter || categoryFilter !== "all")

  const handleSelectJob = (title: string) => {
    handleSearch(title)
    setTimeout(() => {
      document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  return (
    <>
      <Header />
      <HeroBanner jobCount={jobs.length} />
      <SearchFilters
        searchQuery={searchQuery}
        techFilter={techFilter}
        allTechs={allTechs}
        filteredJobs={filteredJobs}
        onSearch={handleSearch}
        onTechFilter={handleTechFilter}
        onSelectJob={handleSelectJob}
      />
      <JobList
        jobs={paginatedJobs}
        allFilteredJobs={filteredJobs}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        images={pexelsImages}
        hasActiveFilter={hasActiveFilter}
        onPageChange={handlePageChange}
        onRetry={() => window.location.reload()}
      />
      <StatsCounter totalJobs={jobs.length} totalCompanies={totalCompanies} totalTechs={uniqueTechs.size} />
      <JobCategories
        categoryCounts={categoryCounts}
        activeCategory={categoryFilter}
        onCategoryClick={handleCategoryFilter}
      />
      <JobDetailModal
        open={!!selectedJob}
        job={selectedJob as Job}
        onClose={() => setSelectedJob(null)}
      />
      <Footer />
    </>
  )
}