import React from 'react';
import { ShieldCheck, Award, Star, CheckCircle2, FileCheck } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export const AboutJoaoSection: React.FC = () => {
  const { content } = useSiteContent();
  const cursos = content.about.cursos || [];
  const portraitImg = content.about.portraitImage || "/assets/joao_real.jpg";

  return (
    <section id="sobre" className="py-24 sm:py-32 bg-[#111316] border-t border-white/8 relative overflow-hidden">
      {/* Trama Arquitetônica Fina */}
      <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bloco Editorial Superior: Retrato de João Matos + Apresentação Institucional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Coluna Esquerda: Retrato Real com Emolduramento Industrial */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1D2126] shadow-2xl group max-w-md mx-auto lg:max-w-none transition-all duration-300 hover:border-[#F2AA24]/40">
              
              <div className="aspect-[4/5] overflow-hidden relative bg-[#101214]">
                <img
                  src={portraitImg}
                  alt="João Matos, eletricista e responsável técnico pela J.ENERGY Soluções Elétricas"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                {/* Contrast scrim */}
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-gradient-to-t from-[#111316] via-[#111316]/20 to-transparent opacity-85" 
                />

                {/* Selo Google Maps Flutuante */}
                <div className="absolute top-4 right-4 bg-[#111316]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-[#F2AA24] text-[#F2AA24]" />
                  <span className="text-xs font-mono font-bold text-[#FFFFFF]">5.0</span>
                  <span className="text-[10px] text-[#A3A8AC]">Google Maps</span>
                </div>
              </div>

              {/* Inset Arquitetônico de Identificação */}
              <div className="p-5 bg-[#171A1D] border-t border-white/8 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-display uppercase tracking-tight text-[#FFFFFF]">
                    {content.about.title}
                  </h3>
                  <p className="text-xs text-[#A3A8AC] font-mono">
                    Responsável Técnico · J.ENERGY
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#F2AA24] bg-white/5 border border-white/10 px-2.5 py-1 rounded font-semibold">
                  {content.about.cftBadge}
                </span>
              </div>

            </div>
          </div>

          {/* Coluna Direita: Narrativa Oficial da J.ENERGY e Filosofia de Trabalho */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="flex items-center gap-2.5 mb-4 text-xs font-mono uppercase tracking-[0.2em] text-[#A3A8AC]">
              <span className="w-1.5 h-1.5 bg-[#F2AA24] rounded-sm shadow-[0_0_6px_#F2AA24]" />
              <span>{content.about.tagline}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-[#FFFFFF] tracking-tight mb-3 [text-wrap:balance]">
              CONHEÇA O ELETRICISTA {content.about.title}.
            </h2>

            <p className="text-xs sm:text-sm font-mono text-[#F2AA24] tracking-wider uppercase mb-6 font-semibold flex items-center gap-2">
              <span>J.ENERGY SOLUÇÕES ELÉTRICAS</span>
              <span className="text-white/20">·</span>
              <span className="text-[#F5F4F0] normal-case font-medium">Segurança, qualidade e tecnologia em cada serviço!</span>
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#A3A8AC] leading-relaxed font-normal">
              {content.about.presentationText.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Destaque das Avaliações e Slogan Oficial */}
            <div className="mt-7 pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-semibold text-[#F5F4F0]">Mais de 380 avaliações 5 estrelas no Google!</span>
              </div>
              
              <div className="text-xs text-[#A3A8AC] font-mono italic">
                J.Energy — &ldquo;Sua segurança é nossa energia!&rdquo;
              </div>
            </div>

          </div>

        </div>

        {/* Bloco Inferior: Formação, Cursos e Credenciamento CFT */}
        <div className="pt-10 border-t border-white/8">
          
          {/* Faixa Oficial de Credenciamento CFT */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#171A1D] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#111316] border border-white/10 flex items-center justify-center text-[#F2AA24] shrink-0">
                <FileCheck className="w-5 h-5 text-[#F2AA24]" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#F2AA24] block leading-tight font-semibold">
                  Habilitação & Conselho Profissional
                </span>
                <h4 className="text-sm sm:text-base font-bold font-display text-[#FFFFFF]">
                  Técnico ativo e com credenciamento pelo CFT (Conselho Federal dos Técnicos)
                </h4>
              </div>
            </div>

            <span className="text-xs font-mono text-[#A3A8AC] bg-white/5 border border-white/10 px-3 py-1 rounded whitespace-nowrap">
              CFT REGULARIZADO
            </span>
          </div>

          {/* Grid dos 8 Cursos e Capacitações Oficiais */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A3A8AC] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#F2AA24]" />
                <span>Formação Técnica & Especializações</span>
              </span>
              <span className="text-[11px] font-mono text-[#85898C]">
                8 Capacitações Certificadas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {cursos.map((curso) => (
                <div 
                  key={curso.num}
                  className="p-4 rounded-xl bg-[#171A1D] border border-white/8 transition-all duration-200 hover:border-[#F2AA24]/40 hover:bg-[#1D2126] group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#F2AA24]">
                      {curso.num}
                    </span>
                    <span className="text-[10px] font-mono text-[#85898C] uppercase">
                      {curso.category}
                    </span>
                  </div>
                  <h5 className="text-sm font-bold font-display text-[#FFFFFF] group-hover:text-[#F2AA24] transition-colors leading-snug">
                    {curso.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
