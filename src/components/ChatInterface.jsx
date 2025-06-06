import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lineItems, isConfirmation } from "../data";

export default function ChatInterface({
  messages,
  userInput,
  onUserInput,
  onSubmit,
  loading,
  showLineItems,
  onToggleLineItems,
  chatContainerRef,
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
      <div className="flex-1 overflow-y-scroll space-y-4 pt-4" ref={chatContainerRef}>
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`border rounded-xl shadow-sm ${msg.role === "agent" ? "ml-auto max-w-[75%] bg-white border-gray-200" : "mr-auto max-w-[75%] bg-gray-50 border"}`}>
              <div className={`p-4 whitespace-pre-wrap text-sm leading-snug text-gray-800 ${isConfirmation(msg.content) ? 'bg-green-50 border-l-4 border-green-400' : ''}`}>
                <div className="text-sm text-gray-600 uppercase tracking-wide mb-1">✧ Neural</div>
                {msg.content === "typing_indicator" ? (
                  <div className="flex space-x-1 animate-pulse">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  </div>
                ) : msg.content === "table_output" ? (
                  <div className="bg-[#e3f1ef] rounded-xl p-3 border border-gray-300 text-sm">
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
                    {showLineItems && (
                      <div className="overflow-x-auto mt-4">
                        <table className="table-auto w-full text-sm mt-2 border rounded-xl overflow-hidden shadow">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border px-2 py-1">Line Item</th>
                              <th className="border px-2 py-1">Content</th>
                              <th className="border px-2 py-1">Geo</th>
                              <th className="border px-2 py-1">Device</th>
                              <th className="border px-2 py-1">Audience</th>
                              <th className="border px-2 py-1">Bid CPM</th>
                              <th className="border px-2 py-1">Daily Cap</th>
                              <th className="border px-2 py-1">Frequency Cap</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lineItems.map((item, i) => (
                              <tr key={i}>
                                <td className="border px-2 py-1 text-gray-700">{item.name}</td>
                                <td className="border px-2 py-1 text-gray-700">{item.content}</td>
                                <td className="border px-2 py-1 text-gray-700">{item.geo}</td>
                                <td className="border px-2 py-1 text-gray-700">{item.device}</td>
                                <td className="border px-2 py-1 text-gray-700">{item.audience}</td>
                                <td className="border px-2 py-1 text-gray-700">{item.bid}</td>
                                <td className="border px-2 py-1 text-gray-700">{item.cap}</td>
                                <td className="border px-2 py-1 text-gray-700">{item.freq}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>') }} />
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef}></div>
      </div>
    </>
  );
} 