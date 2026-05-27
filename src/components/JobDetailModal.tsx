import { motion, AnimatePresence } from "motion/react"
import { X, Briefcase, ExternalLink, Clock, MapPin, Calendar } from "lucide-react"
import type { Job } from "../lib/types"
import { computePopularity, getJobImageIndex, FALLBACK_IMAGES } from "../lib/types"
import { findTechIcons } from "../lib/techIcons"

interface JobDetailModalProps {
  job: Job | null
  open: boolean
  onClose: () => void
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return ""
  }
}

const ci = (icon: string) => `${icon} colored`

export default function JobDetailModal({ job, open, onClose }: JobDetailModalProps) {
  if (!job) return null

  const techIcons = findTechIcons(job.techStack)
  const popularity = computePopularity(job)
  const domain = getDomain(job.jobUrl)
  const imgSrc = FALLBACK_IMAGES[getJobImageIndex(job, FALLBACK_IMAGES.length)]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="relative h-56 overflow-hidden bg-gray-100 rounded-t-3xl">
              <img
                src={imgSrc}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            </div>

            <div className="p-6 space-y-5">
              <div className="mb-2">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{job.jobTitle}</h2>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.companyName}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {job.salaryRange && job.salaryRange !== "Not specified" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl">
                    {job.salaryRange}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-xl">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location || "Remote"}
                </span>
                {job.postedDate && job.postedDate !== "Not specified" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-xl">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(job.postedDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-xl">
                  <Clock className="w-3.5 h-3.5" />
                  Popularité: {popularity}%
                </span>
              </div>

              {techIcons.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {techIcons.map((icon, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700">
                        <i className={`${ci(icon)} text-lg`} />
                        {icon.replace("devicon-", "").replace("-plain", "").replace("-original", "").replace("-wordmark", "")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {job.applicationStatus && job.applicationStatus !== "Not specified" && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Statut</h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-xl">
                    {job.applicationStatus}
                  </span>
                </div>
              )}

              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300"
              >
                {domain && (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                    alt=""
                    className="w-5 h-5 rounded"
                  />
                )}
                Postuler sur {domain || "le site"}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
