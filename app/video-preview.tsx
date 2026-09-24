"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function VideoPreview({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return <video className="object-cover w-full h-full" src={src} aria-label={title} controls autoPlay playsInline />;
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Reproduzir ${title}`}
      className="absolute inset-0 w-full h-full focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-amber-400"
    >
      <Image src={poster} alt="" fill sizes="(min-width: 1280px) 288px, (min-width: 768px) 23vw, 46vw" className="object-cover" />
      <span className="absolute inset-0 flex items-center justify-center">
        <Play aria-hidden="true" className="w-12 h-12 p-3 rounded-full bg-black/70 text-white fill-current" />
      </span>
    </button>
  );
}
