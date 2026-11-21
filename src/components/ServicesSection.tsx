import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export const ServicesSection: React.FC = () => {
  const { content } = useSiteContent();
  const services = content.services || [];
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'instalacoes-eletricas');

  const activeService = services.find((s) => s.id === selectedServiceId) || services[0];

  return (
    <section 
      id="servicos" 
      className="py-24 sm:py-32 bg-[#F6F5F0] text-[#111316] border-y border-black/8 relative overflow-hidden transition-colors duration-300"
    >
      {/* Trama Arquitetônica Fina Clara */}
      <div className="absolute inset-0 bg-grid-architectural-light opacity-60 pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho Editorial da Seção com Contraste Claro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-black/8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-[0.2em] text-[#5A6065]">
              <span className="w-1.5 h-1.5 bg-[#F2AA24] rounded-sm shadow-[0_0_6px_#F2AA24]" />
              <span>01 / Catálogo de Engenharia & Serviços</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-[#111316] tracking-tight [text-wrap:balance]">
              CAPACIDADES TÉCNICAS E SERVIÇOS.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5A6065] max-w-md leading-relaxed font-normal">
            Atendimento residencial, predial e comercial estruturado com rigor às normas NBR 5410, NR-10 e NR-35, sem improvisações.
          </p>
        </div>

        {/* LAYOUT DESKTOP: Master-Detail Arquitetônico (12 Colunas) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Coluna Esquerda: Índice Editorial com Cartões Táticos (6 Serviços) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7E868C] mb-1 block px-1">
              Selecione o Serviço para Detalhes Técnicos
            </span>
            
            {services.map((service) => {
              const isSelected = service.id === activeService.id;

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`group relative w-full text-left p-4 sm:p-5 rounded-xl transition-all duration-300 cursor-pointer border overflow-hidden ${
                    isSelected
                      ? 'bg-[#111316] border-[#111316] text-[#FFFFFF] shadow-xl translate-x-2'
                      : 'bg-[#FFFFFF] hover:bg-[#FFFFFF] hover:translate-x-1.5 border-black/8 hover:border-black/20 text-[#5A6065] shadow-xs'
                  }`}
                >
                  {/* Barra de Seleção em Âmbar Elétrico */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F2AA24] shadow-[0_0_10px_#F2AA24]" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono font-bold transition-all duration-300 ${isSelected ? 'text-[#F2AA24] scale-110' : 'text-[#7E868C] group-hover:text-[#111316]'}`}>
                        {service.number}
                      </span>
                      <div>
                        <h3 className={`text-base font-bold font-display transition-colors duration-200 ${isSelected ? 'text-[#FFFFFF]' : 'text-[#111316] group-hover:text-[#111316]'}`}>
                          {service.title}
                        </h3>
                        <p className={`text-xs mt-0.5 line-clamp-1 font-normal ${isSelected ? 'text-[#A3A8AC]' : 'text-[#7E868C]'}`}>
                          {service.badge}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 transition-all duration-300 ${isSelected ? 'text-[#F2AA24] translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 text-[#111316]'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Coluna Direita: Prancha Técnica de Especificação (Showcase) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-black/10 bg-[#FFFFFF] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
              
              {/* Moldura Fotográfica com Metadados */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111316]">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                  loading="lazy"
                />
                
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-gradient-to-t from-[#111316]/90 via-[#111316]/30 to-transparent" 
                />

                {/* Tags Superiores de Norma */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="bg-[#111316]/90 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[#F5F4F0]">
                    ITEM {activeService.number} / 06
                  </span>
                  <span className="bg-[#111316]/90 backdrop-blur-md px-3 py-1 rounded border border-[#F2AA24]/40 text-[#F2AA24] font-semibold">
                    {activeService.norma}
                  </span>
                </div>

                {/* Título da Ficha Técnica */}
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#FFFFFF] tracking-tight">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              {/* Corpo da Prancha Técnica */}
              <div className="p-7 sm:p-9">
                
                <p className="text-sm sm:text-base text-[#2D3136] leading-relaxed mb-6 font-normal">
                  {activeService.fullDescription}
                </p>

                {/* Matriz de Aplicações Técnicas */}
                <div className="pt-6 border-t border-black/8">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#7E868C] mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F2AA24]" />
                    <span>Aplicações e Capacidades de Execução</span>
                  </h4>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#111316]">
                    {activeService.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#F2AA24] shrink-0 mt-0.5" />
                        <span className="leading-snug">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Linha de Homologação e Conformidade Técnica */}
                <div className="mt-8 pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5A6065]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F2AA24] rounded-full shadow-[0_0_6px_#F2AA24]" />
                    <span className="font-semibold text-[#111316]">Conformidade Rigorosa NBR 5410, NR-10 e NR-35</span>
                  </div>
                  <span className="text-[11px] text-[#7E868C]">
                    Execução e Responsabilidade Técnica: João Matos (CFT Ativo)
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* LAYOUT MOBILE: Acordeão Técnico Expansível (Elimina os 450px de rolagem cega) */}
        <div className="lg:hidden flex flex-col gap-3">
          {services.map((service) => {
            const isExpanded = service.id === selectedServiceId;

            return (
              <div 
                key={service.id}
                className="rounded-xl border border-black/8 bg-[#FFFFFF] overflow-hidden shadow-xs transition-all duration-300"
              >
                {/* Cabeçalho do Card Mobile */}
                <button
                  onClick={() => setSelectedServiceId(isExpanded ? '' : service.id)}
                  className={`w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors ${
                    isExpanded ? 'bg-[#111316] text-[#FFFFFF]' : 'text-[#111316] hover:bg-black/2'
                  }`}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`text-xs font-mono font-bold ${isExpanded ? 'text-[#F2AA24]' : 'text-[#7E868C]'}`}>
                      {service.number}
                    </span>
                    <div>
                      <h3 className={`text-sm font-bold font-display ${isExpanded ? 'text-[#FFFFFF]' : 'text-[#111316]'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-[11px] font-normal ${isExpanded ? 'text-[#A3A8AC]' : 'text-[#7E868C]'}`}>
                        {service.badge}
                      </p>
                    </div>
                  </div>

                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#F2AA24]' : 'text-[#7E868C]'}`} />
                </button>

                {/* Conteúdo Expansível Embutido Diretamente Abaixo */}
                {isExpanded && (
                  <div className="p-5 border-t border-black/8 space-y-4 animate-in fade-in-50 duration-200 bg-[#FFFFFF]">
                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#111316] relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 right-2 bg-[#111316]/90 text-[#F2AA24] text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">
                        {service.norma}
                      </span>
                    </div>

                    <p className="text-xs text-[#2D3136] leading-relaxed">
                      {service.fullDescription}
                    </p>

                    <div className="pt-3 border-t border-black/8">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#7E868C] block mb-2">
                        Aplicações Principais:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#111316]">
                        {service.applications.slice(0, 3).map((app, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#F2AA24] shrink-0 mt-0.5" />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-2.5 border-t border-black/5 text-[10px] font-mono text-[#7E868C] flex items-center justify-between">
                        <span>NBR 5410 · NR-10</span>
                        <span>João Matos · CFT Ativo</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
