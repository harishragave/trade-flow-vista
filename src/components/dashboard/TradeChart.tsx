
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, Line, ComposedChart } from "recharts";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart2, LineChart, RefreshCw } from "lucide-react";

interface TradeChartProps {
  title: string;
  data: Array<{
    name: string;
    imports: number;
    exports: number;
  }>;
  className?: string;
}

const TradeChart = ({ title, data, className }: TradeChartProps) => {
  const [chartType, setChartType] = useState<"bar" | "composed">("bar");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex border rounded-md">
            <Button
              variant={chartType === "bar" ? "default" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0 rounded-r-none"
              onClick={() => setChartType("bar")}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "composed" ? "default" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0 rounded-l-none"
              onClick={() => setChartType("composed")}
            >
              <LineChart className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #e2e8f0", 
                    borderRadius: "6px" 
                  }}
                />
                <Legend />
                <Bar dataKey="imports" fill="#3182CE" name="Imports" />
                <Bar dataKey="exports" fill="#38A169" name="Exports" />
              </BarChart>
            ) : (
              <ComposedChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #e2e8f0", 
                    borderRadius: "6px" 
                  }}
                />
                <Legend />
                <Bar dataKey="imports" fill="#3182CE" name="Imports" />
                <Line type="monotone" dataKey="exports" stroke="#38A169" name="Exports" strokeWidth={2} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeChart;
