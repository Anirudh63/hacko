import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadCard from '@/components/UploadCard';
import FileDropZone from '@/components/FileDropZone';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State to track uploaded files
  const [uploads, setUploads] = useState({
    structured: null as File | null,
    unstructured: null as File | null,
    compliance: null as File | null,
  });

  // Separate refs for each upload section
  const structuredRef = useRef<HTMLDivElement | null>(null);
  const unstructuredRef = useRef<HTMLDivElement | null>(null);
  const complianceRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the selected document type's upload section
  const scrollToUploadSection = (type: 'structured' | 'unstructured' | 'compliance') => {
    let targetRef = null;
    if (type === 'structured') targetRef = structuredRef;
    else if (type === 'unstructured') targetRef = unstructuredRef;
    else if (type === 'compliance') targetRef = complianceRef;

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileDrop = (file: File, type: 'structured' | 'unstructured' | 'compliance') => {
    setUploads((prev) => ({ ...prev, [type]: file }));

    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded.`,
    });
  };

  const handleProceed = () => {
    if (!uploads.structured || !uploads.unstructured || !uploads.compliance) {
      toast({
        title: "Upload Required",
        description: "Please upload all three document types before proceeding.",
        variant: "destructive",
      });
      return;
    }

    navigate('/processing', { 
      state: { 
        structured: uploads.structured?.name,
        unstructured: uploads.unstructured?.name,
        compliance: uploads.compliance?.name
      }
    });
  };

  return (
    <div className="min-h-screen cyber-grid-bg pt-16 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
            Term Sheet <span className="text-cyber-blue">Validation</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload your documents for validation and compliance checking.
          </p>
        </div>

        {/* Document Type Selection */}
        <div className="mb-16 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-6 text-white">Choose Document Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UploadCard
              title="Structured Term Sheet"
              description="Standard format term sheets with clear sections and defined terms"
              type="structured"
              onClick={() => scrollToUploadSection('structured')}
            />
            <UploadCard
              title="Unstructured Term Sheet"
              description="Non-standard format documents requiring advanced parsing"
              type="unstructured"
              onClick={() => scrollToUploadSection('unstructured')}
            />
            <UploadCard
              title="Compliance Document"
              description="Policy documents to be checked against term sheets"
              type="compliance"
              onClick={() => scrollToUploadSection('compliance')}
            />
          </div>
        </div>

        {/* Upload Sections */}
        <div className="animate-fade-in-up">
          {/* Structured Term Sheet Upload */}
          <div ref={structuredRef}>
            <h2 className="text-2xl font-bold mb-4 text-white">Upload Structured Term Sheet</h2>
            <FileDropZone onFileDrop={(file) => handleFileDrop(file, 'structured')} activeType="structured" />
          </div>

          {/* Unstructured Term Sheet Upload */}
          <div ref={unstructuredRef} className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-white">Upload Unstructured Term Sheet</h2>
            <FileDropZone onFileDrop={(file) => handleFileDrop(file, 'unstructured')} activeType="unstructured" />
          </div>

          {/* Compliance Document Upload */}
          <div ref={complianceRef} className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-white">Upload Compliance Document</h2>
            <FileDropZone onFileDrop={(file) => handleFileDrop(file, 'compliance')} activeType="compliance" />
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-cyber-blue text-white px-6 py-3 rounded-lg font-bold text-lg disabled:opacity-50"
            onClick={handleProceed}
            disabled={!uploads.structured || !uploads.unstructured || !uploads.compliance}
          >
            Proceed to Validation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
