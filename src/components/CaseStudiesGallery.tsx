import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { X, ArrowRight, CheckCircle2, MapPin, ZoomIn, Info } from 'lucide-react';

interface CaseStudiesGalleryProps {
  onOpenQuoteWithCase: (caseTitle: string) => void;
}

export const CaseStudiesGallery: React.FC<CaseStudiesGalleryProps> = ({ onOpenQuoteWithCase }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeModalCase, setActiveModalCase] = useState<CaseStudy | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Projetos' },
    { id: 'instalacoes', label: 'Instalações & Painéis' },
    { id: 'manutencao', label: 'Manutenção Preventiva' },
    { id: 'solar', label: 'Energia Solar' },
    { id: 'automacao', label: 'Automação' },
    { id: 'seguranca', label: 'CFTV & Segurança' },
  ];

  const filteredCases = activeCategory === 'todos' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.category === activeCategory);

  return (
    <section id="projetos" className="py-24 bg-[#080F1C] border-t border-[#173B60]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFD21C] mb-2">
              <span>PORTFÓLIO E ESTUDOS DE CASO TÉCNICOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight [text-wrap:balance]">
              SOLUÇÕES DE ENGENHARIA NA PRÁTICA
            </h2>
          </div>
          
          <div className="max-w-md text-xs text-[#A7B2C2] bg-[#101D32] p-3.5 rounded-xl border border-[#173B60]">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#39BDF5] shrink-0 mt-0.5" />
              <span>
                <strong>Nota de Transparência:</strong> Estes estudos de caso ilustram desafios reais resolvidos com nossa metodologia técnica. Imagens de referência profissional representam cenários práticos de execução.
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#FFD21C] text-[#080F1C] shadow-sm'
                  : 'bg-[#101D32] text-[#A7B2C2] hover:text-[#F5F7FA] border border-[#173B60]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetric Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem, idx) => {
            const isWide = idx === 0;

            return (
              <div
                key={caseItem.id}
                onClick={() => setActiveModalCase(caseItem)}
                className={`group rounded-2xl bg-[#101D32] border border-[#173B60] hover:border-[#39BDF5]/60 overflow-hidden shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Image Container */}
                <div className={`relative w-full overflow-hidden bg-[#080F1C] ${isWide ? 'h-64 sm:h-72' : 'h-52'}`}>
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D32] via-[#101D32]/25 to-transparent" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium text-[#39BDF5] bg-[#080F1C]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#173B60]">
                      {caseItem.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono text-[#FFD21C] bg-[#FFD21C]/10 backdrop-blur-sm px-2 py-0.5 rounded border border-[#FFD21C]/30 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {caseItem.location}
                    </span>
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-[#080F1C]/80 border border-[#173B60] flex items-center justify-center text-[#A7B2C2] group-hover:text-[#FFD21C] transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Case Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F5F7FA] group-hover:text-[#39BDF5] transition-colors mb-3 leading-snug">
                      {caseItem.title}
                    </h3>

                    {/* Challenge & Solution summary */}
                    <div className="space-y-2 mb-4 text-xs text-[#A7B2C2]">
                      <p className="line-clamp-2">
                        <strong className="text-[#F5F7FA]">Desafio:</strong> {caseItem.challenge}
                      </p>
                      <p className="line-clamp-2">
                        <strong className="text-[#39BDF5]">Solução:</strong> {caseItem.solution}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {caseItem.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-[#A7B2C2] bg-[#080F1C] px-2 py-0.5 rounded border border-[#173B60]/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Result pill & Read more */}
                  <div className="pt-3 border-t border-[#173B60]/40 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Resultado Comprovado
                    </span>
                    <span className="text-[#39BDF5] group-hover:text-[#FFD21C] transition-colors flex items-center gap-1 font-semibold">
                      Ver Estudo <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox / Case Study Modal */}
      {activeModalCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#080F1C]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#101D32] border border-[#173B60] rounded-2xl shadow-2xl overflow-hidden my-8">
            {/* Close */}
            <button
              onClick={() => setActiveModalCase(null)}
              className="absolute top-4 right-4 z-20 p-2 text-[#A7B2C2] hover:text-[#F5F7FA] bg-[#080F1C]/80 rounded-full border border-[#173B60] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 w-full bg-[#080F1C] overflow-hidden">
              <img
                src={activeModalCase.image}
                alt={activeModalCase.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101D32] via-[#101D32]/30 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-mono text-[#39BDF5] block mb-1">
                  {activeModalCase.categoryLabel} · {activeModalCase.location}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7FA]">
                  {activeModalCase.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono uppercase text-[#FFD21C] tracking-wider mb-1.5">
                  1. O Desafio Técnico Encontrado
                </h4>
                <p className="text-sm text-[#A7B2C2] leading-relaxed bg-[#080F1C] p-4 rounded-xl border border-[#173B60]/50">
                  {activeModalCase.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[#39BDF5] tracking-wider mb-1.5">
                  2. A Solução e Execução J&apos;ENERGY
                </h4>
                <p className="text-sm text-[#F5F7FA] leading-relaxed bg-[#080F1C] p-4 rounded-xl border border-[#173B60]/50">
                  {activeModalCase.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-1.5">
                  3. O Resultado Obtido
                </h4>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-sm text-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{activeModalCase.result}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-[#080F1C] border-t border-[#173B60] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalCase(null)}
                className="px-4 py-2.5 text-xs text-[#A7B2C2] hover:text-[#F5F7FA] transition-colors cursor-pointer"
              >
                Fechar Estudo
              </button>

              <button
                onClick={() => {
                  const title = activeModalCase.title;
                  setActiveModalCase(null);
                  onOpenQuoteWithCase(title);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-xl shadow-[0_0_20px_rgba(255,210,28,0.3)] transition-all cursor-pointer"
              >
                <span>Solicitar Projeto Semelhante</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
