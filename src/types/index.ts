export type ServiceId = 
  | 'instalacoes-eletricas'
  | 'manutencao-eletrica'
  | 'energia-solar'
  | 'automacao-residencial'
  | 'cftv-seguranca'
  | 'fechadura-eletronica';

export interface ServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  badge: string;
  applications: string[];
  benefits: string[];
  features: string[];
  norma?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'instalacoes' | 'manutencao' | 'solar' | 'automacao' | 'seguranca';
  categoryLabel: string;
  location: string;
  image: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  isDemonstrative?: boolean;
}

export interface QuoteFormData {
  service: string;
  need: string;
  propertyType: 'Residencial' | 'Comercial' | 'Industrial';
  city: string;
  neighborhood: string;
  urgency: 'Emergência' | 'Urgente' | 'Programado' | 'Orçamento';
  description: string;
  name: string;
  phone: string;
  email: string;
  acceptedTerms: boolean;
  photoName?: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  need: string;
  propertyType: string;
  city: string;
  neighborhood: string;
  urgency: string;
  description: string;
  status: 'novo' | 'em_atendimento' | 'orcamento_enviado' | 'concluido' | 'arquivado';
  createdAt: string;
  source: string;
}

export interface CompanySettings {
  companyName: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  instagramUrl: string;
  city: string;
  state: string;
  coverageArea: string[];
  businessHours: {
    weekdays: string;
    saturday: string;
    emergency: string;
  };
  emergencyNotice: string;
  emergencyActive: boolean;
}

export interface SponsorItem {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  websiteUrl?: string;
  active: boolean;
  description?: string;
}

export interface SiteContent {
  hero: {
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    slogan: string;
    kicker: string;
    coverImage: string;
    buttonText: string;
    statNumber: string;
    statLabel: string;
  };
  about: {
    tagline: string;
    title: string;
    subtitle: string;
    presentationText: string;
    portraitImage: string;
    cftBadge: string;
    cursos: Array<{ num: string; title: string; category: string }>;
  };
  services: ServiceItem[];
  sponsors: SponsorItem[];
  quiz: {
    active: boolean;
    kicker: string;
    title: string;
    description: string;
    buttonText: string;
    subtext: string;
    url: string;
  };
}
