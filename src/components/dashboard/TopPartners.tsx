
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Partner {
  country: string;
  value: number;
  percentage: number;
  trend: number;
}

interface TopPartnersProps {
  title: string;
  partners: Partner[];
  type: "import" | "export";
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

const TopPartners = ({ title, partners, type }: TopPartnersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {partners.map((partner) => (
            <div key={partner.country} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{partner.country}</span>
                  <span
                    className={cn(
                      "text-xs",
                      partner.trend > 0
                        ? "text-green-500"
                        : partner.trend < 0
                        ? "text-red-500"
                        : "text-gray-500"
                    )}
                  >
                    {partner.trend > 0 ? "↑" : partner.trend < 0 ? "↓" : "→"}{" "}
                    {Math.abs(partner.trend)}%
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(partner.value)}
                </span>
              </div>
              <Progress 
                value={partner.percentage} 
                className={cn(
                  type === "import" ? "bg-blue-100" : "bg-green-100",
                  "h-2",
                  type === "import" ? "[--progress-fill:theme(colors.blue.500)]" : "[--progress-fill:theme(colors.green.500)]"
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPartners;
