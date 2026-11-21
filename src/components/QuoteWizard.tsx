import React, { useState, useEffect } from 'react';
import { QuoteFormData } from '../types';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  ShieldCheck, 
  Upload, 
  CheckCircle2,
  Phone,
  Flame,
  FileCheck
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface QuoteWizardProps {
  initialService?: string;
  initialNeed?: string;
  onOpenPrivacyPolicy: () => void;
  onClose?: () => void;
}

export const QuoteWizard: React.FC<QuoteWizardProps> = ({
  initialService,
  initialNeed,
  onOpenPrivacyPolicy,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    service: initialService || '',
    need: initialNeed || '',
    propertyType: 'Residencial',
    city: 'São Bernardo do Campo',
    neighborhood: '',
    urgency: 'Programado',
    description: '',
    name: '',
    phone: '',
    email: '',
    acceptedTerms: true,
    photoName: ''
  });

  const [validationError, setValidationError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  // Sync initial props
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
    if (initialNeed) {
      setFormData(prev => ({ ...prev, need: initialNeed }));
    }
  }, [initialService, initialNeed]);

  const serviceOptions = [
    { label: 'Instalação elétrica', desc: 'Quadros novos, circuitos e infraestrutura' },
    { label: 'Manutenção elétrica', desc: 'Correção de falhas, disjuntores e fiação' },
    { label: 'Energia solar', desc: 'Projetos fotovoltaicos e redução de fatura' },
    { label: 'Automação residencial', desc: 'Iluminação touch, voz e controle por app' },
    { label: 'CFTV e segurança eletrônica', desc: 'Câmeras IP, gravação e vigilância' },
    { label: 'Fechadura eletrônica', desc: 'Instalação biométrica e senhas digitais' },
    { label: 'Emergência elétrica', desc: 'Sobrecargas, cheiro de queimado ou curto' },
    { label: 'Outro serviço', desc: 'Consulta técnica personalizada' },
  ];

  const getNeedOptions = (service: string) => {
    if (service.includes('Manutenção') || service.includes('Emergência')) {
      return [
        'Disjuntor desarmando com frequência',
        'Tomada ou interruptor aquecendo ou com defeito',
        'Oscilação constante de energia e luzes piscando',
        'Cheiro de queimado ou estalos em conduítes',
        'Falha geral ou parcial na instalação',
        'Fiação antiga precisando de revisão técnica',
        'Outro problema'
      ];
    }
    if (service.includes('Instalação')) {
      return [
        'Instalação elétrica nova (construção)',
        'Reforma elétrica geral (imóvel antigo)',
        'Ampliação de circuitos e novo quadro de força',
        'Instalação de equipamentos (chuveiro, forno, ar-condicionado)',
        'Troca de padrão de entrada ou aumento de carga',
        'Outro'
      ];
    }
    if (service.includes('Solar')) {
      return [
        'Estudo de viabilidade e projeto novo',
        'Redução de conta de luz alta',
        'Homologação junto à concessionária',
        'Manutenção ou ampliação de sistema existente',
        'Outro'
      ];
    }
    if (service.includes('Automação')) {
      return [
        'Iluminação inteligente por aplicativo e voz',
        'Interruptores touch de vidro e tomadas inteligentes',
        'Automação de climatização e cenários de ambiente',
        'Projeto completo de automação residencial',
        'Outro'
      ];
    }
    if (service.includes('CFTV')) {
      return [
        'Instalação de sistema novo de câmeras IP / Full HD',
        'Configuração de acesso remoto ao vivo no celular',
        'Manutenção ou substituição de DVR / NVR',
        'Proteção perimetral e gravação contínua',
        'Outro'
      ];
    }
    if (service.includes('Fechadura')) {
      return [
        'Instalação de fechadura digital biométrica',
        'Fechadura para porta de entrada de madeira / pivotante',
        'Fechadura para consultório ou sala comercial',
        'Fechadura com controle por senha e tag RFID',
        'Outro'
      ];
    }
    return [
      'Orçamento para serviço elétrico específico',
      'Avaliação e diagnóstico técnico',
      'Projeto sob medida',
      'Outro'
    ];
  };

  const handleNext = () => {
    setValidationError('');

    if (currentStep === 1 && !formData.service) {
      setValidationError('Por favor, selecione qual serviço você precisa.');
      return;
    }
    if (currentStep === 2 && !formData.need) {
      setValidationError('Por favor, indique a necessidade principal.');
      return;
    }
    if (currentStep === 3) {
      if (!formData.city.trim()) {
        setValidationError('Informe a cidade onde o serviço será realizado.');
        return;
      }
      if (!formData.neighborhood.trim()) {
        setValidationError('Informe o bairro para verificação de rota.');
        return;
      }
    }
    if (currentStep === 4 && !formData.urgency) {
      setValidationError('Selecione o nível de urgência do seu atendimento.');
      return;
    }
    if (currentStep === 5 && !formData.description.trim()) {
      setValidationError('Descreva brevemente o que está acontecendo ou o que precisa ser feito.');
      return;
    }
    if (currentStep === 6) {
      if (!formData.name.trim()) {
        setValidationError('Por favor, informe seu nome.');
        return;
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 9) {
        setValidationError('Por favor, informe um número de WhatsApp válido com DDD.');
        return;
      }
      if (!formData.acceptedTerms) {
        setValidationError('É necessário concordar com os termos para envio dos dados.');
        return;
      }
    }

    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const handleBack = () => {
    setValidationError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Dispatch quote to WhatsApp & Backend
  const handleSubmitToWhatsApp = async () => {
    setIsSubmitting(true);
    setValidationError('');

    try {
      // 1. Send asynchronously to backend database for administrative records
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          need: formData.need,
          propertyType: formData.propertyType,
          city: formData.city,
          neighborhood: formData.neighborhood,
          urgency: formData.urgency,
          description: formData.description,
          source: 'whatsapp_wizard'
        })
      });
    } catch (e) {
      console.warn('Backend save notice (proceeding to WhatsApp):', e);
    }

    // 2. Build structured WhatsApp message strictly conforming to prompt format
    const message = 
`Olá! Gostaria de solicitar um orçamento com a J'ENERGY.

*INFORMAÇÕES DO CLIENTE*

Nome: ${formData.name}
WhatsApp: ${formData.phone}
${formData.email ? `E-mail: ${formData.email}\n` : ''}
*SERVIÇO SOLICITADO*

Serviço: ${formData.service}
Necessidade: ${formData.need}
Tipo de imóvel: ${formData.propertyType}

*LOCALIZAÇÃO*

Cidade: ${formData.city}
Bairro: ${formData.neighborhood}

*URGÊNCIA*

${formData.urgency}

*DESCRIÇÃO*

${formData.description}
${formData.photoName ? `(Possuo foto do local/painel: ${formData.photoName})\n` : ''}
Aguardo retorno para receber orientações e informações sobre o orçamento. Obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511981511548?text=${encodedMessage}`;

    // Open WhatsApp link (supports native mobile app + WhatsApp Web on desktop)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setSubmittedSuccessfully(true);
  };

  const handlePhotoUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, photoName: `${file.name} (${(file.size / 1024).toFixed(0)} KB)` }));
    }
  };

  return (
    <section id="orcamento" className="py-20 bg-[#080F1C] bg-circuit-grid relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Wizard Card */}
        <div className="rounded-2xl bg-[#101D32] border border-[#173B60] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Wizard Header */}
          <div className="p-6 sm:p-8 border-b border-[#173B60] bg-[#0d1728]">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs font-mono font-bold text-[#FFD21C] uppercase tracking-wider">
                Orçamento Inteligente J&apos;ENERGY
              </span>
              <span className="text-xs font-mono text-[#A7B2C2]">
                Etapa {currentStep} de 7
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA] tracking-tight">
              VAMOS RESOLVER SEU PROBLEMA ELÉTRICO?
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B2C2] mt-1.5">
              Conte um pouco sobre sua necessidade. Nossa equipe receberá as informações organizadas para entender exatamente como ajudar.
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-[#173B60]/50 h-1.5 rounded-full mt-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#39BDF5] to-[#FFD21C] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              />
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="mx-6 sm:mx-8 mt-6 p-3 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center gap-2.5 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Wizard Content Body */}
          <div className="p-6 sm:p-8">

            {/* Success Celebration Screen */}
            {submittedSuccessfully ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FFD21C]/10 border border-[#FFD21C] flex items-center justify-center text-[#FFD21C]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-[#F5F7FA] mb-2">
                    Solicitação Aberta com Sucesso!
                  </h3>
                  <p className="text-sm text-[#A7B2C2] leading-relaxed mb-6">
                    A janela do seu WhatsApp foi iniciada com a mensagem pronta. 
                    <br />
                    <strong className="text-[#FFD21C]">Basta clicar no botão de enviar</strong> dentro do seu WhatsApp para iniciar a conversa com a equipe J&apos;ENERGY.
                  </p>

                  <div className="p-4 rounded-xl bg-[#080F1C] border border-[#173B60] text-left text-xs text-[#A7B2C2] space-y-1 mb-6">
                    <div className="flex justify-between">
                      <span>Destino:</span>
                      <span className="font-mono text-[#F5F7FA] font-semibold">(11) 98151-1548</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Serviço:</span>
                      <span className="text-[#F5F7FA] font-medium">{formData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Localização:</span>
                      <span className="text-[#F5F7FA] font-medium">{formData.neighborhood}, {formData.city}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmittedSuccessfully(false);
                      setCurrentStep(1);
                    }}
                    className="px-6 py-2.5 text-xs font-semibold text-[#A7B2C2] hover:text-[#F5F7FA] transition-colors cursor-pointer"
                  >
                    Fazer uma nova solicitação
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* ETAPA 1 — QUAL SERVIÇO VOCÊ PRECISA? */}
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F7FA] mb-1">
                      1. Qual serviço você precisa?
                    </h3>
                    <p className="text-xs text-[#A7B2C2] mb-6">
                      Escolha a área principal para direcionarmos o especialista certo.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceOptions.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: opt.label, need: '' })}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                            formData.service === opt.label
                              ? 'bg-[#173B60]/70 border-[#FFD21C] shadow-[0_0_15px_rgba(255,210,28,0.2)]'
                              : 'bg-[#080F1C]/70 border-[#173B60] hover:border-[#39BDF5]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-[#F5F7FA]">
                              {opt.label}
                            </span>
                            {formData.service === opt.label && (
                              <Check className="w-4 h-4 text-[#FFD21C]" />
                            )}
                          </div>
                          <span className="text-xs text-[#A7B2C2]">
                            {opt.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ETAPA 2 — QUAL É A SUA NECESSIDADE? */}
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F7FA] mb-1">
                      2. Qual é a sua necessidade específica?
                    </h3>
                    <p className="text-xs text-[#A7B2C2] mb-6">
                      Opções contextuais para <strong className="text-[#39BDF5]">{formData.service}</strong>:
                    </p>

                    <div className="space-y-2.5">
                      {getNeedOptions(formData.service).map((needOpt) => (
                        <button
                          key={needOpt}
                          type="button"
                          onClick={() => setFormData({ ...formData, need: needOpt })}
                          className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                            formData.need === needOpt
                              ? 'bg-[#173B60]/70 border-[#FFD21C]'
                              : 'bg-[#080F1C]/70 border-[#173B60] hover:border-[#39BDF5]/50'
                          }`}
                        >
                          <span className="text-sm text-[#F5F7FA] font-medium">
                            {needOpt}
                          </span>
                          {formData.need === needOpt && (
                            <Check className="w-4 h-4 text-[#FFD21C]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ETAPA 3 — ONDE SERÁ REALIZADO O SERVIÇO? */}
                {currentStep === 3 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F7FA] mb-1">
                      3. Onde será realizado o serviço?
                    </h3>
                    <p className="text-xs text-[#A7B2C2] mb-6">
                      Atendimento especializado em São Bernardo do Campo e região.
                    </p>

                    <div className="space-y-4">
                      {/* Tipo de Imóvel */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-2">
                          Tipo de Imóvel *
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {(['Residencial', 'Comercial', 'Industrial'] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, propertyType: type })}
                              className={`py-3 text-center rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                formData.propertyType === type
                                  ? 'bg-[#173B60] border-[#FFD21C] text-[#FFD21C]'
                                  : 'bg-[#080F1C] border-[#173B60] text-[#A7B2C2] hover:text-[#F5F7FA]'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Cidade */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1.5">
                          Cidade *
                        </label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#080F1C] border border-[#173B60] text-[#F5F7FA] focus:outline-none focus:border-[#39BDF5] text-sm"
                        >
                          <option value="São Bernardo do Campo">São Bernardo do Campo — SP</option>
                          <option value="Santo André">Santo André — SP</option>
                          <option value="São Caetano do Sul">São Caetano do Sul — SP</option>
                          <option value="Diadema">Diadema — SP</option>
                          <option value="Mauá">Mauá — SP</option>
                          <option value="São Paulo (Capital)">São Paulo (Capital) — SP</option>
                          <option value="Outra cidade do ABC/SP">Outra cidade da região</option>
                        </select>
                      </div>

                      {/* Bairro */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1.5">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Rudge Ramos, Baeta Neves, Centro, Pauliceia, etc."
                          value={formData.neighborhood}
                          onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#080F1C] border border-[#173B60] text-[#F5F7FA] placeholder-[#5a6a80] focus:outline-none focus:border-[#39BDF5] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ETAPA 4 — QUAL É A URGÊNCIA? */}
                {currentStep === 4 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F7FA] mb-1">
                      4. Qual é o nível de urgência?
                    </h3>
                    <p className="text-xs text-[#A7B2C2] mb-6">
                      Ajuda a definir a prioridade na nossa rota de atendimento.
                    </p>

                    <div className="space-y-3">
                      {[
                        {
                          id: 'Emergência',
                          title: 'Emergência',
                          desc: 'Preciso de orientação/atendimento o quanto antes (risco elétrico ou falta total de energia)',
                          isAlert: true
                        },
                        {
                          id: 'Urgente',
                          title: 'Urgente',
                          desc: 'Preciso resolver em breve (nos próximos 1 a 2 dias)',
                          isAlert: false
                        },
                        {
                          id: 'Programado',
                          title: 'Programado',
                          desc: 'Desejo agendar um serviço ou obra com data prevista',
                          isAlert: false
                        },
                        {
                          id: 'Orçamento',
                          title: 'Orçamento',
                          desc: 'Estou pesquisando valores e soluções técnicas',
                          isAlert: false
                        }
                      ].map((urg) => (
                        <button
                          key={urg.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: urg.id as any })}
                          className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                            formData.urgency === urg.id
                              ? urg.isAlert 
                                ? 'bg-amber-950/40 border-[#FFD21C] shadow-[0_0_20px_rgba(255,210,28,0.25)]'
                                : 'bg-[#173B60]/70 border-[#39BDF5]'
                              : 'bg-[#080F1C]/70 border-[#173B60] hover:border-[#39BDF5]/50'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {urg.isAlert && <Flame className="w-4 h-4 text-[#FFD21C]" />}
                              <span className="text-sm font-bold text-[#F5F7FA]">
                                {urg.title}
                              </span>
                            </div>
                            <span className="text-xs text-[#A7B2C2]">
                              {urg.desc}
                            </span>
                          </div>
                          {formData.urgency === urg.id && (
                            <Check className="w-5 h-5 text-[#FFD21C] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Special Emergency Notice */}
                    {formData.urgency === 'Emergência' && (
                      <div className="mt-5 p-4 rounded-xl bg-amber-950/50 border border-[#FFD21C]/50 flex items-start gap-3">
                        <Flame className="w-5 h-5 text-[#FFD21C] shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-100">
                          <strong className="text-[#FFD21C] block font-semibold mb-0.5">Aviso de Emergência:</strong>
                          Recomendamos finalizar o formulário para enviar a mensagem formatada ou ligar diretamente para <strong className="text-white">(11) 98151-1548</strong> para confirmar disponibilidade imediata da equipe técnica.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ETAPA 5 — DESCREVA O PROBLEMA */}
                {currentStep === 5 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F7FA] mb-1">
                      5. Conte com mais detalhes
                    </h3>
                    <p className="text-xs text-[#A7B2C2] mb-6">
                      O que está acontecendo ou o que você precisa que seja instalado?
                    </p>

                    <div className="space-y-4">
                      <textarea
                        rows={5}
                        placeholder="Ex: Preciso trocar o disjuntor principal que está desarmando quando ligo o chuveiro, ou gostaria de cotar a instalação de 8 câmeras no galpão..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#080F1C] border border-[#173B60] text-[#F5F7FA] placeholder-[#5a6a80] focus:outline-none focus:border-[#39BDF5] text-sm"
                      />

                      {/* Optional Photo Attachment */}
                      <div className="p-4 rounded-xl bg-[#080F1C] border border-dashed border-[#173B60] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#101D32] border border-[#173B60] flex items-center justify-center text-[#39BDF5]">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#F5F7FA] block">
                              Anexar foto do local ou painel (opcional)
                            </span>
                            <span className="text-[11px] text-[#A7B2C2]">
                              {formData.photoName ? `Arquivo: ${formData.photoName}` : 'Tire uma foto do disjuntor, tomada ou local'}
                            </span>
                          </div>
                        </div>

                        <label className="px-4 py-2 text-xs font-medium text-[#39BDF5] bg-[#173B60]/40 hover:bg-[#173B60] border border-[#39BDF5]/30 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                          <span>{formData.photoName ? 'Alterar Foto' : 'Selecionar Foto'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUploadSim}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ETAPA 6 — SEUS DADOS */}
                {currentStep === 6 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F7FA] mb-1">
                      6. Seus dados de contato
                    </h3>
                    <p className="text-xs text-[#A7B2C2] mb-6">
                      Informações para o responsável técnico responder com o orçamento.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1.5">
                          Seu Nome Completo *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Carlos Eduardo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#080F1C] border border-[#173B60] text-[#F5F7FA] placeholder-[#5a6a80] focus:outline-none focus:border-[#39BDF5] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1.5">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="tel"
                          placeholder="Ex: (11) 98765-4321"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#080F1C] border border-[#173B60] text-[#F5F7FA] placeholder-[#5a6a80] focus:outline-none focus:border-[#39BDF5] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A7B2C2] mb-1.5">
                          E-mail (opcional)
                        </label>
                        <input
                          type="email"
                          placeholder="Ex: contato@exemplo.com.br"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#080F1C] border border-[#173B60] text-[#F5F7FA] placeholder-[#5a6a80] focus:outline-none focus:border-[#39BDF5] text-sm"
                        />
                      </div>

                      {/* LGPD Consent Checkbox */}
                      <label className="flex items-start gap-3 pt-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.acceptedTerms}
                          onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                          className="mt-1 w-4 h-4 rounded text-[#FFD21C] focus:ring-[#FFD21C] border-[#173B60] bg-[#080F1C]"
                        />
                        <span className="text-xs text-[#A7B2C2] leading-relaxed">
                          Concordo com o tratamento dos dados informados para finalidade exclusiva de contato e orçamento técnico da J&apos;ENERGY, conforme a nossa{' '}
                          <button
                            type="button"
                            onClick={onOpenPrivacyPolicy}
                            className="text-[#39BDF5] underline hover:text-[#FFD21C]"
                          >
                            Política de Privacidade (LGPD)
                          </button>.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* ETAPA 7 — RESUMO FINAL E ENVIO PARA O WHATSAPP */}
                {currentStep === 7 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#39BDF5] mb-2">
                      <FileCheck className="w-4 h-4 text-[#39BDF5]" />
                      <span>Confirmação dos Dados</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#F5F7FA] mb-4">
                      Resumo da sua solicitação
                    </h3>

                    {/* Visual Card Summary */}
                    <div className="p-5 rounded-xl bg-[#080F1C] border border-[#173B60] space-y-3 mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[#A7B2C2] block">Cliente:</span>
                          <strong className="text-[#F5F7FA] font-medium">{formData.name}</strong>
                        </div>
                        <div>
                          <span className="text-[#A7B2C2] block">WhatsApp:</span>
                          <strong className="text-[#FFD21C] font-mono">{formData.phone}</strong>
                        </div>
                        <div>
                          <span className="text-[#A7B2C2] block">Serviço:</span>
                          <strong className="text-[#F5F7FA] font-medium">{formData.service}</strong>
                        </div>
                        <div>
                          <span className="text-[#A7B2C2] block">Necessidade:</span>
                          <strong className="text-[#F5F7FA] font-medium">{formData.need}</strong>
                        </div>
                        <div>
                          <span className="text-[#A7B2C2] block">Local & Tipo:</span>
                          <span className="text-[#F5F7FA]">{formData.neighborhood}, {formData.city} ({formData.propertyType})</span>
                        </div>
                        <div>
                          <span className="text-[#A7B2C2] block">Urgência:</span>
                          <span className="text-[#39BDF5] font-semibold">{formData.urgency}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#173B60]/40 text-xs">
                        <span className="text-[#A7B2C2] block mb-1">Descrição:</span>
                        <p className="text-[#F5F7FA] italic bg-[#101D32] p-3 rounded-lg border border-[#173B60]/60">
                          &ldquo;{formData.description}&rdquo;
                        </p>
                      </div>

                      {formData.photoName && (
                        <div className="text-[11px] text-[#39BDF5]">
                          Anexo indicado: {formData.photoName}
                        </div>
                      )}
                    </div>

                    {/* How it Works notice */}
                    <div className="p-3.5 rounded-lg bg-[#101D32] border border-[#39BDF5]/30 text-xs text-[#A7B2C2] mb-6">
                      Ao clicar no botão abaixo, o WhatsApp abrirá com todas essas informações já digitadas no número comercial da <strong>J&apos;ENERGY (55 11 98151-1548)</strong>. Você só precisará apertar enviar no próprio aplicativo.
                    </div>

                    {/* Master Submit Button */}
                    <button
                      onClick={handleSubmitToWhatsApp}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-xl shadow-[0_0_30px_rgba(255,210,28,0.4)] transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-5 h-5 text-[#080F1C] fill-[#080F1C]" />
                      <span>{isSubmitting ? 'Preparando...' : 'Enviar Solicitação pelo WhatsApp'}</span>
                    </button>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 pt-6 border-t border-[#173B60]/50 flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#A7B2C2] hover:text-[#F5F7FA] bg-[#080F1C] border border-[#173B60] rounded-lg transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Voltar</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 7 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      <span>Avançar</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
