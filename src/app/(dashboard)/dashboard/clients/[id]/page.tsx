import { clients, type Client } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Briefcase,
  CircleDollarSign,
  MessageSquareWarning,
  BrainCircuit,
  FileText,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { predictUpsellCrossSell } from '@/ai/flows/upsell-cross-sell-predictions';
import { getClientDataForAI } from '@/lib/data';

async function AIEnhancedInsights({ client }: { client: Client }) {
  const clientDataForAI = getClientDataForAI(client.id);
  if (!clientDataForAI) return null;

  const predictions = await predictUpsellCrossSell({
    clientData: JSON.stringify(clientDataForAI),
    currentProducts: client.products.map(p => p.name).join(', '),
    businessGoals: 'Increase efficiency and reduce operational costs.',
  });

  return (
     <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="text-primary" />
          AI-Powered Insights
        </CardTitle>
        <CardDescription>
          Actionable recommendations based on client data and usage patterns.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Upsell Opportunities</h4>
          {predictions.upsellOpportunities.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {predictions.upsellOpportunities.map((opp, i) => <li key={`up-${i}`}>{opp}</li>)}
            </ul>
          ) : <p className="text-sm text-muted-foreground">No specific upsell opportunities identified.</p>}
        </div>
        <div>
          <h4 className="font-semibold mb-2">Cross-sell Opportunities</h4>
          {predictions.crossSellOpportunities.length > 0 ? (
           <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {predictions.crossSellOpportunities.map((opp, i) => <li key={`cross-${i}`}>{opp}</li>)}
            </ul>
          ) : <p className="text-sm text-muted-foreground">No specific cross-sell opportunities identified.</p>}
        </div>
        <div>
          <h4 className="font-semibold mb-2">Reasoning</h4>
          <p className="text-sm text-muted-foreground italic">"{predictions.reasoning}"</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ClientDetailsPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="company logo"/>
            <AvatarFallback className="text-2xl">{client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">{client.name}</h1>
            <p className="text-muted-foreground">{client.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
             <p className="text-sm text-muted-foreground">Risk Score</p>
             <p className={cn("text-2xl font-bold", client.riskScore > 70 ? 'text-red-500' : client.riskScore > 40 ? 'text-yellow-500' : 'text-green-500')}>{client.riskScore}%</p>
          </div>
          <div className="text-right">
             <p className="text-sm text-muted-foreground">Renewal Date</p>
             <p className="text-lg font-semibold">{new Date(client.renewalDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIEnhancedInsights client={client}/>

               <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-primary" />
                    Contract Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                   <div className="flex justify-between">
                      <span className="text-muted-foreground">Contract Value</span>
                      <span className="font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(client.contractValue)}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-muted-foreground">Renewal Date</span>
                      <span className="font-semibold">{new Date(client.renewalDate).toLocaleDateString()}</span>
                   </div>
                </CardContent>
              </Card>
           </div>
        </TabsContent>
        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Briefcase className="inline-block mr-2 text-primary" />
                Products & Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.products.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>{product.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
           <Card>
            <CardHeader>
              <CardTitle>
                <CircleDollarSign className="inline-block mr-2 text-primary" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payment.amount)}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === 'Paid' ? 'default' : payment.status === 'Overdue' ? 'destructive' : 'secondary'}
                        className={cn(payment.status === 'Paid' && 'bg-green-100 text-green-800')}
                        >{payment.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="issues" className="mt-4">
           <Card>
            <CardHeader>
              <CardTitle>
                <MessageSquareWarning className="inline-block mr-2 text-primary" />
                Problem Log
              </CardTitle>
            </CardHeader>
            <CardContent>
               {client.issues.length > 0 ? (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Summary</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {client.issues.map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell>{new Date(issue.reportedDate).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{issue.summary}</TableCell>
                          <TableCell>
                            <Badge variant={issue.priority === 'High' ? 'destructive' : 'secondary'}>{issue.priority}</Badge>
                          </TableCell>
                          <TableCell>
                              <Badge variant={issue.status === 'Resolved' ? 'default' : issue.status === 'Open' ? 'destructive' : 'secondary'}
                                className={cn(issue.status === 'Resolved' && 'bg-green-100 text-green-800', issue.status === 'In Progress' && 'bg-blue-100 text-blue-800' )}
                              >
                                {issue.status}
                              </Badge>
                          </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
               ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No issues reported. Great!</p>
                </div>
               )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
