"use client";

import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";

// Bannière d'installation PWA — se déclenche dès le chargement du site.
// - Android / Chrome / Edge : bouton natif "Installer" via beforeinstallprompt
// - iOS Safari : ce navigateur ne propose pas d'installation automatique,
//   on affiche donc une instruction claire ("Partager > Sur l'écran d'accueil")

export default function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState<"android" | "ios" | null>(null);

  useEffect(() => {
    // Ne pas réafficher si déjà installé ou déjà refusé récemment
    const alreadyDismissed = localStorage.getItem("led_pwa_dismissed");
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    const ua = window.navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isIOS) {
      setPlatform("ios");
      if (!alreadyDismissed) setVisible(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setPlatform("android");
      if (!alreadyDismissed) setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installer = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  const fermer = () => {
    setVisible(false);
    localStorage.setItem("led_pwa_dismissed", "1");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[90] p-3 sm:p-4">
      <div className="mx-auto max-w-md rounded-2xl bg-slate-900 text-white shadow-2xl p-4 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold">Installe l'appli LED République</p>
          {platform === "ios" ? (
            <p className="text-xs text-slate-300 mt-1 leading-relaxed flex items-center gap-1 flex-wrap">
              Appuie sur <Share className="h-3.5 w-3.5 inline" /> puis « Sur l'écran d'accueil » pour l'ajouter et l'utiliser même sans connexion.
            </p>
          ) : (
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Accède au site en un tap, même sans connexion internet.
            </p>
          )}
          {platform === "android" && (
            <button
              onClick={installer}
              className="mt-3 h-9 px-4 rounded-xl bg-blue-600 text-xs font-bold active:scale-95 transition-all"
            >
              Installer maintenant
            </button>
          )}
        </div>
        <button onClick={fermer} aria-label="Fermer" className="text-slate-400 hover:text-white shrink-0">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}