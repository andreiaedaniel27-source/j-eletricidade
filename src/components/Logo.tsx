import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', onClick }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  };

  const subTextSizes = {
    sm: 'text-[9px] tracking-[0.24em]',
    md: 'text-[10px] tracking-[0.26em]',
    lg: 'text-[12px] tracking-[0.28em]'
  };

  return (
    <div 
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className} group`}
      onClick={onClick}
    >
      {/* Emblema Arquitetônico Industrial com Raio Estilizado em Âmbar Elétrico */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-lg bg-[#101214] border border-white/10 p-1.5 transition-all duration-300 group-hover:border-[#F2AA24]/50 group-hover:shadow-[0_0_15px_rgba(242,170,36,0.25)]`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        >
          {/* Linha guia estrutural de precisão */}
          <line x1="3" y1="12" x2="21" y2="12" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Raio Técnico Angular */}
          <path 
            d="M13 2.5L5.5 13H11.5L9.5 21.5L18.5 10H12.5L14.5 2.5H13Z" 
            fill="#F2AA24"
            stroke="#DC6B32"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Tipografia em Space Grotesk com Identidade Forte */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center">
          <span className={`font-bold font-header ${textSizes[size]} tracking-tight text-[#FFFFFF]`}>
            J.<span className="text-[#F2AA24]">ENERGY</span>
          </span>
        </div>
        <span className={`uppercase font-medium text-[#85898C] ${subTextSizes[size]} mt-1`}>
          Soluções Elétricas
        </span>
      </div>
    </div>
  );
};
