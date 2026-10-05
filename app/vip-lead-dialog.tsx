"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";

const VIP_GROUP_URL = "https://chat.whatsapp.com/LBLr6YR6EP0BuDRQaQXTIU";
type DiagnosticDetail = { id: string; foco: string; nivel: string };

export default function VipLeadDialog({ onClose }: { onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, submitting]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const data = new FormData(event.currentTarget);
    let diagnostic: DiagnosticDetail | null = null;
    try {
      const stored = sessionStorage.getItem("s12:diagnostic");
      if (stored) diagnostic = JSON.parse(stored) as DiagnosticDetail;
    } catch {}

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: String(data.get("nome") || ""),
          whatsapp: String(data.get("whatsapp") || ""),
          perfil: String(data.get("perfil") || ""),
          diagnosticoId: diagnostic?.id || "",
          focoDiagnostico: diagnostic?.foco || "",
          nivelDiagnostico: diagnostic?.nivel || "",
        }),
      });
      if (!response.ok) throw new Error("Não foi possível processar a inscrição.");
      window.location.href = VIP_GROUP_URL;
    } catch {
      alert("Não conseguimos processar sua inscrição. Por favor, tente novamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4" onClick={() => !submitting && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="lead-form-title" className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl md:p-8" onClick={(event) => event.stopPropagation()}>
        <button type="button" aria-label="Fechar formulário" onClick={onClose} disabled={submitting} className="absolute right-4 top-4 text-zinc-400 hover:text-white disabled:opacity-50">
          <X className="h-6 w-6" />
        </button>
        <h2 id="lead-form-title" className="mb-2 text-center text-3xl font-black uppercase text-white">Entre no <span className="text-amber-500">Grupo VIP</span></h2>
        <p className="mb-6 text-center text-sm text-zinc-400">Preencha seus dados para receber o acesso ao grupo.</p>

        <form onSubmit={submit} className="flex flex-col gap-4 text-left">
          <div>
            <label htmlFor="vip-nome" className="mb-1 ml-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">Seu Nome</label>
            <input id="vip-nome" name="nome" type="text" autoComplete="name" required placeholder="Ex: Taffarel" disabled={submitting} className="w-full rounded border border-zinc-800 bg-[#090A0F] p-3 text-white outline-none transition-colors focus:border-amber-500" />
          </div>
          <div>
            <label htmlFor="vip-whatsapp" className="mb-1 ml-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">WhatsApp (com DDD)</label>
            <input id="vip-whatsapp" name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" required placeholder="Ex: 11 99999-9999" disabled={submitting} className="w-full rounded border border-zinc-800 bg-[#090A0F] p-3 text-white outline-none transition-colors focus:border-amber-500" />
          </div>
          <div>
            <label htmlFor="vip-perfil" className="mb-1 ml-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">Qual é o seu perfil?</label>
            <select id="vip-perfil" name="perfil" required disabled={submitting} defaultValue="" className="w-full appearance-none rounded border border-zinc-800 bg-[#090A0F] p-3 text-white outline-none transition-colors focus:border-amber-500">
              <option value="" disabled>Selecione uma opção...</option>
              <option value="Goleiro Amador">Goleiro Amador</option>
              <option value="Atleta de Base">Atleta de Base</option>
              <option value="Pai / Responsável">Pai / Responsável</option>
            </select>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">Se o atleta for menor de idade, o cadastro deve ser feito pelo pai, mãe ou responsável.</p>
          </div>
          <button type="submit" disabled={submitting} className="mt-2 flex w-full items-center justify-center rounded bg-emerald-600 p-4 font-black uppercase tracking-wider text-white transition-colors hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-zinc-400">
            {submitting ? "PROCESSANDO..." : "ACESSAR GRUPO VIP ➔"}
          </button>
        </form>
      </div>
    </div>
  );
}
