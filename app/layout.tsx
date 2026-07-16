import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import InstallPrompt from "./components/InstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LED République | Le Renouveau de Yoff",
  description: "Site officiel du mouvement citoyen pour le progrès, l'autonomisation et l'engagement républicain à Yoff, porté par El Mansour Dia.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LED République",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900">
        
        {/* Navigation Premium */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
            
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
                LR
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                LED <span className="text-blue-600">République</span>
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
                <Link href="/#vision" className="hover:text-blue-600 transition-colors">Vision</Link>
                <Link href="/#piliers" className="hover:text-blue-600 transition-colors">Piliers</Link>
              </nav>
              
              <Link 
                href="/participer" 
                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
              >
                Rejoindre le mouvement
              </Link>
            </div>
            
          </div>
        </header>

        {/* Contenu Principal */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Footer Institutionnel */}
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
          </div>
        </footer>

        {/* Invite d'installation PWA */}
        <InstallPrompt />
      </body>
    </html>
  );
}