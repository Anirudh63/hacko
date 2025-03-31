
import React from 'react';
import { Check, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ValidationStatus = 'valid' | 'warning' | 'error';

interface ValidationCardProps {
  title: string;
  description: string;
  status: ValidationStatus;
  details?: string;
}

const ValidationCard: React.FC<ValidationCardProps> = ({ 
  title, 
  description, 
  status, 
  details 
}) => {
  const getStatusColors = () => {
    switch (status) {
      case 'valid':
        return {
          border: 'border-cyber-green/30',
          hoverBorder: 'hover:border-cyber-green',
          shadow: 'hover:shadow-neon-green',
          bg: 'bg-cyber-green/10',
          text: 'text-cyber-green',
          icon: <Check size={20} className="text-cyber-green" />
        };
      case 'warning':
        return {
          border: 'border-cyber-amber/30',
          hoverBorder: 'hover:border-cyber-amber',
          shadow: 'hover:shadow-neon-amber',
          bg: 'bg-cyber-amber/10',
          text: 'text-cyber-amber',
          icon: <FileText size={20} className="text-cyber-amber" />
        };
      case 'error':
        return {
          border: 'border-cyber-red/30',
          hoverBorder: 'hover:border-cyber-red',
          shadow: 'hover:shadow-neon-red',
          bg: 'bg-cyber-red/10',
          text: 'text-cyber-red',
          icon: <X size={20} className="text-cyber-red" />
        };
      default:
        return {
          border: 'border-cyber-green/30',
          hoverBorder: 'hover:border-cyber-green',
          shadow: 'hover:shadow-neon-green',
          bg: 'bg-cyber-green/10',
          text: 'text-cyber-green',
          icon: <Check size={20} className="text-cyber-green" />
        };
    }
  };

  const statusColors = getStatusColors();

  return (
    <div className={cn(
      "glass-card border p-5 transition-all duration-300",
      "hover:translate-y-[-3px]",
      statusColors.border,
      statusColors.hoverBorder,
      statusColors.shadow
    )}>
      <div className="flex items-start">
        <div className={cn(
          "p-2 rounded-full mr-4 flex-shrink-0",
          statusColors.bg
        )}>
          {statusColors.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1 text-white">{title}</h3>
          <p className="text-gray-400 text-sm mb-2">{description}</p>
          {details && (
            <div className={cn(
              "text-xs p-2 rounded bg-cyber-darkest mt-2",
              statusColors.text
            )}>
              {details}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationCard;
