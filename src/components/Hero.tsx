import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Award, Star } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useSiteContent } from '../context/SiteContentContext';

export const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { content } = useSiteContent();

  const whatsappUrl = `https://wa.me/5511981511548?text=${encodeURIComponent(
    "Olá João! Acessei o site da J.ENERGY e gostaria de solicitar um orçamento técnico para meu imóvel. Poderia me ajudar?"
  )}`;

  const coverImagePath = content.hero.coverImage || "/assets/aistudio/Eletricista-Veja-Como-Ser-um-Bom-Profissional_e468609b.jpg";

  return (
    <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 bg-[#111316] overflow-hidden border-b border-white/8 min-h-[82vh] flex items-center">
      
      {/* CAPA DE FUNDO EM UM TOM BEM ESCURO (FOTOGRAFIA REAL DO ELETRICISTA NO PAINEL) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {/* Imagem de Fundo com Tratamento Cinematográfico Escuro de Alta Densidade */}
        <img
          src={coverImagePath}
          alt=""
          role="presentation"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-[center_30%] scale-105 filter brightness-[0.16] contrast-[1.3] saturate-[0.75] opacity-90 transition-transform duration-1000 ease-out"
        />

        {/* Gradiente Escuro Lateral (Assegura contraste e legibilidade absoluta dos textos) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111316] via-[#111316]/90 to-[#111316]/65" />

        {/* Gradiente Escuro Vertical (Transição fluida com o topo e a próxima seção) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-transparent to-[#101214]/90" />

        {/* Vinheta Radial de Profundidade */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 65% 35%, transparent 10%, #111316 80%)'
          }}
        />

        {/* Trama Arquitetônica Fina */}
        <div className="absolute inset-0 bg-grid-architectural opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Grid Editorial Assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Coluna Esquerda: Tipografia Editorial de Autoridade e CTA Dinâmico */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Kicker Arquitetônico Oficial com Slogan */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 text-xs font-mono tracking-wider text-[#A3A8AC]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1D2126] border border-white/10 text-[#F2AA24] font-semibold uppercase text-[11px]">
                <span className="w-1.5 h-1.5 bg-[#F2AA24] rounded-full shadow-[0_0_8px_#F2AA24]" />
                {content.hero.kicker}
              </span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="text-[#F5F4F0] font-medium italic">
                &ldquo;{content.hero.slogan}&rdquo;
              </span>
            </div>

            {/* Headline Principal em Space Grotesk */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold font-display uppercase tracking-tight text-[#FFFFFF] leading-[1.08] mb-6 [text-wrap:balance]">
              {content.hero.headline}{' '}
              <span className="text-[#F2AA24] drop-shadow-[0_2px_16px_rgba(242,170,36,0.35)]">
                {content.hero.headlineHighlight}
              </span>
            </h1>

            {/* Subheadline Editorial em Inter */}
            <p className="text-base sm:text-lg text-[#A3A8AC] leading-relaxed max-w-xl mb-8 font-normal">
              {content.hero.subheadline}
            </p>

            {/* O ÚNICO BOTÃO DE ORÇAMENTO DA PÁGINA — ALTAMENTE DINÂMICO, INTERATIVO E RESPONSIVO */}
            <div className="mb-8 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-9 py-4 text-xs sm:text-sm font-bold font-display uppercase tracking-wider text-[#101214] bg-[#F2AA24] hover:bg-[#ffb732] rounded-xl transition-all duration-300 shadow-[0_4px_24px_rgba(242,170,36,0.35)] hover:shadow-[0_10px_40px_rgba(242,170,36,0.55)] cursor-pointer hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] overflow-hidden border border-[#F2AA24]/40"
              >
                {/* Feixe de Luz / Shimmer Interativo que Desliza pelo Botão */}
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Ícone WhatsApp Dinâmico */}
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#101214] fill-[#101214] shrink-0 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-8" />
                
                {/* Texto do Botão com Peso e Flexibilidade Responsiva */}
                <span className="relative z-10 font-extrabold text-center">
                  {content.hero.buttonText}
                </span>

                {/* Seta Dinâmica com Deslocamento Interativo */}
                <ArrowRight className="w-4 h-4 text-[#101214] transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" />

                {/* Aura Interativa Sutil no Canto */}
                <div className={`absolute top-0 right-0 w-10 h-10 bg-white/20 blur-sm rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100 scale-150' : 'opacity-0'}`} />
              </a>
            </div>

            {/* Faixa Arquitetônica de Credenciais Reais de João Matos */}
            <div className="pt-6 border-t border-white/8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#A3A8AC]">
              
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#F2AA24] shrink-0" />
                <div>
                  <span className="text-[#F5F4F0] font-semibold block leading-tight">SENAI & CFT</span>
                  <span className="text-[11px] text-[#85898C]">Técnico em Eletrotécnica</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#F2AA24] shrink-0" />
                <div>
                  <span className="text-[#F5F4F0] font-semibold block leading-tight">NR-10 & NR-35</span>
                  <span className="text-[11px] text-[#85898C]">Conformidade NBR 5410</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex items-center text-[#F2AA24] shrink-0">
                  <Star className="w-4 h-4 fill-[#F2AA24]" />
                </div>
                <div>
                  <span className="text-[#F5F4F0] font-semibold block leading-tight">Reputação 5.0</span>
                  <span className="text-[11px] text-[#85898C]">382 Avaliações no Google</span>
                </div>
              </div>

            </div>

          </div>

          {/* Coluna Direita: Emolduramento Fotográfico de Precisão Industrial */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1D2126] shadow-2xl group transition-all duration-300 hover:border-[#F2AA24]/40">
              
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] relative overflow-hidden bg-[#101214]">
                <img
                  src={coverImagePath}
                  alt="Técnico João Matos executando montagem e manutenção em painel de distribuição elétrica"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="eager"
                />

                {/* Subtle contrast scrim */}
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-gradient-to-t from-[#111316] via-[#111316]/30 to-transparent opacity-85"
                />

                {/* Inset de Legenda Arquitetônica */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#111316]/95 backdrop-blur-md border border-white/10 transition-colors duration-300 group-hover:border-[#F2AA24]/40">
                  <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono">
                    <span className="uppercase tracking-widest text-[#F2AA24] font-semibold">
                      J.ENERGY ENGENHARIA
                    </span>
                    <span className="text-[#A3A8AC] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px]">
                      CFT ATIVO
                    </span>
                  </div>
                  <p className="text-xs text-[#F5F4F0] font-normal leading-snug">
                    Segurança, dimensionamento exato e garantia de continuidade operacional em cada circuito.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
