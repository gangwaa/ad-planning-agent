import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Mic, ArrowUp, Loader2, MessageSquare, Menu } from "lucide-react";
import { reasoningSteps } from "./data";
import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import SamplePrompts from "./components/SamplePrompts";

export default function AdPlanningAgentDonDraper() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activePrompt, setActivePrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showLineItems, setShowLineItems] = useState(false);
  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
      { id: 1, label: "Summer Sale Campaign", messages: [ {role: 'user', content: 'Plan a summer sale campaign.'}, {role: 'agent', content: 'Sure, here is the plan for the Summer Sale Campaign...'} ] },
      { id: 2, label: "Q4 Brand Awareness", messages: [ {role: 'user', content: 'Q4 brand awareness ideas?'}, {role: 'agent', content: 'For Q4, we should focus on...'} ] },
      { id: 3, label: "New Product Launch", messages: [ {role: 'user', content: 'Help me launch a new product.'}, {role: 'agent', content: 'Of course. What is the new product?'} ] },
  ]);

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
    const prompt = (typeof input === 'string' && input) || userInput;
    if (!prompt.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setUserInput("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessages((prev) => [...prev, { role: "agent", content: "Starting chain-of-thought reasoning..." }]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await displayReasoningSteps(reasoningSteps);
    setLoading(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    setActivePrompt(null);
  };

  const handleSelectAgent = (agentName) => {
    setMessages([
      { role: 'agent', content: `Hello! I am the ${agentName}. How can I assist you today?` }
    ]);
  };

  const handleSelectHistory = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
    }
  };

  const handlePromptClick = (prompt, idx) => {
    setActivePrompt(idx);
    setUserInput(prompt);
    setTimeout(() => handleSubmit(prompt), 100);
  };

  const chatInputForm = (
    <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Start with campaign here..."
          value={userInput}
          className="w-full bg-white border border-gray-300 rounded-2xl p-4 pr-20 shadow-sm focus:ring-2 focus:ring-primary"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="absolute right-2 flex items-center">
          <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
            <Mic className="h-5 w-5" />
          </Button>
          <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2">
            {loading ? (
              <div className="flex w-full justify-center items-end h-full">
                <span className="w-1 h-1 mx-px bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '0s' }}></span>
                <span className="w-1 h-1 mx-px bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1 h-1 mx-px bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '0.4s' }}></span>
              </div>
            ) : <ArrowUp className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar 
        expanded={sidebarExpanded} 
        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
        onNewChat={handleNewChat}
        onSelectAgent={handleSelectAgent}
        chatHistory={chatHistory}
        onSelectHistory={handleSelectHistory}
      />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarExpanded(true)}>
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
            <span className="text-lg font-semibold">Ad Planning Assistant</span>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-700" />
          </Button>
        </header>

        {messages.length === 0 ? (
          <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary-light to-white">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full mb-4 mx-auto bg-primary/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 12c-3.333 0-5.4-1.333-6-4h12c-.6 2.667-2.667 4-6 4zm0 0v8m-4-8s-1-4-4-4 0 4 0 4m8 0s1-4 4-4 0 4 0 4"/>
                  <path d="M12 2a2.828 2.828 0 012.828 2.828V8h-5.656V4.828A2.828 2.828 0 0112 2z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">What can I help with?</h1>
            </div>
            <div className="w-full px-4">
              {chatInputForm}
              <SamplePrompts
                activePrompt={activePrompt}
                onPromptClick={handlePromptClick}
              />
            </div>
          </main>
        ) : (
          <>
            <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-primary-light to-white">
              <ChatInterface
                messages={messages}
                bottomRef={bottomRef}
                showLineItems={showLineItems}
                onToggleLineItems={() => setShowLineItems(!showLineItems)}
              />
            </main>
            <footer className="p-4 border-t bg-white">
              {chatInputForm}
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
