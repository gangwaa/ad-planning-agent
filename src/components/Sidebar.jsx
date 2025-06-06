import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, PenSquare, Search, Library, MessageSquare } from "lucide-react";
import logo from "./logo.png";

export default function Sidebar({ 
    expanded, 
    onToggle,
    onNewChat,
    onSelectAgent,
    chatHistory,
    onSelectHistory
}) {
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (window.innerWidth < 768 && expanded && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onToggle();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [expanded, onToggle]);
    
    const commonClasses = "bg-primary-light/30 flex flex-col transition-transform duration-300 border-r border-gray-200 z-10";
    const responsiveClasses = "fixed md:relative h-full";

    const expandedClasses = "w-64 p-4 translate-x-0";
    const collapsedClasses = "w-20 p-2 items-center md:translate-x-0 -translate-x-full";
    const collapsedDesktopClasses = "md:w-20 md:p-2 md:items-center";

    const topLinks = [
        { icon: <PenSquare className="h-5 w-5" />, label: "New chat", action: onNewChat },
        { icon: <Search className="h-5 w-5" />, label: "Search chats" },
        { icon: <Library className="h-5 w-5" />, label: "Library" },
    ];

    const agentCategories = [
        { title: "Planning", agents: ["Ad Setup Agent"] },
        { title: "Ad Server", agents: ["Freewheel", "Springserve"] },
        { title: "Analyst", agents: ["Analyze data"] },
    ];
    
    if (!expanded) {
        return (
            <div ref={sidebarRef} className={`${commonClasses} ${responsiveClasses} ${collapsedClasses} ${collapsedDesktopClasses}`}>
                <Button variant="ghost" size="icon" onClick={onToggle} className="text-gray-700 hover:bg-gray-200/50 rounded-lg self-end hidden md:flex">
                    <ChevronRight className="h-6 w-6" />
                </Button>
                <div className="mt-8 space-y-2 flex flex-col items-center">
                    {topLinks.map((link, index) => (
                        <Button key={index} variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200/50 rounded-lg w-12 h-12" onClick={link.action}>
                            {link.icon}
                        </Button>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div ref={sidebarRef} className={`${commonClasses} ${responsiveClasses} ${expandedClasses}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                    <span className="text-lg font-semibold text-gray-800 ml-2">Don Draper</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onToggle} className="text-gray-700 hover:bg-gray-200/50 rounded-lg">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
            </div>

            <div className="mt-8">
                {topLinks.map((link, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start text-base font-normal text-gray-700 hover:bg-gray-200/50 mb-2 py-5 px-4 rounded-lg" onClick={link.action}>
                        {link.icon}
                        <span className="ml-4">{link.label}</span>
                    </Button>
                ))}
            </div>

            <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase px-4 mb-2">Agents</h3>
                {agentCategories.map((category, index) => (
                    <div key={index} className="mb-2">
                        <h4 className="text-xs font-semibold text-gray-600 px-4 mb-2">{category.title}</h4>
                        <ul>
                            {category.agents.map((agent, agentIndex) => (
                                <li key={agentIndex}>
                                    <Button variant="ghost" className="w-full justify-start text-sm font-normal text-gray-700 hover:bg-gray-200/50 py-2 px-4 rounded-lg" onClick={() => onSelectAgent(agent)}>
                                        {agent}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-300">
                <h3 className="text-sm font-semibold text-gray-500 uppercase px-4 mb-2">History</h3>
                <ul>
                    {chatHistory.map((chat) => (
                        <li key={chat.id}>
                            <Button variant="ghost" className="w-full justify-start text-sm font-normal text-gray-700 hover:bg-gray-200/50 py-2 px-4 rounded-lg truncate" onClick={() => onSelectHistory(chat.id)}>
                                <MessageSquare className="h-4 w-4" />
                                <span className="ml-4">{chat.label}</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 