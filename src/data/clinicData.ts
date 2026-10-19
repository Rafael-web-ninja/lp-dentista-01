export interface TrustMetric {
  id: string;
  value: string;
  label: string;
  note: string;
}

export interface TreatmentItem {
  id: string;
  number: string;
  category: 'estetica' | 'reabilitacao' | 'ortodontia' | 'prevencao';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  sessionInfo: string;
  technologyUsed: string;
  whatsappText: string;
}

export interface DifferentialItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detailMetric: string;
  colSpan: 'wide' | 'normal';
  darkSurface?: boolean;
}

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  durationLabel: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  procedure: string;
  timeAgo: string;
  quote: string;
  rating: string;
  avatarInitials: string;
  avatarBg: string;
}

export interface StructureSpace {
  id: string;
  title: string;
  category: string;
  description: string;
  technicalSpec: string;
  illustrationType: 'lounge' | 'suite' | 'scanner' | 'sterilization';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const INITIAL_CLINIC_CONFIG = {
  clinicName: 'Sorria+',
  whatsappNumber: '5511999999999',
  whatsappDisplay: '(11) 99999-9999',
  addressLine: 'Av. Brigadeiro Faria Lima, 3477 — Conj. 82 · Itaim Bibi, São Paulo - SP',
  openingHours: 'Seg a Sex: 08h30 às 19h30 · Sáb: 09h00 às 14h00',
  technicalDirector: 'Dra. Carolina Vasconcelos',
  croNumber: 'CRO-SP 128.450',
  epaoNumber: 'EPAO 14.890',
  heroSubtitle: 'Seu sorriso merece o melhor.',
  heroDescription:
    'Odontologia estética, reabilitação oral e prevenção em uma experiência clínica desenhada para o seu conforto. Planejamento 100% digital para que você conheça cada etapa antes mesmo de iniciar.',
  heroReviewQuote:
    '"O atendimento da Sorria+ mudou minha relação com o dentista. Planejamento claro, ambiente acolhedor e cuidado em cada detalhe."',
  heroReviewerName: 'Mariana C. · Paciente de Reabilitação Estética',
  heroReviewNote: 'Avaliação demonstrativa (editável)',
};

export const INITIAL_TRUST_METRICS: TrustMetric[] = [
  {
    id: 'metric-1',
    value: '100% 3D',
    label: 'Planejamento Digital',
    note: 'Editável',
  },
  {
    id: 'metric-2',
    value: '5 Especialidades',
    label: 'Odontologia Integrada',
    note: 'Editável',
  },
  {
    id: 'metric-3',
    value: '4.9/5',
    label: 'Avaliação Demonstrativa',
    note: 'Editável',
  },
];

export const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: 'lentes-dentais',
    number: '01',
    category: 'estetica',
    categoryLabel: 'Estética Dental',
    title: 'Lentes Dentais em Cerâmica',
    subtitle: 'Harmonia de formato, cor e proporção com preservação da estrutura dental',
    description:
      'Laminados cerâmicos ultrafinos desenhados digitalmente conforme as linhas do seu rosto e sorriso. O processo inclui ensaio estético (Mock-up) para aprovação visual prévia.',
    highlights: [
      'Simulação estética (Test Drive do Sorriso) antes do procedimento',
      'Cerâmicas feldspáticas e dissilicato de lítio de alta translucidez',
      'Preparo minimamente invasivo guiado por microscopia óptica',
    ],
    sessionInfo: 'Planejamento personalizado em 2 a 4 sessões',
    technologyUsed: 'Scanner Intraoral 3D + Design Digital do Sorriso (DSD)',
    whatsappText: 'Olá! Gostaria de agendar uma avaliação na Sorria+ para saber mais sobre Lentes Dentais em Cerâmica.',
  },
  {
    id: 'clareamento',
    number: '02',
    category: 'estetica',
    categoryLabel: 'Estética Dental',
    title: 'Clareamento Dental Assistido',
    subtitle: 'Luminosidade natural com protocolos de controle de sensibilidade',
    description:
      'Protocolos personalizados em consultório, supervisionados em domicílio ou combinados, respeitando a biologia do esmalte dental e utilizando agentes dessensibilizantes de última geração.',
    highlights: [
      'Análise prévia de permeabilidade do esmalte e saúde gengival',
      'Protocolo de laserterapia integrado para conforto térmico',
      'Moldeiras ultramacias confeccionadas a partir de escaneamento 3D',
    ],
    sessionInfo: '1 a 3 sessões clínicas + acompanhamento individual',
    technologyUsed: 'Espectrofotometria Digital de Cor + Laser Terapêutico',
    whatsappText: 'Olá! Gostaria de agendar uma consulta na Sorria+ para avaliação de Clareamento Dental.',
  },
  {
    id: 'implantes',
    number: '03',
    category: 'reabilitacao',
    categoryLabel: 'Reabilitação Oral',
    title: 'Implantes Guiados sem Cortes',
    subtitle: 'Segurança mastigatória e recuperação ágil com cirurgia guiada por computador',
    description:
      'Reabilitação de ausências dentárias por meio de planejamento tomográfico tridimensional. O guia cirúrgico impresso em 3D permite posicionar o implante com precisão milimétrica e menor desconforto pós-operatório.',
    highlights: [
      'Cirurgia virtual prévia baseada em tomografia computadorizada',
      'Componentes protéticos de titânio e zircônia biocompatíveis',
      'Opção de sedação consciente acompanhada para pacientes ansiosos',
    ],
    sessionInfo: 'Planejamento cirúrgico digital + acompanhamento dedicado',
    technologyUsed: 'Guia Cirúrgico 3D + Implantes de Rápida Osseointegração',
    whatsappText: 'Olá! Gostaria de agendar uma avaliação na Sorria+ sobre Implantes Dentários Guiados.',
  },
  {
    id: 'ortodontia',
    number: '04',
    category: 'ortodontia',
    categoryLabel: 'Ortodontia Digital',
    title: 'Alinhadores Transparentes & Ortodontia',
    subtitle: 'Alinhamento dental discreto, confortável e sem bráquetes metálicos',
    description:
      'Movimentação ortodôntica planejada etapa por etapa em software 3D. Os alinhadores removíveis oferecem liberdade para se alimentar, higienizar os dentes com facilidade e manter a estética no dia a dia.',
    highlights: [
      'Visualização virtual da evolução do alinhamento desde a 1ª consulta',
      'Placas transparentes removíveis e personalizadas sob medida',
      'Consultas de acompanhamento rápidas e espaçadas',
    ],
    sessionInfo: 'Troca progressiva de alinhadores conforme indicação clínica',
    technologyUsed: 'Setup Ortodôntico 3D + Scanner Intraoral de Alta Velocidade',
    whatsappText: 'Olá! Gostaria de agendar uma avaliação na Sorria+ para Alinhadores Transparentes / Ortodontia.',
  },
  {
    id: 'prevencao',
    number: '05',
    category: 'prevencao',
    categoryLabel: 'Saúde & Prevenção',
    title: 'Prevenção & Profilaxia Guiada',
    subtitle: 'Manutenção periódica inteligente para longevidade da sua saúde bucal',
    description:
      'Check-up preventivo com câmera intraoral em alta definição, evidenciação de biofilme e profilaxia gentil com jato de eritritol aquecido — removendo manchas e tártaro sem agressão ao esmalte ou às restaurações.',
    highlights: [
      'Diagnóstico visual em tela para você acompanhar cada dente',
      'Limpeza ultrassônica suave com controle de temperatura da água',
      'Programa de retorno preventivo personalizado por perfil clínico',
    ],
    sessionInfo: 'Sessão completa de 50 a 60 minutos',
    technologyUsed: 'Câmera Intraoral HD + Ultrassom Piezoelétrico Aquecido',
    whatsappText: 'Olá! Gostaria de agendar meu Check-up Preventivo e Profilaxia na Sorria+.',
  },
];

export const DIFFERENTIALS_DATA: DifferentialItem[] = [
  {
    id: 'dif-1',
    number: '01',
    title: 'Planejamento Digital 3D sem Moldes de Massa',
    subtitle: 'Previsibilidade Clínica',
    description:
      'Substituímos as antigas moldagens desconfortáveis pelo escaneamento intraoral óptico. Em poucos minutos, criamos uma cópia digital fiel da sua arcada para planejar o tratamento com precisão micrométrica.',
    detailMetric: 'Escaneamento 100% Digital',
    colSpan: 'wide',
    darkSurface: true,
  },
  {
    id: 'dif-2',
    number: '02',
    title: 'Atendimento Humanizado e Tempo Exclusivo',
    subtitle: 'Escuta Atenta',
    description:
      'Sem pressa e sem salas de espera lotadas. Nossas agendas são desenhadas com intervalos amplos para que o profissional ouça sua história, compreenda suas expectativas e explique cada opção com clareza.',
    detailMetric: 'Horários Reservados',
    colSpan: 'normal',
    darkSurface: false,
  },
  {
    id: 'dif-3',
    number: '03',
    title: 'Conforto Sensorial e Odontologia sem Medo',
    subtitle: 'Bem-Estar em Cada Sessão',
    description:
      'Poltronas ergonômicas com massagem, fones com cancelamento de ruído, anestesia computadorizada de fluxo controlado e opção de sedação consciente para quem sente ansiedade.',
    detailMetric: 'Protocolo Anti-Estresse',
    colSpan: 'normal',
    darkSurface: false,
  },
  {
    id: 'dif-4',
    number: '04',
    title: 'Transparência Ética e Respeito Biológico',
    subtitle: 'Odontologia Baseada em Evidências',
    description:
      'Indicamos apenas o que é necessário para a sua saúde e autoestima. Todo plano de tratamento é entregue detalhado por escrito, com etapas claras, prazos realistas e foco na preservação do seu dente natural.',
    detailMetric: 'Ética & Conservação',
    colSpan: 'wide',
    darkSurface: false,
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Agendamento Simples pelo WhatsApp',
    subtitle: 'Sem burocracia ou espera telefônica',
    description:
      'Nossa concierge de atendimento entende sua necessidade inicial e encontra o melhor horário na sua rotina, enviando orientações práticas de chegada e estacionamento.',
    durationLabel: 'Resposta rápida em horário comercial',
  },
  {
    number: '02',
    title: 'Check-up Digital e Escaneamento 3D',
    subtitle: 'Diagnóstico visual transparente',
    description:
      'Na primeira consulta, realizamos fotografias clínicas, escaneamento intraoral 3D e avaliação completa. Você visualiza a condição real da sua saúde bucal em alta definição.',
    durationLabel: 'Consulta de 60 minutos dedicados a você',
  },
  {
    number: '03',
    title: 'Plano Personalizado e Início do Cuidado',
    subtitle: 'Cronograma adaptado ao seu ritmo',
    description:
      'Apresentamos as opções terapêuticas indicadas para o seu caso, valores transparentes e previsão de sessões. Com tudo aprovado por você, iniciamos as etapas com total conforto.',
    durationLabel: 'Planejamento entregue de forma clara',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'dep-1',
    patientName: 'Camila Vasconcelos [Exemplo]',
    procedure: 'Reabilitação Estética & Clareamento',
    timeAgo: 'Avaliação Demonstrativa',
    quote:
      'Sempre tive receio de procedimentos estéticos ficarem artificiais. Na Sorria+, o planejamento digital me permitiu testar o formato antes de finalizar. O atendimento é extremamente calmo e pontual.',
    rating: '5.0',
    avatarInitials: 'CV',
    avatarBg: '#FF791A',
  },
  {
    id: 'dep-2',
    patientName: 'Henrique Almeida [Exemplo]',
    procedure: 'Implante Guiado & Prevenção',
    timeAgo: 'Avaliação Demonstrativa',
    quote:
      'A tecnologia de escaneamento 3D sem aquela massa de moldagem faz toda a diferença. Desde a recepção até o pós-operatório pelo WhatsApp, me senti acompanhado com muita transparência.',
    rating: '5.0',
    avatarInitials: 'HA',
    avatarBg: '#101010',
  },
  {
    id: 'dep-3',
    patientName: 'Beatriz Nogueira [Exemplo]',
    procedure: 'Alinhadores Transparentes',
    timeAgo: 'Avaliação Demonstrativa',
    quote:
      'Trabalhar em reuniões presenciais exigia um tratamento discreto. O acompanhamento com alinhadores na clínica foi prático, organizado e sem surpresas no meio do caminho.',
    rating: '4.9',
    avatarInitials: 'BN',
    avatarBg: '#3F3F46',
  },
];

export const STRUCTURE_GALLERY: StructureSpace[] = [
  {
    id: 'space-lounge',
    title: 'Recepção & Lounge Sensorial',
    category: 'Hospitalidade',
    description:
      'Ambiente projetado com arquitetura biofílica, iluminação indireta aconchegante, café gourmet e aromaterapia suave para desacelerar sua rotina antes da consulta.',
    technicalSpec: 'Acústica isolada · Wi-Fi de alta velocidade · Café Nespresso',
    illustrationType: 'lounge',
  },
  {
    id: 'space-suite',
    title: 'Suítes Clínicas de Atendimento',
    category: 'Clínica Digital',
    description:
      'Consultórios amplos com luz natural difusa, cadeiras ergonômicas de couro macio, monitores de teto para entretenimento e microscopia operatória.',
    technicalSpec: 'Anestesia computadorizada · Monitores 4K · Ergonomia clínica',
    illustrationType: 'suite',
  },
  {
    id: 'space-scanner',
    title: 'Estúdio de Planejamento 3D & Fotografia',
    category: 'Tecnologia',
    description:
      'Espaço dedicado ao protocolo fotográfico facial e escaneamento intraoral em tempo real, onde cocriamos o projeto do seu sorriso com proporção áurea.',
    technicalSpec: 'Scanner Intraoral 3D · Estúdio Fotográfico Clínico · Software CAD',
    illustrationType: 'scanner',
  },
  {
    id: 'space-sterilization',
    title: 'Central de Biossegurança Hospitalar',
    category: 'Segurança',
    description:
      'Fluxo unidirecional de esterilização com autoclaves classe B a vácuo, lavadoras ultrassônicas e rastreabilidade individual de cada kit clínico por código.',
    technicalSpec: 'Padrão ANVISA rigoroso · Monitoramento biológico diário',
    illustrationType: 'sterilization',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Consultas & Agendamento',
    question: 'Como funciona a primeira consulta de avaliação na Sorria+?',
    answer:
      'Nossa primeira consulta tem duração média de 60 minutos. Nela, realizamos uma escuta detalhada das suas queixas e objetivos, exame clínico minucioso, fotografias intraorais e escaneamento digital quando indicado. Ao final, apresentamos um diagnóstico claro e um plano de tratamento personalizado, sem compromisso.',
  },
  {
    id: 'faq-2',
    category: 'Conforto & Tecnologia',
    question: 'Tenho receio ou sensibilidade em tratamentos odontológicos. Como a clínica lida com isso?',
    answer:
      'Compreendemos perfeitamente. Por isso, utilizamos protocolos de conforto que incluem aplicação prévia de anestésicos tópicos de alta potência, anestesia computadorizada (que controla o fluxo e evita a pressão dolorosa), laserterapia analgésica e, quando indicado, sedação consciente com óxido nitroso ou acompanhamento médico.',
  },
  {
    id: 'faq-3',
    category: 'Estética Dental',
    question: 'As lentes de contato dental exigem desgaste excessivo dos dentes?',
    answer:
      'Não. Na Sorria+, priorizamos a odontologia minimamente invasiva e aditiva. Todo caso passa por um planejamento digital 3D e um ensaio (Mock-up) sobre os dentes antes de qualquer intervenção, garantindo máxima preservação da estrutura natural do esmalte sempre que há indicação clínica.',
  },
  {
    id: 'faq-4',
    category: 'Convênios & Reembolso',
    question: 'A clínica atende planos odontológicos ou trabalha com reembolso?',
    answer:
      'Para garantir tempo exclusivo de agenda, materiais importados de primeira linha e atendimento personalizado sem pressa, nosso atendimento é particular. Entretanto, emitimos toda a documentação técnica, laudos, radiografias e notas fiscais necessárias para que você solicite o reembolso junto ao seu plano ou seguro de saúde.',
  },
  {
    id: 'faq-5',
    category: 'Pagamentos & Planejamento',
    question: 'Quais são as formas de pagamento disponíveis para os tratamentos?',
    answer:
      'Oferecemos condições flexíveis e transparentes de acordo com o cronograma do seu tratamento, incluindo parcelamento em cartão de crédito, PIX com condições diferenciadas ou pagamento programado por etapas clínicas.',
  },
];
