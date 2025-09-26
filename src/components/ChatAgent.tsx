"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  Mic, 
  Plus, 
  Zap,
  Bot,
  User,
  Loader2
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  thinking?: boolean;
}

interface ChatAgentProps {
  agentType: 'data-cleaning' | 'lead-to-cash';
}

export function ChatAgent({ agentType }: ChatAgentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: `Hello! I'm your ${agentType === 'data-cleaning' ? 'Data Cleaning' : 'Lead-to-Cash'} AI agent. I can help you analyze your data, identify issues, and recommend solutions. What would you like to work on today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const agentResponses = {
    'data-cleaning': {
      'duplicate': "I've analyzed your data and found several potential duplicates. Let me run a comprehensive scan to identify accounts with similar names, email domains, or contact information. This usually takes 2-3 minutes.",
      'clean': "I'll start a data cleaning process for you. First, I'll scan for duplicates, then check for missing information, and finally standardize formats. Shall I proceed?",
      'analyze': "Starting data quality analysis now. I'm checking for: 1) Duplicate records, 2) Missing required fields, 3) Invalid email formats, 4) Inconsistent naming conventions. Results will be ready shortly.",
      'default': "I can help you with data cleaning tasks like finding duplicates, standardizing formats, or identifying missing information. What specific data issues are you experiencing?"
    },
    'lead-to-cash': {
      'revenue': "I'll analyze your revenue leakage patterns. Let me examine contract vs invoice discrepancies, missing upsells, and billing delays. This analysis typically reveals 5-15% revenue recovery opportunities.",
      'pipeline': "Analyzing your sales pipeline now. I'm looking at conversion rates, deal velocity, and potential bottlenecks. I'll also check for any revenue leakage between opportunity and invoice stages.",
      'contract': "I can analyze contracts for billing discrepancies. Please upload your contract documents and I'll compare them against your invoicing data to identify any revenue leakage.",
      'default': "I can help analyze your lead-to-cash process, identify revenue leakage, and optimize your sales pipeline. What aspect would you like to focus on?"
    }
  };

  const getAgentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const responses = agentResponses[agentType];
    
    if (agentType === 'data-cleaning') {
      const dataResponses = responses as typeof agentResponses['data-cleaning'];
      if (lowerMessage.includes('duplicate')) {
        return dataResponses.duplicate;
      }
      if (lowerMessage.includes('clean') || lowerMessage.includes('cleaning')) {
        return dataResponses.clean;
      }
      if (lowerMessage.includes('analyze') || lowerMessage.includes('analysis')) {
        return dataResponses.analyze;
      }
      return dataResponses.default;
    } else {
      const leadResponses = responses as typeof agentResponses['lead-to-cash'];
      if (lowerMessage.includes('revenue') || lowerMessage.includes('leakage')) {
        return leadResponses.revenue;
      }
      if (lowerMessage.includes('pipeline') || lowerMessage.includes('sales')) {
        return leadResponses.pipeline;
      }
      if (lowerMessage.includes('contract') || lowerMessage.includes('invoice')) {
        return leadResponses.contract;
      }
      return leadResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);

    // Simulate thinking time
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: getAgentResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentResponse]);
      setIsThinking(false);
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 gradient-lovable rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">
              {agentType === 'data-cleaning' ? 'Data Cleaning Agent' : 'Lead-to-Cash Agent'}
            </CardTitle>
            <CardDescription className="text-sm">
              AI-powered assistant • Online
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'agent' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="gradient-lovable text-white text-xs">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      message.type === 'user'
                        ? 'gradient-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 px-1">
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.type === 'user' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="gradient-lovable text-white text-xs">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-muted-foreground">Agent is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <Button variant="outline" size="sm" className="text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Add tools
            </Button>
            <Badge variant="secondary" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              AI-generated content. Verify before using.
            </Badge>
          </div>
          
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What do you need help with?"
                className="pr-12 min-h-[44px] resize-none"
                disabled={isThinking}
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11"
              disabled={isThinking}
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="h-11 w-11"
              disabled={!inputValue.trim() || isThinking}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}