import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const instagramUrl = "https://www.instagram.com/j.energy_solucoes?igsh=MW1jZWplNzgyb25sZw==";

  return (
    <section className="py-20 sm:py-24 bg-[#171A1D] border-t border-white/8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1D2126] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl transition-all duration-300 hover:border-[#F2AA24]/40">
          
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-xl bg-[#101214] border border-white/10 flex items-center justify-center text-[#F2AA24] shrink-0 shadow-md">
              <Instagram className="w-7 h-7" />
            </div>
            
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F2AA24] block mb-1">
                @j.energy_solucoes
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#FFFFFF] tracking-tight">
                ACOMPANHE NOSSOS TRABALHOS NO INSTAGRAM.
              </h3>
              <p className="text-xs sm:text-sm text-[#85898C] mt-1 max-w-lg leading-relaxed font-normal">
                Veja fotos reais de quadros montados, manutenções executadas e dicas de segurança elétrica no feed oficial.
              </p>
            </div>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-bold font-display uppercase tracking-wider text-[#101214] bg-[#F2AA24] hover:bg-[#ffb732] rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 shadow-md hover:shadow-[0_8px_30px_rgba(242,170,36,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-98 overflow-hidden"
          >
            {/* Feixe de luz */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

            <span className="relative z-10">Acessar Instagram Oficial</span>
            <ArrowUpRight className="w-4 h-4 text-[#101214] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10" />
          </a>

        </div>
      </div>
    </section>
  );
};
