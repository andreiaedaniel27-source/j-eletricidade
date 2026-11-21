import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'instalacoes-eletricas',
    number: '01',
    title: 'Instalações Elétricas',
    shortDescription: 'Instalações elétricas completas para ambientes residenciais, comerciais e industriais com conformidade técnica rigorosa.',
    fullDescription: 'Projetos e execuções de instalações elétricas de baixa e média tensão. Montagem e organização de quadros de distribuição, cabeamento estruturado, circuitos de força e iluminação, atendendo estritamente às normas de segurança NBR 5410 e diretrizes das concessionárias.',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-07_at_15.49.21_a5936743.jpeg',
    badge: 'Residencial · Comercial · Industrial',
    applications: [
      'Quadros de distribuição de circuitos (QDC e QGBT)',
      'Infraestrutura para novas construções e reformas elétricas',
      'Circuitos dedicados para equipamentos de alta potência',
      'Padrão de entrada e aumento de carga técnica',
      'Distribuição em eletrocalhas, perfilados e conduítes'
    ],
    benefits: [
      'Dimensionamento correto sem riscos de sobrecarga',
      'Prevenção contra quedas de disjuntores e curtos-circuitos',
      'Economia de energia com condutores adequados',
      'Execução alinhada às normas técnicas de segurança'
    ],
    features: [
      'Dimensionamento técnico de condutores',
      'Dispositivos de proteção DR e DPS',
      'Aterramento e equipotencialização',
      'Identificação e anilhamento de circuitos'
    ],
    norma: 'Conforme Norma NBR 5410'
  },
  {
    id: 'manutencao-eletrica',
    number: '02',
    title: 'Manutenção Elétrica',
    shortDescription: 'Manutenção preventiva e corretiva para garantir a continuidade operacional, eficiência e proteção de vidas e patrimônios.',
    fullDescription: 'Diagnóstico avançado de falhas em sistemas elétricos, reaperto de conexões em quadros, identificação de sobreaquecimento por termografia, substituição de disjuntores danificados e correção de circuitos instáveis antes que causem paradas ou acidentes graves.',
    image: '/assets/aistudio/manuten__o_eletrica_99f219e3.jpg',
    badge: 'Preventiva · Preditiva · Corretiva',
    applications: [
      'Revisão e manutenção de quadros de comando e força',
      'Correção de disjuntores desarmando frequentemente',
      'Substituição de fiação aquecida, ressecada ou avariada',
      'Identificação de fugas de corrente e oscilações de tensão',
      'Balanceamento de fases para redução de perdas'
    ],
    benefits: [
      'Evita paradas inesperadas em comércios e residências',
      'Diminui drasticamente o risco de incêndios elétricos',
      'Prolonga a vida útil de eletrodomésticos e maquinários',
      'Reduz desperdício na fatura mensal de energia'
    ],
    features: [
      'Inspeção detalhada de barramentos',
      'Medições de isolamento e continuidade',
      'Teste de disparo de diferenciais residuais (DR)',
      'Relatório de não conformidades encontradas'
    ],
    norma: 'Inspeção com Instrumentos Calibrados'
  },
  {
    id: 'energia-solar',
    number: '03',
    title: 'Energia Solar',
    shortDescription: 'Soluções de energia solar fotovoltaica com foco em economia sustentável, redução de custos e valorização do imóvel.',
    fullDescription: 'Implantação completa de sistemas solares conectados à rede (On-Grid). Dimensionamento preciso da potência conforme o consumo médio, instalação segura de módulos monocristalinos e inversores de alta eficiência, além de acompanhamento técnico do processo junto à concessionária de energia.',
    image: '/assets/aistudio/energia_solar_05182216.jpg',
    badge: 'Fotovoltaica · Economia até 95%',
    applications: [
      'Telhados residenciais de diferentes estruturas',
      'Galpões industriais e comércios de médio porte',
      'Condomínios residenciais e áreas comuns',
      'Sistemas com inversores de alta eficiência ou microinversores'
    ],
    benefits: [
      'Redução de até 95% na conta de energia elétrica',
      'Proteção contra aumentos e bandeiras tarifárias',
      'Energia limpa, renovável e de baixíssima manutenção',
      'Valorização imediata do imóvel comercial ou residencial'
    ],
    features: [
      'Estudo de viabilidade e sombreamento',
      'Fixação com proteções contra intempéries',
      'String boxes com proteção CC/CA completa',
      'Monitoramento em tempo real por aplicativo'
    ],
    norma: 'Homologação Técnica Concessionária'
  },
  {
    id: 'automacao-residencial',
    number: '04',
    title: 'Automação Residencial',
    shortDescription: 'Soluções para praticidade, conforto, controle inteligente de ambientes e eficiência energética na palma da mão.',
    fullDescription: 'Integração tecnológica de iluminação, climatização, persianas e circuitos de tomada. Criação de cenários personalizados (cinema, trabalho, recepção, ausência) com controle por smartphone, interruptores touch inteligentes ou comandos por assistentes de voz.',
    image: '/assets/aistudio/automa__o_residencial_7f61b5c4.jpg',
    badge: 'Casa Inteligente · Conforto · Controle',
    applications: [
      'Módulos inteligentes embutidos em caixas 4x2 e 4x4',
      'Controle por assistentes de voz (Alexa, Google Assistant)',
      'Criação de rotinas programadas por horário ou presença',
      'Dimerização precisa de circuitos luminotécnicos'
    ],
    benefits: [
      'Controle total da residência mesmo à distância',
      'Maior conforto e sofisticação no dia a dia',
      'Desligamento automático de luzes para economizar',
      'Simulação de presença para reforçar a segurança'
    ],
    features: [
      'Compatibilidade com redes Wi-Fi e Zigbee',
      'Interruptores touch com acabamento de vidro',
      'Cenários customizados por ambiente',
      'Configuração simplificada em aplicativo'
    ],
    norma: 'Protocolos Seguros e Criptografados'
  },
  {
    id: 'cftv-seguranca',
    number: '05',
    title: 'CFTV e Segurança Eletrônica',
    shortDescription: 'Sistemas de monitoramento e vigilância com câmeras de alta definição e acesso remoto em tempo real.',
    fullDescription: 'Instalação e configuração de infraestrutura de CFTV IP e HD, com posicionamento estratégico das câmeras para cobertura perimetral de residências, garagens, estoques e portarias. Configuração de gravadores (NVR/DVR), nobreaks e aplicativo móvel para visualização ao vivo com notificações de movimento.',
    image: '/assets/aistudio/cftv_e_seguran_a_eletrica_81fb2af7.jpg',
    badge: 'Vigilância IP · Alta Definição · Acesso Remoto',
    applications: [
      'Monitoramento perimetral de residências e comércios',
      'Visualização de portões, garagens e acessos principais',
      'Gravação contínua com detecção inteligente de pessoas',
      'Sistemas para condomínios e galpões'
    ],
    benefits: [
      'Visualização em tempo real de qualquer lugar pelo celular',
      'Dissuasão comprovada contra tentativas de invasão',
      'Registro seguro de imagens com infravermelho noturno',
      'Tranquilidade e proteção para a família e negócios'
    ],
    features: [
      'Câmeras com visão noturna e resolução Full HD / 4K',
      'Cabeamento blindado e fontes chaveadas protegidas',
      'Gravação em disco rígido para segurança contínua',
      'Configuração de alertas e zonas de invasão'
    ],
    norma: 'Armazenamento Protegido e Nobreak'
  },
  {
    id: 'fechadura-eletronica',
    number: '06',
    title: 'Fechadura Eletrônica',
    shortDescription: 'Instalação de fechaduras digitais para maior praticidade, sofisticação e controle moderno de acesso sem chaves.',
    fullDescription: 'Substituição e instalação precisa de fechaduras eletrônicas digitais em portas de madeira, pivotantes, alumínio ou ferro. Configuração de senhas numéricas, biometria digital por impressão digital, cartões/tags RFID, senhas temporárias para prestadores de serviço e integração com aplicativos móveis.',
    image: '/assets/aistudio/fechadura_eletronica_d84464c6.jpeg',
    badge: 'Biometria · Senha · Tags RFID · Sem Chaves',
    applications: [
      'Portas de entrada residenciais e apartamentos',
      'Salas comerciais, consultórios e escritórios privados',
      'Imóveis de locação por temporada (Airbnb / temporário)',
      'Portas pivotantes e modelos de embutir ou sobrepor'
    ],
    benefits: [
      'Eliminação definitiva do transtorno de esquecer ou perder chaves',
      'Travamento automático da porta após fechar',
      'Senhas temporárias com validade programável para visitas',
      'Design moderno que valoriza a entrada do seu imóvel'
    ],
    features: [
      'Sensor de biometria ultrarrápido',
      'Alarme antiarrombamento e aviso de bateria fraca',
      'Teclado touch iluminado anti-marcas de digitação',
      'Chave mecânica de emergência e entrada USB de contingência'
    ],
    norma: 'Instalação com Fresagem e Gabarito Preciso'
  }
];
