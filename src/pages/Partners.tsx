
import { useEffect, useState } from "react";
import { Search, Filter, Plus, MapPin, Mail, Phone, Building, Globe, MoreHorizontal, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTrade } from "@/contexts/TradeContext";
import { Partner } from "@/lib/api-service";

const getRatingStars = (rating: number) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState<"card" | "table">("card");
  const [activeTab, setActiveTab] = useState("suppliers");
  
  const { suppliers, customers, logistics, loading, fetchPartners } = useTrade();
  
  useEffect(() => {
    fetchPartners(activeTab as "suppliers" | "customers" | "logistics");
  }, [fetchPartners, activeTab]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchPartners(activeTab as "suppliers" | "customers" | "logistics", query);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPartnersData = (): Partner[] => {
    switch (activeTab) {
      case "suppliers":
        return suppliers;
      case "customers":
        return customers;
      case "logistics":
        return logistics;
      default:
        return [];
    }
  };

  const renderTableView = (partners: Partner[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Since</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partners.map((partner) => (
          <TableRow key={partner.id}>
            <TableCell className="font-medium">{partner.id}</TableCell>
            <TableCell>{partner.name}</TableCell>
            <TableCell>{partner.country}</TableCell>
            <TableCell>{partner.category}</TableCell>
            <TableCell>{getRatingStars(partner.rating)}</TableCell>
            <TableCell>{getStatusBadge(partner.status)}</TableCell>
            <TableCell>{partner.since}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Partner</DropdownMenuItem>
                  <DropdownMenuItem>Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderCardView = (partners: Partner[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners.map((partner) => (
        <Card key={partner.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{partner.name}</CardTitle>
                <CardDescription>{partner.category}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Partner</DropdownMenuItem>
                  <DropdownMenuItem>Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{partner.contact.address}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{partner.contact.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{partner.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Partner since {partner.since}</span>
              </div>
              <div className="flex items-center">
                {getRatingStars(partner.rating)}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {getStatusBadge(partner.status)}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button size="sm">
                View
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
        <p className="text-muted-foreground">
          Manage your suppliers, customers, and logistics partners
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search partners..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
          <div className="flex border rounded-md">
            <Button 
              variant={activeView === "card" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setActiveView("card")}
            >
              <Building className="h-4 w-4" />
            </Button>
            <Button 
              variant={activeView === "table" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setActiveView("table")}
            >
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers">
          {loading ? (
            activeView === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[250px] w-full" />
                ))}
              </div>
            ) : (
              <Skeleton className="h-[400px] w-full" />
            )
          ) : (
            activeView === "card" 
              ? renderCardView(getPartnersData())
              : renderTableView(getPartnersData())
          )}
        </TabsContent>

        <TabsContent value="customers">
          {loading ? (
            activeView === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[250px] w-full" />
                ))}
              </div>
            ) : (
              <Skeleton className="h-[400px] w-full" />
            )
          ) : (
            activeView === "card" 
              ? renderCardView(getPartnersData())
              : renderTableView(getPartnersData())
          )}
        </TabsContent>

        <TabsContent value="logistics">
          {loading ? (
            activeView === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-[250px] w-full" />
                ))}
              </div>
            ) : (
              <Skeleton className="h-[400px] w-full" />
            )
          ) : (
            activeView === "card" 
              ? renderCardView(getPartnersData())
              : renderTableView(getPartnersData())
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Partners;
