import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { clients } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Clients</h1>
        <p className="text-muted-foreground">
          Manage and view detailed information about your clients.
        </p>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="hidden sm:table-cell">Company</TableHead>
              <TableHead className="hidden md:table-cell">Contract Value</TableHead>
              <TableHead className="hidden md:table-cell">Risk Score</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="company logo" />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{client.name}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{client.company}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(client.contractValue)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
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
                <TableCell className="text-right">
                  <Link href={`/dashboard/clients/${client.id}`} passHref>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">View Client</span>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
