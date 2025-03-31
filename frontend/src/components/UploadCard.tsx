import React from 'react';
import { FileText, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadCardProps {
  title: string;
  description: string;
  type: 'structured' | 'unstructured' | 'compliance';
  onClick: () => void;
}

const UploadCard: React.FC<UploadCardProps> = ({ title, description, type, onClick }) => {
  const getCardStyles = () => {
    switch (type) {
      case 'structured':
        return 'border-cyber-blue/30 hover:border-cyber-blue hover:shadow-neon-blue';
      case 'unstructured':
        return 'border-cyber-purple/30 hover:border-cyber-purple hover:shadow-neon-purple';
      case 'compliance':
        return 'border-cyber-pink/30 hover:border-cyber-pink hover:shadow-neon-pink';
      default:
        return 'border-cyber-blue/30 hover:border-cyber-blue hover:shadow-neon-blue';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'structured':
        return '#00f0ff';
      case 'unstructured':
        return '#7b5df2';
      case 'compliance':
        return '#ff00d4';
      default:
        return '#00f0ff';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card border p-6 transition-all duration-300 cursor-pointer group",
        "hover:translate-y-[-5px]",
        getCardStyles()
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className={cn(
          "mb-4 p-4 rounded-full bg-cyber-darkest border",
          "transition-all duration-300 group-hover:scale-110",
          type === 'structured' ? 'border-cyber-blue/30 group-hover:border-cyber-blue' : 
          type === 'unstructured' ? 'border-cyber-purple/30 group-hover:border-cyber-purple' : 
          'border-cyber-pink/30 group-hover:border-cyber-pink'
        )}>
          {type === 'structured' || type === 'unstructured' ? 
            <FileText size={30} color={getIconColor()} className="animate-pulse-glow" /> : 
            <Upload size={30} color={getIconColor()} className="animate-pulse-glow" />
          }
        </div>
        <h3 className={cn(
          "text-xl font-bold mb-2",
          type === 'structured' ? 'text-cyber-blue' : 
          type === 'unstructured' ? 'text-cyber-purple' : 
          'text-cyber-pink'
        )}>
          {title}
        </h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default UploadCard;
