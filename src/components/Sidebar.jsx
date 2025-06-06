import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, ChevronRight, ChevronLeft } from "lucide-react";

export default function Sidebar({ expanded, onToggle }) {
  return (
    <div className={`transition-all duration-300 bg-white border-r border-gray-200 flex flex-col py-4 ${expanded ? 'w-48 px-4 items-start' : 'w-16 items-center'} max-w-[220px] mx-auto`}>
      <Button variant="ghost" size="icon" onClick={onToggle}>
        {expanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </Button>
      <Button variant="ghost" size="icon" className="mt-4">
        <Home className="h-5 w-5" />
        {expanded && <span className="ml-2 text-sm">Home</span>}
      </Button>
      <Button variant="ghost" size="icon">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 18h16" />
        </svg>
      </Button>
      {expanded && (
        <div className="mt-8 space-y-2 text-sm text-gray-700">
          <div className="cursor-pointer hover:underline">Creative Agent</div>
          <div className="cursor-pointer hover:underline">Campaign Troubleshooting</div>
        </div>
      )}
    </div>
  );
} 