export interface Job {
  jobTitle: string
  companyName: string
  salaryRange: string
  techStack: string
  location: string
  jobUrl: string
  postedDate: string
  applicationStatus: string
}

export interface JobCategory {
  name: string
  icon: string
  description: string
  color: string
}

export type CategoryKey = "frontend" | "backend" | "fullstack" | "mobile" | "devops" | "data"

export function classifyJob(job: Job): CategoryKey {
  const t = job.jobTitle.toLowerCase()
  const s = job.techStack.toLowerCase()
  if (t.includes("front") || s.includes("react") || s.includes("vue") || s.includes("angular") || s.includes("css") || s.includes("html")) return "frontend"
  if (t.includes("full") || t.includes("fullstack") || (t.includes("full") && t.includes("stack"))) return "fullstack"
  if (t.includes("back") || s.includes("node") || s.includes("python") || s.includes("java") || s.includes("go") || s.includes("rust") || s.includes("php") || s.includes("c#") || s.includes(".net")) return "backend"
  if (t.includes("mobile") || s.includes("flutter") || s.includes("react native") || s.includes("android") || s.includes("swift") || s.includes("kotlin") || s.includes("dart")) return "mobile"
  if (t.includes("devops") || t.includes("cloud") || s.includes("docker") || s.includes("kubernetes") || s.includes("aws") || s.includes("ci/cd") || s.includes("terraform")) return "devops"
  if (t.includes("data") || t.includes("ai") || t.includes("machine learning") || t.includes("ml") || (s.includes("python") && (t.includes("data") || t.includes("ai") || t.includes("ml")))) return "data"
  if (s.includes("react") || s.includes("vue") || s.includes("angular") || s.includes("css")) return "frontend"
  if (s.includes("node") || s.includes("python") || s.includes("java") || s.includes("go") || s.includes("rust") || s.includes("php") || s.includes("c#") || s.includes(".net") || s.includes("ruby")) return "backend"
  return "fullstack"
}

export function computePopularity(job: Job): number {
  let score = 30
  if (job.salaryRange && job.salaryRange !== "Not specified" && job.salaryRange !== "Not provided") score += 25
  const techs = job.techStack.split(/[,/()]+/).filter(t => t.trim() && t !== "Not specified")
  score += Math.min(techs.length * 5, 20)
  if (job.jobUrl && job.jobUrl !== "Not specified" && job.jobUrl !== "N/A" && job.jobUrl !== "Not provided") score += 10
  if (job.postedDate && job.postedDate !== "Not specified") {
    const age = Date.now() - new Date(job.postedDate).getTime()
    if (age < 86400000 * 30) score += 15
  }
  return Math.min(score, 100)
}

export function getJobImageIndex(job: Job, max: number): number {
  let hash = 0
  const str = job.jobTitle + job.companyName
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % max
}

export const FALLBACK_IMAGES = [
  "https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/7988114/pexels-photo-7988114.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/4008702/pexels-photo-4008702.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/4315997/pexels-photo-4315997.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/8524599/pexels-photo-8524599.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/5712527/pexels-photo-5712527.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/34212896/pexels-photo-34212896.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/6193389/pexels-photo-6193389.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/13988974/pexels-photo-13988974.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/34804001/pexels-photo-34804001.jpeg?auto=compress&cs=tinysrgb&w=400",
]
