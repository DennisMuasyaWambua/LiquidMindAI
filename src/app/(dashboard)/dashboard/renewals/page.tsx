import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { clients } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RenewalsPage() {
    const upcomingRenewals = clients
    .map(c => ({...c, renewalDateObj: new Date(c.renewalDate)}))
    .filter(c => c.renewalDateObj > new Date())
    .sort((a,b) => a.renewalDateObj.getTime() - b.renewalDateObj.getTime());


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Proactive Renewal Management</h1>
        <p className="text-muted-foreground">
          Track upcoming renewals and associated client risk scores to boost retention.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Renewals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Contract Value</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingRenewals.map((client) => {
                const daysLeft = Math.ceil((client.renewalDateObj.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                return (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.renewalDateObj.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={cn(daysLeft < 30 ? 'text-red-600 font-bold' : daysLeft < 90 ? 'text-yellow-600 font-semibold' : '')}>
                      {daysLeft} days
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(client.contractValue)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={client.riskScore > 70 ? 'destructive' : client.riskScore > 40 ? 'secondary' : 'default'}
                      className={cn(
                          client.riskScore > 70 ? 'bg-red-100 text-red-800' :
                          client.riskScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                      )}
                    >
                      {client.riskScore}%
                    </Badge>
                  </TableCell>
                   <TableCell>
                    <Link href={`/dashboard/clients/${client.id}`}>
                      <Button variant="outline" size="sm">View Client</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
