import React from 'react';
import { Star, ExternalLink, MapPin, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const googleMapsUrl =
    "https://www.google.com/maps/place/Eletricista+Residencial+,+comercial+e+industrial+J.energy_solucoes+el%C3%A9tricas/@-23.7487752,-46.6226621,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce472d2289d757:0x44c2ceb291d61b49!8m2!3d-23.7487752!4d-46.6226621!16s%2Fg%2F11trstl652?authuser=0&hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D";

  // Avaliações reais coletadas diretamente do perfil oficial no Google Maps
  const realGoogleReviews = [
    {
      author: 'Jemerson Gleison',
      rating: 5,
      date: 'Setembro de 2026',
      serviceTag: 'Troca de Disjuntor Geral & Fases',
      comment:
        'Profissional de excelente qualidade. Tive um problema no disjuntor geral externo, onde queimou uma das fases. Ele fez toda troca, fez um serviço limpo (chapeou todos os fios que estavam irregulares) e ainda deu garantia de um ano do produto. Além da educação no atendimento e transparência no serviço (fez questão de mostrar as medições e explicar todas as etapas do serviço). Super indico!',
    },
    {
      author: 'Beatriz Aparecida',
      rating: 5,
      date: 'Setembro de 2026',
      serviceTag: 'Cuidado & Instalação Técnica',
      comment:
        'Excelente profissional! Serviço feito com muito cuidado, capricho e qualidade. Foi atencioso e explicou tudo direitinho. Fiquei muito satisfeita com o resultado. Recomendo de olhos fechados! 👏⚡',
    },
    {
      author: 'Elias Natalino',
      rating: 5,
      date: 'Agosto de 2026',
      serviceTag: 'Organização & Pontualidade',
      comment:
        'Serviço excelente, profissional super qualificado, esse eu recomendo de olhos fechados, pontual e organizado 🤝',
    },
    {
      author: 'Ana Arini',
      rating: 5,
      date: 'Agosto de 2026',
      serviceTag: 'Atendimento Rápido & Eficaz',
      comment:
        'Ótimo atendimento, muito eficaz e ágil no trabalho. Muito educado e prestativo.',
    },
    {
      author: 'Nair Arini Pereira',
      rating: 5,
      date: 'Agosto de 2026',
      serviceTag: 'Agilidade & Atenção',
      comment:
        'Bom atendimento, muito atencioso e educado, ágil no serviço.',
    }
  ];

  return (
    <section id="depoimentos" className="py-24 sm:py-32 bg-[#101214] border-t border-white/8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Editorial Precision in Space Grotesk */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-[0.2em] text-[#85898C]">
              <span className="w-1.5 h-1.5 bg-[#F2AA24] rounded-sm" />
              <span>03 / Prova Social & Reputação</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-depoimentos text-[#FFFFFF] tracking-tight [text-wrap:balance]">
              REPUTAÇÃO 5.0 NO GOOGLE MAPS.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#85898C] max-w-md leading-relaxed font-normal">
            Depoimentos verídicos de quem contratou o eletricista João Matos da J.ENERGY para resolver problemas elétricos com pontualidade e rigor técnico.
          </p>
        </div>

        {/* Google Maps Architectural Trust Bar */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-[#171A1D] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-[#101214] border border-white/10 flex items-center justify-center p-3 shrink-0">
              {/* Google multi-colored G logo */}
              <svg viewBox="0 0 24 24" className="w-8 h-8" aria-label="Google">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#FFFFFF] font-depoimentos">
                  5.0
                </span>
                <div className="flex items-center gap-0.5 text-[#F2AA24]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F2AA24]" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-[#85898C] mt-1 flex items-center gap-2 flex-wrap font-mono">
                <span className="font-semibold text-[#F5F4F0]">382 avaliações reais</span>
                <span>·</span>
                <span>Google Meu Negócio</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">100% Nota Máxima</span>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Google Maps CTA Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1D2126] hover:bg-[#24292F] text-xs font-semibold text-[#F5F4F0] hover:text-[#FFFFFF] border border-white/10 hover:border-[#F2AA24]/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(242,170,36,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 whitespace-nowrap overflow-hidden"
          >
            <MapPin className="w-4 h-4 text-[#F2AA24] transition-transform duration-300 group-hover:scale-120 group-hover:-translate-y-0.5" />
            <span className="tracking-wide">Ver Todas as 382 Avaliações no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#85898C] transition-transform duration-300 group-hover:text-[#FFFFFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Asymmetrical Editorial Review Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Marquee Featured Review (Jemerson Gleison) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#171A1D] border border-white/10 flex flex-col justify-between shadow-lg transition-all duration-300 hover:border-[#F2AA24]/40">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/8">
                <div>
                  <h3 className="text-base font-bold font-depoimentos text-[#FFFFFF]">
                    {realGoogleReviews[0].author}
                  </h3>
                  <div className="text-xs text-[#85898C] flex items-center gap-2 font-mono mt-0.5">
                    <span>{realGoogleReviews[0].date}</span>
                    <span>·</span>
                    <span className="text-[#F2AA24]">{realGoogleReviews[0].serviceTag}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-[#F2AA24]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F2AA24]" />
                  ))}
                </div>
              </div>

              <blockquote className="text-base sm:text-lg text-[#F5F4F0] leading-relaxed italic font-normal mb-8">
                &ldquo;{realGoogleReviews[0].comment}&rdquo;
              </blockquote>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Avaliação verificada no Google Maps</span>
            </div>
          </div>

          {/* Secondary Reviews in Editorial Hairline List (4 items) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/8 border-y lg:border-t-0 border-white/8">
            {realGoogleReviews.slice(1).map((review, idx) => (
              <div key={idx} className="py-5 first:pt-0 last:pb-0 group transition-colors duration-200">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h4 className="text-sm font-bold font-depoimentos text-[#FFFFFF]">
                    {review.author}
                  </h4>
                  <div className="flex items-center gap-0.5 text-[#F2AA24]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#F2AA24]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#85898C] font-mono mb-2">
                  {review.date} · {review.serviceTag}
                </p>

                <p className="text-xs sm:text-sm text-[#F5F4F0] leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Minimalist Footnote Attribution */}
        <div className="pt-6 border-t border-white/8 text-center">
          <p className="text-xs text-[#85898C]">
            Todas as avaliações acima foram publicadas voluntariamente por clientes atendidos pelo eletricista João Matos da J.ENERGY Soluções Elétricas.
          </p>
        </div>

      </div>
    </section>
  );
};
