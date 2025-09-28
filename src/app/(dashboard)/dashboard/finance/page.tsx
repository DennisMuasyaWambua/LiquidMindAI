'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';
import { financialData, sampleTransactionData } from '@/lib/data';
import { financialAnomalyDetection, type FinancialAnomalyDetectionOutput } from '@/ai/flows/financial-anomaly-detection';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function FinancePage() {
  const [dataToAnalyze, setDataToAnalyze] = useState(sampleTransactionData);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FinancialAnomalyDetectionOutput | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await financialAnomalyDetection({
        financialData: dataToAnalyze,
        dataDescription: "A CSV of financial transactions with columns: Date, Amount, Vendor, Category, Status.",
      });
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Financial Optimization</h1>
        <p className="text-muted-foreground">
          Real-time dashboards and AI-powered anomaly flagging for better financial planning.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Health Dashboard</CardTitle>
          <CardDescription>Monthly Revenue, Expenses, and Profit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData.profit}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                <Bar dataKey="profit" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Anomaly Detection</CardTitle>
          <CardDescription>
            Input financial data (e.g., CSV format) to have the AI identify potential anomalies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your financial data here..."
            className="min-h-[200px] font-code text-sm"
            value={dataToAnalyze}
            onChange={(e) => setDataToAnalyze(e.target.value)}
          />
          <Button onClick={handleAnalyze} disabled={isLoading}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Analyzing...' : 'Find Anomalies'}
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <AlertTriangle className="text-accent" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-amber-800">
            <div>
              <h3 className="font-semibold text-lg mb-2">Detected Anomalies</h3>
              <p className="text-sm">{analysisResult.anomalies}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Summary</h3>
              <p className="text-sm">{analysisResult.summary}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
