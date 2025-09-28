import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Bot, BarChart, BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-3 rounded-full mb-4">
          <BrainCircuit className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">
          ClarityFlow AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A smart, AI-powered platform for actionable business intelligence.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BarChart className="text-accent" />
              <span className="font-headline">Internal Insights Dashboard</span>
            </CardTitle>
            <CardDescription>
              Unified data and actionable intelligence for your teams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-sm text-foreground/80">
              Access 360-degree client views, renewal alerts, sales predictions,
              and financial optimization tools.
            </p>
            <Link href="/dashboard" passHref>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Bot className="text-accent" />
              <span className="font-headline">Client-Facing Chatbot</span>
            </CardTitle>
            <CardDescription>
              Instant, personalized support for your external customers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-sm text-foreground/80">
              Experience our AI chatbot with contextual personalization and
              seamless agent escalation.
            </p>
            <Link href="/chatbot" passHref>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Launch Chatbot
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
