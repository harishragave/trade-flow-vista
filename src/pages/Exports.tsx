
import { useState } from "react";
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
import { cn } from "@/lib/utils";

interface ExportTransaction {
  id: string;
  date: string;
  customer: string;
  product: string;
  quantity: number;
  value: number;
  status: "pending" | "completed" | "cancelled";
  country: string;
}

const exportData: ExportTransaction[] = [
  {
    id: "EXP-2025-001",
    date: "Apr 9, 2025",
    customer: "EuroTech GmbH",
    product: "Industrial Machinery",
    quantity: 15,
    value: 285000,
    status: "completed",
    country: "Germany",
  },
  {
    id: "EXP-2025-002",
    date: "Apr 7, 2025",
    customer: "NorthStar Solutions",
    product: "Software Services",
    quantity: 1,
    value: 120000,
    status: "completed",
    country: "Canada",
  },
  {
    id: "EXP-2025-003",
    date: "Apr 5, 2025",
    customer: "MexFresh Corp",
    product: "Agricultural Equipment",
    quantity: 25,
    value: 87500,
    status: "pending",
    country: "Mexico",
  },
  {
    id: "EXP-2025-004",
    date: "Apr 4, 2025",
    customer: "Tokyo Motors",
    product: "Auto Parts",
    quantity: 1200,
    value: 68000,
    status: "pending",
    country: "Japan",
  },
  {
    id: "EXP-2025-005",
    date: "Apr 2, 2025",
    customer: "BritMed Ltd.",
    product: "Medical Devices",
    quantity: 350,
    value: 192500,
    status: "completed",
    country: "UK",
  },
  {
    id: "EXP-2025-006",
    date: "Mar 30, 2025",
    customer: "Sydney Ventures",
    product: "Mining Equipment",
    quantity: 5,
    value: 425000,
    status: "cancelled",
    country: "Australia",
  },
  {
    id: "EXP-2025-007",
    date: "Mar 28, 2025",
    customer: "Seoul Tech Co.",
    product: "Telecommunications Equipment",
    quantity: 200,
    value: 156000,
    status: "completed",
    country: "South Korea",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const Exports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredExports = exportData.filter(item => 
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredExports.length > 0 ? (
              <div className="divide-y">
                {filteredExports.map((item) => (
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Exports;
