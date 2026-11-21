import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface LgpdBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export const LgpdBanner: React.FC<LgpdBannerProps> = ({ onOpenPrivacyPolicy }) => {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('jenergy_cookie_consent_v2');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('jenergy_cookie_consent_v2', 'all');
    localStorage.setItem('jenergy_analytics_allowed', 'true');
    setShow(false);
  };

  const handleAcceptNecessaryOnly = () => {
    localStorage.setItem('jenergy_cookie_consent_v2', 'necessary');
    localStorage.setItem('jenergy_analytics_allowed', 'false');
    setShow(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('jenergy_cookie_consent_v2', 'custom');
    localStorage.setItem('jenergy_analytics_allowed', String(analyticsAllowed));
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside 
      aria-label="Consentimento de Cookies e Privacidade"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#1D2126]/96 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-xs text-[#85898C] shadow-2xl animate-in slide-in-from-bottom duration-200"
    >
      {!showPreferences ? (
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F2AA24] shrink-0" />
              <strong className="text-xs text-[#FFFFFF] font-display font-bold">Privacidade & Cookies (LGPD)</strong>
            </div>
            <button 
              onClick={handleAcceptNecessaryOnly}
              className="text-[#85898C] hover:text-[#FFFFFF] p-0.5 cursor-pointer transition-colors"
              aria-label="Dispensar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] leading-relaxed mb-3 text-[#F5F4F0] font-normal">
            Utilizamos cookies necessários para a navegação e integridade das suas solicitações técnicas. Você pode aceitar todos ou personalizar suas preferências.
          </p>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/8">
            <button
              onClick={() => setShowPreferences(true)}
              className="text-[11px] text-[#85898C] hover:text-[#FFFFFF] underline cursor-pointer"
            >
              Opções
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAcceptNecessaryOnly}
                className="px-2.5 py-1.5 text-[11px] font-medium text-[#85898C] hover:text-[#FFFFFF] bg-[#101214] border border-white/10 rounded-lg cursor-pointer transition-all hover:border-white/30"
              >
                Apenas Essenciais
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-3 py-1.5 text-[11px] font-bold text-[#101214] bg-[#F2AA24] hover:bg-[#ffb732] rounded-lg cursor-pointer transition-all shadow-sm hover:scale-[1.02] active:scale-95"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <strong className="text-xs text-[#FFFFFF] font-display font-bold">Preferências de Cookies</strong>
            <button 
              onClick={() => setShowPreferences(false)}
              className="text-[11px] text-[#F2AA24] hover:underline cursor-pointer"
            >
              Voltar
            </button>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#101214] border border-white/8">
              <div>
                <span className="text-[#FFFFFF] font-medium block">Cookies Necessários</span>
                <span className="text-[#85898C]">Essenciais para funcionamento técnico</span>
              </div>
              <span className="text-[10px] font-mono text-[#F2AA24] bg-white/5 border border-white/10 px-2 py-0.5 rounded">Ativos</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#101214] border border-white/8">
              <div>
                <span className="text-[#FFFFFF] font-medium block">Cookies Analíticos</span>
                <span className="text-[#85898C]">Métricas agregadas de visitação</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsAllowed}
                onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                className="w-4 h-4 rounded text-[#F2AA24] focus:ring-[#F2AA24] border-white/20 bg-[#1D2126]"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-white/8">
            <button
              onClick={onOpenPrivacyPolicy}
              className="text-[10px] text-[#85898C] hover:text-[#FFFFFF] underline cursor-pointer"
            >
              Política Completa
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-3 py-1.5 text-[11px] font-bold text-[#101214] bg-[#F2AA24] hover:bg-[#ffb732] rounded-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
            >
              Salvar Preferências
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
