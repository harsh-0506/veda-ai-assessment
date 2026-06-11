import { ArrowLeft, Bell, ChevronDown, Download } from 'lucide-react';

export default function AssignmentOutput({ data, onBack }: { data: any, onBack: () => void }) {
  return (
    <div className="flex-1 bg-[#f8f9fa] rounded-2xl flex flex-col h-full overflow-hidden print:overflow-visible print:bg-white print:h-auto">
      
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

      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center print:overflow-visible print:p-0 print:block">
        
        <div className="w-full max-w-4xl bg-gray-800 text-white p-6 rounded-2xl mb-8 flex justify-between items-center print:hidden">
          <p className="font-medium">Here is your customized Question Paper for your {data.assignmentDetails.subject} classes!</p>
          
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
          >
            <Download size={16} />
            Download as PDF
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border p-12 mb-12 print:shadow-none print:border-none print:w-full print:max-w-none print:p-0 print:m-0">
          
          {/* THE NEW DYNAMIC HEADER */}
          <div className="text-center mb-10 border-b pb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1 uppercase tracking-wide">
              {data.assignmentDetails.schoolName || "HALLMARK WORLD SCHOOL"}
            </h1>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase">
              {data.assignmentDetails.examination || "HALF YEARLY EXAMINATION"}
            </h2>
            <div className="flex justify-center items-center gap-6 text-sm font-semibold text-gray-700">
              <p>Subject: {data.assignmentDetails.subject}</p>
              {data.assignmentDetails.branch && (
                <>
                  <span className="text-gray-300">|</span>
                  <p>Branch: {data.assignmentDetails.branch}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-between font-semibold text-sm mb-4">
            <p>Time Allowed: <span className="font-normal border-b border-black inline-block w-24"></span></p>
            <p>Maximum Marks: {data.assignmentDetails.totalMarks}</p>
          </div>
          
          <div className="flex justify-between font-semibold text-sm mb-8">
            <p>All questions are compulsory unless stated otherwise.</p>
            {data.assignmentDetails.teacherName && (
              <p className="italic text-gray-600">Teacher: {data.assignmentDetails.teacherName}</p>
            )}
          </div>

          <div className="mb-12 space-y-3 font-semibold text-sm">
            <p>Name: <span className="inline-block w-64 border-b border-black"></span></p>
            <p>Roll Number: <span className="inline-block w-48 border-b border-black"></span></p>
            <p>Class & Section: <span className="inline-block w-48 border-b border-black"></span></p>
          </div>

          {/* Dynamic Section Rendering */}
          {data.sections.map((section: any, index: number) => (
            <div key={index} className="mb-12">
              <h3 className="text-xl font-bold mb-1">{section.sectionTitle}</h3>
              {/* This prints "Attempt any 3 questions" etc. */}
              {section.instructions && (
                <p className="text-sm font-bold text-gray-600 mb-6 border-l-4 border-gray-300 pl-3">Note: {section.instructions}</p>
              )}

              <div className="space-y-8">
                {section.questions.map((q: any, qIndex: number) => (
                  <div key={q.id} className="flex gap-4">
                    <span className="font-bold">{qIndex + 1}.</span>
                    <div className="flex-1 w-full">
                      
                      {/* Primary Question Text */}
                      {q.text && <p className="text-gray-900 mb-4 font-medium whitespace-pre-wrap">{q.text}</p>}

                      {/* LAYOUT: Multiple Choice / Assertion Reason */}
                      {q.options && q.options.length > 0 && (
                        <div className="space-y-3 pl-2 mb-4">
                          {q.options.map((opt: string, optIndex: number) => (
                            <div key={optIndex} className="flex items-center gap-3">
                              <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                              <span className="text-sm text-gray-700">{opt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* LAYOUT: Match the Following */}
                      {q.matchPairs && q.matchPairs.length > 0 && (
                        <div className="flex justify-between w-3/4 mb-6 pl-4 font-medium text-gray-800">
                          <div className="space-y-4">
                            <p className="font-bold border-b pb-1">Column A</p>
                            {q.matchPairs.map((pair: any, i: number) => (
                              <p key={`left-${i}`}>{i + 1}. {pair.left}</p>
                            ))}
                          </div>
                          <div className="space-y-4">
                            <p className="font-bold border-b pb-1">Column B</p>
                            {q.matchPairs.map((pair: any, i: number) => (
                              <p key={`right-${i}`}>{String.fromCharCode(97 + i)}. {pair.right}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* NEW: THE "OR" QUESTION INJECTOR */}
                      {q.orQuestionText && (
                        <div className="mb-4">
                          <div className="flex items-center my-4 opacity-60">
                            <div className="flex-grow border-t border-gray-400 border-dashed"></div>
                            <span className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">OR</span>
                            <div className="flex-grow border-t border-gray-400 border-dashed"></div>
                          </div>
                          <p className="text-gray-900 mb-4 font-medium whitespace-pre-wrap">{q.orQuestionText}</p>
                        </div>
                      )}

                      {/* LAYOUT: Writing Lines for Short/Long/Reasons */}
                      {["Short Questions", "Long Questions", "Give reasons", "Give examples", "Very Short Questions"].includes(section.type) && !q.options && (
                        <div className="mt-4 mb-6 space-y-6">
                          <div className="border-b border-gray-300 w-full"></div>
                          <div className="border-b border-gray-300 w-full"></div>
                          {section.type === "Long Questions" && (
                            <>
                              <div className="border-b border-gray-300 w-full"></div>
                              <div className="border-b border-gray-300 w-full"></div>
                            </>
                          )}
                        </div>
                      )}

                      {/* LAYOUT: Numerical Problems */}
                      {section.type === "Numerical Problems" && (
                        <div className="mt-4 mb-6 w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50/50">
                          <span className="text-gray-400 text-sm font-medium">Calculation Workspace</span>
                        </div>
                      )}

                    </div>

                    {/* Marks Tag */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-700 rounded border border-gray-200">
                        [{q.marks} Marks]
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