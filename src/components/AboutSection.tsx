import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Zap } from 'lucide-react';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="sobre" className="py-24 bg-[#080F1C] bg-circuit-subtle border-t border-[#173B60]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-[#173B60] bg-[#101D32] shadow-2xl relative group">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src="/assets/aistudio/manuten__o_eletrica_99f219e3.jpg"
                  alt="Técnico especialista da J'ENERGY realizando inspeção com multímetro e equipamentos de proteção"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080F1C] via-transparent to-transparent opacity-80" />
              </div>

              {/* Inset Credential Card */}
              <div className="p-5 bg-[#080F1C]/95 border-t border-[#173B60]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#101D32] border border-[#173B60] flex items-center justify-center text-[#FFD21C] shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F7FA]">Rigor Técnico e Normativo</h4>
                    <p className="text-[11px] text-[#A7B2C2]">Diagnóstico preciso e execução de acordo com a NBR 5410.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39BDF5] mb-3">
              <span>INSTITUCIONAL</span>
              <span aria-hidden="true" className="text-[#173B60]">·</span>
              <span>J&apos;ENERGY SOLUÇÕES ELÉTRICAS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight mb-6 [text-wrap:balance]">
              ENERGIA QUE CONECTA SEU MUNDO.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#A7B2C2] leading-relaxed mb-8">
              <p className="text-[#F5F7FA] font-medium leading-relaxed">
                A J&apos;ENERGY SOLUÇÕES ELÉTRICAS trabalha com instalações, manutenção e soluções tecnológicas para diferentes necessidades. Nosso compromisso é oferecer atendimento personalizado, qualidade e segurança em cada serviço.
              </p>

              <p>
                Atuando em São Bernardo do Campo e em todo o Grande ABC, nós entendemos que uma instalação elétrica bem projetada e mantida é o pilar invisível que sustenta residências confortáveis e empresas produtivas. Por isso, recusamos atalhos perigosos ou soluções improvisadas.
              </p>

              <p>
                Tratamos desde a colocação de uma fechadura eletrônica digital até a implantação de painéis solares e reformas de quadros elétricos com o mesmo padrão de excelência, transparência técnica e respeito ao cliente.
              </p>
            </div>

            {/* Coverage highlights */}
            <div className="p-4 rounded-xl bg-[#101D32] border border-[#173B60] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#39BDF5] shrink-0" />
                <div className="text-xs">
                  <strong className="text-[#F5F7FA] block font-semibold">Base Operacional em São Bernardo do Campo — SP</strong>
                  <span className="text-[#A7B2C2]">Atendimento no ABC Paulista e regiões adjacentes conforme agendamento.</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#FFD21C] shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#FFD21C]" />
                <span>Normas NR-10 & NBR 5410</span>
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm uppercase font-bold tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-xl shadow-[0_0_25px_rgba(255,210,28,0.35)] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Falar com Nossos Especialistas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
