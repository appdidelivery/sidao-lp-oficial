"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DiagnosticoS12 = dynamic(() => import("./diagnostico-s12"), {
  ssr: false,
  loading: () => <div className="min-h-[520px] animate-pulse bg-[#090A0F]" aria-hidden="true" />,
});

export default function DeferredDiagnosticoS12() {
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

  return <div ref={root}>{ready ? <DiagnosticoS12 /> : <div className="min-h-[520px] bg-[#090A0F]" aria-hidden="true" />}</div>;
}
