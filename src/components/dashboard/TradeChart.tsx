
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TradeChartProps {
  title: string;
  data: Array<{
    name: string;
    imports: number;
    exports: number;
  }>;
}

const TradeChart = ({ title, data }: TradeChartProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="imports" fill="#3182CE" name="Imports" />
              <Bar dataKey="exports" fill="#38A169" name="Exports" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeChart;
