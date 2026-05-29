"use client";

import { 
  LayoutGrid, 
  Users, 
  FileText, 
  BookOpen, 
  Clock, 
  Settings, 
  ChevronDown, 
  Sparkles
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  onTabChange, 
  onCreateClick 
}: { 
  activeTab: string, 
  onTabChange: (tab: string) => void, 
  onCreateClick: () => void 
}) {
  
  const mainMenuItems = [
    { name: 'Home', icon: LayoutGrid },
    { name: 'My Groups', icon: Users },
    { name: 'Assignments', icon: FileText, badge: '10' },
    { name: 'AI Teacher\'s Toolkit', icon: BookOpen },
    { name: 'My Library', icon: Clock },
  ];

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col p-4 shrink-0">
      
      {/* Logo Area */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="bg-orange-600 text-white p-1.5 rounded-lg font-bold text-xl leading-none">V</div>
        <span className="text-xl font-bold tracking-tight">VedaAI</span>
      </div>

      {/* Wire up the Create Button */}
      <button 
        onClick={onCreateClick}
        className="bg-[#111827] text-white flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold mb-8 hover:bg-gray-800 transition-colors shadow-sm"
      >
        <Sparkles size={18} className="text-orange-400" />
        Create Assignment
      </button>

      {/* Main Navigation Engine */}
      <nav className="flex-1 space-y-1">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onTabChange(item.name)} 
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gray-100 text-gray-900 font-bold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? 'text-gray-900' : 'text-gray-400'} />
                <span>{item.name}</span>
              </div>
              
              {item.badge && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
                  isActive ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="mt-auto border-t pt-4 space-y-1">
        
        {/* Settings Button */}
        <button
          onClick={() => onTabChange('Settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeTab === 'Settings' 
              ? 'bg-gray-100 text-gray-900 font-bold' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
          }`}
        >
          <Settings size={20} className={activeTab === 'Settings' ? 'text-gray-900' : 'text-gray-400'} />
          <span>Settings</span>
        </button>

        {/* User Profile Block */}
        <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 rounded-2xl border border-transparent hover:border-gray-200 transition-all group mt-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
              HJ
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900 leading-none mb-1">Harsh Jaiswal</p>
              <p className="text-xs text-gray-500 leading-none">NIT Patna</p>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronDown size={16} className="text-gray-400 -rotate-90" />
          </div>
        </div>

      </div>
    </div>
  );
}