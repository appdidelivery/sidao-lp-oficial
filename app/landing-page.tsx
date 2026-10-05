import type { ReactNode } from "react";
import { 
  ShieldCheck,
  Brain, 
  Trophy,
  CheckCircle2, 
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { SOCIAL_PROFILES } from "./site-config";
import DiagnosticoS12 from "./diagnostico-s12";
import GamificacaoS12 from "./gamificacao-s12";
import AcademiaHeader from "./academy-header";
import VipLeadModal, { VipOpenButton } from "./vip-lead";
import YoutubeTrailer from "./youtube-trailer";

const CART_OPEN = false;

// --- DADOS DINÂMICOS DOS 3 CURSOS ---
const COURSES_DATA = [
  {
    id: 0,
    anchor: "jornada-s12",
    type: "Jornada",
    title: "Jornada S12 — 12 Semanas",
    icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
    desc: "Uma única jornada para goleiros amadores e atletas de base. O conteúdo central é o mesmo; o Diagnóstico S12 orienta o foco e cada semana ganha uma aplicação Essencial e um Desafio Base/Performance.",
    price: "29,64",
    totalPrice: "297,00",
    checkoutLink: null,
    modules: [
      { title: "FASE 1 — BASE SEGURA", lessons: ["Semana 1: Diagnóstico S12, postura e ponto de partida", "Semana 2: pegada, quedas e segurança sob diferentes estímulos", "Semana 3: posicionamento, ângulo e tomada de espaço"] },
      { title: "FASE 2 — DOMÍNIO DO GOL", lessons: ["Semana 4: reflexo, reação e recuperação", "Semana 5: 1x1 — leitura, coragem e decisão", "Semana 6: bola aérea — tempo, impulsão e confiança"] },
      { title: "FASE 3 — GOLEIRO MODERNO", lessons: ["Semana 7: jogo com os pés e domínio orientado", "Semana 8: leitura tática, cobertura e tomada de decisão", "Semana 9: explosão, agilidade e situações de jogo"] },
      { title: "FASE 4 — BLINDAGEM MENTAL S12", lessons: ["Semana 10: PREPARAR — rotina, foco e energia", "Semana 11: CONTROLAR + AGIR — erro, crítica e próximo lance", "Semana 12: LIDERAR — comunicação e plano pessoal de evolução"] }
    ]
  }
];

const currentCourse = COURSES_DATA[0];

const FAQS = [
  { question: "A Jornada S12 serve para quem joga apenas no final de semana?", answer: "Sim. O goleiro amador segue a mesma jornada, com aplicação adaptada à rotina de quem tem pouco tempo para treinar e precisa priorizar fundamentos que realmente consegue praticar." },
  { question: "A Jornada S12 serve para atletas de base?", answer: "Sim. A trilha de base trabalha fundamentos, jogo com os pés, leitura, tomada de decisão e preparação mental. Se o atleta for menor de idade, o cadastro e a compra devem ser feitos pelo responsável." },
  { question: "Como funciona a Jornada S12?", answer: "São 12 semanas organizadas em quatro fases: Base Segura, Domínio do Gol, Goleiro Moderno e Blindagem Mental S12. Cada etapa combina explicação, demonstração, aplicação e um próximo passo prático." },
  { question: "Como acesso as aulas?", answer: "Quando as inscrições abrirem e o pagamento for aprovado, você receberá as orientações de acesso à área de membros e à sequência da Jornada S12." }
]

const SectionHeading = ({ children, subtitle }: { children: ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4" style={{ fontFamily: 'Impact, sans-serif, system-ui' }}>{children}</h2>
    {subtitle && <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

export default function AcademiaS12LandingPage() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-300 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">

      
        <VipLeadModal />
      <AcademiaHeader />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10 mt-10 md:mt-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-block border border-amber-500/30 bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            Jornada S12 · técnica, leitura e blindagem mental
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9]" style={{ fontFamily: 'Impact, sans-serif, system-ui' }}>
            EVOLUA NO GOL COM DIREÇÃO. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">SEJA INABALÁVEL.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto md:mx-0">
            Uma jornada de 12 semanas para goleiros amadores e atletas de base desenvolverem fundamentos, leitura de jogo, jogo com os pés e <strong>Blindagem Mental S12</strong> com aplicação prática.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a href="#diagnostico" className="block w-full rounded-sm bg-gradient-to-r from-amber-600 to-amber-400 px-10 py-5 text-center text-lg font-bold uppercase tracking-wider text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] sm:w-auto">FAZER DIAGNÓSTICO S12</a>
            <VipOpenButton text="Entrar direto no Grupo VIP" className="w-full rounded-sm border border-zinc-700 px-7 py-5 text-sm font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-amber-500 hover:text-amber-400 sm:w-auto" />
          </div>
          <p className="text-sm text-zinc-500 flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> 7 perguntas · foco inicial · nível Essencial ou Base/Performance
          </p>

          <div className="pt-8 border-t border-zinc-800/50 mt-8 flex flex-col gap-3 items-center md:items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Vivência Real de Alto Nível:</span>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               <a href="https://www.saopaulofc.net/destaque-em-2016-sidao-reforca-a-meta-tricolor/" target="_blank" rel="noopener noreferrer" aria-label="Leia sobre Sidão no São Paulo FC (abre em nova aba)" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
                 <Image src="/escudo-spfc.png" alt="Sidão no São Paulo FC" width={40} height={40} className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="São Paulo FC" />
               </a>
               <a href="https://www.botafogo.com.br/noticias/2457" target="_blank" rel="noopener noreferrer" aria-label="Leia sobre Sidão no Botafogo (abre em nova aba)" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
                 <Image src="/escudo-bfr.png" alt="Sidão no Botafogo" width={40} height={40} className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="Botafogo" />
               </a>
               <a href="https://vasco.com.br/futebol/sidao-frisa-importancia-de-sao-januario-para-bons-resultados-no-brasileiro/" target="_blank" rel="noopener noreferrer" aria-label="Leia sobre Sidão no Vasco da Gama (abre em nova aba)" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
                 <Image src="/escudo-crvg.png" alt="Sidão no Vasco da Gama" width={40} height={40} className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="Vasco" />
               </a>
               <a href="https://www.goiasec.com.br/noticias/sidao-e-oficialmente-apresentado-pelo-verdao" target="_blank" rel="noopener noreferrer" aria-label="Leia sobre Sidão no Goiás (abre em nova aba)" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
                 <Image src="/escudo-gec.png" alt="Sidão no Goiás" width={40} height={40} className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="Goiás" />
               </a>
               <a href="https://paranaclube.com.br/goleiro-sidao-e-o-novo-reforco-do-parana-clube/" target="_blank" rel="noopener noreferrer" aria-label="Leia sobre Sidão no Paraná Clube (abre em nova aba)" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
                 <Image src="/escudo-parana.png" alt="Sidão no Paraná Clube" width={269} height={500} sizes="22px" className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="Paraná Clube" />
               </a>
               <a href="https://figueirense.com.br/apresentacao-oficial-goleiro-sidao/" target="_blank" rel="noopener noreferrer" aria-label="Leia sobre Sidão no Figueirense (abre em nova aba)" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
                 <Image src="/escudo-figueirense.svg" alt="Sidão no Figueirense Futebol Clube" width={1898} height={2200} className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="Figueirense" />
               </a>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <YoutubeTrailer />
        </div>
      </section>

      <DiagnosticoS12 />

      {/* SELEÇÃO DINÂMICA DE CURSOS */}
      <section id="cursos" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Uma única Jornada S12. O Diagnóstico S12 orienta o ponto de atenção e o nível do desafio, sem separar o produto em cursos diferentes.">
            UMA JORNADA. DOIS NÍVEIS DE DESAFIO.
          </SectionHeading>

          <div className="grid grid-cols-1 max-w-3xl mx-auto gap-6">
            <div
              id={currentCourse.anchor}
              className="p-8 rounded-lg flex flex-col bg-zinc-900 border-2 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border bg-amber-500/10 border-amber-500">
                {currentCourse.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase">{currentCourse.title}</h3>
              <p className="text-zinc-400 leading-relaxed flex-grow">{currentCourse.desc}</p>
              <a href="#modulos" className="mt-8 block w-full text-center py-3 px-4 font-bold uppercase text-sm rounded bg-amber-500 text-zinc-950">
                Ver as 12 semanas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS DINÂMICOS */}
      <section id="modulos" className="py-24 relative overflow-hidden bg-[#0c0d13]">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle={`12 semanas de evolução técnica, leitura de jogo e Blindagem Mental S12`}>
            AS 12 SEMANAS DA JORNADA
          </SectionHeading>

          <div className="space-y-4">
            {currentCourse.modules.map((mod, idx) => (
              <div 
                key={`${currentCourse.id}-${idx}`}
                className="bg-zinc-900/80 border border-zinc-800 rounded-sm overflow-hidden"
              >
                <div className="p-4 md:p-6 flex items-center border-b border-zinc-800/50 bg-[#090A0F]">
                  <span className="text-amber-500 font-bold mr-4">FASE {idx + 1}</span>
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase">{mod.title}</h3>
                </div>
                <div className="p-4 md:p-6 bg-zinc-900/40">
                  <ul className="space-y-3">
                    {mod.lessons.map((lesson, lIdx) => (
                      <li key={lIdx} className="flex items-start text-zinc-400">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GamificacaoS12 />

      {/* REELS / CONTEÚDO DINÂMICO - VERSÃO RETENÇÃO DE LEAD */}
      <section className="py-20 bg-[#090A0F] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Metodologia direto do campo para a tela do seu celular.">
            TREINOS NA PRÁTICA
          </SectionHeading>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* VÍDEO 1 */}
            <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors">
              <video src="/reel-1.mp4" poster="/thumb-1.webp" aria-label="Treino na prática 1 — Sidão" controls preload="none" playsInline className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <p className="text-white font-bold text-sm line-clamp-2 uppercase drop-shadow-md">Melhorar seu treino</p>
              </div>
            </div>

            {/* VÍDEO 2 */}
            <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors">
              <video src="/reel-2.mp4" poster="/thumb-2.webp" aria-label="Treino na prática 2 — Sidão" controls preload="none" playsInline className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <p className="text-white font-bold text-sm line-clamp-2 uppercase drop-shadow-md">Saída com os pés</p>
              </div>
            </div>

            {/* VÍDEO 3 */}
            <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors">
              <video src="/reel-3.mp4" poster="/thumb-3.webp" aria-label="Treino na prática 3 — Sidão" controls preload="none" playsInline className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <p className="text-white font-bold text-sm line-clamp-2 uppercase drop-shadow-md">Gestos no treinamento</p>
              </div>
            </div>

            {/* VÍDEO 4 */}
            <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors">
              <video src="/reel-4.mp4" poster="/thumb-4.webp" aria-label="Treino na prática 4 — Sidão" controls preload="none" playsInline className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <p className="text-white font-bold text-sm line-clamp-2 uppercase drop-shadow-md">Equilibrio e encaixe</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STORYTELLING - QUEM É O MENTOR */}
      <section id="historia" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 w-full">
            <div className="relative">
              <h2 className="absolute -top-10 -left-4 text-7xl md:text-9xl font-black text-zinc-800/30 uppercase z-0 select-none" style={{ fontFamily: 'Impact' }}>SIDÃO</h2>
              <div className="relative z-10 border-4 border-zinc-900 rounded-sm overflow-hidden shadow-2xl">
                 <Image 
                   src="/sidao-goleiro.png" 
                   alt="Sidão Goleiro" 
                   loading="lazy"
                   width={800} height={1000} className="w-full h-auto object-cover filter contrast-125 saturate-50" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'Impact' }}>
              QUEM É <span className="text-amber-500">SIDÃO?</span>
            </h2>
            <div className="space-y-4 text-lg text-zinc-400">
              <p>
                Antes de vestir a camisa de gigantes como <strong>São Paulo, Botafogo e Vasco</strong>, eu vivi a realidade dos campos de terra e das divisões de acesso. Eu conheço a dor e a solidão de falhar quando ninguém está olhando, e a pressão de errar com milhões te assistindo.
              </p>
              <p>
                Fui pioneiro no Brasil no jogo com os pés trabalhando com Fernando Diniz, transformando a posição de goleiro em um líbero moderno. 
              </p>
              <p>
                Mas minha maior defesa não foi com as mãos. Foi construir uma <strong>mente inabalável</strong> para superar as críticas mais duras que um atleta poderia receber em rede nacional. Hoje, dedico meu tempo para transferir essa casca grossa e essa técnica de elite para você.
              </p>
            </div>
            
            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-zinc-800">
              <div>
                <p className="text-3xl font-black text-white">15+</p>
                <p className="text-sm font-bold uppercase text-zinc-500">Anos no Profissional</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-sm font-bold uppercase text-zinc-500">Prática Direta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA E CHECKOUT DINÂMICO */}
      <section id="checkout" className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-[#0c0d13] border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)]">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12">
              
              <div className="flex-1 space-y-8">
                <h3 className="text-3xl font-black text-white uppercase" style={{ fontFamily: 'Impact' }}>
                  O QUE VOCÊ VAI <span className="text-amber-500 underline decoration-amber-500/30">RECEBER</span>
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Acesso à Jornada S12 completa de 12 semanas</li>
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Certificado de Conclusão Oficial</li>
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Blindagem Mental S12 integrada à jornada</li>
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Plano de evolução para continuar após as 12 semanas</li>
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Conteúdo prático com aplicação para treino e jogo</li>
                </ul>
              </div>

              <div className="flex-1 bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 flex flex-col justify-center items-center text-center">
                {CART_OPEN && <p className="text-zinc-400 uppercase font-bold text-sm mb-2">Investimento</p>}
                {CART_OPEN && (
                  <div className="mb-8">
                    <p className="text-zinc-500 line-through text-lg">R$ {currentCourse.totalPrice}</p>
                    <div className="my-4">
                      <span className="text-2xl font-bold text-white mr-2">12x de</span>
                      <span className="text-5xl md:text-6xl font-black text-amber-500">R$ {currentCourse.price}</span>
                    </div>
                    <p className="text-zinc-400 text-sm">* ou R$ {currentCourse.totalPrice} à vista</p>
                  </div>
                )}
                <p className="text-amber-400 font-bold mb-6">Inscrições em breve. Entre no grupo VIP para receber as novidades.</p>
                <VipOpenButton text="ENTRAR NO GRUPO VIP" className="w-full rounded-sm bg-gradient-to-r from-amber-600 to-amber-400 py-5 text-lg font-bold uppercase tracking-wider text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]" />
              </div>
            </div>
          </div>

          {CART_OPEN && (
            <div className="mt-20 text-center space-y-6">
              <h2 className="text-7xl md:text-9xl font-black text-amber-500 uppercase tracking-tighter mix-blend-lighten" style={{ fontFamily: 'Impact', textShadow: '0 10px 30px rgba(245,158,11,0.2)' }}>
                7 DIAS
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">DE GARANTIA INCONDICIONAL</p>
              <p className="text-zinc-400 max-w-3xl mx-auto text-lg">
                Você tem, por lei, o direito de testar o produto. Se dentro desse período você achar que a metodologia não é pra você, basta um clique para solicitar o reembolso total. O risco é zero.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ E RODAPÉ */}
      <footer className="bg-[#090A0F] pt-20 pb-10 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 md:px-8 mb-20">
          <SectionHeading subtitle="Tire suas dúvidas antes de entrar em campo.">
            PERGUNTAS FREQUENTES
          </SectionHeading>

          <div className="space-y-4">
            {FAQS.filter((faq) => CART_OPEN || !["Como acesso as aulas?", "E se eu não gostar?"].includes(faq.question)).map((faq, idx) => (
              <details key={idx} className="group border border-zinc-800 bg-zinc-900/30 rounded-sm overflow-hidden">
                <summary className="w-full cursor-pointer list-none px-6 py-4 flex items-center justify-between text-left font-bold text-white uppercase hover:bg-zinc-800/50 transition-colors">
                  {faq.question}
                  <span aria-hidden="true" className="text-amber-500 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 text-zinc-400 pb-4 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center border-t border-zinc-900 pt-8">
          <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest">Produzido por: Academia S12 | Sidão</p>
          <p className="mt-3 text-sm text-zinc-400">Academia S12 é a escola de goleiros com a metodologia do Sidão e integra o projeto Sidão 12.</p>
          <nav aria-label="Redes sociais da Academia S12" className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {SOCIAL_PROFILES.map((profile) => (
              <a key={profile.icon} href={profile.url} target="_blank" rel="noopener noreferrer"
                aria-label={`Academia S12 no ${profile.name} (abre em nova aba)`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-amber-400 hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false">
                  {profile.icon === "instagram" ? (
                    <g fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </g>
                  ) : profile.icon === "youtube" ? (
                    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="4" />
                      <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
                    </g>
                  ) : (
                    <path fill="currentColor" d="M16.5 2h-3v13a3.5 3.5 0 1 1-3-3.46V8.5a6.5 6.5 0 1 0 6 6.5V8.1a8.3 8.3 0 0 0 5 1.65v-3A5 5 0 0 1 16.5 2Z" />
                  )}
                </svg>
                {profile.name}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
