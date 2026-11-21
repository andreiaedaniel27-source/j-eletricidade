import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  X, 
  Download, 
  Trash2, 
  RefreshCw, 
  Settings, 
  Users, 
  CheckCircle2, 
  LogOut, 
  Phone, 
  MapPin, 
  ExternalLink,
  Sparkles,
  Type,
  Image as ImageIcon,
  Handshake,
  Upload,
  Plus,
  RotateCcw,
  Sliders,
  Check,
  AlertCircle,
  HelpCircle,
  Eye,
  Mail,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import { LeadRecord, CompanySettings, SponsorItem } from '../types';
import { useSiteContent } from '../context/SiteContentContext';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StudioTab = 'overview' | 'texts' | 'images' | 'sponsors' | 'leads' | 'settings';

const AUTHORIZED_EMAILS = [
  { 
    email: 'andreiaedaniel27@gmail.com', 
    label: 'andreiaedaniel27@gmail.com',
    name: 'Administração J.ENERGY', 
    role: 'Administrador Geral' 
  },
  { 
    email: 'matos.joao06@gmail.com', 
    label: 'matos.joao06@gmail.com', 
    name: 'João Matos', 
    role: 'Responsável Técnico (CFT Ativo)' 
  }
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { content, updateContent, saveContent, resetContent, isSaving, lastSaved, hasUnsavedChanges } = useSiteContent();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: string } | null>(null);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<StudioTab>('overview');
  
  // Leads & operational settings
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Sub-tab for text editing
  const [textSection, setTextSection] = useState<'hero' | 'about' | 'services' | 'quiz'>('hero');
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  // New Sponsor Form state
  const [newSponsorName, setNewSponsorName] = useState('');
  const [newSponsorCategory, setNewSponsorCategory] = useState('');
  const [newSponsorLogo, setNewSponsorLogo] = useState('');
  const [newSponsorUrl, setNewSponsorUrl] = useState('');
  const [newSponsorDesc, setNewSponsorDesc] = useState('');

  // Auto-verify token on open
  useEffect(() => {
    if (isOpen) {
      const token = sessionStorage.getItem('jenergy_admin_token');
      if (token) {
        verifyToken(token);
      }
    }
  }, [isOpen]);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.valid) {
        setIsAuthenticated(true);
        if (data.user) {
          setCurrentUser(data.user);
          setEmail(data.user.email);
        }
        loadAdminData(token);
      } else {
        sessionStorage.removeItem('jenergy_admin_token');
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();

      if (data.success && data.token) {
        sessionStorage.setItem('jenergy_admin_token', data.token);
        setIsAuthenticated(true);
        if (data.user) setCurrentUser(data.user);
        loadAdminData(data.token);
      } else {
        setAuthError(data.message || 'Acesso negado. E-mail não autorizado.');
      }
    } catch {
      setAuthError('Falha de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const loadAdminData = async (token: string) => {
    setLoading(true);
    try {
      const leadsRes = await fetch('/api/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const leadsData = await leadsRes.json();
      if (leadsData.success) {
        setLeads(leadsData.leads);
      }

      const settingsRes = await fetch('/api/settings');
      const settingsData = await settingsRes.json();
      if (settingsData.success) {
        setSettings(settingsData.settings);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveAll = async () => {
    // 1. Save Content
    const contentResult = await saveContent();
    
    // 2. Save operational settings if modified
    const token = sessionStorage.getItem('jenergy_admin_token');
    if (token && settings) {
      try {
        await fetch('/api/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ settings })
        });
      } catch (err) {
        console.error('Error saving settings:', err);
      }
    }

    if (contentResult.success) {
      showNotification('success', 'Todas as alterações foram publicadas com sucesso!');
    } else {
      showNotification('error', contentResult.message || 'Erro ao publicar alterações.');
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm('Tem certeza de que deseja restaurar todo o site para o conteúdo padrão da J.ENERGY?')) {
      return;
    }
    const result = await resetContent();
    if (result.success) {
      showNotification('success', 'Conteúdo restaurado com sucesso para o padrão oficial.');
    } else {
      showNotification('error', result.message || 'Erro ao restaurar padrão.');
    }
  };

  // Helper: Read uploaded image file as Base64 data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onResult: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('A imagem é muito grande. Escolha uma imagem de até 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onResult(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Sponsor handlers
  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSponsorName.trim() || !newSponsorLogo.trim()) {
      alert('Preencha pelo menos o Nome e a Imagem/Logo do patrocinador.');
      return;
    }

    const newSponsor: SponsorItem = {
      id: `sp-${Date.now()}`,
      name: newSponsorName.trim(),
      category: newSponsorCategory.trim() || 'Parceiro Homologado',
      logoUrl: newSponsorLogo.trim(),
      websiteUrl: newSponsorUrl.trim() || undefined,
      description: newSponsorDesc.trim() || undefined,
      active: true
    };

    updateContent(prev => ({
      ...prev,
      sponsors: [...prev.sponsors, newSponsor]
    }));

    setNewSponsorName('');
    setNewSponsorCategory('');
    setNewSponsorLogo('');
    setNewSponsorUrl('');
    setNewSponsorDesc('');
    showNotification('success', `Patrocinador "${newSponsor.name}" adicionado com sucesso! Clique em "Publicar Alterações" para salvar.`);
  };

  const handleToggleSponsor = (id: string) => {
    updateContent(prev => ({
      ...prev,
      sponsors: prev.sponsors.map(s => s.id === id ? { ...s, active: !s.active } : s)
    }));
  };

  const handleDeleteSponsor = (id: string) => {
    if (!window.confirm('Deseja realmente remover este patrocinador?')) return;
    updateContent(prev => ({
      ...prev,
      sponsors: prev.sponsors.filter(s => s.id !== id)
    }));
  };

  // Lead handlers
  const handleUpdateLeadStatus = async (leadId: string, newStatus: LeadRecord['status']) => {
    const token = sessionStorage.getItem('jenergy_admin_token');
    if (!token) return;

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        showNotification('success', 'Status da solicitação atualizado.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('Deseja excluir esta solicitação de orçamento?')) return;
    const token = sessionStorage.getItem('jenergy_admin_token');
    if (!token) return;

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.filter(l => l.id !== leadId));
        showNotification('success', 'Solicitação excluída.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Data', 'Nome', 'WhatsApp', 'Email', 'Serviço', 'Necessidade', 'Imóvel', 'Cidade', 'Bairro', 'Urgência', 'Status', 'Descrição'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${new Date(l.createdAt).toLocaleString('pt-BR')}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.service}"`,
      `"${l.need}"`,
      `"${l.propertyType}"`,
      `"${l.city}"`,
      `"${l.neighborhood}"`,
      `"${l.urgency}"`,
      `"${l.status}"`,
      `"${(l.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jenergy_solicitacoes_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportBackupJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `jenergy_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jenergy_admin_token');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0A0C0E]/95 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Studio Workbench Main Container */}
      <div 
        className="relative w-full max-w-7xl h-[94vh] bg-[#111316] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#F5F4F0]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="studio-workbench-title"
      >
        
        {/* ============================================================== */}
        {/* TOP BAR: Google AI Studio Style Header & Controls */}
        {/* ============================================================== */}
        <header className="px-4 sm:px-6 py-3 bg-[#171A1D] border-b border-white/8 flex items-center justify-between gap-4 shrink-0">
          
          {/* Left Brand & Breadcrumbs */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#111316] border border-[#F2AA24]/40 flex items-center justify-center text-[#F2AA24] shadow-[0_0_12px_rgba(242,170,36,0.25)] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono overflow-hidden whitespace-nowrap">
              <span className="font-bold text-white tracking-wide uppercase font-display hidden sm:inline">
                J.ENERGY Studio
              </span>
              <span className="text-white/20 hidden sm:inline">/</span>
              <span className="text-[#85898C] truncate">
                {activeTab === 'overview' && 'Visão Geral & Parâmetros'}
                {activeTab === 'texts' && 'Editor de Textos & Copywriting'}
                {activeTab === 'images' && 'Gerenciador de Imagens & Mídia'}
                {activeTab === 'sponsors' && 'Patrocínios & Marcas'}
                {activeTab === 'leads' && 'Solicitações de Orçamentos'}
                {activeTab === 'settings' && 'Configurações Operacionais'}
              </span>
            </div>

            {/* Sync Status Badge */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/8 text-[11px] font-mono">
                <span className={`w-1.5 h-1.5 rounded-full ${hasUnsavedChanges ? 'bg-[#F2AA24] animate-pulse' : 'bg-emerald-400'}`} />
                <span className={hasUnsavedChanges ? 'text-[#F2AA24]' : 'text-emerald-400'}>
                  {hasUnsavedChanges ? 'Alterações não salvas' : 'Sincronizado'}
                </span>
              </div>
            )}

            {/* Authenticated User Profile Badge */}
            {isAuthenticated && currentUser && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#111316] border border-[#F2AA24]/30 text-xs font-mono">
                <UserCheck className="w-3.5 h-3.5 text-[#F2AA24]" />
                <span className="text-white font-semibold">{currentUser.name}</span>
                <span className="text-[#85898C] text-[10.5px]">({currentUser.email})</span>
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isAuthenticated && (
              <>
                <button
                  onClick={handleResetToDefault}
                  disabled={isSaving}
                  className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#85898C] hover:text-white bg-[#111316] hover:bg-white/5 border border-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Restaurar dados de fábrica"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Padrão J.ENERGY</span>
                </button>

                <button
                  onClick={handleExportBackupJSON}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#85898C] hover:text-white bg-[#111316] hover:bg-white/5 border border-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Exportar backup completo em JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup JSON</span>
                </button>

                <button
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold font-display uppercase tracking-wider text-[#111316] bg-[#F2AA24] hover:bg-[#ffb732] rounded-lg shadow-[0_0_16px_rgba(242,170,36,0.35)] transition-all cursor-pointer hover:scale-[1.02] active:scale-98 disabled:opacity-50"
                >
                  {isSaving ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                  <span>{isSaving ? 'Publicando...' : 'Publicar Alterações'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2 text-[#85898C] hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title="Sair da sessão"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 text-[#85898C] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Global Notification Banner */}
        {notification && (
          <div className={`px-6 py-2.5 text-xs font-mono flex items-center justify-between border-b ${
            notification.type === 'success' 
              ? 'bg-emerald-950/70 border-emerald-500/30 text-emerald-200' 
              : 'bg-red-950/70 border-red-500/30 text-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="opacity-70 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* AUTH GATE (When not authenticated) */}
        {/* ============================================================== */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="w-full max-w-lg bg-[#171A1D] border border-white/10 rounded-2xl p-6 sm:p-9 text-center shadow-2xl space-y-6">
              
              <div className="w-16 h-16 rounded-2xl bg-[#111316] border border-[#F2AA24]/40 flex items-center justify-center text-[#F2AA24] mx-auto shadow-[0_0_24px_rgba(242,170,36,0.25)]">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#F2AA24] uppercase tracking-wider mb-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F2AA24]" />
                  <span>Acesso Restrito · Diretoria Técnica</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white mb-2">
                  J.ENERGY Studio
                </h3>
                <p className="text-xs text-[#85898C] leading-relaxed max-w-sm mx-auto">
                  Ambiente exclusivo para os responsáveis pela J.ENERGY. Digite seu e-mail de administrador para acessar o estúdio sem senha.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-xs text-red-200 flex items-start gap-2.5 text-left">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                {/* Campo Único: E-mail Autorizado (Sem Senha) */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#85898C] mb-1.5 flex items-center justify-between">
                    <span>E-mail do Responsável</span>
                    <span className="text-[10px] text-[#F2AA24]">Validação Direta</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#85898C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Digite seu e-mail (ex: seu-email@gmail.com)..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setAuthError('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111316] border border-white/10 text-white placeholder-[#52585E] focus:outline-none focus:border-[#F2AA24] text-xs font-mono"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full py-3.5 px-4 text-xs font-bold font-display uppercase tracking-wider text-[#111316] bg-[#F2AA24] hover:bg-[#ffb732] rounded-xl shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verificando e-mail...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Acessar J.ENERGY Studio</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          
          /* ============================================================== */
          /* AUTHENTICATED WORKBENCH: Left Rail Navigation + Main Content */
          /* ============================================================== */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* ------------------------------------------------------------ */}
            {/* LEFT NAVIGATION RAIL (Google AI Studio Navigation) */}
            {/* ------------------------------------------------------------ */}
            <aside className="w-full md:w-64 bg-[#14171A] border-b md:border-b-0 md:border-r border-white/8 flex flex-row md:flex-col justify-between shrink-0 overflow-x-auto md:overflow-y-auto no-scrollbar">
              <div className="p-2 sm:p-3 space-y-1 flex md:flex-col gap-1 md:gap-0 shrink-0">
                
                <div className="hidden md:block px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[#85898C]">
                  Recursos do Estúdio
                </div>

                {[
                  { id: 'overview', label: 'Visão Geral', icon: Sliders, badge: null },
                  { id: 'texts', label: 'Textos & Copy', icon: Type, badge: 'Editor' },
                  { id: 'images', label: 'Imagens & Mídia', icon: ImageIcon, badge: null },
                  { id: 'sponsors', label: 'Patrocínios', icon: Handshake, badge: `${content.sponsors.length}` },
                  { id: 'leads', label: 'Orçamentos', icon: Users, badge: `${leads.length}` },
                  { id: 'settings', label: 'Configurações', icon: Settings, badge: null }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as StudioTab)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#1D2126] text-[#F2AA24] font-bold shadow-sm border border-[#F2AA24]/30'
                          : 'text-[#A3A8AC] hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#F2AA24]' : 'text-[#85898C]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-[#F2AA24]/20 text-[#F2AA24]' : 'bg-white/5 text-[#85898C]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Specs Card (AI Studio Model Parameters vibe) */}
              <div className="hidden md:block p-4 m-3 rounded-xl bg-[#111316] border border-white/6 text-xs space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#85898C]">
                  <span>Parâmetro</span>
                  <span className="text-[#F2AA24]">Produção v2.6</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#85898C]">
                  <span>CFT João Matos</span>
                  <span className="text-emerald-400">Ativo</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#85898C]">
                  <span>Último salvamento</span>
                  <span className="text-[#F5F4F0]">{lastSaved ? lastSaved.toLocaleTimeString('pt-BR') : 'Inicial'}</span>
                </div>
              </div>
            </aside>

            {/* ------------------------------------------------------------ */}
            {/* MAIN WORKBENCH VIEWPORT */}
            {/* ------------------------------------------------------------ */}
            <main className="flex-1 bg-[#111316] overflow-y-auto p-4 sm:p-6 lg:p-8">
              
              {/* ========================================================== */}
              {/* TAB 1: VISÃO GERAL (OVERVIEW) */}
              {/* ========================================================== */}
              {activeTab === 'overview' && (
                <div className="max-w-5xl mx-auto space-y-6">
                  
                  {/* Banner de Boas-Vindas Estúdio */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171A1D] via-[#1D2126] to-[#171A1D] border border-white/10 shadow-lg relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F2AA24] mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Painel do Responsável // J.ENERGY Studio</span>
                      </div>
                      <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white mb-2">
                        Gerenciamento Total do Site
                      </h2>
                      <p className="text-xs text-[#A3A8AC] leading-relaxed">
                        Altere imagens, fotos de projetos, adicione ou remova patrocinadores, e reescreva qualquer texto do site em tempo real. Cada modificação é salva no banco de dados e sincronizada instantaneamente para todos os visitantes.
                      </p>
                    </div>
                  </div>

                  {/* Cards de Métricas e Ações Rápidas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div 
                      onClick={() => setActiveTab('texts')}
                      className="p-4 rounded-xl bg-[#171A1D] border border-white/8 hover:border-[#F2AA24]/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Type className="w-5 h-5 text-[#F2AA24]" />
                        <span className="text-[10px] font-mono text-[#85898C] group-hover:text-white">Abrir →</span>
                      </div>
                      <h3 className="text-sm font-bold font-display text-white mb-1">Textos & Copy</h3>
                      <p className="text-xs text-[#85898C]">Reescrever Hero, cursos do João, títulos e descrições dos serviços.</p>
                    </div>

                    <div 
                      onClick={() => setActiveTab('images')}
                      className="p-4 rounded-xl bg-[#171A1D] border border-white/8 hover:border-[#F2AA24]/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <ImageIcon className="w-5 h-5 text-[#F2AA24]" />
                        <span className="text-[10px] font-mono text-[#85898C] group-hover:text-white">Abrir →</span>
                      </div>
                      <h3 className="text-sm font-bold font-display text-white mb-1">Imagens & Capas</h3>
                      <p className="text-xs text-[#85898C]">Substituir foto de capa, retrato oficial de João Matos e imagens do catálogo.</p>
                    </div>

                    <div 
                      onClick={() => setActiveTab('sponsors')}
                      className="p-4 rounded-xl bg-[#171A1D] border border-white/8 hover:border-[#F2AA24]/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Handshake className="w-5 h-5 text-[#F2AA24]" />
                        <span className="text-xs font-mono font-bold text-[#F2AA24]">{content.sponsors.length} marcas</span>
                      </div>
                      <h3 className="text-sm font-bold font-display text-white mb-1">Patrocínios & Marcas</h3>
                      <p className="text-xs text-[#85898C]">Gerenciar logos dos patrocinadores exibidos no topo da página.</p>
                    </div>

                    <div 
                      onClick={() => setActiveTab('leads')}
                      className="p-4 rounded-xl bg-[#171A1D] border border-white/8 hover:border-[#F2AA24]/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Users className="w-5 h-5 text-[#25D366]" />
                        <span className="text-xs font-mono font-bold text-[#25D366]">{leads.length} leads</span>
                      </div>
                      <h3 className="text-sm font-bold font-display text-white mb-1">Orçamentos Recebidos</h3>
                      <p className="text-xs text-[#85898C]">Contatos de clientes pelo WhatsApp e formulário de orçamento.</p>
                    </div>

                  </div>

                  {/* Resumo da Identidade Oficial Atual */}
                  <div className="p-6 rounded-xl bg-[#171A1D] border border-white/8 space-y-4">
                    <h3 className="text-sm font-bold font-display uppercase tracking-wide text-white">
                      Identidade Oficial Sincronizada
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-[#111316] border border-white/6">
                        <span className="text-[#85898C] block text-[10px] uppercase">Empresa</span>
                        <strong className="text-white text-sm font-display">J.ENERGY SOLUÇÕES ELÉTRICAS</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111316] border border-white/6">
                        <span className="text-[#85898C] block text-[10px] uppercase">Slogan Oficial</span>
                        <strong className="text-[#F2AA24]">&ldquo;Sua segurança é nossa energia!&rdquo;</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111316] border border-white/6">
                        <span className="text-[#85898C] block text-[10px] uppercase">Responsável</span>
                        <strong className="text-white">João Matos · SENAI / CFT</strong>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================== */}
              {/* TAB 2: TEXTOS & COPY (REESCREVER O QUE QUISER) */}
              {/* ========================================================== */}
              {activeTab === 'texts' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  
                  {/* Sub-Tabs do Editor de Textos */}
                  <div className="flex items-center gap-2 border-b border-white/8 pb-3 overflow-x-auto no-scrollbar">
                    {[
                      { id: 'hero', label: '01. Hero & Chamada Principal' },
                      { id: 'about', label: '02. João Matos & Cursos' },
                      { id: 'services', label: '03. Catálogo de Serviços' },
                      { id: 'quiz', label: '04. Quiz de Fechaduras' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setTextSection(tab.id as any)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          textSection === tab.id
                            ? 'bg-[#F2AA24] text-[#111316] font-bold shadow-sm'
                            : 'bg-[#171A1D] text-[#85898C] hover:text-white border border-white/6'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* SUB-TAB: HERO */}
                  {textSection === 'hero' && (
                    <div className="space-y-4 bg-[#171A1D] p-5 sm:p-6 rounded-2xl border border-white/8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold font-display uppercase tracking-wide text-white">
                          Cabeçalho & Chamada do Hero
                        </h3>
                        <span className="text-[11px] font-mono text-[#F2AA24]">Seção Inicial de Impacto</span>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Kicker / Linha Superior
                        </label>
                        <input
                          type="text"
                          value={content.hero.kicker}
                          onChange={(e) => updateContent(prev => ({ ...prev, hero: { ...prev.hero, kicker: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-sm text-white focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Título Principal (Caixa Alta)
                        </label>
                        <input
                          type="text"
                          value={content.hero.headline}
                          onChange={(e) => updateContent(prev => ({ ...prev, hero: { ...prev.hero, headline: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-sm text-white focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Destaque do Título (em Âmbar Elétrico)
                        </label>
                        <input
                          type="text"
                          value={content.hero.headlineHighlight}
                          onChange={(e) => updateContent(prev => ({ ...prev, hero: { ...prev.hero, headlineHighlight: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-sm text-[#F2AA24] font-bold focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Subtítulo Editorial
                        </label>
                        <textarea
                          rows={3}
                          value={content.hero.subheadline}
                          onChange={(e) => updateContent(prev => ({ ...prev, hero: { ...prev.hero, subheadline: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white leading-relaxed focus:border-[#F2AA24]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                            Texto do Botão de Orçamento
                          </label>
                          <input
                            type="text"
                            value={content.hero.buttonText}
                            onChange={(e) => updateContent(prev => ({ ...prev, hero: { ...prev.hero, buttonText: e.target.value } }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                            Slogan Oficial
                          </label>
                          <input
                            type="text"
                            value={content.hero.slogan}
                            onChange={(e) => updateContent(prev => ({ ...prev, hero: { ...prev.hero, slogan: e.target.value } }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB: ABOUT JOAO MATOS */}
                  {textSection === 'about' && (
                    <div className="space-y-4 bg-[#171A1D] p-5 sm:p-6 rounded-2xl border border-white/8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold font-display uppercase tracking-wide text-white">
                          Perfil do Eletricista João Matos & Cursos
                        </h3>
                        <span className="text-[11px] font-mono text-[#F2AA24]">Formação & Normas</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                            Nome em Destaque
                          </label>
                          <input
                            type="text"
                            value={content.about.title}
                            onChange={(e) => updateContent(prev => ({ ...prev, about: { ...prev.about, title: e.target.value } }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-sm text-white font-bold focus:border-[#F2AA24]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                            Credenciamento / Selo
                          </label>
                          <input
                            type="text"
                            value={content.about.cftBadge}
                            onChange={(e) => updateContent(prev => ({ ...prev, about: { ...prev.about, cftBadge: e.target.value } }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-sm text-[#F2AA24] font-bold focus:border-[#F2AA24]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Subtítulo de Qualificação
                        </label>
                        <input
                          type="text"
                          value={content.about.subtitle}
                          onChange={(e) => updateContent(prev => ({ ...prev, about: { ...prev.about, subtitle: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Texto Completo de Apresentação (Biografia & Filosofia)
                        </label>
                        <textarea
                          rows={7}
                          value={content.about.presentationText}
                          onChange={(e) => updateContent(prev => ({ ...prev, about: { ...prev.about, presentationText: e.target.value } }))}
                          className="w-full px-4 py-3 rounded-xl bg-[#111316] border border-white/10 text-xs text-white leading-relaxed focus:border-[#F2AA24] font-mono"
                        />
                      </div>

                      {/* Lista de Cursos */}
                      <div className="pt-2">
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-2">
                          Cursos, Normas & Especializações ({content.about.cursos.length})
                        </label>
                        <div className="space-y-2">
                          {content.about.cursos.map((c, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="w-8 text-[11px] font-mono text-[#F2AA24] text-center font-bold">{c.num}</span>
                              <input
                                type="text"
                                value={c.title}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateContent(prev => {
                                    const nextC = [...prev.about.cursos];
                                    nextC[idx] = { ...nextC[idx], title: val };
                                    return { ...prev, about: { ...prev.about, cursos: nextC } };
                                  });
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                              />
                              <input
                                type="text"
                                value={c.category}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateContent(prev => {
                                    const nextC = [...prev.about.cursos];
                                    nextC[idx] = { ...nextC[idx], category: val };
                                    return { ...prev, about: { ...prev.about, cursos: nextC } };
                                  });
                                }}
                                placeholder="Categoria..."
                                className="w-44 px-3 py-1.5 rounded-lg bg-[#111316] border border-white/10 text-[11px] text-[#85898C] focus:border-[#F2AA24]"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB: SERVIÇOS DO CATÁLOGO */}
                  {textSection === 'services' && (
                    <div className="space-y-4 bg-[#171A1D] p-5 sm:p-6 rounded-2xl border border-white/8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold font-display uppercase tracking-wide text-white">
                          Editar Serviços do Catálogo
                        </h3>
                        <span className="text-[11px] font-mono text-[#85898C]">Selecione um serviço para editar</span>
                      </div>

                      {/* Botões seletores dos 6 serviços */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {content.services.map((srv, idx) => (
                          <button
                            key={srv.id}
                            onClick={() => setSelectedServiceIndex(idx)}
                            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                              selectedServiceIndex === idx
                                ? 'bg-[#111316] border-[#F2AA24] text-[#F2AA24]'
                                : 'bg-[#111316]/50 border-white/6 text-[#85898C] hover:text-white'
                            }`}
                          >
                            <span className="block text-[10px] font-mono font-bold mb-0.5">{srv.number}</span>
                            <span className="block text-xs font-display font-semibold truncate">{srv.title}</span>
                          </button>
                        ))}
                      </div>

                      {/* Formulário do Serviço Selecionado */}
                      {content.services[selectedServiceIndex] && (
                        <div className="space-y-3 pt-3 border-t border-white/8">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                                Título do Serviço
                              </label>
                              <input
                                type="text"
                                value={content.services[selectedServiceIndex].title}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateContent(prev => {
                                    const nextSrv = [...prev.services];
                                    nextSrv[selectedServiceIndex] = { ...nextSrv[selectedServiceIndex], title: val };
                                    return { ...prev, services: nextSrv };
                                  });
                                }}
                                className="w-full px-3.5 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                                Badge / Etiquetas
                              </label>
                              <input
                                type="text"
                                value={content.services[selectedServiceIndex].badge}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateContent(prev => {
                                    const nextSrv = [...prev.services];
                                    nextSrv[selectedServiceIndex] = { ...nextSrv[selectedServiceIndex], badge: val };
                                    return { ...prev, services: nextSrv };
                                  });
                                }}
                                className="w-full px-3.5 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                              Descrição Curta (Visível no Card)
                            </label>
                            <textarea
                              rows={2}
                              value={content.services[selectedServiceIndex].shortDescription}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateContent(prev => {
                                  const nextSrv = [...prev.services];
                                  nextSrv[selectedServiceIndex] = { ...nextSrv[selectedServiceIndex], shortDescription: val };
                                  return { ...prev, services: nextSrv };
                                });
                              }}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                              Descrição Técnica Completa
                            </label>
                            <textarea
                              rows={3}
                              value={content.services[selectedServiceIndex].fullDescription}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateContent(prev => {
                                  const nextSrv = [...prev.services];
                                  nextSrv[selectedServiceIndex] = { ...nextSrv[selectedServiceIndex], fullDescription: val };
                                  return { ...prev, services: nextSrv };
                                });
                              }}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                              Norma / Conformidade Técnica
                            </label>
                            <input
                              type="text"
                              value={content.services[selectedServiceIndex].norma || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateContent(prev => {
                                  const nextSrv = [...prev.services];
                                  nextSrv[selectedServiceIndex] = { ...nextSrv[selectedServiceIndex], norma: val };
                                  return { ...prev, services: nextSrv };
                                });
                              }}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-[#F2AA24] focus:border-[#F2AA24]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUB-TAB: QUIZ */}
                  {textSection === 'quiz' && (
                    <div className="space-y-4 bg-[#171A1D] p-5 sm:p-6 rounded-2xl border border-white/8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold font-display uppercase tracking-wide text-white">
                          Chamada de Ação do Quiz Interativo
                        </h3>
                        <span className="text-[11px] font-mono text-[#F2AA24]">Botão Flutuante</span>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Kicker / Badge
                        </label>
                        <input
                          type="text"
                          value={content.quiz.kicker}
                          onChange={(e) => updateContent(prev => ({ ...prev, quiz: { ...prev.quiz, kicker: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-[#F2AA24] font-bold focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Título do Card
                        </label>
                        <input
                          type="text"
                          value={content.quiz.title}
                          onChange={(e) => updateContent(prev => ({ ...prev, quiz: { ...prev.quiz, title: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-sm text-white font-bold focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Texto Explicativo
                        </label>
                        <textarea
                          rows={2}
                          value={content.quiz.description}
                          onChange={(e) => updateContent(prev => ({ ...prev, quiz: { ...prev.quiz, description: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white leading-relaxed focus:border-[#F2AA24]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                            Texto do Botão
                          </label>
                          <input
                            type="text"
                            value={content.quiz.buttonText}
                            onChange={(e) => updateContent(prev => ({ ...prev, quiz: { ...prev.quiz, buttonText: e.target.value } }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                            Subtexto (Duração)
                          </label>
                          <input
                            type="text"
                            value={content.quiz.subtext}
                            onChange={(e) => updateContent(prev => ({ ...prev, quiz: { ...prev.quiz, subtext: e.target.value } }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-[#85898C] focus:border-[#F2AA24]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          URL do Quiz (Destino)
                        </label>
                        <input
                          type="text"
                          value={content.quiz.url}
                          onChange={(e) => updateContent(prev => ({ ...prev, quiz: { ...prev.quiz, url: e.target.value } }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white font-mono focus:border-[#F2AA24]"
                        />
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ========================================================== */}
              {/* TAB 3: IMAGENS & MÍDIA (ALTERAR QUALQUER IMAGEM) */}
              {/* ========================================================== */}
              {activeTab === 'images' && (
                <div className="max-w-5xl mx-auto space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/8">
                    <div>
                      <h3 className="text-base font-bold font-display uppercase tracking-tight text-white">
                        Gerenciador de Imagens & Fotos do Site
                      </h3>
                      <p className="text-xs text-[#85898C]">
                        Substitua fotos fazendo upload direto do seu dispositivo ou inserindo uma URL.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#F2AA24] bg-white/5 px-2.5 py-1 rounded">
                      Suporta JPG, PNG, WEBP (até 8MB)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* IMAGEM 1: HERO COVER */}
                    <div className="p-5 rounded-2xl bg-[#171A1D] border border-white/8 space-y-3">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-bold font-display text-white">Capa de Fundo do Hero</strong>
                        <span className="text-[10px] font-mono text-[#85898C]">16:9 Panorâmica</span>
                      </div>

                      <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#101214] border border-white/10 relative group">
                        <img
                          src={content.hero.coverImage}
                          alt="Hero Cover Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="px-3 py-1.5 rounded-lg bg-[#F2AA24] text-[#111316] font-bold text-xs uppercase cursor-pointer hover:brightness-110 flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Substituir</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                updateContent(prev => ({ ...prev, hero: { ...prev.hero, coverImage: dataUrl } }));
                                showNotification('success', 'Nova foto de capa carregada!');
                              })}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                          Ou digite a URL da Imagem:
                        </label>
                        <input
                          type="text"
                          value={content.hero.coverImage}
                          onChange={(e) => updateContent(prev => ({ ...prev, hero: { ...prev.hero, coverImage: e.target.value } }))}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#111316] border border-white/10 text-xs text-white font-mono focus:border-[#F2AA24]"
                        />
                      </div>
                    </div>

                    {/* IMAGEM 2: RETRATO JOÃO MATOS */}
                    <div className="p-5 rounded-2xl bg-[#171A1D] border border-white/8 space-y-3">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-bold font-display text-white">Retrato Oficial de João Matos</strong>
                        <span className="text-[10px] font-mono text-[#85898C]">4:5 Vertical</span>
                      </div>

                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#101214] border border-white/10 relative group">
                        <img
                          src={content.about.portraitImage}
                          alt="João Matos Preview"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="px-3 py-1.5 rounded-lg bg-[#F2AA24] text-[#111316] font-bold text-xs uppercase cursor-pointer hover:brightness-110 flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Substituir Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                updateContent(prev => ({ ...prev, about: { ...prev.about, portraitImage: dataUrl } }));
                                showNotification('success', 'Nova foto de João Matos carregada!');
                              })}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                          Ou digite a URL da Imagem:
                        </label>
                        <input
                          type="text"
                          value={content.about.portraitImage}
                          onChange={(e) => updateContent(prev => ({ ...prev, about: { ...prev.about, portraitImage: e.target.value } }))}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#111316] border border-white/10 text-xs text-white font-mono focus:border-[#F2AA24]"
                        />
                      </div>
                    </div>

                  </div>

                  {/* IMAGENS DOS 6 SERVIÇOS DO CATÁLOGO */}
                  <div className="p-5 rounded-2xl bg-[#171A1D] border border-white/8 space-y-4">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold font-display text-white">Imagens dos Serviços do Catálogo (01 a 06)</strong>
                      <span className="text-[11px] font-mono text-[#85898C]">Substituição Individual</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {content.services.map((srv, idx) => (
                        <div key={srv.id} className="p-3.5 rounded-xl bg-[#111316] border border-white/6 space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white truncate">{srv.number}. {srv.title}</span>
                          </div>

                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black/50 border border-white/8 relative group">
                            <img
                              src={srv.image}
                              alt={srv.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <label className="px-2.5 py-1 rounded bg-[#F2AA24] text-[#111316] font-bold text-[10px] uppercase cursor-pointer hover:brightness-110 flex items-center gap-1">
                                <Upload className="w-3 h-3" />
                                <span>Trocar Foto</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                    updateContent(prev => {
                                      const nextSrv = [...prev.services];
                                      nextSrv[idx] = { ...nextSrv[idx], image: dataUrl };
                                      return { ...prev, services: nextSrv };
                                    });
                                    showNotification('success', `Foto do serviço "${srv.title}" atualizada!`);
                                  })}
                                />
                              </label>
                            </div>
                          </div>

                          <div>
                            <input
                              type="text"
                              value={srv.image}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateContent(prev => {
                                  const nextSrv = [...prev.services];
                                  nextSrv[idx] = { ...nextSrv[idx], image: val };
                                  return { ...prev, services: nextSrv };
                                });
                              }}
                              className="w-full px-2.5 py-1 rounded bg-[#171A1D] border border-white/10 text-[10.5px] font-mono text-[#A3A8AC] focus:border-[#F2AA24]"
                              placeholder="URL da imagem..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================== */}
              {/* TAB 4: PATROCÍNIOS & MARCAS PARCEIRAS */}
              {/* ========================================================== */}
              {activeTab === 'sponsors' && (
                <div className="max-w-5xl mx-auto space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/8">
                    <div>
                      <h3 className="text-base font-bold font-display uppercase tracking-tight text-white">
                        Gerenciar Patrocínios Oficiais
                      </h3>
                      <p className="text-xs text-[#85898C]">
                        Adicione ou gerencie os patrocinadores exibidos na faixa superior da página inicial.
                      </p>
                    </div>
                  </div>

                  {/* FORMULÁRIO DE NOVO PATROCINADOR */}
                  <form onSubmit={handleAddSponsor} className="p-5 sm:p-6 rounded-2xl bg-[#171A1D] border border-white/8 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F2AA24]">
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Novo Patrocinador / Marca</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                          Nome da Marca / Empresa *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Intelbras, Ekaza, Papaiz, Yale..."
                          value={newSponsorName}
                          onChange={(e) => setNewSponsorName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                          Categoria Técnica
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Fechaduras Digitais, Automação..."
                          value={newSponsorCategory}
                          onChange={(e) => setNewSponsorCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                          Site Oficial (Link)
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={newSponsorUrl}
                          onChange={(e) => setNewSponsorUrl(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-8">
                        <label className="block text-[11px] font-mono uppercase text-[#85898C] mb-1">
                          Logo / Imagem (URL ou Upload) *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            placeholder="URL da logo ou selecione um arquivo ao lado..."
                            value={newSponsorLogo}
                            onChange={(e) => setNewSponsorLogo(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                          />
                          <label className="px-3 py-2 rounded-xl bg-[#1D2126] hover:bg-white/10 border border-white/10 text-xs font-mono text-white cursor-pointer shrink-0 flex items-center gap-1.5 transition-colors">
                            <Upload className="w-3.5 h-3.5 text-[#F2AA24]" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => setNewSponsorLogo(dataUrl))}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 rounded-xl bg-[#F2AA24] hover:bg-[#ffb732] text-[#111316] font-bold text-xs uppercase font-display tracking-wider transition-all cursor-pointer shadow-md"
                        >
                          Adicionar Patrocinador
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* LISTA DE PATROCINADORES ATIVOS E INATIVOS */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#85898C]">
                      <span>Patrocinadores Cadastrados ({content.sponsors.length})</span>
                      <span>Visibilidade no Site</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {content.sponsors.map((sp) => (
                        <div
                          key={sp.id}
                          className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                            sp.active 
                              ? 'bg-[#171A1D] border-white/10' 
                              : 'bg-[#14171A]/50 border-white/5 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-16 h-11 rounded-lg bg-white border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                              <img
                                src={sp.logoUrl}
                                alt={sp.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="overflow-hidden">
                              <strong className="text-sm font-display font-bold text-white block truncate">
                                {sp.name}
                              </strong>
                              <span className="text-[11px] font-mono text-[#85898C] block truncate">
                                {sp.category}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleSponsor(sp.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-bold transition-colors cursor-pointer ${
                                sp.active
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-[#1D2126] text-[#85898C] border border-white/6'
                              }`}
                            >
                              {sp.active ? 'Ativo' : 'Oculto'}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteSponsor(sp.id)}
                              className="p-1.5 rounded-lg text-[#85898C] hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                              title="Remover patrocinador"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================== */}
              {/* TAB 5: LEADS (SOLICITAÇÕES DE ORÇAMENTOS) */}
              {/* ========================================================== */}
              {activeTab === 'leads' && (
                <div className="max-w-5xl mx-auto space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/8">
                    <div>
                      <h3 className="text-base font-bold font-display uppercase tracking-tight text-white">
                        Solicitações de Orçamentos Recebidas
                      </h3>
                      <p className="text-xs text-[#85898C]">
                        Contatos realizados por clientes via formulário de orçamento e WhatsApp.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-white bg-[#171A1D] border border-white/10 rounded-lg hover:border-white/30 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Exportar CSV</span>
                      </button>

                      <button
                        onClick={() => {
                          const t = sessionStorage.getItem('jenergy_admin_token');
                          if (t) loadAdminData(t);
                        }}
                        className="p-1.5 text-[#85898C] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        title="Recarregar"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Filtro de Status */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar text-xs font-mono">
                    {[
                      { id: 'todos', label: 'Todos' },
                      { id: 'novo', label: 'Novo' },
                      { id: 'em_atendimento', label: 'Em Atendimento' },
                      { id: 'orcamento_enviado', label: 'Orçamento Enviado' },
                      { id: 'concluido', label: 'Concluído' }
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setFilterStatus(st.id)}
                        className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          filterStatus === st.id
                            ? 'bg-[#F2AA24] text-[#111316] font-bold'
                            : 'bg-[#171A1D] text-[#85898C] hover:text-white border border-white/6'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {/* Lista de Leads */}
                  {leads.length === 0 ? (
                    <div className="text-center py-12 text-[#85898C] text-xs font-mono">
                      Nenhuma solicitação de orçamento registrada até o momento.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {(filterStatus === 'todos' ? leads : leads.filter(l => l.status === filterStatus)).map((lead) => (
                        <div
                          key={lead.id}
                          className="p-4 rounded-xl bg-[#171A1D] border border-white/8 hover:border-white/20 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <strong className="text-sm font-bold font-display text-white">{lead.name}</strong>
                                <span className="text-[10px] font-mono text-[#F2AA24] bg-white/5 px-2 py-0.5 rounded border border-white/10 font-bold">
                                  {lead.service}
                                </span>
                                <span className="text-[10px] font-mono bg-[#111316] px-2 py-0.5 rounded text-[#85898C]">
                                  {lead.urgency}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-xs text-[#85898C] font-mono">
                                <a 
                                  href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[#25D366] hover:underline flex items-center gap-1 font-bold"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{lead.phone}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                                <span>{lead.neighborhood}, {lead.city}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#111316] border border-white/10 text-white focus:outline-none focus:border-[#F2AA24] cursor-pointer"
                              >
                                <option value="novo">Novo</option>
                                <option value="em_atendimento">Em Atendimento</option>
                                <option value="orcamento_enviado">Orçamento Enviado</option>
                                <option value="concluido">Concluído</option>
                                <option value="arquivado">Arquivado</option>
                              </select>

                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 text-[#85898C] hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                                title="Excluir"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-[#111316] border border-white/6 text-xs">
                            <span className="text-[#F2AA24] font-semibold block mb-0.5">
                              Necessidade: {lead.need}
                            </span>
                            {lead.description && (
                              <p className="text-[#F5F4F0] italic mb-1">
                                &ldquo;{lead.description}&rdquo;
                              </p>
                            )}
                            <span className="text-[10px] font-mono text-[#52585E]">
                              Recebido em: {new Date(lead.createdAt).toLocaleString('pt-BR')} · Origem: {lead.source}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* ========================================================== */}
              {/* TAB 6: CONFIGURAÇÕES OPERACIONAIS */}
              {/* ========================================================== */}
              {activeTab === 'settings' && settings && (
                <div className="max-w-4xl mx-auto space-y-6">
                  
                  <div className="pb-3 border-b border-white/8">
                    <h3 className="text-base font-bold font-display uppercase tracking-tight text-white">
                      Configurações Operacionais & Atendimento
                    </h3>
                    <p className="text-xs text-[#85898C]">
                      Contatos comerciais, números de WhatsApp e alertas de emergência.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#171A1D] border border-white/8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Telefone / WhatsApp Comercial (Exibição)
                        </label>
                        <input
                          type="text"
                          value={settings.phoneDisplay}
                          onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Número WhatsApp Destino (Com DDI 55)
                        </label>
                        <input
                          type="text"
                          value={settings.whatsappNumber}
                          onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Link Instagram Oficial
                        </label>
                        <input
                          type="text"
                          value={settings.instagramUrl}
                          onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Horário Seg a Sex
                        </label>
                        <input
                          type="text"
                          value={settings.businessHours.weekdays}
                          onChange={(e) => setSettings({
                            ...settings,
                            businessHours: { ...settings.businessHours, weekdays: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111316] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>
                    </div>

                    {/* Plantão Emergencial */}
                    <div className="p-4 rounded-xl bg-[#111316] border border-white/8 space-y-3 mt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold font-display text-white block">
                            Alerta de Plantão Emergencial
                          </span>
                          <span className="text-[11px] text-[#85898C]">
                            Mostra o aviso de atendimento prioritário em caso de pane ou desarme geral.
                          </span>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.emergencyActive}
                            onChange={(e) => setSettings({ ...settings, emergencyActive: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[#1D2126] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2AA24]"></div>
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#85898C] mb-1.5">
                          Nota de esclarecimento
                        </label>
                        <textarea
                          rows={2}
                          value={settings.emergencyNotice}
                          onChange={(e) => setSettings({ ...settings, emergencyNotice: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#171A1D] border border-white/10 text-xs text-white focus:border-[#F2AA24]"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </main>
          </div>
        )}

      </div>
    </div>
  );
};
