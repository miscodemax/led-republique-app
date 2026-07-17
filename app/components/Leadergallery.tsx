"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

interface Photo {
  src: string;
  title: string;
  caption: string;
}

export default function LeaderGallery({ photos }: { photos: Photo[] }) {
  return (
    <Swiper
      modules={[FreeMode]}
      freeMode={{ enabled: true, momentum: true }}
      slidesPerView="auto"
      spaceBetween={16}
      className="!overflow-visible !px-4 !-mx-4"
    >
      {photos.map((photo, idx) => (
        <SwiperSlide key={idx} style={{ width: 240 }}>
          <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-wider">{photo.title}</p>
              <p className="text-sm font-bold text-white mt-0.5 leading-snug">{photo.caption}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}