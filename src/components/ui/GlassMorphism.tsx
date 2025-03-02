
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className,
  intensity = 'medium',
}) => {
  const getIntensityClasses = () => {
    switch (intensity) {
      case 'low':
        return 'bg-white/95 backdrop-blur-sm border border-white/20 shadow-sm';
      case 'high':
        return 'bg-white/95 backdrop-blur-xl border border-white/40 shadow-xl';
      case 'medium':
      default:
        return 'bg-white/95 backdrop-blur-md border border-white/30 shadow-lg';
    }
  };

  return (
    <div className={cn(getIntensityClasses(), 'rounded-xl', className)}>
      {children}
    </div>
  );
};

export default GlassMorphism;
