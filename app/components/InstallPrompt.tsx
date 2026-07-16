"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [isInstallable, setIsInstallable] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Écoute l'événement natif du navigateur qui permet l'installation
    const handler = (e: Event) => {
      e.preventDefault(); // Empêche l'affichage natif
      setDeferredPrompt(e); // Sauvegarde l'événement pour le déclencher plus tard
      setIsInstallable(true); // Affiche notre bouton personnalisé
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Affiche la vraie demande d'installation du téléphone
    deferredPrompt.prompt();
    
    // Attend le choix de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Installer l'app
      </button>
    </div>
  );
}