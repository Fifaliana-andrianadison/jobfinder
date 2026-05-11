import { motion } from "motion/react"
import { Briefcase, ExternalLink, Clock, TrendingUp } from "lucide-react"
import type { Job } from "../lib/types"
import { computePopularity, getJobImageIndex, FALLBACK_IMAGES } from "../lib/types"
import { findTechIcons } from "../lib/techIcons"

interface JobCardProps {
  job: Job
  image: string
  index: number
}

const getPopularityColor = (p: number) => {
  if (p >= 70) return "from-emerald-500 to-green-500"
  if (p >= 40) return "from-amber-500 to-orange-500"
  return "from-red-500 to-rose-500"
}

const getPopularityLabel = (p: number) => {
  if (p >= 70) return "Très actif"
  if (p >= 40) return "Modéré"
  return "Faible"
}

const getPopularityBg = (p: number) => {
  if (p >= 70) return "bg-emerald-500"
  if (p >= 40) return "bg-amber-500"
  return "bg-red-500"
}

const ci = (icon: string) => `${icon} colored`

export default function JobCard({ job, image, index }: JobCardProps) {
  const techIcons = findTechIcons(job.techStack)
  const popularity = computePopularity(job)
  const imgSrc = image || FALLBACK_IMAGES[getJobImageIndex(job, FALLBACK_IMAGES.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
    >
      <div className="relative h-44 shrink-0 overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            const target = e.currentTarget
            if (!target.dataset.fallback) {
              target.dataset.fallback = "true"
              target.src = FALLBACK_IMAGES[getJobImageIndex(job, FALLBACK_IMAGES.length)]
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 right-3">
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg ${getPopularityBg(popularity)}`}>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {popularity}%
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] text-white font-medium border border-white/10">
            {job.location || "Remote"}
          </span>
          <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full text-[11px] text-white font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {job.postedDate && job.postedDate !== "Not specified"
              ? new Date(job.postedDate).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })
              : "Récent"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1.5">
            {job.jobTitle}
          </h3>
          <p className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{job.companyName}</span>
          </p>

          {job.salaryRange && job.salaryRange !== "Not specified" && (
            <p className="text-xs text-emerald-600 font-medium mb-3 bg-emerald-50 px-2.5 py-1 rounded-md inline-block truncate max-w-full">
              {job.salaryRange}
            </p>
          )}

          {techIcons.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {techIcons.map((icon, i) => (
                <i key={i} className={`${ci(icon)} text-xl bg-gray-50/80 rounded-lg p-1`} title={icon.replace("devicon-", "").replace("-plain", "").replace("-original", "")} />
              ))}
            </div>
          )}

          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Activité</span>
              <span className={getPopularityBg(popularity).replace("bg-", "text-")}>{getPopularityLabel(popularity)}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${popularity}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className={`h-full rounded-full bg-gradient-to-r ${getPopularityColor(popularity)}`}
              />
            </div>
          </div>
        </div>

        <a
          href={job.jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 mt-auto"
        >
          Postuler
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  )
}
