"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const GamificacaoS12 = dynamic(() => import("./gamificacao-s12"), {
  ssr: false,
  loading: () => <div className="min-h-[680px] animate-pulse bg-zinc-950" aria-hidden="true" />,
});

export default function DeferredGamificacaoS12() {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready || !root.current) return;
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [ready]);

  return <div ref={root}>{ready ? <GamificacaoS12 /> : <div className="min-h-[680px] bg-zinc-950" aria-hidden="true" />}</div>;
}
