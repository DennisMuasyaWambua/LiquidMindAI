import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { ArrowDown, ArrowUp } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  period?: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
};

export function StatCard({
  title,
  value,
  icon: Icon,
  period,
  change,
  changeType,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {change && (
            <div
              className={cn(
                'flex items-center gap-1 mr-2',
                changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600'
              )}
            >
              {changeType === 'increase' ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {change}
            </div>
          )}
          <span>{period}</span>
        </div>
      </CardContent>
    </Card>
  );
}
