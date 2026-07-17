"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Play, Volume2, VolumeX } from "lucide-react";
import "swiper/css";
import "swiper/css/free-mode";

interface Moment {
  src: string;
  caption: string;
}

export default function TerrainCarousel({ moments }: { moments: Moment[] }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muet, setMuet] = useState(true);
  const [lecture, setLecture] = useState<number | null>(null); // index de la vidéo lancée manuellement

  return (
    <Swiper
      modules={[FreeMode]}
      freeMode={{ enabled: true, momentum: true }}
      slidesPerView="auto"
      spaceBetween={16}
      className="!px-4 !-mx-4"
    >
      {moments.map((m, idx) => {
        const estPremiere = idx === 0;
        const estLancee = lecture === idx;

        return (
          <SwiperSlide key={idx} style={{ width: 220 }}>
            <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
              {estPremiere ? (
                // Première vidéo : autoplay, muet par défaut, bouton pour activer le son
                <>
                  <video
                    ref={videoRef}
                    src={m.src}
                    className="h-full w-full object-cover"
                    muted={muet}
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                  <button
                    onClick={() => setMuet((v) => !v)}
                    aria-label={muet ? "Activer le son" : "Couper le son"}
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white active:scale-95 transition-transform"
                  >
                    {muet ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </>
              ) : estLancee ? (
                // Vidéo lancée manuellement : lecture normale avec son
                <video
                  src={m.src}
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                // Miniature : rien n'est chargé tant qu'on n'a pas cliqué
                <button
                  onClick={() => setLecture(idx)}
                  aria-label="Lire la vidéo"
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 group w-full"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 group-hover:scale-110 group-active:scale-95 transition-transform">
                    <Play className="h-5 w-5 fill-white text-white translate-x-0.5" />
                  </span>
                </button>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
                <p className="text-xs font-bold text-white leading-snug">{m.caption}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      <SwiperSlide style={{ width: 220 }}>
        <div className="aspect-[9/16] rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-4">
          <span className="text-3xl mb-2">📸</span>
          <p className="text-xs font-bold text-slate-500">D'autres moments arrivent bientôt</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}