import { StatCard } from '@/components/dashboard/StatCard';
import {
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome Back, Admin!</h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your business performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value="1,254"
          icon={Users}
          change="+12.5%"
          changeType="increase"
          period="since last month"
        />
        <StatCard
          title="Upcoming Renewals"
          value="32"
          icon={FileText}
          period="in next 90 days"
        />
        <StatCard
          title="High-Risk Accounts"
          value="8"
          icon={AlertTriangle}
          change="-2"
          changeType="decrease"
          period="since last week"
        />
        <StatCard
          title="Growth Opportunities"
          value="47"
          icon={TrendingUp}
          period="identified by AI"
        />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* More components like charts or recent activity can be added here */}
       </div>
    </div>
  );
}
