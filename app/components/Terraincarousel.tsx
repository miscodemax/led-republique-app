"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

interface Moment {
  src: string;
  caption: string;
}

export default function TerrainCarousel({ moments }: { moments: Moment[] }) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const gererChangement = (swiper: SwiperType) => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === swiper.activeIndex) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  };

  return (
    <Swiper
      modules={[FreeMode]}
      freeMode={{ enabled: true, momentum: true }}
      slidesPerView="auto"
      spaceBetween={16}
      className="!overflow-visible !px-4 !-mx-4"
      onSlideChange={gererChangement}
      onSwiper={(swiper) => {
        // Joue la première vidéo une fois le carrousel monté
        setTimeout(() => gererChangement(swiper), 300);
      }}
    >
      {moments.map((m, idx) => (
        <SwiperSlide key={idx} style={{ width: 220 }}>
          <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
            <video
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={m.src}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="none"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
              <p className="text-xs font-bold text-white leading-snug">{m.caption}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <SwiperSlide style={{ width: 220 }}>
        <div className="aspect-[9/16] rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-4">
          <span className="text-3xl mb-2">📸</span>
          <p className="text-xs font-bold text-slate-500">D'autres moments arrivent bientôt</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}