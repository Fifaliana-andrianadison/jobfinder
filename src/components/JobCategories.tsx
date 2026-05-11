import { motion } from "motion/react"
import { Monitor, Server, Layers, Smartphone, Cloud, Database, ChevronRight } from "lucide-react"
import type { JobCategory, CategoryKey } from "../lib/types"

interface Props {
  categoryCounts: Record<CategoryKey, number>
  activeCategory: CategoryKey | "all"
  onCategoryClick: (cat: CategoryKey | "all") => void
}

const categories: (JobCategory & { key: CategoryKey })[] = [
  { key: "frontend", name: "Frontend", icon: "devicon-react-original", description: "React, Vue, Angular, TypeScript, HTML/CSS", color: "from-cyan-500 to-blue-600" },
  { key: "backend", name: "Backend", icon: "devicon-nodejs-plain", description: "Node.js, Python, Java, Go, Rust, PHP", color: "from-emerald-500 to-teal-600" },
  { key: "fullstack", name: "Fullstack", icon: "devicon-javascript-plain", description: "Frontend + Backend, JS/TS, APIs, Bases de données", color: "from-amber-500 to-orange-600" },
  { key: "mobile", name: "Mobile", icon: "devicon-flutter-plain", description: "React Native, Flutter, Kotlin, Swift", color: "from-violet-500 to-purple-600" },
  { key: "devops", name: "DevOps & Cloud", icon: "devicon-docker-plain", description: "Docker, Kubernetes, AWS, GCP, Azure, CI/CD", color: "from-red-500 to-rose-600" },
  { key: "data", name: "Data & IA", icon: "devicon-python-plain", description: "Python, SQL, Machine Learning, Big Data, AI", color: "from-indigo-500 to-violet-600" },
]

const categoryIcons: Record<string, typeof Monitor> = {
  Frontend: Monitor, Backend: Server, Fullstack: Layers,
  Mobile: Smartphone, "DevOps & Cloud": Cloud, "Data & IA": Database,
}

export default function JobCategories({ categoryCounts, activeCategory, onCategoryClick }: Props) {
  const total = Object.values(categoryCounts).reduce((a, b) => a + b, 0)

  return (
    <section id="categories" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Types de postes
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {total} offres réparties dans 6 catégories. Cliquez pour filtrer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, index) => {
            const Icon = categoryIcons[cat.name]
            const count = categoryCounts[cat.key]
            const pct = total > 0 ? Math.round((count / total) * 100) : 0
            const isActive = activeCategory === cat.key

            return (
              <motion.button
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => onCategoryClick(isActive ? "all" : cat.key)}
                className={`group relative text-left w-full rounded-2xl border p-6 transition-all duration-500 overflow-hidden cursor-pointer ${
                  isActive
                    ? "border-indigo-300 bg-indigo-50/80 shadow-lg shadow-indigo-100/50 scale-[1.02]"
                    : "border-gray-200 bg-white hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${isActive ? "opacity-10" : ""}`} />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{cat.description}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-300 transition-all duration-300 ${
                    isActive ? "rotate-90 text-indigo-500" : "group-hover:translate-x-1"
                  }`} />
                </div>

                <div className="relative flex items-center gap-3 mt-2">
                  <div className="flex-1 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 min-w-[4rem] text-right">
                    {count} offres
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        {activeCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => onCategoryClick("all")}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-4"
            >
              Voir toutes les catégories →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
