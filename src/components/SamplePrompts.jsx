import React from 'react';
import { Button } from "@/components/ui/button";
import { samplePrompts } from "../data";

export default function SamplePrompts({ activePrompt, onPromptClick }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {samplePrompts.map((prompt, idx) => (
        <Button
          key={idx}
          variant="outline"
          className={`text-xs px-3 py-1.5 rounded-full whitespace-normal text-center shrink-0 bg-white/70 border-gray-300 hover:bg-white ${activePrompt === idx ? 'bg-white border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => onPromptClick(prompt, idx)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
} 