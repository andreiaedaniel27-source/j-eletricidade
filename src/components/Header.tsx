import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection = 'inicio'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'sobre', label: 'Sobre João Matos' },
    { id: 'depoimentos', label: 'Depoimentos' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-header ${
        isScrolled
          ? 'bg-[#101214]/94 backdrop-blur-md border-b border-white/8 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-[#171A1D]/80 backdrop-blur-sm border-b border-white/6 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="shrink-0">
            <Logo size="sm" onClick={() => handleLinkClick('inicio')} />
          </div>

          {/* Zone 2: Editorial Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-medium tracking-wide text-[#85898C]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#FFFFFF] font-semibold'
                      : 'hover:text-[#FFFFFF]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#F2AA24] rounded-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>



          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FFFFFF] hover:text-[#F2AA24] transition-colors rounded-lg bg-[#1D2126] border border-white/10 cursor-pointer"
              aria-label="Menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#101214] border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#FFFFFF] bg-[#1D2126] font-semibold border-l-2 border-[#F2AA24]'
                      : 'text-[#85898C] hover:text-[#FFFFFF] hover:bg-[#1D2126]/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/8 flex items-center justify-between text-xs text-[#85898C] px-3.5 font-mono">
              <span>Contato João Matos:</span>
              <a
                href="https://wa.me/5511981511548"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F2AA24] font-semibold hover:underline"
              >
                (11) 98151-1548
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
