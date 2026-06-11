"use client";

import { useState, useRef } from 'react';
import { 
  ArrowLeft, Bell, CloudUpload, Calendar, ChevronDown, Plus, Minus, Mic, ArrowRight, X, LogOut, User, Settings, BookOpen, MapPin, GraduationCap
} from 'lucide-react';

export default function AssignmentForm({ onGenerateStart, onGenerateSuccess }: { onGenerateStart: () => void, onGenerateSuccess: (data: any) => void }) {
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // NEW STATE PROPERTIES: attemptCount and hasOrChoice
  const [questionRows, setQuestionRows] = useState([
    { id: 1, type: "Multiple Choice Questions", count: 4, attemptCount: 4, marks: 1, extraParam: 2, hasOrChoice: false }
  ]);
  
  const [dueDate, setDueDate] = useState("");
  const [subject, setSubject] = useState(""); 
  const [branchName, setBranchName] = useState(""); // NEW
  const [teacherName, setTeacherName] = useState(""); // NEW
  const [additionalInfo, setAdditionalInfo] = useState("");
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      type: "Short Questions",
      count: 1,
      attemptCount: 1,
      marks: 2,
      extraParam: 2,
      hasOrChoice: false
    };
    setQuestionRows([...questionRows, newRow]);
  };

  const deleteRow = (idToRemove: number) => {
    if (questionRows.length > 1) {
      setQuestionRows(questionRows.filter(row => row.id !== idToRemove));
    }
  };

  // UPDATED: Now supports 0.25 increments for marks, and handles attempt limits
  const updateNumber = (id: number, field: 'count' | 'attemptCount' | 'marks' | 'extraParam', amount: number) => {
    setQuestionRows(questionRows.map(row => {
      if (row.id === id) {
        let newValue = parseFloat((row[field] + amount).toFixed(2)); 
        const minVal = field === 'marks' ? 0.25 : 1; 
        newValue = Math.max(minVal, newValue);

        // Logic to ensure Attempt Count doesn't exceed Total Count
        if (field === 'count') {
          return { ...row, count: newValue, attemptCount: Math.min(row.attemptCount, newValue) };
        }
        if (field === 'attemptCount') {
          return { ...row, attemptCount: Math.min(row.count, newValue) };
        }
        
        return { ...row, [field]: newValue };
      }
      return row;
    }));
  };

  const toggleOrChoice = (id: number) => {
    setQuestionRows(questionRows.map(row => 
      row.id === id ? { ...row, hasOrChoice: !row.hasOrChoice } : row
    ));
  };

  const totalQuestions = questionRows.reduce((sum, row) => sum + row.count, 0);
  // Calculate marks based on what students ATTEMPT, not total generated
  const totalMarks = questionRows.reduce((sum, row) => sum + (row.attemptCount * row.marks), 0);

  const handleNextClick = async () => {
    onGenerateStart();
    
    const finalPayload = {
      subject: subject,
      branchName: branchName, // NEW
      teacherName: teacherName, // NEW
      dueDate: dueDate,
      instructions: additionalInfo,
      totals: {
        questions: totalQuestions,
        marks: totalMarks
      },
      sections: questionRows
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(finalPayload));
    
    if (selectedFile) {
      formData.append('document', selectedFile);
    }

    try {
      const response = await fetch("https://veda-ai-backend-y2fu.onrender.com/api/generate", {
        method: "POST",
        body: formData, 
      });

      const data = await response.json();
      
      if (data.status === "success") {
        onGenerateSuccess(data.data); 
      } else {
        alert("Something went wrong!");
      }

    } catch (error) {
      console.error("Connection error:", error);
      alert("Could not connect to the backend server. Is it running?");
    }
  };

  return (
    <div className="flex-1 bg-[#f8f9fa] rounded-none sm:rounded-2xl flex flex-col h-full overflow-hidden">
      
      <header className="flex justify-between items-center bg-white p-3 sm:p-4 border-b rounded-t-none sm:rounded-t-2xl">
        <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
          <button className="hover:bg-gray-100 p-1.5 sm:p-2 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <span className="font-medium text-sm sm:text-base">Assignment</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="text-gray-500 hover:text-orange-500 hover:bg-orange-50 p-1.5 sm:p-2 rounded-full transition-all relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
          </button>
          
          <div className="relative">
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 sm:p-1.5 sm:pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all"
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">HJ</div>
              <span className="hidden sm:block text-sm font-medium">Harsh Jaiswal</span>
              <ChevronDown size={16} className={`hidden sm:block text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                  <p className="text-sm font-bold text-gray-900">Harsh Jaiswal</p>
                  <p className="text-xs text-gray-500">B.Tech ECE • 2304166</p>
                </div>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"><User size={16} /> My Profile</a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"><Settings size={16} /> Account Settings</a>
                <div className="border-t border-gray-50 my-1"></div>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"><LogOut size={16} /> Sign Out</a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="mb-4 sm:mb-6 flex items-center gap-3">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Create Assignment</h1>
            <p className="text-xs sm:text-sm text-gray-500">Set up a new assignment for your students</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
          <h2 className="font-bold text-base sm:text-lg mb-1">Assignment Details</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Basic information about your assignment</p>

          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center text-center mb-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.txt" className="hidden" />
            <CloudUpload size={32} className={`${selectedFile ? 'text-green-500' : 'text-gray-400'} mb-2 sm:mb-3`} />
            <p className="font-medium text-sm sm:text-base text-gray-700">{selectedFile ? selectedFile.name : "Choose a file or drag & drop it here"}</p>
            <p className="text-xs text-gray-400 mb-3 sm:mb-4">PDF or TXT documents</p>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
              {selectedFile ? "Change File" : "Browse Files"}
            </button>
          </div>

          {/* NEW: BRANCH, TEACHER, SUBJECT, DATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Branch Name</label>
              <div className="relative">
                <input 
                  type="text" value={branchName} onChange={(e) => setBranchName(e.target.value)}
                  placeholder="e.g. Kaptanganj..." 
                  className="w-full border rounded-xl py-2.5 px-3 sm:px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <MapPin size={18} className="absolute right-3 sm:right-4 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Teacher's Name</label>
              <div className="relative">
                <input 
                  type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="e.g. Anjali Jaiswal" 
                  className="w-full border rounded-xl py-2.5 px-3 sm:px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <GraduationCap size={18} className="absolute right-3 sm:right-4 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <div className="relative">
                <input 
                  type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Science" 
                  className="w-full border rounded-xl py-2.5 px-3 sm:px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <BookOpen size={18} className="absolute right-3 sm:right-4 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Due Date</label>
              <div className="relative">
                <input 
                  type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                  placeholder="DD-MM-YYYY" 
                  className="w-full border rounded-xl py-2.5 px-3 sm:px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Calendar size={18} className="absolute right-3 sm:right-4 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            {questionRows.map((row) => (
              <div key={row.id} className="flex flex-col gap-3 mb-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="w-full md:flex-1 relative">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Question Type</label>
                    <select 
                      value={row.type}
                      onChange={(e) => setQuestionRows(questionRows.map(r => r.id === row.id ? { ...r, type: e.target.value } : r))}
                      className="w-full border rounded-xl py-2.5 px-3 sm:px-4 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option>Multiple Choice Questions</option>
                      <option>Fill in the blanks</option>
                      <option>True or False</option>
                      <option>Match the following</option>
                      <option>One word answers</option>
                      <option>Give examples</option> 
                      <option>Give reasons</option> 
                      <option>Assertion and Reason</option> 
                      <option>Very Short Questions</option>
                      <option>Short Questions</option>
                      <option>Long Questions</option>
                      <option>Diagram/Graph-Based Questions</option>
                      <option>Numerical Problems</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 sm:right-4 top-8 text-gray-400 pointer-events-none" />
                  </div>
                  
                  <div className="pt-5 flex items-center gap-4">
                    {/* NEW: OR Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={row.hasOrChoice} 
                        onChange={() => toggleOrChoice(row.id)}
                        className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
                      />
                      <span className="text-xs font-semibold text-gray-600">Add "OR" Option</span>
                    </label>

                    <button onClick={() => deleteRow(row.id)} className={`p-2 rounded-lg transition-colors ${questionRows.length > 1 ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-gray-200 cursor-not-allowed'}`}>
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {row.type === 'Give examples' && (
                    <div className="flex-1 min-w-[100px]">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Examples/Q</label>
                      <div className="flex items-center justify-between border border-orange-200 rounded-xl bg-orange-50 px-2 py-2">
                        <button onClick={() => updateNumber(row.id, 'extraParam', -1)} className="text-orange-500 p-1"><Minus size={14} /></button>
                        <span className="text-sm font-semibold text-orange-700">{row.extraParam}</span>
                        <button onClick={() => updateNumber(row.id, 'extraParam', 1)} className="text-orange-500 p-1"><Plus size={14} /></button>
                      </div>
                    </div>
                  )}

                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Total Generated</label>
                    <div className="flex items-center justify-between border rounded-xl bg-white px-2 py-2">
                      <button onClick={() => updateNumber(row.id, 'count', -1)} className="text-gray-400 p-1"><Minus size={14} /></button>
                      <span className="text-sm font-semibold">{row.count}</span>
                      <button onClick={() => updateNumber(row.id, 'count', 1)} className="text-gray-400 p-1"><Plus size={14} /></button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-xs font-semibold text-orange-500 mb-1">Attempt Count</label>
                    <div className="flex items-center justify-between border-2 border-orange-100 rounded-xl bg-white px-2 py-2">
                      <button onClick={() => updateNumber(row.id, 'attemptCount', -1)} className="text-orange-400 p-1"><Minus size={14} /></button>
                      <span className="text-sm font-bold text-orange-600">{row.attemptCount}</span>
                      <button onClick={() => updateNumber(row.id, 'attemptCount', 1)} className="text-orange-400 p-1"><Plus size={14} /></button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Marks (0.25 steps)</label>
                    <div className="flex items-center justify-between border rounded-xl bg-white px-2 py-2">
                      <button onClick={() => updateNumber(row.id, 'marks', -0.25)} className="text-gray-400 p-1"><Minus size={14} /></button>
                      <span className="text-sm font-semibold">{row.marks}</span>
                      <button onClick={() => updateNumber(row.id, 'marks', 0.25)} className="text-gray-400 p-1"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <button onClick={addRow} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 hover:text-orange-600 transition-colors mb-6">
            <div className="bg-gray-900 text-white rounded-full p-1"><Plus size={12} /></div> Add Question Type
          </button>

          <div className="flex flex-col items-end text-xs sm:text-sm font-semibold text-gray-700 mb-6 sm:mb-8 border-t pt-4">
            <p className="mb-1 text-gray-500">Total Generated: {totalQuestions}</p>
            <p className="mb-1">Total to Attempt: {questionRows.reduce((sum, row) => sum + row.attemptCount, 0)}</p>
            <p className="text-orange-600">Total Marks: {totalMarks}</p>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
            <div className="relative">
              <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={3} className="w-full border bg-gray-50 rounded-xl py-2.5 px-3 sm:px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"></textarea>
              <Mic size={18} className="absolute right-3 sm:right-4 bottom-3 text-gray-400 cursor-pointer hover:text-gray-700" />
            </div>
          </div>

        </div>
      </div>

      <div className="bg-white border-t p-3 sm:p-4 flex justify-between items-center rounded-b-none sm:rounded-b-2xl">
        <button className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 border rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
          <ArrowLeft size={16} /> <span className="hidden sm:inline">Previous</span>
        </button>
        <button onClick={handleNextClick} className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-900 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">
          Next <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}