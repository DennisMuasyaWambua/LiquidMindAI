'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, User, Bot, RefreshCcw, AlertTriangle } from 'lucide-react';
import { ChatMessage, type Message } from './ChatMessage';
import faqs from '@/lib/faqs.json';
import { FaqBadges } from './FaqBadges';

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm your personal AI assistant from LiquidMind AI. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const [showFaqs, setShowFaqs] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleFaqClick = (question: string, answer: string) => {
    setShowFaqs(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
    };
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: answer,
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setShowFaqs(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://whatsappinventoryragbot-production.up.railway.app/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });
      
      if (!response.ok) {
        throw new Error('API response was not ok.');
      }
      
      const result = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response || "I'm sorry, I couldn't find an answer to that.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling chat API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEscalate = () => {
    setIsEscalated(true);
    const escalationMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'system',
      content:
        'Connecting you to a human agent... All chat history and your client context have been passed along.',
    };
    setMessages((prev) => [...prev, escalationMessage]);
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content:
          "Hello! I'm your personal AI assistant from LiquidMind AI. How can I help you today?",
      },
    ]);
    setIsEscalated(false);
    setShowFaqs(true);
  }

  return (
    <Card className="w-full max-w-2xl h-[70vh] flex flex-col shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              <Bot />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline">AI Assistant</CardTitle>
        </div>
        <div className="flex gap-2">
         {!isEscalated && (
            <Button variant="outline" size="sm" onClick={handleEscalate} disabled={isLoading}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Escalate
            </Button>
         )}
          <Button variant="ghost" size="icon" onClick={handleReset}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <ChatMessage
                message={{
                  id: 'loading',
                  role: 'assistant',
                  content: '...',
                }}
                isLoading
              />
            )}
             {showFaqs && <FaqBadges faqs={faqs.faqs} onFaqClick={handleFaqClick} />}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        {isEscalated ? (
            <div className='text-center w-full text-sm text-muted-foreground p-4 bg-muted rounded-md'>
                A human agent will be with you shortly. You can close this chat.
            </div>
        ) : (
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        )}
      </CardFooter>
    </Card>
  );
}
