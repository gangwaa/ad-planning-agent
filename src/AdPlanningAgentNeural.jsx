import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import { reasoningSteps } from "./data";
import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import SamplePrompts from "./components/SamplePrompts";

export default function AdPlanningAgentNeural() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activePrompt, setActivePrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLineItems, setShowLineItems] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const displayReasoningSteps = async (steps) => {
    
    for (let i = 0; i < steps.length; i++) {
      
      
      if (i === 1 || i === 2 || i === 4) {
        setMessages((prev) => [...prev, { role: "agent", content: "typing_indicator" }]);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setMessages((prev) => prev.filter((msg) => msg.content !== "typing_indicator"));
      }
      if (i === 4) {
        setMessages((prev) => [...prev, { role: "agent", content: "typing_indicator" }]);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setMessages((prev) => prev.filter((msg) => msg.content !== "typing_indicator"));
      }
      for (let j = 1; j <= steps[i].length; j++) {
        const partial = steps[i].slice(0, j);
        await new Promise((resolve) => setTimeout(resolve, 10));
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "agent" && last.partial) {
            return [...prev.slice(0, -1), { ...last, content: partial, partial: true }];
          }
          return [...prev, { role: "agent", content: partial, partial: true }];
        });
      }
      setMessages((prev) => {
        const confirmations = [
          "Campaign parameters identified.",
          "Historical patterns retrieved.",
          "Pricing insights gathered.",
          "Audience definition synthesized.",
          "Line items successfully constructed."
        ];
        const last = prev[prev.length - 1];
        if (last && last.partial) {
          return [...prev.slice(0, -1), { role: "agent", content: steps[i] }, { role: "agent", content: confirmations[i] }];
        }
        return [...prev, { role: "agent", content: confirmations[i] }];
      });
      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
    setMessages((prev) => [
      ...prev,
      { role: "agent", content: "table_output" },
      { role: "agent", content: "Campaign setup complete and configured in the ad server." }
    ]);
  };

  useEffect(() => {
  const handler = (event) => {
    if (typeof event.data === 'string' && event.data.toLowerCase().includes('yes')) {
      setMessages((prev) => [...prev, { role: "user", content: event.data }]);
    }
  };
  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}, []);

const handleSubmit = async (input) => {
    setLoading(true);
    const prompt = input || userInput;
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setUserInput("");
    setMessages((prev) => [...prev, { role: "agent", content: "Starting chain-of-thought reasoning..." }]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await displayReasoningSteps(reasoningSteps);
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full max-w-screen-lg mx-auto px-4">
      <Sidebar expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
      <div className="flex-1 flex flex-col p-6 pt-32 bg-gradient-to-br from-[#ecf4f3] to-[#e0f0ee] overflow-hidden relative">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
        <div className="text-3xl font-bold text-gray-800 text-center mb-8">Neural Ads</div>
        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 mb-4">
          <Input
            type="text"
            placeholder="Start with campaign here"
            value={userInput}
            className="flex-grow border-none focus:ring-0 shadow-none text-sm bg-gray-50 rounded-lg px-3 py-2"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">🎨 Creative</Button>
            <Button onClick={() => handleSubmit()} className="bg-[#3b8570] text-white text-sm px-4 py-2 rounded-full">
              {loading ? "Thinking..." : "Submit"}
            </Button>
          </div>
        </div>
        <SamplePrompts
          activePrompt={activePrompt}
          onPromptClick={(prompt, idx) => {
            setActivePrompt(idx);
            setUserInput(prompt);
            setTimeout(() => handleSubmit(prompt), 100);
          }}
        />
        <ChatInterface
          messages={messages}
          userInput={userInput}
          onUserInput={(e) => setUserInput(e.target.value)}
          onSubmit={() => handleSubmit()}
          loading={loading}
          showLineItems={showLineItems}
          onToggleLineItems={() => setShowLineItems(!showLineItems)}
          chatContainerRef={chatContainerRef}
          bottomRef={bottomRef}
        />
      </div>
    </div>
  );
}
