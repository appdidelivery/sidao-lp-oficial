"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function YoutubeTrailer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src="https://www.youtube-nocookie.com/embed/P4EKAeaEC-U?autoplay=1&rel=0"
          title="Trailer Oficial - Academia S12"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Reproduzir trailer da Academia S12"
          className="absolute inset-0 flex h-full w-full items-center justify-center bg-cover bg-center group"
          style={{ backgroundImage: "url(https://i.ytimg.com/vi/P4EKAeaEC-U/hqdefault.jpg)" }}
        >
          <span className="flex h-14 w-20 items-center justify-center rounded-xl bg-red-600 text-white shadow-xl transition-colors group-hover:bg-red-500">
            <Play className="h-8 w-8 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
