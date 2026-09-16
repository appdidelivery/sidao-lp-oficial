"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  ShieldCheck, 
  Target, 
  Brain, 
  Trophy, 
  ChevronDown, 
  CheckCircle2, 
  Lock, 
  Smartphone,
  ChevronRight,
  Star
} from "lucide-react";
import Head from "next/head";

// --- DADOS DO E-E-A-T E CONTEÚDO ---
const COURSE_PRICE = "97,14";
const TOTAL_PRICE = "997,00";

// AQUI FORAM ALTERADOS OS TEXTOS E ADICIONADOS OS LINKS DE PPL
const TARGET_AUDIENCE = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
    title: "Goleiros Amadores",
    desc: "Acabe com a insegurança debaixo da trave. Aprenda posicionamento, firmeza na pegada e evite lesões bobas na várzea ou society.",
    link: "#grupo-amadores", 
    cta: "Entrar para a Lista VIP"
  },
  {
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    title: "Atletas de Base",
    desc: "Desenvolva o jogo com os pés e a leitura tática exigida pelos olheiros modernos. Blinde sua mente para passar nas peneiras.",
    link: "#grupo-base", 
    cta: "Entrar para a Lista VIP"
  },
  {
    icon: <Brain className="w-8 h-8 text-amber-500" />,
    title: "Preparador de Goleiros", // <- Alterado!
    desc: "Acesse uma metodologia validada na Série A. Aprenda a periodizar treinos que unem técnica, explosão e tomada de decisão.",
    link: "#grupo-preparadores", 
    cta: "Entrar para a Lista VIP"
  }
];

const MODULES = [
  {
    id: "0",
    title: "A Base de Tudo: Posicionamento e Postura",
    lessons: ["A transição para o alto nível", "Biomecânica da queda e pegada em 'W'", "Encurtamento de ângulo e tempo de reação"]
  },
  {
    id: "1",
    title: "O Goleiro Moderno: Jogo com os Pés",
    lessons: ["Domínio orientado sob pressão", "Passes de ruptura e construção de jogadas", "Atuando como líbero na cobertura preventiva"]
  },
  {
    id: "2",
    title: "O Dono da Área: Domínio Aéreo",
    lessons: ["Tempo de bola em cruzamentos", "Impulsão, socos e encaixes no alto", "Treino de força explosiva"]
  },
  {
    id: "3",
    title: "Leitura Tática e Comunicação",
    lessons: ["Liderança: A voz de comando do sistema defensivo", "Organização de barreiras", "Sinais não-verbais com a zaga"]
  },
  {
    id: "4",
    title: "A Mente Inabalável (Bônus E-E-A-T)",
    lessons: ["Gestão do erro em tempo real", "Rotinas de pré-jogo de um atleta de elite", "Como blindar a mente contra críticas"]
  }
];

const FAQS = [
  {
    question: "O curso serve para quem joga apenas no final de semana?",
    answer: "Sim. A metodologia foi adaptada para que fundamentos de elite possam ser aplicados por quem tem pouco tempo para treinar, focando em segurança e prevenção de lesões."
  },
  {
    question: "Sou preparador de goleiros. O que vou aprender?",
    answer: "Você terá acesso a exercícios práticos e à periodização de treinos voltada para o futebol moderno (jogo com os pés e cognitivo), agregando valor imenso às suas aulas."
  },
  {
    question: "Como acesso as aulas?",
    answer: "Assim que o pagamento for aprovado, você receberá um e-mail da Hotmart com seu login e senha para acessar a área de membros exclusiva de qualquer dispositivo."
  },
  {
    question: "E se eu não gostar?",
    answer: "Você tem 7 dias de garantia incondicional amparada por lei. Se achar que não é para você, basta um clique na plataforma para receber 100% do seu dinheiro de volta."
  }
];

// --- COMPONENTES AUXILIARES ---
const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4" style={{ fontFamily: 'Impact, sans-serif, system-ui' }}>
      {children}
    </h2>
    {subtitle && <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const ButtonCTA = ({ href = "#checkout", text = "Garantir Minha Vaga", className = "" }) => (
  <a href={href} className={`block w-full sm:w-auto text-center bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-zinc-950 font-bold uppercase tracking-wider py-4 px-8 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.4)] ${className}`}>
    {text}
  </a>
);

// --- COMPONENTE PRINCIPAL ---
export default function AcademiaS12LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema Markup para SEO e E-E-A-T
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Academia S12 - O Método Definitivo para Goleiros",
    "description": "Treinamento online de técnica, jogo com os pés e blindagem mental com o ex-goleiro profissional Sidão.",
    "provider": {
      "@type": "Person",
      "name": "Sidão",
      "jobTitle": "Ex-Goleiro Profissional e Mentor"
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-300 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      <Head>
        <title>Academia S12 | Método Sidão para Goleiros</title>
        <meta name="description" content="Aprenda técnica, jogo com os pés e blindagem mental com quem viveu a pressão dos maiores clubes do Brasil." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      {/* HEADER FIXO */}
      <header className="fixed top-0 w-full z-50 bg-[#090A0F]/80 backdrop-blur-md border-b border-zinc-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img 
              src="/logo-horizontal.jpeg" 
              alt="Academia S12" 
              className="h-12 md:h-16 w-auto object-contain" 
            />
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest text-zinc-400">
            <a href="#metodo" className="hover:text-amber-500 transition-colors">O Método</a>
            <a href="#modulos" className="hover:text-amber-500 transition-colors">Módulos</a>
            <a href="#historia" className="hover:text-amber-500 transition-colors">O Mentor</a>
          </nav>
          <div className="hidden sm:block">
            <ButtonCTA text="Matricule-se" className="py-2 px-6 text-sm" />
          </div>
        </div>
      </header>

      {/* HERO SECTION (Dobra 1) */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
        {/* Efeito Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          {/* AQUI A ALTERAÇÃO DA CAMISA 12 */}
          <div className="inline-block border border-amber-500/30 bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            A Metodologia Oficial do Camisa 12
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9]" style={{ fontFamily: 'Impact, sans-serif, system-ui' }}>
            DOMINE A GRANDE ÁREA. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">SEJA INABALÁVEL.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
            Aprenda técnica de elite, o jogo moderno com os pés e a <strong>blindagem mental</strong> com quem viveu a pressão extrema nos maiores clubes do Brasil.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <ButtonCTA href="#checkout" className="w-full sm:w-auto text-lg py-5 px-10 animate-pulse" />
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Compra 100% Segura
            </span>
          </div>

          <div className="pt-8 border-t border-zinc-800/50 mt-8 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Vivência Real de Alto Nível:</span>
            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholders para escudos. Na prática usar <img> */}
               <div className="h-8 w-8 bg-zinc-800 rounded flex items-center justify-center font-bold text-xs text-white">SPFC</div>
               <div className="h-8 w-8 bg-zinc-800 rounded flex items-center justify-center font-bold text-xs text-white">BFR</div>
               <div className="h-8 w-8 bg-zinc-800 rounded flex items-center justify-center font-bold text-xs text-white">CRVG</div>
               <div className="h-8 w-8 bg-zinc-800 rounded flex items-center justify-center font-bold text-xs text-white">GEC</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <div className="relative aspect-video bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
            {/* Imagem Placeholder - Usar foto épica do Sidão */}
            <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Treino Sidão" className="object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-amber-500/20 backdrop-blur-md border border-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-amber-400 ml-1" fill="currentColor" />
              </div>
              <p className="mt-4 font-bold uppercase tracking-wider text-sm text-white">Assista ao Trailer</p>
            </div>
            {/* Grunge Overlay effect */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
          </div>
        </motion.div>
      </section>

      {/* PARA QUEM É (AQUI ESTÃO OS CARDS COM BOTÕES) */}
      <section id="metodo" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="A metodologia S12 foi desenhada para atuar nas três esferas principais da posição.">
            O ALVO DO TREINAMENTO
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TARGET_AUDIENCE.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 flex flex-col group"
              >
                <div className="bg-[#090A0F] w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-amber-500/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed flex-grow">{item.desc}</p>
                
                {/* BOTÃO ADICIONADO AQUI */}
                <a 
                  href={item.link} 
                  className="mt-8 block w-full text-center py-3 px-4 border border-amber-500/50 text-amber-400 font-bold uppercase text-sm rounded hover:bg-amber-500 hover:text-zinc-950 transition-colors duration-300"
                >
                  {item.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <SectionHeading>
            O QUE VOCÊ VAI RECEBER
          </SectionHeading>

          <div className="space-y-4">
            {MODULES.map((mod, idx) => (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-zinc-900/80 border border-zinc-800 rounded-sm overflow-hidden"
              >
                <div className="p-4 md:p-6 flex items-center border-b border-zinc-800/50 bg-[#0c0d13]">
                  <span className="text-amber-500 font-bold mr-4">MÓDULO {mod.id}</span>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REELS / CONTEÚDO DINÂMICO */}
      <section className="py-20 bg-[#090A0F] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Metodologia direto do campo para a tela do seu celular.">
            TREINOS NA PRÁTICA
          </SectionHeading>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden group cursor-pointer border border-zinc-800 hover:border-amber-500/50 transition-colors">
                <img src={`https://images.unsplash.com/photo-1518605368461-1e1252223019?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`} alt="Treino" className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4">
                  <Play className="w-8 h-8 text-white mb-2 opacity-80" />
                  <p className="text-white font-bold text-sm line-clamp-2 uppercase">Dica Prática #{i}: O segredo do 1x1</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORYTELLING - QUEM É O MENTOR */}
      <section id="historia" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            {/* Foto Estilizada com tipografia Grunge atrás */}
            <div className="relative">
              <h2 className="absolute -top-10 -left-4 text-7xl md:text-9xl font-black text-zinc-800/30 uppercase z-0 select-none" style={{ fontFamily: 'Impact' }}>SIDÃO</h2>
              <div className="relative z-10 border-4 border-zinc-900 rounded-sm overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1551280857-2b9bbe5240dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Sidão Goleiro" className="w-full h-auto filter contrast-125 saturate-50" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] to-transparent"></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
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
          </motion.div>
        </div>
      </section>

      {/* OFERTA E CHECKOUT */}
      <section id="checkout" className="py-24 bg-black relative">
        {/* Textura de fundo */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-[#0c0d13] border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)]">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12">
              
              {/* Esquerda: O que leva */}
              <div className="flex-1 space-y-8">
                <h3 className="text-3xl font-black text-white uppercase" style={{ fontFamily: 'Impact' }}>
                  O QUE VOCÊ VAI <span className="text-amber-500 underline decoration-amber-500/30">RECEBER</span>
                </h3>
                <ul className="space-y-4">
                  {["Acesso Completo aos 5 Módulos Principais", "Certificado de Conclusão", "Bônus: Módulo Mentalidade Blindada", "Acesso de 1 Ano a todas as atualizações", "Suporte tira-dúvidas na plataforma"].map((item, i) => (
                    <li key={i} className="flex items-center text-zinc-300 font-medium">
                      <ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direita: Preço e CTA */}
              <div className="flex-1 bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 flex flex-col justify-center items-center text-center">
                <p className="text-zinc-400 uppercase font-bold text-sm mb-2">Investimento</p>
                <p className="text-zinc-500 line-through text-lg">De R$ {TOTAL_PRICE}</p>
                
                <div className="my-4">
                  <span className="text-2xl font-bold text-white mr-2">12x de</span>
                  <span className="text-5xl md:text-6xl font-black text-amber-500">R$ {COURSE_PRICE}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-8">* ou R$ {TOTAL_PRICE} à vista</p>

                <ButtonCTA href="https://pay.hotmart.com/SEULINK" text="QUERO MEU ACESSO AGORA" className="w-full text-xl py-6" />
                
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <span className="flex items-center"><Lock className="w-4 h-4 mr-1 text-emerald-500" /> Compra Segura</span>
                  <span className="flex items-center"><Smartphone className="w-4 h-4 mr-1 text-emerald-500" /> Acesso Imediato</span>
                </div>
              </div>

            </div>
          </div>

          {/* Garantia Gigante */}
          <div className="mt-20 text-center space-y-6">
            <h2 className="text-7xl md:text-9xl font-black text-amber-500 uppercase tracking-tighter mix-blend-lighten" style={{ fontFamily: 'Impact', textShadow: '0 10px 30px rgba(245,158,11,0.2)' }}>
              7 DIAS
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">DE GARANTIA INCONDICIONAL</p>
            <p className="text-zinc-400 max-w-3xl mx-auto text-lg">
              Você tem, por lei, o direito de testar o produto. Se dentro desse período você achar que a metodologia não é pra você, basta um clique para solicitar o reembolso total. O risco é zero.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ E RODAPÉ */}
      <footer className="bg-[#090A0F] pt-20 pb-10 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 md:px-8 mb-20">
          <SectionHeading subtitle="Tire suas dúvidas antes de entrar em campo.">
            PERGUNTAS FREQUENTES
          </SectionHeading>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-zinc-800 bg-zinc-900/30 rounded-sm overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-white uppercase hover:bg-zinc-800/50 transition-colors"
                >
                  {faq.question}
                  <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 text-zinc-400 pb-4 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center border-t border-zinc-900 pt-8">
          <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest">Produzido por: Academia S12 | Sidão</p>
          <div className="mt-4 flex justify-center gap-6 text-zinc-700 text-xs uppercase">
            <a href="#" className="hover:text-zinc-400 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}