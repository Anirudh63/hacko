
import React from 'react';
import { Loader } from 'lucide-react';

interface ProcessingAnimationProps {
  type: 'structured' | 'unstructured' | 'compliance';
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ type }) => {
  const getMainColor = () => {
    switch (type) {
      case 'structured': return 'border-cyber-blue text-cyber-blue';
      case 'unstructured': return 'border-cyber-purple text-cyber-purple';
      case 'compliance': return 'border-cyber-pink text-cyber-pink';
      default: return 'border-cyber-blue text-cyber-blue';
    }
  };

  const getGlowColor = () => {
    switch (type) {
      case 'structured': return 'shadow-neon-blue';
      case 'unstructured': return 'shadow-neon-purple';
      case 'compliance': return 'shadow-neon-pink';
      default: return 'shadow-neon-blue';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className={`relative w-32 h-32 rounded-full ${getGlowColor()}`}>
        <div className={`absolute inset-0 animate-rotate-center border-4 border-t-transparent rounded-full ${getMainColor()}`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size={24} className={`animate-spin ${getMainColor()}`} />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold mb-2 text-white">Scanning Document</h3>
        <p className="text-gray-400">Processing your document for validation</p>
        
        <div className="mt-8 w-full max-w-md h-2 bg-cyber-darker rounded-full overflow-hidden">
          <div className="relative h-full w-full">
            <div className={`absolute h-full w-full ${type === 'structured' ? 'bg-cyber-blue/20' : type === 'unstructured' ? 'bg-cyber-purple/20' : 'bg-cyber-pink/20'}`}></div>
            <div 
              className={`absolute h-full w-1/4 animate-scanner ${
                type === 'structured' ? 'bg-cyber-blue' : 
                type === 'unstructured' ? 'bg-cyber-purple' : 
                'bg-cyber-pink'
              }`}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>Document Analysis</span>
          <span>Term Extraction</span>
          <span>Compliance Check</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
