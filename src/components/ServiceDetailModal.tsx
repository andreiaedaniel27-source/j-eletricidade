import React from 'react';
import { ServiceItem } from '../types';
import { X, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenQuote
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#080F1C]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#101D32] border border-[#173B60] rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-service-title"
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#A7B2C2] hover:text-[#F5F7FA] bg-[#080F1C]/80 hover:bg-[#080F1C] border border-[#173B60] rounded-full transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image in Modal */}
        <div className="relative h-60 sm:h-72 w-full bg-[#080F1C] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D32] via-[#101D32]/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39BDF5] mb-1">
              <span className="text-[#FFD21C] font-bold">SERVIÇO {service.number}</span>
              <span aria-hidden="true" className="text-[#173B60]">·</span>
              <span>{service.badge}</span>
            </div>
            <h2 id="modal-service-title" className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Detailed Narrative */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#A7B2C2] tracking-wider mb-2">Visão Geral</h4>
            <p className="text-sm sm:text-base text-[#F5F7FA] leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Applications & Scope */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#39BDF5] tracking-wider mb-3">
              Aplicações e Escopo Técnico
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.applications.map((app, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#080F1C]/60 border border-[#173B60]/50 text-xs text-[#A7B2C2]">
                  <Check className="w-4 h-4 text-[#39BDF5] shrink-0 mt-0.5" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#FFD21C] tracking-wider mb-3">
              Vantagens para o Seu Imóvel ou Empresa
            </h4>
            <ul className="space-y-2">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-[#F5F7FA]">
                  <Zap className="w-3.5 h-3.5 text-[#FFD21C] shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Standard badge if available */}
          {service.norma && (
            <div className="p-3 rounded-lg bg-[#173B60]/30 border border-[#173B60] flex items-center gap-2.5 text-xs text-[#39BDF5]">
              <ShieldCheck className="w-4 h-4 text-[#39BDF5] shrink-0" />
              <span className="font-mono">{service.norma}</span>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-6 bg-[#080F1C] border-t border-[#173B60] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-medium text-[#A7B2C2] hover:text-[#F5F7FA] transition-colors cursor-pointer"
          >
            Voltar aos Serviços
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenQuote(service.title);
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-xl shadow-[0_0_20px_rgba(255,210,28,0.3)] transition-all cursor-pointer"
          >
            <span>Solicitar Orçamento para {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
