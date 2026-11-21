import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useSiteContent } from '../context/SiteContentContext';

export const FloatingWhatsApp: React.FC = () => {
  const { content } = useSiteContent();
  const [showQuizCallout, setShowQuizCallout] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/5511981511548?text=${encodeURIComponent(
    "Olá! Acessei o site da J.ENERGY e gostaria de falar com o João sobre serviços elétricos."
  )}`;

  const quizUrl = content.quiz?.url || "https://quiz.elitedafechadura.com.br/quiz/matos-joao06?direto=1";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Card de Chamada para Ação (CTA) do Quiz Interativo */}
      {showQuizCallout && content.quiz?.active && (
        <div className="relative mb-1 w-[calc(100vw-2.5rem)] sm:w-[320px] max-w-[340px] p-4 rounded-2xl bg-[#111316]/98 border border-[#F2AA24]/40 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(242,170,36,0.15)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Botão de Fechar CTA */}
          <button
            onClick={() => setShowQuizCallout(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-[#85898C] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar chamada do Quiz"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Kicker Tag */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2AA24] animate-ping" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#F2AA24]">
              {content.quiz.kicker}
            </span>
          </div>

          {/* Headline */}
          <h4 className="font-display font-bold text-sm sm:text-[15px] text-white leading-snug tracking-tight pr-5">
            {content.quiz.title}
          </h4>

          {/* Texto de Apoio */}
          <p className="mt-1.5 text-xs text-[#C2C6CA] leading-relaxed">
            {content.quiz.description}
          </p>

          {/* Botão de Ação Primário do Quiz */}
          <a
            href={quizUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F2AA24] via-[#F5B738] to-[#DC6B32] text-[#111316] font-display font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_16px_rgba(242,170,36,0.4)] group/btn"
          >
            <span>{content.quiz.buttonText}</span>
            <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
          </a>

          {/* Microcopy de Fricção Zero */}
          <p className="mt-2 text-[10.5px] font-mono text-center text-[#85898C]">
            {content.quiz.subtext}
          </p>
        </div>
      )}

      {/* Botão do Quiz Interativo com o Símbolo Oficial J.ENERGY (em cima do WhatsApp) */}
      <div className="group relative flex items-center">
        {/* Tooltip do Quiz no Hover (quando o card principal estiver fechado) */}
        {!showQuizCallout && (
          <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-3 whitespace-nowrap px-3.5 py-2 rounded-xl bg-[#111316]/95 border border-[#F2AA24]/30 text-xs font-mono text-[#F5F4F0] shadow-2xl items-center gap-2 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[#F2AA24] rounded-full animate-pulse shadow-[0_0_8px_#F2AA24]" />
            <span>Quiz Fechaduras · <strong>Descubra o modelo ideal</strong></span>
          </div>
        )}

        {/* Botão de Ação Circular com Símbolo Oficial J.ENERGY */}
        <a
          href={quizUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#111316] hover:bg-[#1D2126] border-2 border-[#F2AA24] text-white shadow-[0_4px_20px_rgba(242,170,36,0.45)] hover:shadow-[0_8px_30px_rgba(242,170,36,0.75)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer p-2.5 overflow-hidden group/quiz"
          title="Quiz: Descubra a fechadura digital ideal para sua porta"
          aria-label="Acessar Quiz Interativo J.ENERGY"
        >
          {/* Anel de Pulso Âmbar no botão do Quiz */}
          <div className="absolute inset-0 rounded-full bg-[#F2AA24]/20 animate-pulse pointer-events-none" />

          {/* Símbolo do Ícone Oficial J.ENERGY */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transition-transform duration-300 group-hover/quiz:scale-110 relative z-10"
          >
            {/* Linha guia estrutural de precisão */}
            <line x1="3" y1="12" x2="21" y2="12" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2 2" />
            
            {/* Raio Técnico Angular J.ENERGY */}
            <path 
              d="M13 2.5L5.5 13H11.5L9.5 21.5L18.5 10H12.5L14.5 2.5H13Z" 
              fill="#F2AA24"
              stroke="#DC6B32"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Mini etiqueta 'QUIZ' */}
          <span className="absolute -bottom-0.5 inset-x-0 bg-[#F2AA24] text-[#111316] text-[7.5px] font-black uppercase text-center tracking-tighter py-0 leading-tight z-20">
            QUIZ
          </span>
        </a>
      </div>

      {/* Tooltip speech bubble do WhatsApp */}
      {showTooltip && (
        <div className="mb-1 hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#101214] border border-white/10 shadow-2xl text-xs text-[#F5F4F0] animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-xs">
          <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366] shrink-0" />
          <span>
            Dúvidas? <strong className="font-semibold text-white">Fale direto com o João Matos</strong>
          </span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-[#85898C] hover:text-[#FFFFFF] p-0.5 ml-1 cursor-pointer transition-colors"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button do WhatsApp com Pulso Dinâmico e Microinteração */}
      <div className="relative flex items-center justify-center">
        {/* Anel de Pulso Dinâmico Suave */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-pulse-ring pointer-events-none" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          title="Conversar no WhatsApp J.ENERGY"
          aria-label="Conversar no WhatsApp com eletricista João Matos"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-8" />
        </a>
      </div>
    </div>
  );
};
