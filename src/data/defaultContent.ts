import { SiteContent } from '../types';
import { SERVICES_DATA } from './servicesData';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    headline: "SOLUÇÕES ELÉTRICAS COM RIGOR TÉCNICO,",
    headlineHighlight: "SEGURANÇA E CONFIABILIDADE.",
    subheadline: "Instalações e manutenção elétrica para residências, condomínios e indústrias em São Bernardo do Campo e Grande ABC. Atendimento e responsabilidade técnica conduzidos diretamente por João Matos.",
    slogan: "Sua segurança é nossa energia!",
    kicker: "J.ENERGY Soluções Elétricas",
    coverImage: "/assets/aistudio/Eletricista-Veja-Como-Ser-um-Bom-Profissional_e468609b.jpg",
    buttonText: "Solicitar Orçamento pelo WhatsApp",
    statNumber: "+380",
    statLabel: "Avaliações 5 Estrelas no Google"
  },
  about: {
    tagline: "02 / Perfil & Responsabilidade Técnica",
    title: "JOÃO MATOS",
    subtitle: "Técnico em Eletrotécnica formado pelo SENAI · Credenciado ativo no CFT",
    presentationText: `A J.Energy Soluções Elétricas é especializada em instalações e manutenções elétricas residenciais, comerciais e industriais, atendendo São Bernardo do Campo e região.

Oferecemos soluções completas em elétrica, automação residencial, fechaduras eletrônicas e sistemas de segurança, sempre com foco em qualidade, eficiência e atendimento personalizado.

Trabalhamos seguindo as normas técnicas aplicáveis, como ABNT NBR 5410, NR10 e NR35, priorizando a segurança e a satisfação de cada cliente.

Mais de 380 avaliações 5 estrelas no Google!

J.Energy — Sua segurança é nossa energia!`,
    portraitImage: "/assets/joao_real.jpg",
    cftBadge: "CFT ATIVO",
    cursos: [
      { num: '01', title: 'Técnico em Eletrotécnica', category: 'Formação Técnica SENAI' },
      { num: '02', title: 'Eletricista Instalador', category: 'Instalações & Padrão' },
      { num: '03', title: 'Eficiência Energética', category: 'Gestão & Otimização' },
      { num: '04', title: 'Comandos Elétricos', category: 'Painéis & Acionamentos' },
      { num: '05', title: 'Automação Residencial', category: 'Smart Home & Conforto' },
      { num: '06', title: 'NR-10', category: 'Segurança em Eletricidade' },
      { num: '07', title: 'NR-35', category: 'Trabalho em Altura' },
      { num: '08', title: 'Energia Solar Fotovoltaica', category: 'Geração Distribuída' }
    ]
  },
  services: SERVICES_DATA,
  sponsors: [
    {
      id: 'sp-intelbras',
      name: 'Intelbras',
      category: 'Segurança Eletrônica & Automação',
      logoUrl: '/assets/aistudio/intelbras_2aaf755f.png',
      websiteUrl: 'https://www.intelbras.com/pt-br/',
      active: true,
      description: 'Equipamentos de segurança eletrônica, CFTV e controle de acesso.'
    },
    {
      id: 'sp-ekaza',
      name: 'Ekaza',
      category: 'Automação Residencial & Smart Home',
      logoUrl: '/assets/aistudio/ekaza_858fd747.jpg',
      websiteUrl: 'https://ekaza.com.br/',
      active: true,
      description: 'Soluções inteligentes para casa conectada e automação residencial.'
    },
    {
      id: 'sp-papaiz',
      name: 'Papaiz',
      category: 'Fechaduras Digitais & Segurança',
      logoUrl: '/assets/aistudio/papaiz_550e33f9.jpg',
      websiteUrl: 'https://www.papaiz.com.br/',
      active: true,
      description: 'Fechaduras eletrônicas e ferragens de alta segurança.'
    },
    {
      id: 'sp-yale',
      name: 'Yale',
      category: 'Fechaduras Inteligentes & Controle de Acesso',
      logoUrl: '/assets/aistudio/yale_ef959491.jpg',
      websiteUrl: 'https://www.yalehome.com/br/pt',
      active: true,
      description: 'Fechaduras digitais biométricas e soluções de acesso sem chaves.'
    }
  ],
  quiz: {
    active: true,
    kicker: "EM POUCOS CLIQUES",
    title: "Descubra a fechadura digital ideal pra sua porta",
    description: "Selecionamos os melhores modelos do mercado por tipo de cenário. Economizamos seu tempo e facilitamos a escolha certa.",
    buttonText: "Começar Quiz",
    subtext: "5 a 7 perguntas · menos de 1 minuto",
    url: "https://quiz.elitedafechadura.com.br/quiz/matos-joao06?direto=1"
  }
};
