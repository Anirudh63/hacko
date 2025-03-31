// import * as React from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import ValidationCard, { ValidationStatus } from '@/components/ValidationCard';
// import { Button } from '@/components/ui/button';

// interface LocationState {
//   fileName: string;
//   fileType: 'structured' | 'unstructured' | 'compliance';
//   fileSize: number;
// }

// interface ValidationResult {
//   id: string;
//   title: string;
//   description: string;
//   status: ValidationStatus;
//   details?: string;
// }

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const state = location.state as LocationState;
  
//   // Mock validation results based on file type
//   const getValidationResults = (): ValidationResult[] => {
//     if (state.fileType === 'structured') {
//       return [
//         {
//           id: '1',
//           title: 'Company Information',
//           description: 'Company name, registration and address details',
//           status: 'valid',
//           details: 'Acme Corp (Reg: 12345678)'
//         },
//         {
//           id: '2',
//           title: 'Investment Amount',
//           description: 'Total investment amount and currency',
//           status: 'valid',
//           details: '$5,000,000 USD Series A Funding'
//         },
//         {
//           id: '3',
//           title: 'Valuation Cap',
//           description: 'Pre-money valuation and cap',
//           status: 'valid',
//           details: '$25,000,000 Valuation Cap'
//         },
//         {
//           id: '4',
//           title: 'Investor Rights',
//           description: 'Special rights and provisions for investors',
//           status: 'warning',
//           details: 'Pro-rata rights clause needs clarification'
//         },
//         {
//           id: '5',
//           title: 'Board Composition',
//           description: 'Board structure and voting rights',
//           status: 'valid'
//         },
//         {
//           id: '6',
//           title: 'Vesting Schedule',
//           description: 'Equity vesting schedule for founders',
//           status: 'error',
//           details: 'Missing cliff period specification'
//         }
//       ];
//     } else if (state.fileType === 'unstructured') {
//       return [
//         {
//           id: '1',
//           title: 'Deal Structure',
//           description: 'Investment structure and type',
//           status: 'valid',
//           details: 'Convertible Note with 20% discount'
//         },
//         {
//           id: '2',
//           title: 'Interest Rate',
//           description: 'Annual interest rate on investment',
//           status: 'warning',
//           details: '8% simple interest (exceeds recommended 7%)'
//         },
//         {
//           id: '3',
//           title: 'Maturity Date',
//           description: 'Maturity date of the convertible note',
//           status: 'valid',
//           details: '24 months from issuance'
//         },
//         {
//           id: '4',
//           title: 'Conversion Mechanics',
//           description: 'Terms for converting note to equity',
//           status: 'error',
//           details: 'Ambiguous conversion trigger events'
//         },
//         {
//           id: '5',
//           title: 'Subordination',
//           description: 'Debt subordination clauses',
//           status: 'valid'
//         }
//       ];
//     } else {
//       return [
//         {
//           id: '1',
//           title: 'Regulatory Compliance',
//           description: 'Adherence to regulatory requirements',
//           status: 'valid',
//           details: 'SEC Regulation D compliant'
//         },
//         {
//           id: '2',
//           title: 'Privacy Policy',
//           description: 'Data privacy and protection clauses',
//           status: 'warning',
//           details: 'GDPR compliance needs updating'
//         },
//         {
//           id: '3',
//           title: 'Anti-Money Laundering',
//           description: 'AML compliance checks',
//           status: 'valid',
//           details: 'KYC procedures properly documented'
//         },
//         {
//           id: '4',
//           title: 'Intellectual Property',
//           description: 'IP rights and protection clauses',
//           status: 'error',
//           details: 'Missing patent assignment provisions'
//         },
//         {
//           id: '5',
//           title: 'Environmental Compliance',
//           description: 'Environmental regulations compliance',
//           status: 'warning',
//           details: 'Carbon footprint reporting needs clarification'
//         }
//       ];
//     }
//   };

//   const validationResults = getValidationResults();
  
//   // Calculate summary statistics
//   const valid = validationResults.filter(r => r.status === 'valid').length;
//   const warnings = validationResults.filter(r => r.status === 'warning').length;
//   const errors = validationResults.filter(r => r.status === 'error').length;
  
//   if (!state) {
//     navigate('/');
//     return null;
//   }

//   return (
//     <div className="min-h-screen cyber-grid-bg pt-16 pb-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-12 animate-fade-in">
//           <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
//             Validation <span className="text-cyber-blue">Results</span>
//           </h1>
//           <p className="text-xl text-gray-400">
//             Analysis complete for "{state.fileName}"
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
//           <div className="lg:col-span-3">
//             <div className="glass-card border border-white/10 p-6 h-full">
//               <h2 className="text-2xl font-bold mb-6 text-white">Document Analysis</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {validationResults.map((result) => (
//                   <ValidationCard
//                     key={result.id}
//                     title={result.title}
//                     description={result.description}
//                     status={result.status}
//                     details={result.details}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div className="lg:col-span-1">
//             <div className="glass-card border border-white/10 p-6 h-full">
//               <h2 className="text-2xl font-bold mb-6 text-white">Summary</h2>
              
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-3 border border-cyber-green/30 rounded bg-cyber-green/5">
//                   <span className="text-white">Valid</span>
//                   <span className="text-cyber-green font-bold">{valid}</span>
//                 </div>
                
//                 <div className="flex items-center justify-between p-3 border border-cyber-amber/30 rounded bg-cyber-amber/5">
//                   <span className="text-white">Warnings</span>
//                   <span className="text-cyber-amber font-bold">{warnings}</span>
//                 </div>
                
//                 <div className="flex items-center justify-between p-3 border border-cyber-red/30 rounded bg-cyber-red/5">
//                   <span className="text-white">Errors</span>
//                   <span className="text-cyber-red font-bold">{errors}</span>
//                 </div>
//               </div>
              
//               <div className="mt-8 space-y-4">
//                 <Button 
//                   className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple text-white border-none"
//                   onClick={() => console.log('Download report')}
//                 >
//                   Download Report
//                 </Button>
                
//                 <Button 
//                   variant="outline" 
//                   className="w-full border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue"
//                   onClick={() => navigate('/')}
//                 >
//                   Process Another Document
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;
