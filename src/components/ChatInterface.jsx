import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lineItems, isConfirmation } from "../data";
import { User, Briefcase } from 'lucide-react';
import LineItemTable from './LineItemTable';

const DonDraperAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
        <Briefcase className="w-5 h-5 text-primary" />
    </div>
);

const UserAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3">
        <User className="w-5 h-5 text-gray-600" />
    </div>
);

export default function ChatInterface({
  messages,
  userInput,
  onUserInput,
  onSubmit,
  loading,
  showLineItems,
  onToggleLineItems,
  bottomRef
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const headers = Object.keys(lineItems[0]).join('\t');
    const tableData = lineItems.map(item => Object.values(item).join('\t')).join('\n');
    const fullTable = `${headers}\n${tableData}`;

    navigator.clipboard.writeText(fullTable).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="space-y-4 pt-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex items-start ${msg.role === 'user' ? 'justify-end' : ''}`}
          >
            {msg.role === 'agent' && <DonDraperAvatar />}
            <div className={`border rounded-xl shadow-sm max-w-[85%] ${msg.role === "agent" ? "bg-white border-gray-200" : "bg-primary text-white border-primary"}`}>
              <div className={`p-4 whitespace-pre-wrap text-sm leading-snug ${isConfirmation(msg.content) ? 'bg-green-50 border-l-4 border-green-400 text-gray-800' : ''}`}>
                <div className={`uppercase tracking-wide mb-1 text-xs font-semibold ${msg.role === 'agent' ? 'text-gray-600' : 'text-primary-light'}`}>✧ Don Draper</div>
                {msg.content === "typing_indicator" ? (
                  <div className="flex space-x-1 animate-pulse">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  </div>
                ) : msg.content === "table_output" ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="text-xs px-3 py-1 rounded-xl border-[#3b8570] text-[#3b8570] flex items-center gap-2"
                        onClick={onToggleLineItems}
                      >
                        {showLineItems ? "Hide" : "Show"} <span className="text-xs">▶</span> Ad Server Line Items
                      </Button>
                      {showLineItems && (
                        <Button
                          variant="outline"
                          className="text-xs px-3 py-1 rounded-xl border-[#3b8570] text-[#3b8570] flex items-center gap-2"
                          onClick={handleCopy}
                        >
                          {copied ? "Copied!" : "Copy"}
                        </Button>
                      )}
                    </div>
                    {showLineItems && <LineItemTable />}
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                )}
              </div>
            </div>
            {msg.role === 'user' && <UserAvatar />}
          </motion.div>
        ))}
        <div ref={bottomRef}></div>
      </div>
    </>
  );
} 