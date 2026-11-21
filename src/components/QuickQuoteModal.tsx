import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SERVICES_DATA } from '../data/servicesData';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  initialService
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    initialService || SERVICES_DATA[0].title
  );
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Save lead asynchronously in backend
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Cliente Site',
          phone: 'Via WhatsApp',
          service: selectedService,
          need: details.trim() || 'Solicitação de orçamento',
          city: location.trim() || 'Região ABC/SP',
          neighborhood: '',
          urgency: 'Orçamento',
          description: details.trim(),
          source: 'whatsapp_modal'
        })
      });
    } catch (err) {
      console.warn('Backend save notice:', err);
    }

    // Format WhatsApp message
    const message = 
`Olá João! Acessei o site da J'ENERGY e gostaria de solicitar um orçamento.

*DADOS DO PEDIDO*
Serviço: ${selectedService}
${name.trim() ? `Nome: ${name.trim()}\n` : ''}${location.trim() ? `Local do imóvel: ${location.trim()}\n` : ''}${details.trim() ? `Detalhes: ${details.trim()}\n` : ''}
Poderia me informar valores e disponibilidade para atendimento? Obrigado!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511981511548?text=${encoded}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#080F1C]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#101D32] border border-[#173B60] rounded-2xl shadow-2xl overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-quote-title"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#173B60] bg-[#0d1728] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src="/assets/joao_real.jpg"
                alt="João - Eletricista J'ENERGY"
                className="w-11 h-11 rounded-full object-cover object-center border-2 border-[#FFD21C] shadow-[0_0_12px_rgba(255,210,28,0.35)]"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center p-0.5 border border-[#101D32]">
                <WhatsAppIcon className="w-2.5 h-2.5 fill-white text-white" />
              </span>
            </div>
            <div>
              <h3 id="quick-quote-title" className="text-base sm:text-lg font-bold font-display text-[#F5F7FA]">
                Solicitar Orçamento com João
              </h3>
              <p className="text-[11px] text-[#A7B2C2]">
                Eletricista responsável da J&apos;ENERGY
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A7B2C2] hover:text-[#F5F7FA] rounded-full hover:bg-[#173B60]/40 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Service Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1.5">
              Qual serviço você precisa? *
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedService(srv.title)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedService === srv.title
                      ? 'bg-[#173B60] border-[#FFD21C] text-[#FFD21C] font-semibold'
                      : 'bg-[#080F1C] border-[#173B60] text-[#A7B2C2] hover:text-[#F5F7FA]'
                  }`}
                >
                  <span className="truncate">{srv.title}</span>
                  {selectedService === srv.title && (
                    <Check className="w-3.5 h-3.5 text-[#FFD21C] shrink-0 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1">
              Seu Nome (opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Carlos Eduardo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080F1C] border border-[#173B60] text-sm text-[#F5F7FA] placeholder-[#5a6a80] focus:outline-none focus:border-[#39BDF5]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1">
              Bairro / Cidade do Imóvel (opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Centro, SBC ou Santo André"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080F1C] border border-[#173B60] text-sm text-[#F5F7FA] placeholder-[#5a6a80] focus:outline-none focus:border-[#39BDF5]"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1">
              Conte brevemente sua necessidade
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Preciso trocar o disjuntor principal que desarmou..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080F1C] border border-[#173B60] text-sm text-[#F5F7FA] placeholder-[#5a6a80] focus:outline-none focus:border-[#39BDF5]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-xl shadow-[0_0_25px_rgba(255,210,28,0.35)] transition-all cursor-pointer hover:scale-[1.01]"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#080F1C] fill-[#080F1C]" />
              <span>{isSending ? 'Abrindo...' : 'Abrir no WhatsApp'}</span>
              <ArrowRight className="w-4 h-4 text-[#080F1C]" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#A7B2C2]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39BDF5]" />
            <span>Número oficial: (11) 98151-1548</span>
          </div>

        </form>
      </div>
    </div>
  );
};
