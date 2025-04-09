
import { ArrowDownCircle, ArrowUpCircle, DollarSign, BarChart } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import TradeChart from "@/components/dashboard/TradeChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import TopPartners from "@/components/dashboard/TopPartners";

const monthlyTradeData = [
  { name: "Jan", imports: 4000, exports: 2400 },
  { name: "Feb", imports: 3000, exports: 2210 },
  { name: "Mar", imports: 2000, exports: 2290 },
  { name: "Apr", imports: 2780, exports: 3008 },
  { name: "May", imports: 1890, exports: 2800 },
  { name: "Jun", imports: 2390, exports: 3800 },
  { name: "Jul", imports: 3490, exports: 4300 },
];

const recentTransactions = [
  {
    id: "1",
    type: "import" as const,
    date: "Apr 5, 2025",
    product: "Electronics",
    value: 25000,
    status: "completed" as const,
    country: "China",
  },
  {
    id: "2",
    type: "export" as const,
    date: "Apr 3, 2025",
    product: "Machinery",
    value: 178000,
    status: "completed" as const,
    country: "Germany",
  },
  {
    id: "3",
    type: "import" as const,
    date: "Apr 2, 2025",
    product: "Textiles",
    value: 12600,
    status: "pending" as const,
    country: "India",
  },
  {
    id: "4",
    type: "export" as const,
    date: "Mar 30, 2025",
    product: "Software",
    value: 56000,
    status: "completed" as const,
    country: "UK",
  },
  {
    id: "5",
    type: "import" as const,
    date: "Mar 28, 2025",
    product: "Medical Supplies",
    value: 34500,
    status: "cancelled" as const,
    country: "Germany",
  },
];

const topImportPartners = [
  { country: "China", value: 2500000, percentage: 35, trend: 5 },
  { country: "Germany", value: 1800000, percentage: 25, trend: -2 },
  { country: "Japan", value: 1200000, percentage: 17, trend: 3 },
  { country: "South Korea", value: 950000, percentage: 13, trend: 0 },
  { country: "Mexico", value: 700000, percentage: 10, trend: 7 },
];

const topExportPartners = [
  { country: "Canada", value: 2200000, percentage: 30, trend: 2 },
  { country: "Mexico", value: 1900000, percentage: 26, trend: 4 },
  { country: "China", value: 1500000, percentage: 21, trend: -1 },
  { country: "UK", value: 900000, percentage: 13, trend: 5 },
  { country: "Japan", value: 750000, percentage: 10, trend: 0 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your import and export activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Imports"
          value="$1.2M"
          description="Last 30 days"
          trend={8}
          icon={<ArrowDownCircle className="text-trade-import" />}
        />
        <StatCard
          title="Total Exports"
          value="$1.5M"
          description="Last 30 days"
          trend={12}
          icon={<ArrowUpCircle className="text-trade-export" />}
        />
        <StatCard
          title="Trade Balance"
          value="+$300K"
          description="Last 30 days"
          icon={<DollarSign />}
        />
        <StatCard
          title="Year-to-Date Growth"
          value="15.8%"
          description="Compared to previous year"
          trend={4}
          icon={<BarChart />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <TradeChart
          title="Monthly Trade Volume"
          data={monthlyTradeData}
        />
        <TopPartners
          title="Top Import Partners"
          partners={topImportPartners}
          type="import"
        />
        <TopPartners
          title="Top Export Partners"
          partners={topExportPartners}
          type="export"
        />
      </div>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
};

export default Dashboard;
