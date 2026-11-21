import React from 'react';
import { Logo } from './Logo';
import { Instagram, Phone, Lock, MapPin, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacyPolicy: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacyPolicy,
  onOpenAdmin
}) => {
  const whatsappUrl = "https://wa.me/5511981511548";
  const instagramUrl = "https://www.instagram.com/j.energy_solucoes?igsh=MW1jZWplNzgyb25sZw==";

  return (
    <footer className="bg-[#101214] text-[#85898C] border-t border-white/8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand & Presentation */}
          <div className="md:col-span-5">
            <Logo size="sm" className="mb-3" />
            <p className="text-xs text-[#F2AA24] font-mono tracking-wider uppercase mb-2">
              &ldquo;Sua segurança é nossa energia!&rdquo;
            </p>
            <p className="text-xs text-[#85898C] leading-relaxed max-w-sm mb-5 font-normal">
              J.ENERGY Soluções Elétricas. Instalações, manutenção preventiva e soluções tecnológicas residenciais, comerciais e prediais com responsabilidade técnica e conformidade NBR 5410.
            </p>

            <div className="flex items-center gap-2.5 mb-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#171A1D] border border-white/10 flex items-center justify-center text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#1D2126] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer shadow-sm"
                title="WhatsApp J'ENERGY"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#171A1D] border border-white/10 flex items-center justify-center text-[#F5F4F0] hover:border-[#F2AA24]/50 hover:bg-[#1D2126] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer shadow-sm"
                title="Instagram J'ENERGY"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href="tel:11981511548"
                className="w-8 h-8 rounded-lg bg-[#171A1D] border border-white/10 flex items-center justify-center text-[#F5F4F0] hover:border-[#F2AA24]/50 hover:bg-[#1D2126] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer shadow-sm"
                title="Telefone (11) 98151-1548"
              >
                <Phone className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#85898C]">
              <MapPin className="w-3.5 h-3.5 text-[#F2AA24] shrink-0" />
              <span>São Bernardo do Campo/SP · Atendimento no Grande ABC e Região</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold font-display uppercase text-[#FFFFFF] tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="grid grid-cols-2 gap-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-[#F2AA24] transition-colors cursor-pointer text-left py-0.5">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicos')} className="hover:text-[#F2AA24] transition-colors cursor-pointer text-left py-0.5">
                  Serviços
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-[#F2AA24] transition-colors cursor-pointer text-left py-0.5">
                  Sobre João Matos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('depoimentos')} className="hover:text-[#F2AA24] transition-colors cursor-pointer text-left py-0.5">
                  Depoimentos
                </button>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Channel */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold font-display uppercase text-[#FFFFFF] tracking-wider mb-3">
              Atendimento Direto
            </h4>
            <span className="text-xs text-[#85898C] block mb-1">Responsável Técnico João Matos:</span>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#F2AA24] hover:text-[#ffb732] transition-colors font-mono block mb-5 tracking-tight hover:underline"
            >
              (11) 98151-1548
            </a>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#85898C]">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} J.ENERGY Soluções Elétricas. Todos os direitos reservados.</p>
            {/* Gatilho discreto exclusivo para os administradores */}
            <button
              onClick={onOpenAdmin}
              className="text-[#22272E] hover:text-[#52585E] p-0.5 transition-colors cursor-pointer"
              title="Acesso Restrito"
              aria-label="Acesso Restrito"
            >
              <Lock className="w-2.5 h-2.5" />
            </button>
          </div>
          
          <button
            onClick={onOpenPrivacyPolicy}
            className="hover:text-[#F2AA24] transition-colors cursor-pointer"
          >
            Política de Privacidade (LGPD)
          </button>
        </div>
      </div>
    </footer>
  );
};
