'use client';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, AlertCircle } from 'lucide-react';
import { BeatLoader } from 'react-spinners';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ChatMessageProps = {
  message: Message;
  isLoading?: boolean;
};

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const { role, content } = message;

  if (role === 'system') {
    return (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <AlertCircle className="size-4"/>
            <span>{content}</span>
        </div>
    )
  }

  const isAssistant = role === 'assistant';

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      {isAssistant && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <Bot />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-lg p-3 text-sm shadow-sm',
          isAssistant
            ? 'bg-card'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {isLoading ? (
          <BeatLoader size={8} color={isAssistant ? "hsl(var(--primary))" : "hsl(var(--primary-foreground))"} />
        ) : (
          content
        )}
      </div>
      {!isAssistant && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
