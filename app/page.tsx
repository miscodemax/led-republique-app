"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone, 
  Users, 
  Award, 
  Anchor, 
  Trash2, 
  ShieldCheck, 
  Compass, 
  Play
} from "lucide-react";

const PILIERS = [
  { icon: Smartphone, title: "Le Numérique", desc: "Moderniser l'administration locale et faciliter l'accès aux services publics de Yoff." },
  { icon: Users, title: "Femmes Entrepreneures", desc: "Création de fonds d'appui locaux, formations et autonomisation réelle." },
  { icon: Award, title: "La Jeunesse", desc: "Insertion professionnelle, bourses et formations aux métiers du futur." },
  { icon: Anchor, title: "La Pêche Moderne", desc: "Soutien direct aux acteurs de la mer, équipements sécurisés et valorisation des produits." },
  { icon: Trash2, title: "Un Yoff Propre", desc: "Système de collecte de proximité et sensibilisation éco-citoyenne rigoureuse." },
  { icon: Compass, title: "Urbanisme Structuré", desc: "Aménagement des espaces publics, voirie et désenclavement des quartiers." },
  { icon: ShieldCheck, title: "Le Sport & Culture", desc: "Rénovation des infrastructures sportives et appui direct aux ASC de Yoff." }
];

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-blue-200 selection:text-blue-900">
      {/* 1. SECTION HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:py-28">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-800 uppercase tracking-widest shadow-sm"
          >
            Leaders Engagés pour la Défense de la République
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl"
          >
            Le Renouveau de <span className="text-blue-600">Yoff</span> est en marche
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed sm:text-xl"
          >
            Un mouvement citoyen fort, porté par les fils de Yoff pour transformer l'économie locale, autonomiser les femmes et offrir un avenir à notre jeunesse.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link 
              href="/participer" 
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-blue-600 px-8 text-base font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
            >
              Je m'inscris pour le 26 Juillet 🚀
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. AFFICHES & MÉDIAS */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center tracking-tight">Nos prochains grands rendez-vous</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Affiche de l'événement principal */}
            <div className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square w-full bg-slate-100">
                <Image 
                  src="/img/IMG-20260715-WA0050.jpg" 
                  alt="Événement Dimanche 26 Juillet 2026"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider">Événement Phare</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Lancement Officiel</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">Dimanche 26 Juillet 2026 • Réservez cette date pour marquer l'histoire de Yoff.</p>
              </div>
            </div>

            {/* Affiche de la réunion de préparation */}
            <div className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square w-full bg-slate-100">
                <Image 
                  src="/img/IMG-20260714-WA0060.jpg" 
                  alt="Réunion à Baja Beach"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider">Préparatifs</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Assemblée de Quartier</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">Près du Terrain de Basket BCEAO, restaurant Baja Beach à Yoff.</p>
              </div>
            </div>

            {/* Lecteur Vidéo */}
            <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-lg transition-all hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-90" />
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md cursor-not-allowed">
                <Play className="h-6 w-6 fill-white text-white translate-x-0.5" />
              </div>
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-3">Bientôt Disponible</span>
                <h3 className="text-xl font-bold leading-tight">Message aux citoyens</h3>
                <p className="text-sm text-slate-300 mt-2">Une vidéo exclusive de présentation du projet de société pour Yoff.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STORYTELLING : EL MAN SUR */}
      <section className="bg-slate-50 py-20 px-4 border-y border-slate-100">
        <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-12 items-center">
          <div className="md:col-span-5 relative aspect-[4/5] w-full overflow-hidden rounded-3xl border-8 border-white shadow-2xl bg-slate-200 rotate-1 hover:rotate-0 transition-transform duration-300">
            <Image 
              src="/img/IMG-20260706-WA0005.jpg" 
              alt="Portrait El Mansour Dia"
              fill
              className="object-cover"
            />
          </div>

          <div className="md:col-span-7 space-y-6 md:pl-6">
            <span className="inline-flex h-8 items-center rounded-full bg-blue-100 px-4 text-xs font-extrabold text-blue-900 uppercase tracking-wide">
              Qui est l'homme sûr ?
            </span>
            <h2 className="text-4xl font-black text-slate-900 sm:text-5xl tracking-tight">
              El <span className="text-blue-600">Man</span> Sur Dia
            </h2>
            <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
              <p>
                Né et grandi à <strong>Yoff</strong>, El Mansour Dia est profondément ancré dans les réalités de son terroir. Engagé sur la scène citoyenne et politique, il s'est forgé une solide réputation d'homme de terrain et d'action.
              </p>
              <blockquote className="border-l-4 border-blue-600 pl-5 font-medium text-slate-800 bg-blue-50/50 py-4 pr-4 rounded-r-2xl">
                « Notre ambition n'est pas de faire de belles promesses, mais d'apporter des solutions réelles et mesurables pour chaque citoyen de Yoff. »
              </blockquote>
              <p>
                À travers l'entrepreneuriat, l'économie numérique et la structuration des secteurs de la pêche et du sport, il s'engage à changer durablement le visage de notre commune.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LES 7 PILIERS */}
      <section className="py-24 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Notre Vision pour Yoff</h2>
            <p className="text-lg text-slate-500 mt-4">7 piliers d'action prioritaires pour moderniser notre commune en respectant son identité.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PILIERS.map((pilier, idx) => {
              const Icon = pilier.icon;
              return (
                <div key={idx} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{pilier.title}</h3>
                  <p className="text-base text-slate-600 mt-3 leading-relaxed">{pilier.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. APPEL À L'ACTION FINAL */}
      <section className="bg-blue-900 py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.4),transparent)]" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-4xl font-extrabold sm:text-5xl tracking-tight">Faites partie du changement</h2>
          <p className="text-blue-100 mt-6 text-lg max-w-lg mx-auto leading-relaxed">
            Pas d'inscription complexe. Donnez votre voix pour un Yoff plus propre, moderne et prospère.
          </p>
          <div className="mt-10">
            <Link 
              href="/participer" 
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-10 text-lg font-bold text-blue-900 shadow-2xl transition-all hover:scale-105 active:scale-95 hover:bg-blue-50"
            >
              M'engager maintenant ✍️
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}