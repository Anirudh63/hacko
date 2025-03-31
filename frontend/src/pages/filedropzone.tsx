import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@/hooks/use-toast';

const FileDropZone = ({ onFileDrop, activeType }) => {
  const { toast } = useToast();

  // Allowed file formats
  const allowedFormats = {
    structured: ['xls', 'xlsx'], // Only Excel for structured
    compliance: ['xls', 'xlsx'], // Only Excel for compliance
    unstructured: ['pdf'], // Only PDF for unstructured
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    // Extract file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    // Validate file extension
    if (!allowedFormats[activeType].includes(fileExtension)) {
      toast({
        title: "Invalid File Type",
        description: `Only ${activeType === 'unstructured' ? 'PDF' : 'Excel (XLS, XLSX)'} files are allowed.`,
        variant: "destructive",
      });
      return;
    }

    // If valid, pass file to parent component
    onFileDrop(file);
  }, [activeType, onFileDrop, toast]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: activeType === 'unstructured'
      ? 'application/pdf' // PDF for unstructured
      : 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Excel for structured & compliance
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-6 rounded-lg cursor-pointer text-center">
      <input {...getInputProps()} />
      <p className="text-gray-300">
        Drag & drop or click to upload a {activeType === 'unstructured' ? 'PDF' : 'Excel'} file.
      </p>
    </div>
  );
};

export default FileDropZone;
