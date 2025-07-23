import React from 'react';
import logoSvg from '../../assets/logo.svg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-40 h-40'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className={className}>
      <img 
        src={logoSvg} 
        alt="Team Achieve Logo" 
        className={sizeClasses[size]}
      />
    </div>
  );
};

export default Logo;