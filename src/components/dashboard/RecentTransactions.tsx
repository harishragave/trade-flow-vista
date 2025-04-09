
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "import" | "export";
  date: string;
  product: string;
  value: number;
  status: "completed" | "pending" | "cancelled";
  country: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  className?: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const RecentTransactions = ({ transactions, className }: RecentTransactionsProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View all</DropdownMenuItem>
            <DropdownMenuItem>Export to CSV</DropdownMenuItem>
            <DropdownMenuItem>Print</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-6 text-sm font-medium text-muted-foreground">
            <div>Type</div>
            <div>Product</div>
            <div>Value</div>
            <div>Status</div>
            <div>Country</div>
            <div className="text-right">Date</div>
          </div>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-6 items-center text-sm"
              >
                <div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      transaction.type === "import"
                        ? "border-trade-import text-trade-import"
                        : "border-trade-export text-trade-export"
                    )}
                  >
                    {transaction.type}
                  </Badge>
                </div>
                <div className="font-medium">{transaction.product}</div>
                <div>{formatCurrency(transaction.value)}</div>
                <div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </div>
                <div>{transaction.country}</div>
                <div className="text-right">{transaction.date}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
