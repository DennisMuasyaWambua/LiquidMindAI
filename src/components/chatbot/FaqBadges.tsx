'use client';

import { Badge } from '@/components/ui/badge';
import { MessageSquareQuote } from 'lucide-react';

type Faq = {
  question: string;
  answer: string;
};

type FaqBadgesProps = {
  faqs: Faq[];
  onFaqClick: (question: string, answer: string) => void;
};

export function FaqBadges({ faqs, onFaqClick }: FaqBadgesProps) {
  return (
    <div className="p-4 border-t border-border mt-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
        <MessageSquareQuote className="size-4" />
        Frequently Asked Questions
      </h3>
      <div className="flex flex-wrap gap-2">
        {faqs.map((faq, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
            onClick={() => onFaqClick(faq.question, faq.answer)}
          >
            {faq.question}
          </Badge>
        ))}
      </div>
    </div>
  );
}
