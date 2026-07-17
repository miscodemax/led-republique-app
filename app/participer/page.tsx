// app/participer/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, AlertCircle } from "lucide-react";

const QUARTIERS = [
  "Tonghor",
  "Layène",
  "Apecsy",
  "Dagoudane",
  "Mbenguene",
  "Ndeungagne",
  "Ouest-Foire",
  "Nord-Foire",
  "Cité Biagui",
  "Djily Mbaye",
  "Cité Avion",
  "autres",
];

interface OfflineInscription {
  nom_complet: string;
  telephone: string;
  quartier: string;
  age: number;
}

export default function Participer() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [age, setAge] = useState("");
  const [quartierSelectionne, setQuartierSelectionne] = useState("");

  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const checkOnline = () => setIsOffline(false);
    const checkOffline = () => setIsOffline(true);

    window.addEventListener("online", checkOnline);
    window.addEventListener("offline", checkOffline);
    return () => {
      window.removeEventListener("online", checkOnline);
      window.removeEventListener("offline", checkOffline);
    };
  }, []);

  // Redirige vers l'accueil avec un petit message de remerciement en wolof
  const allerVersAccueilAvecMerci = (prenomAffiche: string) => {
    sessionStorage.setItem("led_merci_nom", prenomAffiche || "cher(e) camarade");
    router.push("/");
  };

  const validerFormulaire = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);

    if (!quartierSelectionne) {
      setErreur("Sélectionne ton quartier pour continuer.");
      return;
    }

    const ageNombre = parseInt(age, 10);
    if (!age || isNaN(ageNombre) || ageNombre < 15 || ageNombre > 100) {
      setErreur("Entre un âge valide.");
      return;
    }

    setLoading(true);

    const data: OfflineInscription = {
      nom_complet: nom.trim(),
      telephone: tel.trim(),
      quartier: quartierSelectionne,
      age: ageNombre,
    };
    const prenom = data.nom_complet.split(" ")[0] || "cher(e) camarade";

    // Scénario HORS-LIGNE : on sauvegarde en local puis on redirige quand même
    if (!navigator.onLine) {
      const existants = localStorage.getItem("pending_engagements");
      const liste = existants ? JSON.parse(existants) : [];
      liste.push(data);
      localStorage.setItem("pending_engagements", JSON.stringify(liste));

      setLoading(false);
      allerVersAccueilAvecMerci(prenom);
      return;
    }

    // Scénario EN LIGNE
    try {
      const { error } = await supabase.from("engagements").insert([data]);
      if (error) throw error;
      setLoading(false);
      allerVersAccueilAvecMerci(prenom);
    } catch (err: any) {
      setLoading(false);
      setErreur(
        err.code === "23505"
          ? "Ce numéro de téléphone est déjà enregistré !"
          : "Un problème est survenu. Réessaye dans un instant."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white text-center py-2 text-xs font-bold flex items-center justify-center gap-1.5">
          <AlertCircle className="h-4 w-4" />
          Mode hors-ligne • Ton inscription sera enregistrée sur ton téléphone
        </div>
      )}

      <div className="mx-auto max-w-md">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 mb-6 hover:text-slate-900">
          <ChevronLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl border border-b-0 border-slate-200 bg-slate-100 shadow-sm">
          <Image src="/img/IMG-20260715-WA0050.jpg" alt="Événement du 26 Juillet" fill className="object-cover" />
        </div>

        <div className="bg-white rounded-b-3xl border border-t-0 border-slate-200 shadow-md p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Formulaire d&apos;Engagement</h1>
            <p className="text-slate-500 text-sm mt-1">Rejoins LED République et participe au grand lancement de Yoff.</p>
          </div>

          {erreur && (
            <div className="p-4 rounded-2xl mb-6 text-sm font-bold flex items-start gap-2.5 bg-rose-50 text-rose-900 border border-rose-200">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
              <span>{erreur}</span>
            </div>
          )}

          <form onSubmit={validerFormulaire} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                Prénom &amp; Nom complet
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Amadou Diop"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 text-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                required
                placeholder="Ex: 77 123 45 67"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 text-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                Âge
              </label>
              <input
                type="number"
                required
                inputMode="numeric"
                placeholder="Ex: 27"
                min={15}
                max={100}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 text-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                Sélectionne ton quartier de Yoff
              </label>
              <div className="flex flex-wrap gap-2">
                {QUARTIERS.map((q) => {
                  const estChoisi = quartierSelectionne === q;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuartierSelectionne(q)}
                      className={`px-4 py-2.5 rounded-full text-xs font-black tracking-wide border-2 transition-all active:scale-95 ${
                        estChoisi
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {q}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center text-lg disabled:opacity-50 mt-4"
            >
              {loading ? "Enregistrement en cours..." : "Valider mon inscription 🇸🇳"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}