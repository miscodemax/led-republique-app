"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function AssembleeVideo({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) {
  const [lecture, setLecture] = useState(false);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">À revoir</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{title}</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">{description}</p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
          {lecture ? (
            <video
              src={src}
              className="h-full w-full object-cover"
              controls
              autoPlay
              playsInline
            />
          ) : (
            <button
              onClick={() => setLecture(true)}
              aria-label="Lire la vidéo"
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 group"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 group-hover:scale-110 group-active:scale-95 transition-transform">
                <Play className="h-7 w-7 fill-white text-white translate-x-0.5" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}