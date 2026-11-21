import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#101214]/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#171A1D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/8 flex items-center justify-between bg-[#1D2126]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#F2AA24]" />
            <h2 id="privacy-policy-title" className="text-xl font-bold font-display text-[#FFFFFF]">
              Política de Privacidade e Proteção de Dados (LGPD)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#85898C] hover:text-[#FFFFFF] rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-[#85898C] leading-relaxed max-h-[65vh] overflow-y-auto">
          <div>
            <h3 className="text-sm font-bold font-display text-[#FFFFFF] mb-1">1. Objetivo e Controlador</h3>
            <p className="text-[#F5F4F0]">
              A <strong>J&apos;ENERGY Soluções Elétricas</strong>, com base operacional em São Bernardo do Campo — SP, está comprometida com a privacidade, sigilo e segurança dos dados pessoais de seus clientes e usuários em conformidade com a Lei Geral de Proteção de Dados (Lei Federal nº 13.709/2018 — LGPD).
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold font-display text-[#FFFFFF] mb-1">2. Dados Pessoais Coletados</h3>
            <p className="text-[#F5F4F0]">
              Coletamos estritamente os dados necessários para o atendimento e formulação de propostas técnicas comerciais solicitadas pelo titular:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-[#85898C]">
              <li>Nome do titular ou responsável técnico;</li>
              <li>Número de telefone / WhatsApp com DDD;</li>
              <li>Endereço de e-mail (quando fornecido);</li>
              <li>Localização do imóvel (Cidade, Bairro e tipo de imóvel);</li>
              <li>Descrição técnica do serviço ou problema elétrico relatado.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold font-display text-[#FFFFFF] mb-1">3. Finalidade do Tratamento</h3>
            <p className="text-[#F5F4F0]">
              Os dados coletados no formulário de orçamento e canais de contato têm finalidade exclusiva de:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-[#85898C]">
              <li>Elaborar diagnósticos e orçamentos comerciais adequados;</li>
              <li>Estabelecer comunicação técnica via WhatsApp ou chamada telefônica;</li>
              <li>Verificar a viabilidade geográfica e planejamento de rotas de atendimento;</li>
              <li>Cumprimento de obrigações legais e regulatórias do setor de engenharia.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold font-display text-[#FFFFFF] mb-1">4. Não Compartilhamento com Terceiros</h3>
            <p className="text-[#F5F4F0]">
              A J&apos;ENERGY <strong>não vende, aluga ou compartilha</strong> dados pessoais de clientes com empresas de telemarketing, anunciantes ou terceiros sem autorização prévia e expressa do titular.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold font-display text-[#FFFFFF] mb-1">5. Seus Direitos como Titular (LGPD Art. 18)</h3>
            <p className="text-[#F5F4F0]">
              Você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, correção de dados incompletos ou a eliminação definitiva dos seus dados de contato de nossos registros. Para exercer esses direitos, basta enviar uma mensagem direta para o nosso canal de atendimento: <span className="text-[#F2AA24] font-mono font-bold">(11) 98151-1548</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#101214] border-t border-white/8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold font-display uppercase tracking-wider text-[#101214] bg-[#F2AA24] hover:bg-[#ffb732] rounded-xl cursor-pointer transition-all shadow-md hover:scale-[1.02] active:scale-95"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
