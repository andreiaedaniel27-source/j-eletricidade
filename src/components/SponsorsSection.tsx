import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

export const SponsorsSection: React.FC = () => {
  const { content } = useSiteContent();
  const activeSponsors = (content.sponsors || []).filter((s) => s.active);

  if (activeSponsors.length === 0) return null;

  return (
    <section
      aria-label="Empresas Credenciadas de Fechaduras Digitais"
      className="pt-[78px] sm:pt-[92px] pb-5 bg-[#101214] border-b border-white/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#85898C]">
            Empresas Credenciadas de Fechaduras Digitais
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {activeSponsors.map((sponsor) => {
            const inner = (
              <div className="group flex flex-col items-center">
                <div className="w-full h-20 sm:h-24 bg-[#FFFFFF] rounded-xl px-4 py-2.5 flex items-center justify-center shadow-md border border-white/10 overflow-hidden transition-transform duration-200 group-hover:-translate-y-0.5">
                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                    loading="eager"
                  />
                </div>
                <span className="mt-1.5 text-xs font-medium text-[#E5E7EB] text-center tracking-wide">
                  {sponsor.name}
                </span>
              </div>
            );

            if (sponsor.websiteUrl) {
              return (
                <a
                  key={sponsor.id}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus:ring-2 focus:ring-[#F2AA24] rounded-xl"
                >
                  {inner}
                </a>
              );
            }

            return <div key={sponsor.id}>{inner}</div>;
          })}
        </div>
      </div>
    </section>
  );
};
