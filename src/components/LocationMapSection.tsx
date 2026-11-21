import React from 'react';
import { MapPin, Navigation, Phone, Check, Shield } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface LocationMapSectionProps {
  onOpenQuote: () => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ onOpenQuote }) => {
  const regions = [
    'São Bernardo do Campo (Sede / Base Operacional)',
    'Santo André',
    'São Caetano do Sul',
    'Diadema',
    'Mauá e Ribeirão Pires',
    'São Paulo (Zona Sul e Leste sob consulta)'
  ];

  const handleOpenGoogleMapsRoute = () => {
    window.open(
      'https://www.google.com/maps/dir/?api=1&destination=Sao+Bernardo+do+Campo+SP+Brasil',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="contato" className="py-24 bg-[#080F1C] border-t border-[#173B60]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39BDF5] mb-2">
            <MapPin className="w-4 h-4 text-[#39BDF5]" />
            <span>BASE OPERACIONAL & COBERTURA REGIONAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight mb-4 [text-wrap:balance]">
            SÃO BERNARDO DO CAMPO E TODA A REGIÃO
          </h2>
          <p className="text-sm sm:text-base text-[#A7B2C2] leading-relaxed">
            Atendimento técnico itinerante com frota e equipamentos especializados diretamente no seu imóvel, condomínio, comércio ou indústria.
          </p>
        </div>

        {/* 2-Column Split: Info & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#101D32] border border-[#173B60]">
            <div>
              <h3 className="text-lg font-bold text-[#F5F7FA] mb-4">
                Cidades e Áreas Atendidas
              </h3>

              <div className="space-y-2.5 mb-8">
                {regions.map((reg, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#A7B2C2]">
                    <Check className="w-4 h-4 text-[#FFD21C] shrink-0" />
                    <span>{reg}</span>
                  </div>
                ))}
              </div>

              {/* Direct Channels */}
              <div className="space-y-3 pt-6 border-t border-[#173B60]/50 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#080F1C] border border-[#173B60] flex items-center justify-center text-[#FFD21C] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#A7B2C2] block">Telefone Comercial</span>
                    <a href="tel:11981511548" className="text-sm font-bold text-[#F5F7FA] hover:text-[#39BDF5] transition-colors">
                      (11) 98151-1548
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#080F1C] border border-[#173B60] flex items-center justify-center text-[#25D366] shrink-0">
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#A7B2C2] block">WhatsApp Oficial</span>
                    <a 
                      href="https://wa.me/5511981511548" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#25D366] hover:text-[#FFD21C] transition-colors"
                    >
                      (11) 98151-1548
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#173B60]/40">
              <button
                onClick={handleOpenGoogleMapsRoute}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-[#F5F7FA] bg-[#173B60]/50 hover:bg-[#173B60] border border-[#39BDF5]/40 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5 text-[#39BDF5]" />
                <span>Abrir Rota no Maps</span>
              </button>

              <button
                onClick={onOpenQuote}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Solicitar Visita</span>
              </button>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#173B60] bg-[#101D32] relative min-h-[360px] flex flex-col">
            {/* Interactive Embedded Google Map for SBC */}
            <div className="relative w-full h-full min-h-[380px] bg-[#080F1C]">
              <iframe
                title="Mapa de Atendimento São Bernardo do Campo J'ENERGY"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116960.01956693529!2d-46.61907705499268!3d-23.69145829631758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce44e311a37cb9%3A0xc3f6be794270222a!2sS%C3%A3o%20Bernardo%20do%20Campo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                className="w-full h-full border-0 absolute inset-0 filter invert-[0.88] hue-rotate-[185deg] contrast-[1.15]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#080F1C]/90 backdrop-blur-md border border-[#39BDF5]/30 text-xs text-[#F5F7FA] shadow-lg pointer-events-none">
                <div className="flex items-center gap-2 font-bold text-[#FFD21C] mb-0.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Raio de Atendimento Ativo</span>
                </div>
                <span className="text-[#A7B2C2] text-[11px]">
                  São Bernardo do Campo & Grande ABC Paulista
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
