"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function AcademiaHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-[#090A0F]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#" className="z-50 flex items-center">
          <Image src="/logo-horizontal.jpeg" alt="Academia S12" width={240} height={56} sizes="(min-width: 768px) 170px, 122px" priority className="h-10 w-auto object-contain md:h-14" />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-widest text-zinc-400 md:flex">
          <a href="#diagnostico" className="transition-colors hover:text-amber-500">Diagnóstico</a>
          <a href="#modulos" className="transition-colors hover:text-amber-500">12 Semanas</a>
          <a href="#desafios" className="transition-colors hover:text-amber-500">Desafios</a>
          <a href="#historia" className="transition-colors hover:text-amber-500">O Mentor</a>
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("s12:vip-open"))} className="ml-4 rounded-sm bg-gradient-to-r from-amber-600 to-amber-400 px-6 py-2 text-sm font-bold uppercase tracking-wider text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.25)]">Grupo VIP</button>
        </nav>

        <div className="z-50 flex items-center gap-3 md:hidden">
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("s12:vip-open"))} className="rounded-sm bg-gradient-to-r from-amber-600 to-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-950">Grupo VIP</button>
          <button type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((value) => !value)} className="p-1 text-white">
            {open ? <X className="h-8 w-8 text-amber-500" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Navegação mobile" className="absolute left-0 top-20 flex w-full flex-col gap-6 border-b border-zinc-800 bg-[#090A0F] p-6 text-center shadow-2xl md:hidden">
          <a href="#diagnostico" onClick={() => setOpen(false)} className="text-lg font-bold uppercase text-white hover:text-amber-500">Diagnóstico</a>
          <a href="#modulos" onClick={() => setOpen(false)} className="text-lg font-bold uppercase text-white hover:text-amber-500">12 Semanas</a>
          <a href="#desafios" onClick={() => setOpen(false)} className="text-lg font-bold uppercase text-white hover:text-amber-500">Desafios</a>
          <a href="#historia" onClick={() => setOpen(false)} className="text-lg font-bold uppercase text-white hover:text-amber-500">O Mentor</a>
        </nav>
      )}
    </header>
  );
}
