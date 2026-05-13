"use client";

import { useState } from "react";

interface PhotoGalleryProps {
  photos: string[];
  title: string;
}

export default function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos.length) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
        Sem fotos disponíveis
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="w-full h-80 sm:h-96 md:h-[500px] bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={photos[currentIndex]}
          alt={`${title} - Foto ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? photos.length - 1 : prev - 1
              )
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
            aria-label="Foto anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === photos.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
            aria-label="Próxima foto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <img
                  src={photo}
                  alt={`${title} - miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
