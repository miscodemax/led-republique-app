// app/data/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Users, MapPin, Loader2 } from "lucide-react";

interface Engagement {
  quartier: string;
  age: number | null;
}

const TRANCHES_AGE = [
  { label: "15-24", min: 15, max: 24 },
  { label: "25-34", min: 25, max: 34 },
  { label: "35-44", min: 35, max: 44 },
  { label: "45-54", min: 45, max: 54 },
  { label: "55+", min: 55, max: 200 },
];

const COULEUR_BARRE = "#2563eb"; // blue-600

export default function DataPage() {
  const [donnees, setDonnees] = useState<Engagement[] | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      const { data, error } = await supabase.from("engagements").select("quartier, age");
      if (error) {
        console.error("Erreur Supabase (page /data) :", error);
        setErreur(`Erreur : ${error.message}`);
        return;
      }
      console.log("Lignes reçues depuis Supabase :", data?.length ?? 0);
      setDonnees(data as Engagement[]);
    };
    charger();
  }, []);

  if (erreur) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 text-center">
        <p className="text-slate-500 font-semibold">{erreur}</p>
      </main>
    );
  }

  if (!donnees) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </main>
    );
  }

  // Agrégation par quartier
  const parQuartier = donnees.reduce<Record<string, number>>((acc, d) => {
    const q = d.quartier || "Non renseigné";
    acc[q] = (acc[q] || 0) + 1;
    return acc;
  }, {});
  const dataQuartier = Object.entries(parQuartier)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Agrégation par tranche d'âge
  const dataAge = TRANCHES_AGE.map((t) => ({
    name: t.label,
    value: donnees.filter((d) => d.age != null && d.age >= t.min && d.age <= t.max).length,
  }));

  const total = donnees.length;
  const quartierTop = dataQuartier[0]?.name ?? "—";
  const agesValides = donnees.map((d) => d.age).filter((a): a is number => a != null);
  const ageMoyen = agesValides.length
    ? Math.round(agesValides.reduce((a, b) => a + b, 0) / agesValides.length)
    : "—";

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Tableau de bord</span>
          <h1 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">Analyse des adhésions</h1>
          <p className="text-slate-500 text-sm mt-1">Suivi en temps réel de la mobilisation à Yoff.</p>
        </div>

        {/* Cartes résumé */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 sm:p-6">
            <Users className="h-5 w-5 text-blue-600 mb-2" />
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{total}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">Inscrits au total</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 sm:p-6">
            <MapPin className="h-5 w-5 text-blue-600 mb-2" />
            <p className="text-lg sm:text-xl font-black text-slate-900 truncate">{quartierTop}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">Quartier le plus mobilisé</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 sm:p-6">
            <span className="block text-xl mb-2">🎂</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{ageMoyen}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">Âge moyen</p>
          </div>
        </div>

        {/* Histogramme par quartier */}
        <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-4 sm:p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Effectif par quartier</h2>
          <div className="h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataQuartier} margin={{ top: 5, right: 5, bottom: 40, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#475569" }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#475569" }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  cursor={{ fill: "#eff6ff" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {dataQuartier.map((_, idx) => (
                    <Cell key={idx} fill={COULEUR_BARRE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Histogramme par âge */}
        <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Répartition par âge</h2>
          <div className="h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAge} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#475569" }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  cursor={{ fill: "#eff6ff" }}
                />
                <Bar dataKey="value" fill={COULEUR_BARRE} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6 text-center">
          Prochaine étape : carte dynamique de Yoff avec les zones les plus mobilisées.
        </p>
      </div>
    </main>
  );
}