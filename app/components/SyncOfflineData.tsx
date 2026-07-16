"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface OfflineInscription {
  nom_complet: string;
  telephone: string;
  quartier: string;
  age: number;
}

const CLE_STOCKAGE = "pending_engagements";

// Composant invisible, monté une fois dans le layout : il synchronise
// les inscriptions faites hors-ligne dès que la connexion revient,
// peu importe la page sur laquelle se trouve la personne.
export default function SyncOfflineData() {
  useEffect(() => {
    const synchroniser = async () => {
      const backup = localStorage.getItem(CLE_STOCKAGE);
      if (!backup) return;

      let liste: OfflineInscription[] = [];
      try {
        liste = JSON.parse(backup);
      } catch {
        localStorage.removeItem(CLE_STOCKAGE);
        return;
      }
      if (liste.length === 0) return;

      const restantes: OfflineInscription[] = [];

      // On insère une par une : une erreur sur une fiche ne doit jamais
      // bloquer la synchronisation des autres.
      for (const inscription of liste) {
        try {
          const { error } = await supabase.from("engagements").insert([inscription]);
          if (error) {
            // Numéro déjà enregistré : on considère que c'est déjà synchronisé,
            // on ne la garde pas en attente indéfiniment.
            if (error.code !== "23505") {
              restantes.push(inscription);
            }
          }
        } catch {
          restantes.push(inscription);
        }
      }

      if (restantes.length > 0) {
        localStorage.setItem(CLE_STOCKAGE, JSON.stringify(restantes));
      } else {
        localStorage.removeItem(CLE_STOCKAGE);
      }
    };

    synchroniser();
    window.addEventListener("online", synchroniser);
    return () => window.removeEventListener("online", synchroniser);
  }, []);

  return null;
}