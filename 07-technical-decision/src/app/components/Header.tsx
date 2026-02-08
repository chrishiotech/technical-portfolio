import { Menu, X } from "lucide-react";
import { useState } from "react";

// Header.tsx
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e3a8a] text-xl font-bold text-white">
            CA
          </div>
          <span className="text-xl font-bold text-[#1e3a8a]">
            Christian Aguirre
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="https://landing-chi-liart.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium text-slate-700 hover:text-[#1e3a8a]"
          >
            🏠 Home
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 font-medium text-slate-700 hover:text-[#1e3a8a]"
          >
            📧 Contacto
          </a>
          <a
            href="https://github.com/chrishiotech/technical-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#1e3a8a] px-6 py-2 font-medium text-white transition hover:bg-slate-800"
          >
            📂 Revisar Arquitectura
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-6 py-4 space-y-4">
            <a
              href="https://landing-chi-liart.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium text-slate-700 hover:text-[#1e3a8a] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 Home
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 py-2 font-medium text-slate-700 hover:text-[#1e3a8a]"
              onClick={() => setIsMenuOpen(false)}
            >
              📧 Contacto
            </a>
            <a
              href="https://github.com/chrishiotech/technical-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-[#1e3a8a] px-6 py-2 font-medium text-white transition hover:bg-slate-800 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Ver Proyectos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
