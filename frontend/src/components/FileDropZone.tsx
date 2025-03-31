import React, { useState, useCallback } from 'react';
import { Upload, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropZoneProps {
  onFileDrop: (file: File) => void;
  activeType: 'structured' | 'unstructured' | 'compliance' | null;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileDrop, activeType }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getBorderColor = () => {
    if (error) return 'border-cyber-red';
    if (file) return 'border-cyber-green';
    if (isDragging) {
      switch (activeType) {
        case 'structured': return 'border-cyber-blue';
        case 'unstructured': return 'border-cyber-purple';
        case 'compliance': return 'border-cyber-pink';
        default: return 'border-white/10';
      }
    }
    
    switch (activeType) {
      case 'structured': return 'border-cyber-blue/30';
      case 'unstructured': return 'border-cyber-purple/30';
      case 'compliance': return 'border-cyber-pink/30';
      default: return 'border-white/10';
    }
  };

  const getGlowEffect = () => {
    if (error) return 'shadow-neon-red';
    if (file) return 'shadow-neon-green';
    if (isDragging) {
      switch (activeType) {
        case 'structured': return 'shadow-neon-blue';
        case 'unstructured': return 'shadow-neon-purple';
        case 'compliance': return 'shadow-neon-pink';
        default: return '';
      }
    }
    return '';
  };

  const getActiveTypeText = () => {
    switch (activeType) {
      case 'structured': return 'Structured Term Sheet';
      case 'unstructured': return 'Unstructured Term Sheet';
      case 'compliance': return 'Compliance/Policy Document';
      default: return 'Select document type';
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = activeType === 'unstructured'
      ? ['application/pdf']
      : ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(file.type)) {
      setError(`Please upload a ${activeType === 'unstructured' ? 'PDF' : 'Excel (XLS, XLSX)'} file`);
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB
      setError('File size must be less than 10MB');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!activeType) {
      setError('Please select a document type first');
      return;
    }
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onFileDrop(droppedFile);
      }
    }
  }, [activeType, onFileDrop]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeType) {
      setError('Please select a document type first');
      return;
    }
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileDrop(selectedFile);
      }
    }
  }, [activeType, onFileDrop]);

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div 
      className={cn(
        "w-full p-1 rounded-lg transition-all duration-300",
        getBorderColor(),
        getGlowEffect()
      )}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center p-10 rounded-lg border-2 border-dashed",
          "bg-cyber-darker/50 backdrop-blur-sm transition-all duration-300 min-h-[300px]",
          getBorderColor()
        )}
      >
        {!file ? (
          <>
            <Upload
              size={50}
              className={cn(
                "mb-4 transition-all duration-300",
                activeType === 'structured' ? 'text-cyber-blue' : 
                activeType === 'unstructured' ? 'text-cyber-purple' : 
                activeType === 'compliance' ? 'text-cyber-pink' : 
                'text-gray-400'
              )}
            />
            <h3 className="text-xl font-bold mb-2 text-white">
              {isDragging ? 'Drop to upload' : 'Drag & Drop your file here'}
            </h3>
            <p className="text-gray-400 mb-4">
              {activeType ? getActiveTypeText() : 'Please select a document type first'}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              {activeType === 'unstructured' ? 'Supports PDF' : 'Supports Excel (XLS, XLSX)'}
            </p>
            
            <label 
              className={cn(
                "cyber-button relative overflow-hidden inline-block",
                activeType === 'structured' ? 'cyber-button-blue' : 
                activeType === 'unstructured' ? 'cyber-button-purple' : 
                activeType === 'compliance' ? 'cyber-button-pink' : 
                'opacity-50 cursor-not-allowed'
              )}
            >
              <span>Browse Files</span>
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileInput}
                accept={activeType === 'unstructured' ? '.pdf' : '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
                disabled={!activeType}
              />
            </label>
            
            {error && (
              <p className="mt-4 text-cyber-red text-sm flex items-center">
                <X size={16} className="mr-1" /> {error}
              </p>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cyber-green/10 mb-4">
              <Check size={32} className="text-cyber-green" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-white">File Ready</h3>
            <p className="text-gray-400 mb-4">{file.name}</p>
            <div className="flex space-x-4">
              <button 
                onClick={removeFile}
                className="cyber-button border-cyber-red/30 hover:border-cyber-red hover:shadow-neon-red"
              >
                <X size={18} className="mr-2 inline" />
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropZone;
