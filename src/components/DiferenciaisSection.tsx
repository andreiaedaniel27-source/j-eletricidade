import React from 'react';
import { Award, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DiferenciaisSection: React.FC = () => {
  const diferenciais = [
    {
      icon: Award,
      title: 'Equipe Qualificada e Certificada',
      description: 'Profissionais capacitados e atualizados conforme as normas regulamentadoras NBR 5410 e diretrizes de segurança com eletricidade (NR-10). Cada intervenção é conduzida com instrumentos adequados de medição e análise.'
    },
    {
      icon: UserCheck,
      title: 'Atendimento Personalizado',
      description: 'Cada residência, condomínio ou indústria possui particularidades. Avaliamos detalhadamente a sua necessidade para apresentar a solução exata, sem indicar custos supérfluos ou materiais desnecessários.'
    },
    {
      icon: ShieldCheck,
      title: 'Qualidade e Segurança Rigorosa',
      description: 'Compromisso inegociável com a segurança da sua instalação. Utilizamos procedimentos padronizados, barramentos dimensionados e condutores certificados para assegurar durabilidade e estabilidade operacional.'
    }
  ];

  return (
    <section className="py-20 bg-[#080F1C] border-t border-[#173B60]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39BDF5] mb-2">
            <span>DIFERENCIAIS COMPETITIVOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight mb-4 [text-wrap:balance]">
            POR QUE ESCOLHER A J&apos;ENERGY?
          </h2>
          <p className="text-sm sm:text-base text-[#A7B2C2]">
            Transparência técnica, rigor normativo e relacionamento de longo prazo com nossos clientes em São Bernardo do Campo e região.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diferenciais.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#101D32] border border-[#173B60] hover:border-[#39BDF5]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#080F1C] border border-[#173B60] flex items-center justify-center text-[#FFD21C] mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#F5F7FA] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A7B2C2] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#173B60]/40 flex items-center gap-2 text-xs text-[#39BDF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#39BDF5]" />
                  <span>Padrão J&apos;ENERGY assegurado</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
