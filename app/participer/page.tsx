// app/participer/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Check, AlertCircle, RefreshCw } from "lucide-react";

const QUARTIERS = [
  "Tonghor",
  "Layène",
  "Dagoudane",
  "Mbenguene",
  "Ndeungagne",
  "Ouest-Foire",
  "Nord-Foire",
  "Cité Biagui",
  "Djily Mbaye",
  "Cité Avion"
];

interface OfflineInscription {
  nom_complet: string;
  telephone: string;
  quartier: string;
}

export default function Participer() {
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [quartierSelectionne, setQuartierSelectionne] = useState("");
  
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | "offline"; message: string } | null>(null);

  // Écouter l'état du réseau internet
  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const checkOnline = () => {
      setIsOffline(false);
      synchroDonneesLocales();
    };
    const checkOffline = () => setIsOffline(true);

    window.addEventListener("online", checkOnline);
    window.addEventListener("offline", checkOffline);

    // Première synchro de contrôle au chargement de l'écran
    synchroDonneesLocales();

    return () => {
      window.removeEventListener("online", checkOnline);
      window.removeEventListener("offline", checkOffline);
    };
  }, []);

  // Synchronisation automatique des fiches sauvées hors-ligne
  const synchroDonneesLocales = async () => {
    const backup = localStorage.getItem("pending_engagements");
    if (!backup) return;

    const inscriptions: OfflineInscription[] = JSON.parse(backup);
    if (inscriptions.length === 0) return;

    try {
      const { error } = await supabase.from("engagements").insert(inscriptions);
      if (!error) {
        localStorage.removeItem("pending_engagements");
        console.log("Synchronisation réussie avec Supabase !");
      }
    } catch (err) {
      console.warn("Échec de la reconnexion automatique :", err);
    }
  };

  const validerFormulaire = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quartierSelectionne) {
      setStatus({ type: "error", message: "Sélectionne ton quartier pour continuer." });
      return;
    }

    setLoading(true);
    setStatus(null);

    const data: OfflineInscription = {
      nom_complet: nom.trim(),
      telephone: tel.trim(),
      quartier: quartierSelectionne,
    };

    // Gestion du scénario HORS-LIGNE
    if (!navigator.onLine) {
      const existants = localStorage.getItem("pending_engagements");
      const liste = existants ? JSON.parse(existants) : [];
      liste.push(data);
      localStorage.setItem("pending_engagements", JSON.stringify(liste));

      setStatus({
        type: "offline",
        message: "💾 Enregistré localement ! Ton inscription s'enverra dès que ta connexion internet reviendra.",
      });
      reinitialiserChamps();
      setLoading(false);
      return;
    }

    // Gestion du scénario EN LIGNE classique
    try {
      const { error } = await supabase.from("engagements").insert([data]);
      if (error) throw error;

      setStatus({
        type: "success",
        message: "🇸🇳 Jërëjëf ! Ton engagement a été enregistré avec succès.",
      });
      reinitialiserChamps();
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.code === "23505" 
          ? "Ce numéro de téléphone est déjà enregistré !" 
          : "Un problème est survenu. Réessaye dans un instant.",
      });
    } finally {
      setLoading(false);
    }
  };

  const reinitialiserChamps = () => {
    setNom("");
    setTel("");
    setQuartierSelectionne("");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      {/* Alert réseau dynamique */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white text-center py-2 text-xs font-bold animate-pulse flex items-center justify-center gap-1.5">
          <AlertCircle className="h-4 w-4" />
          Mode hors-ligne • Les données s&apos;enregistrent sur votre téléphone
        </div>
      )}

      <div className="mx-auto max-w-md">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 mb-6 hover:text-slate-900">
          <ChevronLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        {/* Bloc d'affiche pour motiver l&apos;engagement */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl border border-b-0 border-slate-200 bg-slate-100 shadow-sm">
          <Image 
            src="/img/IMG-20260715-WA0050.jpg" 
            alt="Événement du 26 Juillet" 
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-white rounded-b-3xl border border-t-0 border-slate-200 shadow-md p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Formulaire d&apos;Engagement</h1>
            <p className="text-slate-500 text-sm mt-1">Rejoins LED République et participe au grand lancement de Yoff.</p>
          </div>

          {status && (
            <div className={`p-4 rounded-2xl mb-6 text-sm font-bold flex items-start gap-2.5 ${
              status.type === "success" ? "bg-blue-50 text-blue-900 border border-blue-200" :
              status.type === "offline" ? "bg-amber-50 text-amber-900 border border-amber-200" :
              "bg-rose-50 text-rose-900 border border-rose-200"
            }`}>
              {status.type === "success" && <Check className="h-5 w-5 shrink-0 text-blue-600" />}
              {status.type === "offline" && <RefreshCw className="h-5 w-5 shrink-0 text-amber-600 animate-spin" />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={validerFormulaire} className="space-y-6">
            {/* Saisie Nom */}
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                Prénom & Nom complet
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Amadou Diop"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 text-base"
              />
            </div>

            {/* Saisie Téléphone */}
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
                className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 text-base"
              />
            </div>

            {/* Choix du Quartier */}
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

            {/* Gros bouton de validation */}
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