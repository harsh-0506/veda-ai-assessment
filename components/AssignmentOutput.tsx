import { ArrowLeft, Bell, ChevronDown, Download } from 'lucide-react';

export default function AssignmentOutput({ data, onBack }: { data: any, onBack: () => void }) {
  return (
    // 1. We tell the main container to stop hiding overflow when printing (so all pages print!)
    <div className="flex-1 bg-[#f8f9fa] rounded-2xl flex flex-col h-full overflow-hidden print:overflow-visible print:bg-white print:h-auto">
      
      {/* 2. print:hidden makes the top header completely vanish in the PDF */}
      <header className="flex justify-between items-center bg-white p-4 border-b rounded-t-2xl shrink-0 print:hidden">
        <div className="flex items-center gap-3 text-gray-600">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <span className="font-medium">Assignment Output</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-800 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
              HJ
            </div>
            <span className="text-sm font-medium">Harsh Jaiswal</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* 3. print:overflow-visible ensures long papers don't get cut off on page 1 */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center print:overflow-visible print:p-0 print:block">
        
        {/* 4. print:hidden removes this black banner from the final PDF */}
        <div className="w-full max-w-4xl bg-gray-800 text-white p-6 rounded-2xl mb-8 flex justify-between items-center print:hidden">
          <p className="font-medium">Here is your customized Question Paper for your {data.assignmentDetails.subject} classes!</p>
          
          {/* 5. The Magic Trigger: window.print() */}
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
          >
            <Download size={16} />
            Download as PDF
          </button>
        </div>

        {/* 6. We strip the borders, shadows, and margins for a clean print output */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border p-12 mb-12 print:shadow-none print:border-none print:w-full print:max-w-none print:p-0 print:m-0">
          
          <div className="text-center mb-10 border-b pb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Delhi Public School, Sector-4, Bokaro</h1>
            <h2 className="text-lg font-semibold text-gray-700">Subject: {data.assignmentDetails.subject}</h2>
          </div>

          <div className="flex justify-between font-semibold text-sm mb-8">
            <p>Time Allowed: 45 minutes</p>
            <p>Maximum Marks: {data.assignmentDetails.totalMarks}</p>
          </div>
          <p className="font-semibold text-sm mb-6">All questions are compulsory unless stated otherwise.</p>

          <div className="mb-12 space-y-3 font-semibold text-sm">
            <p>Name: <span className="inline-block w-64 border-b border-black"></span></p>
            <p>Roll Number: <span className="inline-block w-48 border-b border-black"></span></p>
            <p>Class & Section: <span className="inline-block w-48 border-b border-black"></span></p>
          </div>

           {/* Dynamic Section Rendering */}
          {data.sections.map((section: any, index: number) => (
            <div key={index} className="mb-12">
              <h3 className="text-xl font-bold mb-1">{section.sectionTitle}</h3>
              <p className="text-sm italic text-gray-600 mb-6">{section.instructions}</p>

              <div className="space-y-8">
                {section.questions.map((q: any, qIndex: number) => (
                  <div key={q.id} className="flex gap-4">
                    <span className="font-bold">{qIndex + 1}.</span>
                    <div className="flex-1 w-full">
                      <p className="text-gray-900 mb-4 font-medium">{q.text}</p>
                      
                      {/* LAYOUT 1: Multiple Choice */}
                      {section.type === "Multiple Choice Questions" && q.options && (
                        <div className="space-y-3 pl-2 mb-4">
                          {q.options.map((opt: string, optIndex: number) => (
                            <div key={optIndex} className="flex items-center gap-3">
                              <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                              <span className="text-sm text-gray-700">{opt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* LAYOUT 2: Short Questions (Writing Lines) */}
                      {section.type === "Short Questions" && (
                        <div className="mt-4 mb-6 space-y-6">
                          <div className="border-b border-gray-300 w-full"></div>
                          <div className="border-b border-gray-300 w-full"></div>
                          <div className="border-b border-gray-300 w-full"></div>
                        </div>
                      )}

                      {/* LAYOUT 3: Numerical Problems (Blank Calculation Box) */}
                      {section.type === "Numerical Problems" && (
                        <div className="mt-4 mb-6 w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50/50">
                          <span className="text-gray-400 text-sm font-medium">Calculation Workspace</span>
                        </div>
                      )}

                      {/* LAYOUT 4: Diagram/Graph (Grid Paper) */}
                      {section.type === "Diagram/Graph-Based Questions" && (
                        <div 
                          className="mt-4 mb-6 w-full h-64 border-2 border-gray-300 rounded-xl"
                          style={{
                            backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                          }}
                        >
                        </div>
                      )}

                    </div>

                    {/* Difficulty and Marks Tags */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-700 rounded border border-gray-200">
                        [{q.marks} Marks]
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded border ${
                        q.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                        q.difficulty === 'Moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <p className="text-center font-bold text-sm mt-12 pt-8 border-t">End of Question Paper</p>
        </div>
      </div>
    </div>
  );
}
// import { ArrowLeft, Bell, ChevronDown, Download } from 'lucide-react';

// // We define the shape of the data we expect to receive
// export default function AssignmentOutput({ data, onBack }: { data: any, onBack: () => void }) {
//   return (
//     <div className="flex-1 bg-[#f8f9fa] rounded-2xl flex flex-col h-full overflow-hidden">
      
//       {/* Top Header */}
//       <header className="flex justify-between items-center bg-white p-4 border-b rounded-t-2xl shrink-0">
//         <div className="flex items-center gap-3 text-gray-600">
//           {/* Clicking this button takes us back to the form */}
//           <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
//             <ArrowLeft size={20} />
//           </button>
//           <span className="font-medium">Assignment Output</span>
//         </div>
        
//         <div className="flex items-center gap-4">
//           <button className="text-gray-500 hover:text-gray-800 relative">
//             <Bell size={20} />
//             <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
//           </button>
//           <div className="flex items-center gap-2 cursor-pointer">
//             <div className="h-8 w-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
//               HJ
//             </div>
//             <span className="text-sm font-medium">Harsh Jaiswal</span>
//             <ChevronDown size={16} className="text-gray-400" />
//           </div>
//         </div>
//       </header>

//       {/* Main Scrollable Area */}
//       <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
        
//         {/* Success Message & Download Button */}
//         <div className="w-full max-w-4xl bg-gray-800 text-white p-6 rounded-2xl mb-8 flex justify-between items-center">
//           <p className="font-medium">Here is your customized Question Paper for your {data.assignmentDetails.subject} classes!</p>
//           <button className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
//             <Download size={16} />
//             Download as PDF
//           </button>
//         </div>

//         {/* The Actual "Paper" */}
//         <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border p-12 mb-12">
          
//           {/* School Header */}
//           <div className="text-center mb-10 border-b pb-8">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Delhi Public School, Sector-4, Bokaro</h1>
//             <h2 className="text-lg font-semibold text-gray-700">Subject: {data.assignmentDetails.subject}</h2>
//           </div>

//           {/* Exam Details */}
//           <div className="flex justify-between font-semibold text-sm mb-8">
//             <p>Time Allowed: 45 minutes</p>
//             <p>Maximum Marks: {data.assignmentDetails.totalMarks}</p>
//           </div>
//           <p className="font-semibold text-sm mb-6">All questions are compulsory unless stated otherwise.</p>

//           {/* Student Info Lines */}
//           <div className="mb-12 space-y-3 font-semibold text-sm">
//             <p>Name: <span className="inline-block w-64 border-b border-black"></span></p>
//             <p>Roll Number: <span className="inline-block w-48 border-b border-black"></span></p>
//             <p>Class & Section: <span className="inline-block w-48 border-b border-black"></span></p>
//           </div>

//           {/* Render Sections and Questions */}
//           {data.sections.map((section: any, index: number) => (
//             <div key={index} className="mb-10">
//               <h3 className="text-xl font-bold text-center mb-2">{section.sectionTitle}</h3>
//               <p className="text-sm italic text-gray-600 mb-6">{section.instructions}</p>

//               <div className="space-y-6">
//                 {section.questions.map((q: any, qIndex: number) => (
//                   <div key={q.id} className="flex gap-4">
//                     <span className="font-bold">{qIndex + 1}.</span>
//                     <div className="flex-1">
//                       <p className="text-gray-900 mb-3">{q.text}</p>
                      
//                       {/* NEW: If the AI sent options, draw them! */}
//                       {q.options && q.options.length > 0 && (
//                         <div className="space-y-2 pl-2">
//                           {q.options.map((opt: string, optIndex: number) => (
//                             <div key={optIndex} className="flex items-center gap-3">
//                               <div className="h-4 w-4 rounded-full border border-gray-400"></div>
//                               <span className="text-sm text-gray-700">{opt}</span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     {/* Tags for Difficulty and Marks */}
//                     <div className="flex items-start gap-2 shrink-0">
//                       <span className={`text-xs font-bold px-2 py-1 rounded border ${
//                         q.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
//                         q.difficulty === 'Moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
//                         'bg-red-50 text-red-700 border-red-200'
//                       }`}>
//                         {q.difficulty}
//                       </span>
//                       <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-700 rounded border border-gray-200">
//                         [{q.marks} Marks]
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
          
//           <p className="text-center font-bold text-sm mt-12 pt-8 border-t">End of Question Paper</p>
//         </div>
//       </div>
//     </div>
//   );
// }