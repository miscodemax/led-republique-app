import Link from "next/link";
import { Youtube } from "lucide-react";

// Remplace les "#" par tes vrais liens YouTube / TikTok quand tu les as
const RESEAUX = [
  { href: "#", label: "YouTube", Icon: Youtube },
  { href: "#", label: "TikTok", Icon: TikTokIcon },
];

// lucide-react n'a pas d'icône TikTok native, on la dessine en SVG simple
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 5.82c-.9-.83-1.46-1.98-1.6-3.32h-3.2v13.44a2.72 2.72 0 1 1-2.72-2.72c.24 0 .48.03.7.08V10.1a6.02 6.02 0 0 0-.7-.04A6.02 6.02 0 1 0 15.1 16v-6.9a8.5 8.5 0 0 0 4.9 1.55V7.45c-1.24 0-2.4-.44-3.4-1.63Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-4 flex justify-center">
          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400">
            LR
          </div>
        </div>

        <p className="font-bold text-slate-800 text-base">LED République © 2026</p>
        <p className="mt-2 text-xs max-w-md mx-auto leading-relaxed">
          Un mouvement citoyen indépendant dédié à l'innovation sociale, à la transparence politique et au développement de la commune de Yoff.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {RESEAUX.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}