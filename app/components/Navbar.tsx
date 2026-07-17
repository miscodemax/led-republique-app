"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const LIENS = [
  { href: "/", label: "Accueil" },
  { href: "/#activites", label: "Vision" },
  { href: "/#membres", label: "Piliers" },
];

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false);

  const fermer = () => setOuvert(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 gap-2">
        <Link href="/" onClick={fermer} className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
            <Image src="/icon-192.png" alt="LED République" fill className="object-cover" />
          </div>
          <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 whitespace-nowrap">
            LED <span className="text-blue-600">République</span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
            {LIENS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-blue-600 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/participer"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            Rejoindre le mouvement
          </Link>
        </div>

        {/* Mobile : CTA compact toujours visible + burger */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <Link
            href="/participer"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-3.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all whitespace-nowrap"
          >
            26 Juillet
          </Link>
          <button
            onClick={() => setOuvert((v) => !v)}
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={ouvert}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-slate-800 active:scale-95 transition-transform"
          >
            {ouvert ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Panneau mobile plein écran */}
      {ouvert && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white flex flex-col">
          <nav className="flex flex-col divide-y divide-slate-100 px-4">
            {LIENS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={fermer}
                className="py-5 text-lg font-bold text-slate-800 active:text-blue-600"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4 pb-8">
            <Link
              href="/participer"
              onClick={fermer}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-blue-600 text-base font-bold text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
            >
              Rejoindre le mouvement
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}