import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-01',
    title: 'Modernização de Painel Elétrico e Adequação NBR 5410 em Galpão Comercial',
    category: 'instalacoes',
    categoryLabel: 'Instalações & Painéis',
    location: 'São Bernardo do Campo — SP',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_15.49.21_a5936743.jpeg',
    challenge: 'A empresa apresentava frequentes interrupções produtivas por desarme do disjuntor geral durante picos de operação. O quadro original possuía fiação desorganizada, sem dispositivos DPS e DR e com barramentos subdimensionados.',
    solution: 'Substituição completa do quadro geral por painel estruturado com barramentos de cobre eletrolítico dimensionados, instalação de protetores de surto (DPS classe II), disjuntores com curva adequada e anilhamento individual de todos os circuitos.',
    result: 'Zero desarmes acidentais após a entrega, estabilização térmica comprovada por termografia e atendimento integral às exigências de seguro patrimonial.',
    tags: ['Quadro Geral', 'NBR 5410', 'Proteção DPS', 'Balanceamento'],
    isDemonstrative: true
  },
  {
    id: 'case-02',
    title: 'Diagnóstico Termográfico e Correção de Sobrecarga em Centro de Distribuição',
    category: 'manutencao',
    categoryLabel: 'Manutenção Preventiva',
    location: 'Santo André — SP',
    image: '/assets/aistudio/manuten__o_eletrica_99f219e3.jpg',
    challenge: 'Ponto quente identificado em conexões do barramento principal operando a 84°C, gerando risco iminente de colapso térmico e princípio de incêndio em horário comercial.',
    solution: 'Manutenção preventiva programada em janela noturna: desmontagem das junções sobreaquecidas, limpeza de óxidos, substituição de parafusos com torque controlado conforme especificação e reaperto geral do conjunto.',
    result: 'Temperatura estabilizada em 38°C em plena carga, prevenindo parada fabril estimada em prejuízo elevado e eliminando risco de sinistro.',
    tags: ['Termografia', 'Torque Controlado', 'Segurança Operacional'],
    isDemonstrative: true
  },
  {
    id: 'case-03',
    title: 'Sistema Fotovoltaico Conectado à Rede (10,8 kWp) com Microinversores',
    category: 'solar',
    categoryLabel: 'Energia Solar',
    location: 'São Bernardo do Campo — SP',
    image: '/assets/aistudio/energia_solar_05182216.jpg',
    challenge: 'Telhado residencial com duas orientações distintas e sombreamento parcial de árvores vizinhas no período vespertino, impossibilitando arranjos em série tradicionais sem grande perda de geração.',
    solution: 'Instalação de 20 módulos monocristalinos de alta eficiência com arquitetura baseada em microinversores, permitindo máxima captação independente por módulo e monitoramento módulo a módulo.',
    result: 'Redução de 92% na fatura mensal de energia elétrica e homologação rápida do parecer de acesso junto à concessionária.',
    tags: ['Fotovoltaica On-Grid', 'Microinversores', 'Homologação'],
    isDemonstrative: true
  },
  {
    id: 'case-04',
    title: 'Automação Completa de Iluminação e Cenários em Residência',
    category: 'automacao',
    categoryLabel: 'Automação Residencial',
    location: 'São Bernardo do Campo — SP',
    image: '/assets/aistudio/automa__o_residencial_7f61b5c4.jpg',
    challenge: 'Cliente desejava controle centralizado de mais de 24 circuitos de iluminação decorativa e áreas externas sem necessidade de quebra-quebra de alvenaria ou troca de tubulações existentes.',
    solution: 'Aplicação de módulos inteligentes microminiaturizados em caixas 4x2 existentes com protocolo Zigbee e Wi-Fi redundante, programação de cenários automatizados e integração com assistentes de voz.',
    result: 'Controle por comando de voz, acionamento remoto pelo smartphone e rotinas automáticas de iluminação ao entardecer e ao amanhecer.',
    tags: ['Casa Inteligente', 'Controle por Voz', 'Cenários Lumínicos'],
    isDemonstrative: true
  },
  {
    id: 'case-05',
    title: 'Cercamento Eletrônico com CFTV IP e Controle de Acesso Biométrico',
    category: 'seguranca',
    categoryLabel: 'Segurança & Acesso',
    location: 'Diadema — SP',
    image: '/assets/aistudio/cftv_e_seguran_a_eletrica_81fb2af7.jpg',
    challenge: 'Necessidade de monitoramento 24h dos perímetros de acesso e controle rigoroso de entrada de funcionários e prestadores de serviços em condomínio corporativo.',
    solution: 'Instalação de câmeras IP com inteligência analítica para detecção de humanos e veículos, infraestrutura com cabeamento estruturado Cat6 blindado e fechadura biométrica integrada na entrada principal.',
    result: 'Registro contínuo em NVR de alta definição com visualização em smartphone em tempo real e controle de acesso 100% sem chaves físicas.',
    tags: ['CFTV IP 4K', 'Biometria Digital', 'Acesso Remoto'],
    isDemonstrative: true
  }
];
