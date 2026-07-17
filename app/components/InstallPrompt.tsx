"use client";

import { useEffect, useState } from "react";
import { Download, X, Share, Menu as MenuIcon } from "lucide-react";

// Bannière d'installation PWA — doit réapparaître à CHAQUE visite tant que
// l'app n'est pas installée. Un "fermer" ne la masque que pour la session
// en cours (sessionStorage), jamais définitivement (pas de localStorage ici).

type Plateforme = "android" | "ios" | "autre";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [plateforme, setPlateforme] = useState<Plateforme>("autre");

  useEffect(() => {
    const dejaFermeCetteSession = sessionStorage.getItem("led_pwa_masque_session");
    if (dejaFermeCetteSession) return;

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    // Déjà installée : on n'affiche jamais rien.
    if (isStandalone) return;

    const ua = window.navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (ua.includes("Mac") && "ontouchend" in document);

    if (isIOS) {
      setPlateforme("ios");
      setVisible(true);
    } else {
      // Android / autres navigateurs Chromium : on affiche la bannière
      // dès maintenant, avec un repli manuel si le prompt natif n'arrive pas.
      setPlateforme("android");
      setVisible(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Si l'app vient d'être installée, on masque la bannière immédiatement.
    const onInstalled = () => setVisible(false);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const installer = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choix = await deferredPrompt.userChoice;
      if (choix.outcome === "accepted") {
        setVisible(false);
      }
      setDeferredPrompt(null);
    }
    // Si deferredPrompt n'est pas encore dispo, le petit mode d'emploi
    // manuel affiché dans la bannière reste visible pour guider l'utilisateur.
  };

  const fermerPourCetteSession = () => {
    setVisible(false);
    sessionStorage.setItem("led_pwa_masque_session", "1");
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

          {plateforme === "ios" && (
            <p className="text-xs text-slate-300 mt-1 leading-relaxed flex items-center gap-1 flex-wrap">
              Appuie sur <Share className="h-3.5 w-3.5 inline" /> puis « Sur l'écran d'accueil » pour l'installer et l'utiliser même sans connexion.
            </p>
          )}

          {plateforme === "android" && deferredPrompt && (
            <>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Accède au site en un tap, même sans connexion internet.
              </p>
              <button
                onClick={installer}
                className="mt-3 h-9 px-4 rounded-xl bg-blue-600 text-xs font-bold active:scale-95 transition-all"
              >
                Installer maintenant
              </button>
            </>
          )}

          {plateforme === "android" && !deferredPrompt && (
            <p className="text-xs text-slate-300 mt-1 leading-relaxed flex items-center gap-1 flex-wrap">
              Ouvre le menu <MenuIcon className="h-3.5 w-3.5 inline" /> de ton navigateur puis choisis « Installer l'application » ou « Ajouter à l'écran d'accueil ».
            </p>
          )}
        </div>
        <button onClick={fermerPourCetteSession} aria-label="Fermer" className="text-slate-400 hover:text-white shrink-0">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}