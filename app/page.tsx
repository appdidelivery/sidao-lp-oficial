"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  ShieldCheck, 
  Brain, 
  Trophy, 
  ChevronDown, 
  CheckCircle2, 
  Lock, 
  Smartphone,
  ChevronRight,
  Menu, // Ícone do menu mobile
  X // Ícone para fechar o menu mobile
} from "lucide-react";
import Head from "next/head";

// --- DADOS DINÂMICOS DOS 3 CURSOS ---
const COURSES_DATA = [
  {
    id: 0,
    type: "Amador",
    title: "Goleiros Amadores",
    icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
    desc: "Acabe com a insegurança debaixo da trave. Aprenda posicionamento, firmeza na pegada e evite lesões bobas na várzea ou society.",
    price: "19,66",
    totalPrice: "197,00",
    checkoutLink: "https://pay.hotmart.com/LINK_AMADOR",
    modules: [
      { title: "A Base de Tudo: Posicionamento e Postura", lessons: ["A transição para o campo", "Biomecânica da queda e pegada em 'W'", "Encurtamento de ângulo e tempo de reação"] },
      { title: "Segurança Total e Domínio", lessons: ["Tempo de bola aéreo básico", "Fechando o ângulo no 1x1", "Treino de impulsão"] },
      { title: "A Mente Inabalável", lessons: ["Como lidar com a pressão de falhar na várzea", "Foco e concentração no jogo"] }
    ]
  },
  {
    id: 1,
    type: "Base",
    title: "Atletas de Base",
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    desc: "Desenvolva o jogo com os pés e a leitura tática exigida pelos olheiros modernos. Blinde sua mente para passar nas peneiras.",
    price: "29,64",
    totalPrice: "297,00",
    checkoutLink: "https://pay.hotmart.com/LINK_BASE",
    modules: [
      { title: "O Goleiro Moderno: Jogo com os Pés", lessons: ["Domínio orientado sob pressão", "Passes de ruptura e construção de jogadas", "Atuando como líbero na cobertura preventiva"] },
      { title: "Explosão e Alto Rendimento", lessons: ["Treino de força explosiva", "Impulsão, socos e encaixes no alto", "Agilidade debaixo da trave"] },
      { title: "Mentalidade de Peneira", lessons: ["Rotinas de pré-jogo de um atleta de elite", "Como blindar a mente contra críticas e olheiros"] }
    ]
  },
  {
    id: 2,
    type: "Preparador",
    title: "Preparador de Goleiros",
    icon: <Brain className="w-8 h-8 text-amber-500" />,
    desc: "Acesse uma metodologia validada na Série A. Aprenda a periodizar treinos que unem técnica, explosão e tomada de decisão.",
    price: "49,60",
    totalPrice: "497,00",
    checkoutLink: "https://pay.hotmart.com/LINK_PREPARADOR",
    modules: [
      { title: "Periodização Tática", lessons: ["Criando treinos cognitivos", "Gestão de carga e prevenção de lesão", "Como avaliar seus goleiros na prática"] },
      { title: "O Método Diniz/Sidão", lessons: ["Como treinar o jogo com os pés no dia a dia", "Simulações de jogo real dentro da área", "Exercícios práticos documentados"] },
      { title: "Liderança e Comunicação", lessons: ["A voz de comando do sistema defensivo", "Sinais não-verbais com a zaga", "Certificação de conclusão"] }
    ]
  }
];

const FAQS = [
  { question: "O curso serve para quem joga apenas no final de semana?", answer: "Sim. A metodologia foi adaptada para que fundamentos de elite possam ser aplicados por quem tem pouco tempo para treinar, focando em segurança e prevenção de lesões." },
  { question: "Sou preparador de goleiros. O que vou aprender?", answer: "Você terá acesso a exercícios práticos e à periodização de treinos voltada para o futebol moderno (jogo com os pés e cognitivo), agregando valor imenso às suas aulas." },
  { question: "Como acesso as aulas?", answer: "Assim que o pagamento for aprovado, você receberá um e-mail com seu login e senha para acessar a área de membros exclusiva de qualquer dispositivo." },
  { question: "E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional amparada por lei. Se achar que não é para você, basta um clique na plataforma para receber 100% do seu dinheiro de volta." }
];

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4" style={{ fontFamily: 'Impact, sans-serif, system-ui' }}>{children}</h2>
    {subtitle && <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const ButtonCTA = ({ href = "#checkout", text = "Garantir Minha Vaga", className = "", onClick = () => {} }) => (
  <a href={href} onClick={onClick} className={`block text-center bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-zinc-950 font-bold uppercase tracking-wider rounded-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.4)] ${className}`}>
    {text}
  </a>
);

export default function AcademiaS12LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCourse, setActiveCourse] = useState(0);
  const currentCourse = COURSES_DATA[activeCourse];
  
  // ESTADOS NOVOS: Menu Mobile e Bloqueio de Senha
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // --- ESTADOS DO NOVO FORMULÁRIO DE CAPTURA (INTEGRADO API) ---
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirecionamento tático forçando a Keyword exata para o ManyChat no WhatsApp
        const numeroAgencia = "554832200260";
        const mensagem = "Quero entrar na Academia S12";
        const whatsappUrl = `https://wa.me/${numeroAgencia}?text=${encodeURIComponent(mensagem)}`;
        
        // window.location.href é preferível aqui para forçar a abertura do app nativo (Deep Link) no mobile sem bloqueio de pop-up
        window.location.href = whatsappUrl;
      } else {
        alert("Não conseguimos processar sua inscrição. Por favor, tente novamente.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
      setIsSubmitting(false);
    }
  };

  // Verifica se o usuário já digitou a senha antes (salvo no navegador)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const unlocked = localStorage.getItem("s12_unlocked");
      if (unlocked === "true") {
        setIsUnlocked(true);
      }
    }
  }, []);

  // Função para validar a senha
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.toLowerCase() === "sidao12") {
      setIsUnlocked(true);
      localStorage.setItem("s12_unlocked", "true");
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  // --- TELA DE BLOQUEIO (GATEKEEPER) - AGORA COMO CAPTURA DE LEADS ---
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#090A0F] text-zinc-300 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Fundo animado */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-2xl max-w-lg w-full text-center z-10 shadow-2xl backdrop-blur-sm"
        >
          <img src="/logo-horizontal.jpeg" alt="Academia S12" className="h-12 mx-auto mb-6 object-contain" />
          
          <h2 className="text-3xl font-black text-white uppercase mb-2" style={{ fontFamily: 'Impact' }}>
            LISTA VIP <span className="text-amber-500">S12</span>
          </h2>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Garanta sua vaga na lista de espera preenchendo os dados abaixo.
          </p>
          
          {/* Formulário de Captura Live + Firebase */}
          <form onSubmit={handleSubmitLead} className="flex flex-col gap-4 text-left">
            <div>
              <label htmlFor="nome" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-1 block">Seu Nome</label>
              <input 
                id="nome"
                type="text" 
                required
                placeholder="Ex: Taffarel"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full bg-[#090A0F] border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-1 block">Seu E-mail</label>
              <input 
                id="email"
                type="email" 
                required
                placeholder="Ex: goleiro@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#090A0F] border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-1 block">WhatsApp (com DDD)</label>
              <input 
                id="whatsapp"
                type="tel" 
                required
                placeholder="Ex: 11 99999-9999"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-[#090A0F] border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-zinc-400 text-white font-black uppercase tracking-wider p-4 rounded transition-all mt-2 shadow-[0_0_15px_rgba(5,150,105,0.3)] hover:shadow-[0_0_25px_rgba(5,150,105,0.5)] transform hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:shadow-none flex justify-center items-center"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "ACESSAR GRUPO VIP ➔"}
            </button>
          </form>

          {/* Mantivemos o formulário da equipe pequeno no rodapé */}
          <form onSubmit={handleUnlock} className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1">Acesso Restrito</p>
            <input 
              type="password" 
              placeholder="Senha de Equipe"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className={`w-full bg-transparent border-b ${passwordError ? 'border-red-500' : 'border-zinc-800'} p-2 text-center text-xs text-zinc-500 focus:outline-none focus:border-amber-500 focus:text-white transition-colors`}
            />
          </form>
        </motion.div>
      </div>
    );
  }

  // --- O SITE REAL (Se a senha estiver correta) ---
  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-300 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      <Head>
        <title>Academia S12 | Método Sidão para Goleiros</title>
        <meta name="description" content="Aprenda técnica, jogo com os pés e blindagem mental com quem viveu a pressão dos maiores clubes do Brasil." />
      </Head>

      {/* HEADER FIXO E MENU MOBILE AJUSTADO */}
      <header className="fixed top-0 w-full z-50 bg-[#090A0F]/90 backdrop-blur-md border-b border-zinc-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center z-50">
            <img src="/logo-horizontal.jpeg" alt="Academia S12" className="h-10 md:h-14 w-auto object-contain" />
          </a>
          
          {/* Menu Desktop */}
          <nav className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest text-zinc-400 items-center">
            <a href="#metodo" className="hover:text-amber-500 transition-colors">O Método</a>
            <a href="#modulos" className="hover:text-amber-500 transition-colors">Módulos</a>
            <a href="#historia" className="hover:text-amber-500 transition-colors">O Mentor</a>
            <ButtonCTA href="#cursos" text="Lista VIP" className="py-2 px-6 text-sm ml-4" />
          </nav>

          {/* Botões Mobile (Hambúrguer + CTA Menor) */}
          <div className="flex md:hidden items-center gap-3 z-50">
            <ButtonCTA href="#cursos" text="Lista VIP" className="py-2 px-4 text-xs" />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-1">
              {isMobileMenuOpen ? <X className="w-8 h-8 text-amber-500" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Menu Overlay Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-[#090A0F] border-b border-zinc-800 flex flex-col p-6 gap-6 text-center shadow-2xl md:hidden"
            >
              <a href="#metodo" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold uppercase text-white hover:text-amber-500">O Método</a>
              <a href="#modulos" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold uppercase text-white hover:text-amber-500">Módulos</a>
              <a href="#historia" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold uppercase text-white hover:text-amber-500">O Mentor</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10 mt-10 md:mt-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-block border border-amber-500/30 bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            A Metodologia Oficial do Camisa 12
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9]" style={{ fontFamily: 'Impact, sans-serif, system-ui' }}>
            DOMINE A GRANDE ÁREA. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">SEJA INABALÁVEL.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto md:mx-0">
            Aprenda técnica de elite, o jogo moderno com os pés e a <strong>blindagem mental</strong> com quem viveu a pressão extrema nos maiores clubes do Brasil.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <ButtonCTA href="#cursos" text="ESCOLHER MEU CURSO" className="w-full sm:w-auto text-lg py-5 px-10 animate-pulse" />
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Compra Segura
            </span>
          </div>

          <div className="pt-8 border-t border-zinc-800/50 mt-8 flex flex-col gap-3 items-center md:items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Vivência Real de Alto Nível:</span>
            <div className="flex gap-6 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               <img src="/escudo-spfc.png" alt="São Paulo FC" className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="São Paulo FC" />
               <img src="/escudo-bfr.png" alt="Botafogo" className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="Botafogo" />
               <img src="/escudo-crvg.png" alt="Vasco da Gama" className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="Vasco" />
               <img src="/escudo-gec.png" alt="Goiás" className="h-10 w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform" title="Goiás" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex-1 w-full relative">
          <div className="relative aspect-video bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
<img 
  src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
  alt="Treino Sidão" 
  fetchPriority="high"
  decoding="async"
  className="object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity duration-500" 
/>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-amber-500/20 backdrop-blur-md border border-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-amber-400 ml-1" fill="currentColor" />
              </div>
              <p className="mt-4 font-bold uppercase tracking-wider text-sm text-white">Assista ao Trailer</p>
            </div>
<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
          </div>
        </motion.div>
      </section>

      {/* SELEÇÃO DINÂMICA DE CURSOS */}
      <section id="cursos" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="A metodologia S12 foi desenhada para atuar nas três esferas principais da posição. Selecione seu perfil.">
            QUAL É O SEU ALVO?
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
            {COURSES_DATA.map((item, idx) => (
              <motion.div 
                key={idx}
                onClick={() => {
                  setActiveCourse(idx);
                  document.getElementById("modulos")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`p-8 rounded-lg transition-all duration-300 flex flex-col group ${activeCourse === idx ? 'bg-zinc-900 border-2 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 border transition-colors ${activeCourse === idx ? 'bg-amber-500/10 border-amber-500' : 'bg-[#090A0F] border-zinc-800 group-hover:border-amber-500/30'}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed flex-grow">{item.desc}</p>
                
                <div className={`mt-8 block w-full text-center py-3 px-4 font-bold uppercase text-sm rounded transition-colors duration-300 ${activeCourse === idx ? 'bg-amber-500 text-zinc-950' : 'border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-zinc-950'}`}>
                  {activeCourse === idx ? 'Módulos Selecionados' : 'Ver Detalhes do Curso'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MÓDULOS DINÂMICOS */}
      <section id="modulos" className="py-24 relative overflow-hidden bg-[#0c0d13]">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle={`Conteúdo Exclusivo focado em: ${currentCourse.title}`}>
            O QUE VOCÊ VAI RECEBER
          </SectionHeading>

          <div className="space-y-4">
            {currentCourse.modules.map((mod, idx) => (
              <motion.div 
                key={`${currentCourse.id}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-zinc-900/80 border border-zinc-800 rounded-sm overflow-hidden"
              >
                <div className="p-4 md:p-6 flex items-center border-b border-zinc-800/50 bg-[#090A0F]">
                  <span className="text-amber-500 font-bold mr-4">MÓDULO {idx + 1}</span>
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

      {/* REELS / CONTEÚDO DINÂMICO - VERSÃO RETENÇÃO DE LEAD */}
      <section className="py-20 bg-[#090A0F] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Metodologia direto do campo para a tela do seu celular.">
            TREINOS NA PRÁTICA
          </SectionHeading>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* VÍDEO 1 */}
            <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors">
              <video
                className="object-cover w-full h-full"
                controls
                preload="none"
                poster="/thumb-1.jpg"
                playsInline
              >
                <source src="/reel-1.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <p className="text-white font-bold text-sm line-clamp-2 uppercase drop-shadow-md">Melhorar seu treino</p>
              </div>
            </div>

            {/* VÍDEO 2 */}
            <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors">
              <video
                className="object-cover w-full h-full"
                controls
                preload="none"
                poster="/thumb-2.jpg"
                playsInline
              >
                <source src="/reel-2.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <p className="text-white font-bold text-sm line-clamp-2 uppercase drop-shadow-md">Formas de reposição</p>
              </div>
            </div>

            {/* VÍDEO 3 */}
            <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors">
              <video
                className="object-cover w-full h-full"
                controls
                preload="none"
                poster="/thumb-3.jpg"
                playsInline
              >
                <source src="/reel-3.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <p className="text-white font-bold text-sm line-clamp-2 uppercase drop-shadow-md">Gestos no treinamento</p>
              </div>
            </div>

            {/* VÍDEO 4 */}
            <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-colors">
              <video
                className="object-cover w-full h-full"
                controls
                preload="none"
                poster="/thumb-4.jpg"
                playsInline
              >
                <source src="/reel-4.mp4" type="video/mp4" />
              </video>
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
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 w-full">
            <div className="relative">
              <h2 className="absolute -top-10 -left-4 text-7xl md:text-9xl font-black text-zinc-800/30 uppercase z-0 select-none" style={{ fontFamily: 'Impact' }}>SIDÃO</h2>
              <div className="relative z-10 border-4 border-zinc-900 rounded-sm overflow-hidden shadow-2xl">
                 <img 
                   src="/sidao-goleiro.png" 
                   alt="Sidão Goleiro" 
                   loading="lazy"
                   className="w-full h-auto object-cover filter contrast-125 saturate-50" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent"></div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 space-y-6">
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
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Acesso aos Módulos Exclusivos: {currentCourse.title}</li>
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Certificado de Conclusão Oficial</li>
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Bônus: Módulo Mentalidade Blindada</li>
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Acesso de 1 Ano a todas as atualizações</li>
                  <li className="flex items-center text-zinc-300 font-medium"><ChevronRight className="w-5 h-5 text-amber-500 mr-2 shrink-0" /> Suporte tira-dúvidas na plataforma</li>
                </ul>
              </div>

              <div className="flex-1 bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 flex flex-col justify-center items-center text-center">
                <p className="text-zinc-400 uppercase font-bold text-sm mb-2">Investimento</p>
                <p className="text-zinc-500 line-through text-lg">De R$ {currentCourse.totalPrice}</p>
                
                <div className="my-4">
                  <span className="text-2xl font-bold text-white mr-2">12x de</span>
                  <span className="text-5xl md:text-6xl font-black text-amber-500">R$ {currentCourse.price}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-8">* ou R$ {currentCourse.totalPrice} à vista</p>

                <ButtonCTA href={currentCourse.checkoutLink} text="QUERO MEU ACESSO AGORA" className="w-full text-xl py-6" />
                
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <span className="flex items-center"><Lock className="w-4 h-4 mr-1 text-emerald-500" /> Compra Segura</span>
                  <span className="flex items-center"><Smartphone className="w-4 h-4 mr-1 text-emerald-500" /> Acesso Imediato</span>
                </div>
              </div>
            </div>
          </div>

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
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-white uppercase hover:bg-zinc-800/50 transition-colors">
                  {faq.question}
                  <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 text-zinc-400 pb-4 leading-relaxed">
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
        </div>
      </footer>
    </div>
  );
}