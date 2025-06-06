import React from 'react';
import { Button } from "@/components/ui/button";
import { samplePrompts } from "../data";

export default function SamplePrompts({ activePrompt, onPromptClick }) {
  return (
    <div className="flex gap-3 justify-start items-center rounded-2xl bg-[#e3f1ef] p-4 shadow-sm border border-gray-200 mb-4 text-xs leading-snug overflow-x-auto scroll-smooth">
      {samplePrompts.map((prompt, idx) => (
        <Button
          key={idx}
          variant="outline"
          className={`text-xs px-4 py-2 rounded-2xl whitespace-normal break-words text-center shrink-0 ${activePrompt === idx ? 'bg-[#c2e2db] border-[#3b8570]' : ''}`}
          onClick={() => onPromptClick(prompt, idx)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
} 