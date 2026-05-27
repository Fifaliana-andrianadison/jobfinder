import { motion } from "motion/react"
import { AlertCircle, RefreshCw, SearchX } from "lucide-react"
import type { Job } from "../../lib/types"
import { getJobImageIndex } from "../../lib/types"
import JobCard from "./JobCard"
import Pagination from "./Pagination"

interface JobListProps {
  jobs: Job[]
  allFilteredJobs: Job[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  images: string[]
  hasActiveFilter: boolean
  onPageChange: (page: number) => void
  onRetry: () => void
}

export default function JobList({
  jobs, allFilteredJobs, loading, error,
  currentPage, totalPages, images, hasActiveFilter,
  onPageChange, onRetry
}: JobListProps) {

  const displayJobs = hasActiveFilter ? allFilteredJobs : jobs
  const displayCount = displayJobs.length

  if (loading) {
    return (
      <section id="jobs" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse flex flex-col">
                <div className="h-44 bg-gray-200 shrink-0" />
                <div className="p-5 space-y-3 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded" />
                    <div className="h-6 w-6 bg-gray-200 rounded" />
                    <div className="h-6 w-6 bg-gray-200 rounded" />
                  </div>
                  <div className="h-9 bg-gray-200 rounded-xl w-full mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="jobs" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <p className="text-gray-900 font-semibold text-lg mb-1">Loading error</p>
            <p className="text-gray-500 text-sm mb-8">{error}</p>
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-200"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="jobs" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {hasActiveFilter ? "Search results" : "Remote jobs"}
            </h2>
            <p className="text-gray-500 mt-1">
              {displayCount} result{displayCount !== 1 ? "s" : ""} found{displayCount !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {displayCount === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
              <SearchX className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold text-lg mb-1">No jobs found</p>
            <p className="text-gray-500 text-sm">Try modifying your filters</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {displayJobs.map((job, i) => (
                <JobCard key={i} job={job} image={images[getJobImageIndex(job, images.length)] || ""} index={i} />
              ))}
            </div>
            {!hasActiveFilter && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            )}
          </>
        )}
      </div>
    </section>
  )
}