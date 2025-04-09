
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

interface ImportTransaction {
  id: string;
  date: string;
  supplier: string;
  product: string;
  quantity: number;
  value: number;
  status: "pending" | "completed" | "cancelled";
  country: string;
}

const importData: ImportTransaction[] = [
  {
    id: "IMP-2025-001",
    date: "Apr 8, 2025",
    supplier: "TechMax Inc.",
    product: "Semiconductors",
    quantity: 5000,
    value: 125000,
    status: "completed",
    country: "Taiwan",
  },
  {
    id: "IMP-2025-002",
    date: "Apr 7, 2025",
    supplier: "Global Steel Ltd.",
    product: "Steel Plates",
    quantity: 200,
    value: 32000,
    status: "pending",
    country: "South Korea",
  },
  {
    id: "IMP-2025-003",
    date: "Apr 6, 2025",
    supplier: "AutoParts Co.",
    product: "Engine Components",
    quantity: 350,
    value: 47500,
    status: "completed",
    country: "Germany",
  },
  {
    id: "IMP-2025-004",
    date: "Apr 5, 2025",
    supplier: "TextilePro",
    product: "Cotton Fabrics",
    quantity: 8000,
    value: 28000,
    status: "cancelled",
    country: "India",
  },
  {
    id: "IMP-2025-005",
    date: "Apr 3, 2025",
    supplier: "ChemCorp",
    product: "Industrial Chemicals",
    quantity: 2000,
    value: 75000,
    status: "completed",
    country: "China",
  },
  {
    id: "IMP-2025-006",
    date: "Apr 1, 2025",
    supplier: "FarmFresh Ltd.",
    product: "Organic Fruits",
    quantity: 10000,
    value: 42000,
    status: "pending",
    country: "Mexico",
  },
  {
    id: "IMP-2025-007",
    date: "Mar 29, 2025",
    supplier: "ElectroTech",
    product: "Consumer Electronics",
    quantity: 1200,
    value: 156000,
    status: "completed",
    country: "Japan",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const Imports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredImports = importData.filter(item => 
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Imports</h2>
        <p className="text-muted-foreground">
          Manage and track your import transactions
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search imports..."
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
            New Import
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
              <div>ID</div>
              <div>Product</div>
              <div>Supplier</div>
              <div>Country</div>
              <div>Value</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            {filteredImports.length > 0 ? (
              <div className="divide-y">
                {filteredImports.map((item) => (
                  <div key={item.id} className="grid grid-cols-7 items-center px-4 py-3">
                    <div className="text-sm font-medium">{item.id}</div>
                    <div className="text-sm">{item.product}</div>
                    <div className="text-sm">{item.supplier}</div>
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

export default Imports;
