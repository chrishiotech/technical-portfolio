export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#1e3a8a] px-4 py-12 sm:px-6 sm:py-16 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Info */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-2xl font-bold text-[#1e3a8a] flex-shrink-0">
                CA
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold truncate">
                  Christian Aguirre
                </div>
                <div className="text-sm sm:text-base text-slate-300">
                  Remote Frontend Architect & AI Automation
                </div>
              </div>
            </div>

            <p className="mb-8 max-w-md text-sm sm:text-base text-slate-300 leading-relaxed">
              Especializado en arquitecturas frontend escalables, consultoría
              técnica con ROI medible e implementaciones de IA de bajo costo
              para empresas.
            </p>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="mb-6 text-lg sm:text-xl font-bold">
              Conecta conmigo
            </h3>
            <div className="space-y-2 sm:space-y-4">
              <a
                href="https://linkedin.com/in/christian-aguirre"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-200 transition hover:text-white py-1 px-2 rounded-lg hover:bg-white/10"
              >
                <span className="text-lg sm:text-xl flex-shrink-0">💼</span>
                <span className="text-sm sm:text-base">
                  LinkedIn (Perfil Profesional)
                </span>
              </a>
              <a
                href="https://github.com/chrishiotech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-200 transition hover:text-white py-1 px-2 rounded-lg hover:bg-white/10"
              >
                <span className="text-lg sm:text-xl flex-shrink-0">🔧</span>
                <span className="text-sm sm:text-base">
                  GitHub (Código Abierto)
                </span>
              </a>
              <a
                href="mailto:contacto@christianaguirre.dev"
                className="flex items-center gap-3 text-slate-200 transition hover:text-white py-1 px-2 rounded-lg hover:bg-white/10"
              >
                <span className="text-lg sm:text-xl flex-shrink-0">✉️</span>
                <span className="text-sm sm:text-base break-all">
                  christian8.aguirre@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 border-t border-slate-600 pt-6 sm:pt-8 text-center text-slate-400">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} Christian Aguirre. Todos los derechos
            reservados.
          </p>
          <p className="mt-2 text-xs sm:text-sm">
            Built with React, TypeScript, Tailwind CSS & Vite.
          </p>
        </div>
      </div>
    </footer>
  );
}
