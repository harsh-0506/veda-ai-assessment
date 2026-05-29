import { ArrowLeft, Bell, ChevronDown } from 'lucide-react';

export default function AssignmentSkeleton() {
  return (
    <div className="flex-1 bg-[#f8f9fa] rounded-2xl flex flex-col h-full overflow-hidden animate-pulse">
      
      {/* Top Header (Matches the real one) */}
      <header className="flex justify-between items-center bg-white p-4 border-b rounded-t-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
        </div>
        
        <div className="flex items-center gap-4">
          <Bell size={20} className="text-gray-300" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            <ChevronDown size={16} className="text-gray-300" />
          </div>
        </div>
      </header>

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
        
        {/* Dark Banner Skeleton */}
        <div className="w-full max-w-4xl bg-gray-300 h-20 rounded-2xl mb-8"></div>

        {/* The Paper Skeleton */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border p-12 mb-12">
          
          {/* School Header Lines */}
          <div className="flex flex-col items-center gap-3 mb-10 border-b pb-8">
            <div className="h-8 w-3/4 bg-gray-200 rounded-md"></div>
            <div className="h-5 w-1/3 bg-gray-200 rounded-md"></div>
          </div>

          {/* Details Lines */}
          <div className="flex justify-between mb-8">
            <div className="h-4 w-1/4 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-1/4 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-4 w-1/2 bg-gray-200 rounded-md mb-12"></div>

          {/* Student Info Lines */}
          <div className="space-y-4 mb-16">
            <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-56 bg-gray-200 rounded-md"></div>
          </div>

          {/* Mock Questions Generation */}
          {[1, 2, 3].map((sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <div className="flex flex-col items-center gap-2 mb-8">
                <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
              </div>

              <div className="space-y-8">
                {[1, 2].map((qIndex) => (
                  <div key={qIndex} className="flex gap-4">
                    <div className="h-5 w-5 bg-gray-300 rounded-md shrink-0"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
                      <div className="space-y-2 mt-4 pl-2">
                        <div className="h-3 w-1/3 bg-gray-100 rounded-md"></div>
                        <div className="h-3 w-1/4 bg-gray-100 rounded-md"></div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <div className="h-6 w-16 bg-gray-200 rounded-md"></div>
                      <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}