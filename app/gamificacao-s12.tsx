"use client";

import { useEffect, useState } from "react";
import { Brain, CheckCircle2, ShieldCheck, Trophy } from "lucide-react";

type Props = {
  recommendedFocus?: string | null;
};

const PHASES = [
  {
    id: "base_segura",
    title: "Base Segura",
    weeks: "Semanas 1–3",
    icon: ShieldCheck,
    challenges: ["Diagnóstico + postura", "Pegada e quedas", "Posicionamento e ângulo"],
  },
  {
    id: "dominio_gol",
    title: "Domínio do Gol",
    weeks: "Semanas 4–6",
    icon: Trophy,
    challenges: ["Reflexo e reação", "1x1", "Bola aérea"],
  },
  {
    id: "goleiro_moderno",
    title: "Goleiro Moderno",
    weeks: "Semanas 7–9",
    icon: CheckCircle2,
    challenges: ["Jogo com os pés", "Leitura e decisão", "Explosão e situações de jogo"],
  },
  {
    id: "blindagem_mental",
    title: "Blindagem Mental S12",
    weeks: "Semanas 10–12",
    icon: Brain,
    challenges: ["PREPARAR", "CONTROLAR + AGIR", "LIDERAR + plano de evolução"],
  },
];

export default function GamificacaoS12({ recommendedFocus }: Props) {
  const [focus, setFocus] = useState<string | null>(recommendedFocus ?? null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("s12:diagnostic");
      if (stored) {
        const saved = JSON.parse(stored) as { foco?: string };
        if (saved.foco) setFocus(saved.foco);
      }
    } catch {}

    const syncFocus = (event: Event) => {
      const custom = event as CustomEvent<{ foco?: string }>;
      setFocus(custom.detail?.foco || null);
    };
    window.addEventListener("s12:diagnostic", syncFocus as EventListener);
    return () => window.removeEventListener("s12:diagnostic", syncFocus as EventListener);
  }, []);

  useEffect(() => {
    setFocus(recommendedFocus ?? null);
  }, [recommendedFocus]);

  return (
    <section id="desafios-conteudo" className="py-24 bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 mb-3">Depois da matrícula</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white">12 semanas. 12 desafios. 4 checkpoints.</h2>
          <p className="mt-4 text-zinc-400 max-w-3xl mx-auto">
            Esta é uma prévia da experiência do aluno. A gamificação oficial começa após a compra, dentro da Hotmart: aula, aplicação, Desafio S12, check-in e avanço semanal.
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-zinc-800 bg-[#0c0d13] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">Prévia do Mapa de Evolução S12</p>
              <h3 className="mt-2 text-2xl font-black text-white">Seu progresso oficial começa na Hotmart</h3>
              <p className="mt-2 text-zinc-400">No PPL você recebe diagnóstico e missões de aquecimento. Depois da matrícula, os 12 desafios passam a contar oficialmente para checkpoints e conclusão.</p>
            </div>
            <div className="min-w-48">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2"><span>Prévia</span><span>0/12 após matrícula</span></div>
              <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[8%] bg-amber-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase, index) => {
            const Icon = phase.icon;
            const highlighted = focus === phase.id;
            return (
              <article key={phase.id} className={`relative rounded-2xl border p-6 transition-all ${highlighted ? "border-amber-500 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.08)]" : "border-zinc-800 bg-zinc-900/60"}`}>
                {highlighted && <span className="absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-950">Seu foco</span>}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950">
                  <Icon className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Checkpoint {index + 1} · {phase.weeks}</p>
                <h3 className="mt-2 text-xl font-black uppercase text-white">{phase.title}</h3>
                <ul className="mt-5 space-y-3">
                  {phase.challenges.map((challenge, challengeIndex) => (
                    <li key={challenge} className="flex gap-3 text-sm text-zinc-400">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-[11px] font-bold text-zinc-300">
                        {index * 3 + challengeIndex + 1}
                      </span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-zinc-800 pt-4">
                  <p className="text-xs leading-relaxed text-zinc-500"><strong className="text-zinc-300">Essencial:</strong> domínio limpo do fundamento.<br /><strong className="text-zinc-300">Base/Performance:</strong> mais velocidade, pressão e tomada de decisão.</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <p className="text-sm font-black uppercase text-white">12 Desafios S12</p>
            <p className="mt-2 text-sm text-zinc-500">Um desafio prático por semana para transformar conteúdo em execução.</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <p className="text-sm font-black uppercase text-white">4 Checkpoints</p>
            <p className="mt-2 text-sm text-zinc-500">Fechamento de cada fase com autoavaliação orientada e próximo foco.</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <p className="text-sm font-black uppercase text-white">Mapa de Evolução</p>
            <p className="mt-2 text-sm text-zinc-500">Registro do ponto de partida, progresso, desafios concluídos e plano seguinte.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
