'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clients, getClientDataForAI } from '@/lib/data';
import { predictUpsellCrossSell, type PredictUpsellCrossSellOutput } from '@/ai/flows/upsell-cross-sell-predictions';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function GrowthPage() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<PredictUpsellCrossSellOutput | null>(null);

  const handlePrediction = async () => {
    if (!selectedClientId) return;
    setIsLoading(true);
    setPredictions(null);

    const client = clients.find(c => c.id === selectedClientId);
    if (!client) {
        setIsLoading(false);
        return;
    }
    
    const clientDataForAI = getClientDataForAI(client.id);
    if (!clientDataForAI) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await predictUpsellCrossSell({
        clientData: JSON.stringify(clientDataForAI),
        currentProducts: client.products.map(p => p.name).join(', '),
        businessGoals: 'Increase efficiency and expand capabilities.',
      });
      setPredictions(result);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedClient = clients.find(c => c.id === selectedClientId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Predictive Sales & Marketing</h1>
        <p className="text-muted-foreground">
          Identify clients with high propensity for upsells and cross-sells using AI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opportunity Finder</CardTitle>
          <CardDescription>Select a client to generate actionable recommendations.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
          <Select onValueChange={setSelectedClientId}>
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handlePrediction} disabled={!selectedClientId || isLoading}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Analyzing...' : 'Generate Recommendations'}
          </Button>
        </CardContent>
      </Card>
      
      {isLoading && (
         <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
               <Skeleton className="h-4 w-1/4 mt-4" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
         </Card>
      )}

      {predictions && selectedClient && (
        <Card className="bg-gradient-to-br from-primary/5 to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="text-primary" />
              AI Recommendations for {selectedClient.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Upsell Opportunities</h3>
              {predictions.upsellOpportunities.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {predictions.upsellOpportunities.map((opp, i) => <li key={`up-${i}`}>{opp}</li>)}
                </ul>
              ) : <p className="text-sm text-muted-foreground">No specific upsell opportunities identified at this time.</p>}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Cross-sell Opportunities</h3>
              {predictions.crossSellOpportunities.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {predictions.crossSellOpportunities.map((opp, i) => <li key={`cross-${i}`}>{opp}</li>)}
                </ul>
              ) : <p className="text-sm text-muted-foreground">No specific cross-sell opportunities identified at this time.</p>}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">AI Reasoning</h3>
              <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
                {predictions.reasoning}
              </blockquote>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
