
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-5 w-5 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend !== undefined) && (
          <div className="flex items-center mt-1">
            {trend !== undefined && (
              <span
                className={cn(
                  "mr-1 text-xs",
                  trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-gray-500"
                )}
              >
                {trend > 0 ? "↑" : trend < 0 ? "↓" : "→"} {Math.abs(trend)}%
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
