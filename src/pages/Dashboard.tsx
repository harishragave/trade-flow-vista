
import { useEffect } from "react";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, BarChart } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import TradeChart from "@/components/dashboard/TradeChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import TopPartners from "@/components/dashboard/TopPartners";
import DatabaseInfo from "@/components/dashboard/DatabaseInfo";
import ConnectionStatus from "@/components/database/ConnectionStatus";
import { useTrade } from "@/contexts/TradeContext";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { 
    loading, 
    monthlyTradeData, 
    topImportPartners, 
    topExportPartners, 
    recentTransactions,
    tradeSummary,
    fetchDashboardData 
  } = useTrade();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <ConnectionStatus />
        </div>
        <p className="text-muted-foreground">
          Overview of your import and export activities with dynamic data
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : (
          <>
            <StatCard
              title="Total Imports"
              value={formatCurrency(tradeSummary.totalImports)}
              description="Last 30 days"
              trend={8}
              icon={<ArrowDownCircle className="text-trade-import" />}
            />
            <StatCard
              title="Total Exports"
              value={formatCurrency(tradeSummary.totalExports)}
              description="Last 30 days"
              trend={12}
              icon={<ArrowUpCircle className="text-trade-export" />}
            />
            <StatCard
              title="Trade Balance"
              value={formatCurrency(tradeSummary.tradeBalance)}
              description="Last 30 days"
              icon={<DollarSign />}
            />
            <StatCard
              title="Year-to-Date Growth"
              value={`${tradeSummary.yearToDateGrowth}%`}
              description="Compared to previous year"
              trend={4}
              icon={<BarChart />}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {loading ? (
          <>
            <Skeleton className="h-[300px] lg:col-span-3" />
            <Skeleton className="h-[300px] lg:col-span-2" />
            <Skeleton className="h-[300px] lg:col-span-2" />
          </>
        ) : (
          <>
            <TradeChart
              title="Monthly Trade Volume"
              data={monthlyTradeData}
              className="lg:col-span-3"
            />
            <TopPartners
              title="Top Import Partners"
              partners={topImportPartners}
              type="import"
              className="lg:col-span-2"
            />
            <TopPartners
              title="Top Export Partners"
              partners={topExportPartners}
              type="export"
              className="lg:col-span-2"
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {loading ? (
          <>
            <Skeleton className="h-[400px] lg:col-span-5" />
            <Skeleton className="h-[400px] lg:col-span-2" />
          </>
        ) : (
          <>
            <RecentTransactions 
              transactions={recentTransactions} 
              className="lg:col-span-5"
            />
            <DatabaseInfo />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
