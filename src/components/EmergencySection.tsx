import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, Clock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const EmergencySection: React.FC = () => {
  const emergencyWhatsappUrl = `https://wa.me/5511981511548?text=${encodeURIComponent(
    "Olá! Estou com uma emergência elétrica em meu imóvel/empresa e gostaria de verificar a disponibilidade de atendimento da J'ENERGY."
  )}`;

  return (
    <section className="py-20 bg-gradient-to-b from-[#080F1C] via-[#0d1728] to-[#080F1C] relative border-t border-[#173B60]/40 overflow-hidden">
      
      {/* Background glow accent */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFD21C]/5 blur-[120px] pointer-events-none rounded-full"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#101D32] border border-[#FFD21C]/40 shadow-[0_20px_60px_rgba(255,210,28,0.15)] relative overflow-hidden">
          
          {/* Subtle warning pattern strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD21C] via-[#ffe053] to-[#39BDF5]" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFD21C] mb-4 bg-[#FFD21C]/10 border border-[#FFD21C]/30 px-3 py-1 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5 text-[#FFD21C]" />
                <span className="font-bold tracking-wider">CANAL DIRETO DE EMERGÊNCIA</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F7FA] tracking-tight mb-4 [text-wrap:balance]">
                PRECISA DE ATENDIMENTO ELÉTRICO COM URGÊNCIA?
              </h2>

              <p className="text-sm sm:text-base text-[#A7B2C2] leading-relaxed mb-6">
                Problemas elétricos podem exigir atenção imediata. Entre em contato com a <strong className="text-[#F5F7FA]">J&apos;ENERGY</strong> para explicar o que está acontecendo e verificar a disponibilidade de atendimento.
              </p>

              {/* Truthful operational guidelines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#A7B2C2]">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#39BDF5] shrink-0" />
                  <span>Orientações de segurança pré-atendimento</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFD21C] shrink-0" />
                  <span>Disponibilidade confirmada pelo técnico</span>
                </div>
              </div>
            </div>

            {/* Emergency Action Buttons */}
            <div className="flex flex-col w-full sm:w-auto gap-3 shrink-0">
              <a
                href={emergencyWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-xl shadow-[0_0_30px_rgba(255,210,28,0.4)] transition-all cursor-pointer whitespace-nowrap"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#080F1C] fill-[#080F1C]" />
                <span>Falar Agora pelo WhatsApp</span>
              </a>

              <a
                href="tel:11981511548"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold text-[#39BDF5] bg-[#080F1C] hover:bg-[#173B60]/40 border border-[#173B60] rounded-xl transition-colors whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-[#39BDF5]" />
                <span>Ligar: (11) 98151-1548</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
