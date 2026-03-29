import type { ReportStat } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReportStatDisplay({ stat }: { stat: ReportStat }) {
  return (
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-muted/30 relative group hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {stat.label}
          </p>
          <p className="text-3xl sm:text-4xl font-black text-primary font-serif tracking-tight group-hover:text-accent transition-colors duration-300">
            {stat.value}
          </p>
          {stat.description && (
            <p className="text-sm text-muted-foreground pt-2 border-t border-border/50">
              {stat.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
