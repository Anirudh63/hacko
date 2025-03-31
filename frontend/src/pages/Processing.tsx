import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Processing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Extract uploaded file names from location state
  const { structured, unstructured, compliance } = location.state || {};

  // Allowed file types
  const allowedFormats = {
    structured: ["xls", "xlsx"],
    unstructured: ["pdf"],
    compliance: ["xls", "xlsx"],
  };

  // Function to check file extension validity
  const isValidFile = (filename: string, type: keyof typeof allowedFormats) => {
    if (!filename) return false;
    const extension = filename.split(".").pop()?.toLowerCase();
    return allowedFormats[type].includes(extension || "");
  };

  // Validate file formats
  const validateFiles = () => {
    if (!isValidFile(structured, "structured")) {
      toast({
        title: "Invalid File Format",
        description: "Structured Term Sheet must be an Excel file (.xls, .xlsx).",
        variant: "destructive",
      });
      return false;
    }
    if (!isValidFile(unstructured, "unstructured")) {
      toast({
        title: "Invalid File Format",
        description: "Unstructured Term Sheet must be a PDF file.",
        variant: "destructive",
      });
      return false;
    }
    if (!isValidFile(compliance, "compliance")) {
      toast({
        title: "Invalid File Format",
        description: "Compliance Document must be an Excel file (.xls, .xlsx).",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Handle processing logic
  const handleProcessing = () => {
    if (!validateFiles()) return;
    
    toast({
      title: "Processing Started",
      description: "Your documents are being validated...",
    });

    // Simulate processing delay before navigating
    setTimeout(() => {
      navigate("/results"); // Redirect to results page after processing
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Processing Your Documents...</h1>
      <p className="text-lg mb-4 text-gray-400">Please wait while we validate your uploaded term sheets.</p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
        <ul className="text-gray-300">
          <li>📄 Structured Term Sheet: {structured || "Not Uploaded"}</li>
          <li>📄 Unstructured Term Sheet: {unstructured || "Not Uploaded"}</li>
          <li>📄 Compliance Document: {compliance || "Not Uploaded"}</li>
        </ul>
      </div>

      <button
        onClick={handleProcessing}
        className="mt-6 px-6 py-3 bg-cyber-blue text-white font-bold rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
      >
        Start Validation
      </button>
    </div>
  );
};

export default Processing;
