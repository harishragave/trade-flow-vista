
import { useEffect, useState } from "react";
import { DownloadCloud, Filter, Plus, Search, MoreHorizontal } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTrade } from "@/contexts/TradeContext";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const Exports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { exports, loading, fetchExports } = useTrade();
  
  useEffect(() => {
    fetchExports();
  }, [fetchExports]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchExports(query);
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Exports</h2>
        <p className="text-muted-foreground">
          Manage and track your export transactions
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search exports..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-7 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                <div>ID</div>
                <div>Product</div>
                <div>Customer</div>
                <div>Country</div>
                <div>Value</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>
              {exports.length > 0 ? (
                <div className="divide-y">
                  {exports.map((item) => (
                    <div key={item.id} className="grid grid-cols-7 items-center px-4 py-3">
                      <div className="text-sm font-medium">{item.id}</div>
                      <div className="text-sm">{item.product}</div>
                      <div className="text-sm">{item.customer}</div>
                      <div className="text-sm">{item.country}</div>
                      <div className="text-sm">{formatCurrency(item.value)}</div>
                      <div>
                        <Badge
                          variant="secondary"
                          className={cn(
                            item.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : item.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          )}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-4 text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Exports;
