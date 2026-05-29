import { Bell, ChevronDown, Search, Filter, MoreVertical } from 'lucide-react';

// NEW: Accept real assignments and a click handler from page.tsx!
export default function AssignmentsDashboard({ 
  assignments, 
  onCreateClick,
  onViewAssignment 
}: { 
  assignments: any[], 
  onCreateClick: () => void,
  onViewAssignment: (data: any) => void 
}) {

  return (
    <div className="flex-1 bg-[#f8f9fa] rounded-2xl flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 border-b rounded-t-2xl shrink-0">
        <div className="flex items-center gap-3 text-gray-600">
          <span className="font-medium text-gray-400">LayoutGrid /</span>
          <span className="font-medium">Assignments</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-orange-500 hover:bg-orange-50 p-2 rounded-full transition-all relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-full transition-all">
            <div className="h-8 w-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
              HJ
            </div>
            <span className="text-sm font-medium">Harsh Jaiswal</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        
        <div className="mb-6 flex items-center gap-3">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-none mb-1">Assignments</h1>
            <p className="text-sm text-gray-500">Manage and create assignments for your classes.</p>
          </div>
        </div>

        {assignments.length === 0 ? (
          // 0 State - Exactly as we built it
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-48 h-48 bg-gray-100 rounded-full mb-6 flex items-center justify-center relative">
              <div className="absolute w-full h-full border-4 border-dashed border-gray-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <span className="text-6xl">📄</span>
              <div className="absolute bottom-4 right-4 bg-red-100 text-red-500 rounded-full p-2">
                <span className="font-bold text-xl leading-none">×</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No assignments yet</h2>
            <p className="text-gray-500 max-w-md mb-8 text-sm">
              Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
            </p>
            <button 
              onClick={onCreateClick}
              className="bg-[#111827] text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              + Create Your First Assignment
            </button>
          </div>
        ) : (
          // Dynamic Grid State
          <>
            <div className="flex justify-between items-center bg-white p-2 rounded-xl border mb-6 shadow-sm">
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <Filter size={16} /> Filter By
              </button>
              <div className="relative w-96">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Assignment" 
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {assignments.map((assignment) => (
                <div 
                  key={assignment.id} 
                  onClick={() => onViewAssignment(assignment.fullData)} // NEW: Click to view!
                  className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-10">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{assignment.title}</h3>
                    <button className="text-gray-400 hover:text-gray-900 p-1">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-gray-900">
                    <p>Assigned on : <span className="font-medium text-gray-600">{assignment.assigned}</span></p>
                    <p>Due : <span className="font-medium text-gray-600">{assignment.due}</span></p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="sticky bottom-6 flex justify-center mt-8">
              <button 
                onClick={onCreateClick}
                className="bg-[#111827] text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2"
              >
                + Create Assignment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}