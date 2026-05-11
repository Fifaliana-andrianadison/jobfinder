import { motion } from "motion/react"
import { useState, useEffect, useRef } from "react"
import { Briefcase, Building2, Code2, Eye, TrendingUp } from "lucide-react"

interface StatsCounterProps {
  totalJobs: number
  totalCompanies: number
  totalTechs: number
}

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    setCount(0)
    const frames = duration / 16
    const increment = end / frames
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.round(current))
    }, 16)
    return () => clearInterval(timer)
  }, [visible, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function StatsCounter({ totalJobs, totalCompanies, totalTechs }: StatsCounterProps) {
  const stats = [
    { label: "Offres d'emploi", value: totalJobs, icon: Briefcase, color: "from-indigo-500 to-indigo-600", suffix: "+" },
    { label: "Entreprises", value: totalCompanies, icon: Building2, color: "from-emerald-500 to-teal-500", suffix: "+" },
    { label: "Technologies", value: totalTechs, icon: Code2, color: "from-amber-500 to-orange-500", suffix: "+" },
    { label: "Vues aujourd'hui", value: 1247, icon: Eye, color: "from-rose-500 to-pink-500", suffix: "" },
  ]

  return (
    <section id="stats" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Chiffres clés
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            L'écosystème tech en chiffres
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 mb-5 shadow-lg"
                  style={{
                    backgroundImage: i === 0
                      ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                      : i === 1
                        ? 'linear-gradient(135deg, #10b981, #0d9488)'
                        : i === 2
                          ? 'linear-gradient(135deg, #f59e0b, #f97316)'
                          : 'linear-gradient(135deg, #f43f5e, #e11d48)'
                  }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl md:text-5xl font-bold text-white mb-2 tabular-nums">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                <div className="mt-3 mx-auto w-0 group-hover:w-12 h-0.5 bg-gradient-to-r transition-all duration-500" style={{ backgroundImage: stat.color.replace("from-", "linear-gradient(to right, ").replace(" to-", ", ") + ")" }} />
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-300">
              <strong className="text-emerald-400">+{Math.round(totalJobs * 0.15)}</strong> nouvelles offres cette semaine
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
