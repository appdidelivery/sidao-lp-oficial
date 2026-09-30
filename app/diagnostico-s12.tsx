"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

type DiagnosticResult = {
  id: string;
  foco: string;
  nivel: string;
};

type Props = {
  onCompleted: (result: DiagnosticResult) => void;
  onJoinVip: () => void;
};

type Option = { value: string; label: string };
type Question = {
  id: string;
  title: string;
  helper?: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "perfil",
    title: "Qual é o seu contexto hoje?",
    helper: "Isso define apenas a aplicação dos exercícios, não limita sua jornada.",
    options: [
      { value: "amador", label: "Goleiro amador / várzea / society" },
      { value: "base", label: "Atleta de base / formação" },
      { value: "responsavel", label: "Pai, mãe ou responsável" },
    ],
  },
  {
    id: "frequencia",
    title: "Quantas vezes por semana você treina ou joga no gol?",
    options: [
      { value: "0_1", label: "0–1 vez" },
      { value: "2", label: "2 vezes" },
      { value: "3_ou_mais", label: "3 vezes ou mais" },
    ],
  },
  {
    id: "dificuldade",
    title: "Qual ponto mais trava sua evolução hoje?",
    options: [
      { value: "pegada_posicionamento", label: "Pegada, quedas ou posicionamento" },
      { value: "um_contra_um_bola_aerea", label: "1x1 ou bola aérea" },
      { value: "jogo_pes_leitura", label: "Jogo com os pés ou leitura de jogo" },
      { value: "erro_pressao", label: "Erro, cobrança, pressão ou confiança" },
    ],
  },
  {
    id: "posicionamento",
    title: "Como você avalia sua segurança em posicionamento e ângulo?",
    options: [
      { value: "baixa", label: "Baixa — ainda erro bastante o ponto de partida" },
      { value: "media", label: "Média — acerto, mas oscilo sob pressão" },
      { value: "alta", label: "Alta — consigo repetir com consistência" },
    ],
  },
  {
    id: "decisoes",
    title: "Como você se sente no 1x1 e nas bolas aéreas?",
    options: [
      { value: "baixa", label: "Inseguro — atraso ou hesito na decisão" },
      { value: "media", label: "Razoável — ainda falta consistência" },
      { value: "alta", label: "Seguro — leio e executo bem na maior parte das vezes" },
    ],
  },
  {
    id: "pes",
    title: "E com os pés quando o adversário pressiona?",
    options: [
      { value: "baixa", label: "Tenho dificuldade para dominar, escolher e executar" },
      { value: "media", label: "Consigo, mas perco qualidade quando sou pressionado" },
      { value: "alta", label: "Tenho boa leitura e execução sob pressão" },
    ],
  },
  {
    id: "pos_erro",
    title: "Depois de uma falha ou crítica, o que mais acontece?",
    options: [
      { value: "demoro", label: "Demoro para recuperar o foco" },
      { value: "oscilo", label: "Volto para o jogo, mas fico oscilando" },
      { value: "recupero", label: "Consigo resetar e executar o próximo lance" },
    ],
  },
];

const FOCUS_LABELS: Record<string, { title: string; description: string }> = {
  base_segura: {
    title: "Foco inicial: Base Segura",
    description: "Seu melhor ganho agora vem de consolidar fundamentos, posicionamento e segurança antes de acelerar os estímulos.",
  },
  dominio_gol: {
    title: "Foco inicial: Domínio do Gol",
    description: "Seu próximo avanço está em leitura e execução de situações decisivas como 1x1, reação e bola aérea.",
  },
  goleiro_moderno: {
    title: "Foco inicial: Goleiro Moderno",
    description: "Seu foco deve avançar para jogo com os pés, leitura tática, cobertura e tomada de decisão sob pressão.",
  },
  blindagem_mental: {
    title: "Foco inicial: Blindagem Mental S12",
    description: "Sua evolução técnica precisa caminhar junto com rotina mental para erro, cobrança, foco e próximo lance.",
  },
};

export default function DiagnosticoS12({ onCompleted, onJoinVip }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const question = QUESTIONS[step];
  const progress = result ? 100 : Math.round(((step + 1) / QUESTIONS.length) * 100);
  const selected = question ? answers[question.id] : "";

  const resultCopy = useMemo(() => result ? FOCUS_LABELS[result.foco] : null, [result]);

  const choose = (value: string) => {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const next = async () => {
    if (!question || !selected) return;
    if (step < QUESTIONS.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const payload = {
        answers: QUESTIONS.map((item) => ({ id: item.id, value: answers[item.id] })),
        origem: document.referrer || window.location.href,
        utm: {
          source: params.get("utm_source") || "",
          medium: params.get("utm_medium") || "",
          campaign: params.get("utm_campaign") || "",
          content: params.get("utm_content") || "",
          term: params.get("utm_term") || "",
        },
      };

      const response = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Não foi possível concluir.");

      const diagnosticResult = { id: data.id, foco: data.foco, nivel: data.nivel };
      setResult(diagnosticResult);
      onCompleted(diagnosticResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível concluir o diagnóstico.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setResult(null);
    setError("");
  };

  return (
    <section id="diagnostico" className="py-24 bg-[#090A0F] border-y border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 mb-3">Diagnóstico S12</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white">Descubra seu foco inicial</h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">7 perguntas rápidas para indicar onde concentrar sua atenção dentro da Jornada S12. Não é avaliação profissional nem seleção esportiva.</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 md:p-10 shadow-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-zinc-500 mb-3">
              <span>{result ? "Diagnóstico concluído" : `Pergunta ${step + 1} de ${QUESTIONS.length}`}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {!result && question && (
            <>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{question.title}</h3>
              {question.helper && <p className="text-sm text-zinc-500 mb-5">{question.helper}</p>}
              <div className="grid gap-3 mt-6">
                {question.options.map((option) => {
                  const active = selected === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => choose(option.value)}
                      className={`text-left rounded-xl border p-4 transition-all ${active ? "border-amber-500 bg-amber-500/10 text-white" : "border-zinc-800 bg-[#0c0d13] text-zinc-300 hover:border-zinc-600"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${active ? "border-amber-500 bg-amber-500 text-zinc-950" : "border-zinc-700"}`}>
                          {active && <CheckCircle2 className="h-4 w-4" />}
                        </span>
                        <span>{option.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {error && <p className="mt-5 text-sm text-red-400">{error}</p>}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  disabled={step === 0 || isSubmitting}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-3 text-sm font-bold text-zinc-300 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" /> Voltar
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!selected || isSubmitting}
                  className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-3 text-sm font-black uppercase text-zinc-950 disabled:opacity-40"
                >
                  {isSubmitting ? "Calculando..." : step === QUESTIONS.length - 1 ? "Ver meu foco" : "Próxima"}
                  {!isSubmitting && <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </>
          )}

          {result && resultCopy && (
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10">
                <ShieldCheck className="h-8 w-8 text-emerald-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
                {result.nivel === "base_performance" ? "Desafios Base / Performance" : "Desafios Essenciais"}
              </p>
              <h3 className="text-3xl md:text-4xl font-black uppercase text-white">{resultCopy.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-zinc-400 max-w-2xl mx-auto">{resultCopy.description}</p>
              <p className="mt-4 text-sm text-zinc-500">Você percorre as 12 semanas completas. O diagnóstico apenas orienta onde colocar mais atenção e qual nível de desafio usar.</p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <button type="button" onClick={onJoinVip} className="rounded-md bg-amber-500 px-7 py-4 font-black uppercase text-zinc-950">Entrar no Grupo VIP</button>
                <button type="button" onClick={restart} className="rounded-md border border-zinc-700 px-7 py-4 font-bold uppercase text-zinc-300">Refazer</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
