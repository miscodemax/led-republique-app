"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

interface Affiche {
  src: string;
  tag: string;
  title: string;
  desc: string;
}

export default function AffichesCarousel({ affiches }: { affiches: Affiche[] }) {
  return (
    <Swiper
      modules={[Pagination, FreeMode]}
      freeMode={{ enabled: true, momentum: true }}
      slidesPerView={1.15}
      spaceBetween={20}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      }}
      className="!pb-12"
    >
      {affiches.map((a, idx) => (
        <SwiperSlide key={idx}>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1 hover:shadow-xl">
            <Image
              src={a.src}
              alt={a.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="inline-block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">
                {a.tag}
              </span>
              <h3 className="text-xl font-bold text-white leading-tight">{a.title}</h3>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed">{a.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}