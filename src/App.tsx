import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SponsorsSection } from './components/SponsorsSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutJoaoSection } from './components/AboutJoaoSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPanelModal } from './components/AdminPanelModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { LgpdBanner } from './components/LgpdBanner';
import { SiteContentProvider } from './context/SiteContentContext';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Observe active section
  useEffect(() => {
    const sections = ['inicio', 'servicos', 'sobre', 'depoimentos'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Atalho exclusivo e detecção de URL para os administradores
  useEffect(() => {
    // 1. Abrir via parâmetro de URL (ex: meudominio.com.br/?admin)
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin') || params.has('studio')) {
      setIsAdminOpen(true);
    }

    // 2. Atalho de teclado técnico: Ctrl+Shift+A ou Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SiteContentProvider>
      <div className="min-h-screen bg-[#171A1D] text-[#F5F4F0] flex flex-col relative selection:bg-[#F2AA24]/30 selection:text-[#F2AA24]">
        
        {/* Header Fixo */}
        <Header
          onNavigate={handleNavigate}
          activeSection={activeSection}
        />

        {/* Main Content */}
        <main className="flex-grow">
          
          {/* SEÇÃO SUPERIOR — PATROCINADORES */}
          <SponsorsSection />

          {/* SEÇÃO 1 — HERO COM O ÚNICO BOTÃO DE ORÇAMENTO DA PÁGINA EM DESTAQUE */}
          <div id="inicio">
            <Hero />
          </div>

          {/* SEÇÃO 2 — SERVIÇOS (Asymmetric Editorial Index) */}
          <ServicesSection />

          {/* SEÇÃO 3 — ELETRICISTA JOÃO (Editorial Portrait & Technical Pillars) */}
          <AboutJoaoSection />

          {/* SEÇÃO 4 — DEPOIMENTOS DE CLIENTES (Google Maps 5.0 Marquee & Reviews) */}
          <TestimonialsSection />

          {/* SEÇÃO 5 — INSTAGRAM OFICIAL J'ENERGY */}
          <InstagramSection />

        </main>

        {/* Rodapé Enxuto com Canais de Contato e Link do Studio J.ENERGY */}
        <Footer
          onNavigate={handleNavigate}
          onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Botão Flutuante de Contato WhatsApp e Quiz */}
        <FloatingWhatsApp />

        {/* Painel Administrativo Google AI Studio Style */}
        <AdminPanelModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

        {/* Política de Privacidade (LGPD) */}
        <PrivacyPolicyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />

        {/* Aviso Compacto de Cookies LGPD */}
        <LgpdBanner
          onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
        />

      </div>
    </SiteContentProvider>
  );
}
