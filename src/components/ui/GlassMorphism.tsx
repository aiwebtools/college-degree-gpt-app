
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
        return 'bg-gray-200 backdrop-blur-sm border border-gray-300 shadow-sm';
      case 'high':
        return 'bg-gray-200 backdrop-blur-xl border border-gray-300 shadow-xl';
      case 'medium':
      default:
        return 'bg-gray-200 backdrop-blur-md border border-gray-300 shadow-lg';
    }
  };

  return (
    <div className={cn(getIntensityClasses(), 'rounded-xl', className)}>
      {children}
    </div>
  );
};

export default GlassMorphism;
