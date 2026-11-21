import React from 'react';
import { 
  AlertTriangle, 
  Flame, 
  ZapOff, 
  Activity, 
  HelpCircle, 
  ShieldAlert, 
  Clock, 
  ArrowRight,
  Gauge
} from 'lucide-react';

interface UrgencySectionProps {
  onReportProblem: (problemContext?: string) => void;
}

export const UrgencySection: React.FC<UrgencySectionProps> = ({ onReportProblem }) => {
  const warningSigns = [
    {
      id: 'disjuntor',
      icon: Gauge,
      title: 'Disjuntores desarmando com frequência',
      description: 'Indica sobrecarga no circuito, disjuntor fadigado ou princípio de curto-circuito. Trocar por um disjuntor maior sem redimensionar fios gera perigo extremo.',
      tag: 'Risco de Sobrecarga'
    },
    {
      id: 'aquecimento',
      icon: Flame,
      title: 'Tomadas ou espelhos aquecendo ao toque',
      description: 'Mau contato nos bornes de conexão ou cabos subdimensionados. O efeito Joule provoca elevação térmica e fusão plástica dos isolamentos.',
      tag: 'Efeito Joule'
    },
    {
      id: 'oscilacao',
      icon: Activity,
      title: 'Oscilações de energia e luzes piscando',
      description: 'Flutuação de tensão decorrente de conexões frouxas no neutro ou desbalanceamento entre fases, podendo queimar placas eletrônicas caras.',
      tag: 'Instabilidade de Tensão'
    },
    {
      id: 'cheiro',
      icon: AlertTriangle,
      title: 'Cheiro de plástico queimado ou estalos',
      description: 'Sinal crítico de arco elétrico oculto dentro de conduítes ou caixas de passagem. Exige desenergização cautelar e vistoria imediata.',
      tag: 'Alerta Crítico'
    },
    {
      id: 'fiacao',
      icon: ZapOff,
      title: 'Fiação antiga, ressecada ou sem aterramento',
      description: 'Cabos rígidos antigos ou isolação ressecada perdem a capacidade dielétrica, expondo pessoas a choques perigosos sem desarme.',
      tag: 'Norma NBR 5410'
    },
    {
      id: 'equipamentos',
      icon: HelpCircle,
      title: 'Falhas repentinas em eletrodomésticos',
      description: 'Queima de motores de geladeiras, bombas ou TVs provocada por surtos atmosféricos ou ausência de Dispositivos de Proteção contra Surtos (DPS).',
      tag: 'Proteção contra Surtos'
    },
    {
      id: 'manutencao',
      icon: Clock,
      title: 'Instalações há anos sem manutenção preventiva',
      description: 'Conexões elétricas sofrem dilatação térmica natural ao longo dos anos, necessitando de reaperto e inspeção preventiva periódica.',
      tag: 'Preventiva Necessária'
    }
  ];

  return (
    <section id="emergencias" className="py-20 bg-[#080F1C] border-y border-[#173B60]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFD21C] mb-3">
            <ShieldAlert className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">Segurança e Diagnóstico Preventivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight mb-4 [text-wrap:balance]">
            UM PROBLEMA ELÉTRICO NÃO DEVE SER IGNORADO.
          </h2>
          <p className="text-base text-[#A7B2C2] leading-relaxed">
            Pequenos sinais visuais ou auditivos frequentemente precedem falhas graves e acidentes com potencial destrutivo. 
            Identificar e corrigir anomalias elétricas com profissionais qualificados evita danos aos equipamentos e garante a integridade da sua família e do seu patrimônio.
          </p>
        </div>

        {/* Warning Situations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {warningSigns.map((sign) => {
            const Icon = sign.icon;
            return (
              <div
                key={sign.id}
                onClick={() => onReportProblem(sign.title)}
                className="group p-6 rounded-xl bg-[#101D32]/80 hover:bg-[#101D32] border border-[#173B60] hover:border-[#FFD21C]/50 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#080F1C] border border-[#173B60] flex items-center justify-center text-[#FFD21C] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#39BDF5] bg-[#39BDF5]/10 px-2 py-0.5 rounded border border-[#39BDF5]/20">
                      {sign.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#F5F7FA] group-hover:text-[#FFD21C] transition-colors mb-2 leading-snug">
                    {sign.title}
                  </h3>

                  <p className="text-xs text-[#A7B2C2] leading-relaxed">
                    {sign.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#173B60]/40 flex items-center justify-between text-xs text-[#39BDF5] font-medium group-hover:text-[#FFD21C] transition-colors">
                  <span>Informar este sintoma</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Conscientização Box */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#101D32] via-[#173B60]/50 to-[#101D32] border border-[#FFD21C]/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFD21C] font-semibold mb-2">
              <AlertTriangle className="w-4 h-4 text-[#FFD21C]" />
              <span>Aviso de Segurança Operacional</span>
            </div>
            <p className="text-sm sm:text-base text-[#F5F7FA] font-medium leading-relaxed mb-2">
              Identificou qualquer um desses sinais em seu imóvel ou empresa? Não tente soluções caseiras que possam agravar os riscos.
            </p>
            <p className="text-xs text-[#A7B2C2]">
              Atendimento técnico em São Bernardo do Campo e cidades vizinhas. A disponibilidade e prazo de deslocamento são confirmados previamente pelo profissional responsável.
            </p>
          </div>

          <button
            onClick={() => onReportProblem('Problema elétrico com risco')}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm uppercase font-bold tracking-wider text-[#080F1C] bg-[#FFD21C] hover:bg-[#ffe053] rounded-xl transition-all shadow-[0_0_25px_rgba(255,210,28,0.35)] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Estou com um problema elétrico</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
