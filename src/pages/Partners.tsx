
import { useState } from "react";
import { Search, Filter, Plus, MapPin, Mail, Phone, Building, Globe, MoreHorizontal, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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

const partnersData = {
  suppliers: [
    { 
      id: "SUP001", 
      name: "Global Electronics Ltd", 
      country: "Japan", 
      category: "Electronics", 
      rating: 4.8,
      status: "active",
      since: "2018",
      contact: {
        email: "contact@globalelec.com",
        phone: "+81-3-1234-5678",
        address: "Tokyo, Japan"
      }
    },
    { 
      id: "SUP002", 
      name: "Textile World Co", 
      country: "India", 
      category: "Textiles", 
      rating: 4.5,
      status: "active",
      since: "2020",
      contact: {
        email: "info@textileworld.com",
        phone: "+91-22-4567-8901",
        address: "Mumbai, India"
      }
    },
    { 
      id: "SUP003", 
      name: "AutoParts International", 
      country: "Germany", 
      category: "Automotive", 
      rating: 4.7,
      status: "active",
      since: "2019",
      contact: {
        email: "sales@autoparts.com",
        phone: "+49-30-7890-1234",
        address: "Berlin, Germany"
      }
    },
    { 
      id: "SUP004", 
      name: "Fresh Produce Inc", 
      country: "Mexico", 
      category: "Food", 
      rating: 4.2,
      status: "pending",
      since: "2022",
      contact: {
        email: "info@freshproduce.com",
        phone: "+52-55-2345-6789",
        address: "Mexico City, Mexico"
      }
    },
    { 
      id: "SUP005", 
      name: "ChemSolutions Corp", 
      country: "USA", 
      category: "Chemicals", 
      rating: 4.6,
      status: "active",
      since: "2017",
      contact: {
        email: "support@chemsolutions.com",
        phone: "+1-415-789-0123",
        address: "San Francisco, USA"
      }
    },
  ],
  customers: [
    { 
      id: "CUS001", 
      name: "TechRetail Group", 
      country: "Canada", 
      category: "Electronics", 
      rating: 4.9,
      status: "active",
      since: "2019",
      contact: {
        email: "orders@techretail.com",
        phone: "+1-416-234-5678",
        address: "Toronto, Canada"
      }
    },
    { 
      id: "CUS002", 
      name: "European Machine Co", 
      country: "France", 
      category: "Machinery", 
      rating: 4.7,
      status: "active",
      since: "2020",
      contact: {
        email: "sales@euromachine.com",
        phone: "+33-1-4567-8901",
        address: "Paris, France"
      }
    },
    { 
      id: "CUS003", 
      name: "HealthPlus Pharmaceuticals", 
      country: "UK", 
      category: "Pharmaceuticals", 
      rating: 4.8,
      status: "active",
      since: "2018",
      contact: {
        email: "orders@healthplus.com",
        phone: "+44-20-7890-1234",
        address: "London, UK"
      }
    },
    { 
      id: "CUS004", 
      name: "AgroTech Solutions", 
      country: "Brazil", 
      category: "Agriculture", 
      rating: 4.5,
      status: "inactive",
      since: "2021",
      contact: {
        email: "info@agrotech.com",
        phone: "+55-11-2345-6789",
        address: "Sao Paulo, Brazil"
      }
    },
    { 
      id: "CUS005", 
      name: "Raw Materials Trading", 
      country: "Australia", 
      category: "Raw Materials", 
      rating: 4.6,
      status: "active",
      since: "2017",
      contact: {
        email: "orders@rawmaterials.com",
        phone: "+61-2-7890-1234",
        address: "Sydney, Australia"
      }
    },
  ],
  logistics: [
    { 
      id: "LOG001", 
      name: "FastShip Logistics", 
      country: "Singapore", 
      category: "Shipping", 
      rating: 4.7,
      status: "active",
      since: "2018",
      contact: {
        email: "info@fastship.com",
        phone: "+65-6789-0123",
        address: "Singapore"
      }
    },
    { 
      id: "LOG002", 
      name: "Aero Freight Services", 
      country: "UAE", 
      category: "Air Freight", 
      rating: 4.6,
      status: "active",
      since: "2019",
      contact: {
        email: "booking@aerofreight.com",
        phone: "+971-4-1234-5678",
        address: "Dubai, UAE"
      }
    },
    { 
      id: "LOG003", 
      name: "Global Customs Solutions", 
      country: "Netherlands", 
      category: "Customs", 
      rating: 4.8,
      status: "active",
      since: "2020",
      contact: {
        email: "support@globalcustoms.com",
        phone: "+31-20-4567-8901",
        address: "Amsterdam, Netherlands"
      }
    }
  ]
};

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

  const renderTableView = (partners: any[]) => (
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
        {partners
          .filter(partner => 
            partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            partner.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            partner.country.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((partner) => (
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

  const renderCardView = (partners: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners
        .filter(partner => 
          partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          partner.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          partner.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((partner) => (
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
              onChange={(e) => setSearchTerm(e.target.value)}
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

      <Tabs defaultValue="suppliers">
        <TabsList className="mb-4">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers">
          {activeView === "card" 
            ? renderCardView(partnersData.suppliers)
            : renderTableView(partnersData.suppliers)
          }
        </TabsContent>

        <TabsContent value="customers">
          {activeView === "card" 
            ? renderCardView(partnersData.customers)
            : renderTableView(partnersData.customers)
          }
        </TabsContent>

        <TabsContent value="logistics">
          {activeView === "card" 
            ? renderCardView(partnersData.logistics)
            : renderTableView(partnersData.logistics)
          }
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Partners;
