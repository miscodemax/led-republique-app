import Link from "next/link";
import Image from "next/image";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="relative mx-auto mb-6 h-16 w-16 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/20">
          <Image src="/icon-192.png" alt="LED République" fill className="object-cover" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-black text-blue-700 uppercase tracking-widest">
          <Compass className="h-3.5 w-3.5" />
          Quartier introuvable
        </div>

        <h1 className="mt-6 text-7xl font-black text-slate-900 tracking-tight">404</h1>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Cette page n'existe pas encore sur la carte de Yoff
        </h2>
        <p className="mt-3 text-base text-slate-500 leading-relaxed">
          Le lien que tu as suivi mène nulle part — ou pas encore. Pendant qu'on répare ça, retourne vers ce qui compte vraiment : le mouvement.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <Link
            href="/participer"
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-2xl border-2 border-slate-200 px-6 text-sm font-bold text-slate-700 hover:border-blue-200 hover:text-blue-600 transition-all active:scale-95"
          >
            Rejoindre le mouvement
          </Link>
        </div>
      </div>
    </main>
  );
}