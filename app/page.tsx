"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AssignmentForm from "@/components/AssignmentForm";
import AssignmentOutput from "@/components/AssignmentOutput";
import AssignmentSkeleton from "@/components/AssignmentSkeleton";
import AssignmentsDashboard from "@/components/AssignmentsDashboard";

export default function Home() {
  const [activeSidebarTab, setActiveSidebarTab] = useState('Assignments');
  const [currentView, setCurrentView] = useState('dashboard');
  
  const [generatedData, setGeneratedData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // NEW: Our Global Database! Starts empty.
  const [assignmentsList, setAssignmentsList] = useState<any[]>([]);

  const handleNavClick = (tabName: string) => {
    setActiveSidebarTab(tabName);
    if (tabName !== 'Create') {
      setCurrentView('dashboard');
    }
  };

  const handleCreateClick = () => {
    setCurrentView('form');
  };

  return (
    <div className="flex h-screen p-4 gap-4 bg-white">
      <div className="print:hidden">
        <Sidebar 
          activeTab={activeSidebarTab} 
          onTabChange={handleNavClick} 
          onCreateClick={handleCreateClick} 
        />
      </div>
      
      <div className="flex-1 min-w-0">
        {currentView === 'dashboard' && (
          <AssignmentsDashboard 
            assignments={assignmentsList} // Feed it the real data
            onCreateClick={handleCreateClick} 
            onViewAssignment={(fullAssignmentData) => {
              // When they click a card, load that data and show the output!
              setGeneratedData(fullAssignmentData);
              setCurrentView('output');
            }}
          />
        )}

        {currentView === 'form' && (
          isGenerating ? (
            <AssignmentSkeleton />
          ) : (
            <AssignmentForm 
              onGenerateStart={() => setIsGenerating(true)} 
              onGenerateSuccess={(data) => {
                
                // NEW: Package the new AI paper into a grid card
                const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
                const subject = data.assignmentDetails.subject || "General Assignment";
                
                const newAssignmentCard = {
                  id: Date.now(), // unique ID
                  title: `Quiz on ${subject}`,
                  assigned: today,
                  due: data.assignmentDetails.dueDate || "Not Set",
                  fullData: data // We hide the entire AI JSON inside the card!
                };

                // Add the new card to the top of our global list
                setAssignmentsList([newAssignmentCard, ...assignmentsList]);

                // Show the output screen
                setGeneratedData(data);
                setIsGenerating(false);
                setCurrentView('output'); 
              }} 
            />
          )
        )}

        {currentView === 'output' && generatedData && (
          <AssignmentOutput 
            data={generatedData} 
            onBack={() => setCurrentView('dashboard')} // Go back to dashboard, not the form!
          />
        )}
      </div>
      
    </div>
  );
}