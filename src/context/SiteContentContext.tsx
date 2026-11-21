import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent } from '../types';
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent';

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  saveContent: () => Promise<{ success: boolean; message?: string }>;
  resetContent: () => Promise<{ success: boolean; message?: string }>;
  loading: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'jenergy_cached_site_content_v1';

export const SiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    // Check localStorage cache first for zero-flash load
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return { ...DEFAULT_SITE_CONTENT, ...parsed };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Fetch live server content on mount
  useEffect(() => {
    let mounted = true;
    async function loadServerContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.content && mounted) {
            setContent(data.content);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.content));
            setLastSaved(new Date());
          }
        }
      } catch (err) {
        console.warn('Using local content fallback:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadServerContent();
    return () => {
      mounted = false;
    };
  }, []);

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContent(prev => {
      const next = updater(prev);
      setHasUnsavedChanges(true);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // quota exceeded or private mode
      }
      return next;
    });
  };

  const saveContent = async (): Promise<{ success: boolean; message?: string }> => {
    setIsSaving(true);
    const token = sessionStorage.getItem('jenergy_admin_token');

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ content })
      });

      const data = await res.json();
      if (data.success) {
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));
        return { success: true, message: 'Conteúdo publicado e salvo com sucesso no servidor!' };
      } else {
        return { success: false, message: data.message || 'Falha ao salvar no servidor.' };
      }
    } catch {
      // Even if network fails, localStorage is already persisted
      return { success: false, message: 'Erro de rede. Conteúdo preservado no navegador.' };
    } finally {
      setIsSaving(false);
    }
  };

  const resetContent = async (): Promise<{ success: boolean; message?: string }> => {
    setIsSaving(true);
    const token = sessionStorage.getItem('jenergy_admin_token');

    try {
      const res = await fetch('/api/content/reset', {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      const data = await res.json();
      if (data.success && data.content) {
        setContent(data.content);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.content));
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
        return { success: true, message: 'Conteúdo restaurado para o padrão original da J.ENERGY.' };
      }
    } catch {
      setContent(DEFAULT_SITE_CONTENT);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_CONTENT));
      setHasUnsavedChanges(false);
      return { success: true, message: 'Conteúdo restaurado localmente.' };
    } finally {
      setIsSaving(false);
    }
    return { success: false, message: 'Erro ao restaurar conteúdo.' };
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateContent,
        saveContent,
        resetContent,
        loading,
        isSaving,
        lastSaved,
        hasUnsavedChanges
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = (): SiteContentContextType => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
