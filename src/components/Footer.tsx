import { Heart, ArrowUp } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Job<span className="text-indigo-400">Finder</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              JobFinder agrège les meilleures offres d'emploi tech en remote. 
              Trouvez votre prochaine opportunité en un clic.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#jobs" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Offres</a></li>
              <li><a href="#categories" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Catégories</a></li>
              <li><a href="#stats" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Statistiques</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Légal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Confidentialité</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">CGU</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} JobFinder. Tous droits réservés.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-400 transition-colors group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Retour en haut
          </a>
        </div>
      </div>
    </footer>
  )
}
