// This is a simulated API service to mock backend calls
// In a real application, this would connect to your backend API

// Simulated delay for API calls
const DELAY = 800;

export interface ImportTransaction {
  id: string;
  date: string;
  supplier: string;
  product: string;
  quantity: number;
  value: number;
  status: "pending" | "completed" | "cancelled";
  country: string;
}

export interface ExportTransaction {
  id: string;
  date: string;
  customer: string;
  product: string;
  quantity: number;
  value: number;
  status: "pending" | "completed" | "cancelled";
  country: string;
}

export interface Partner {
  id: string;
  name: string;
  country: string;
  category: string;
  rating: number;
  status: "active" | "inactive" | "pending";
  since: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface TradeSummary {
  totalImports: number;
  totalExports: number;
  tradeBalance: number;
  yearToDateGrowth: number;
}

export interface TradeData {
  name: string;
  imports: number;
  exports: number;
}

// Sample data that would normally come from a database
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

const partnersData: {
  suppliers: Partner[];
  customers: Partner[];
  logistics: Partner[];
} = {
  suppliers: [
    { 
      id: "SUP001", 
      name: "Global Electronics Ltd", 
      country: "Japan", 
      category: "Electronics", 
      rating: 4.8,
      status: "active" as const,
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
      status: "active" as const,
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
      status: "active" as const,
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
      status: "pending" as const,
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
      status: "active" as const,
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
      status: "active" as const,
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
      status: "active" as const,
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
      status: "active" as const,
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
      status: "inactive" as const,
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
      status: "active" as const,
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
      status: "active" as const,
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
      status: "active" as const,
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
      status: "active" as const,
      since: "2020",
      contact: {
        email: "support@globalcustoms.com",
        phone: "+31-20-4567-8901",
        address: "Amsterdam, Netherlands"
      }
    }
  ]
};

const monthlyTradeData: TradeData[] = [
  { name: "Jan", imports: 4000, exports: 2400 },
  { name: "Feb", imports: 3000, exports: 2210 },
  { name: "Mar", imports: 2000, exports: 2290 },
  { name: "Apr", imports: 2780, exports: 3008 },
  { name: "May", imports: 1890, exports: 2800 },
  { name: "Jun", imports: 2390, exports: 3800 },
  { name: "Jul", imports: 3490, exports: 4300 },
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

const tradeSummary: TradeSummary = {
  totalImports: 1200000,
  totalExports: 1500000,
  tradeBalance: 300000,
  yearToDateGrowth: 15.8
};

// Simulated API functions
const apiService = {
  getImports: async (query = ""): Promise<ImportTransaction[]> => {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    
    if (!query) return importData;
    
    return importData.filter(item => 
      item.product.toLowerCase().includes(query.toLowerCase()) ||
      item.supplier.toLowerCase().includes(query.toLowerCase()) ||
      item.country.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  getExports: async (query = ""): Promise<ExportTransaction[]> => {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    
    if (!query) return exportData;
    
    return exportData.filter(item => 
      item.product.toLowerCase().includes(query.toLowerCase()) ||
      item.customer.toLowerCase().includes(query.toLowerCase()) ||
      item.country.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  getPartners: async (type: "suppliers" | "customers" | "logistics", query = ""): Promise<Partner[]> => {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    
    const partners = partnersData[type];
    
    if (!query) return partners;
    
    return partners.filter((partner) => 
      partner.name.toLowerCase().includes(query.toLowerCase()) ||
      partner.category.toLowerCase().includes(query.toLowerCase()) ||
      partner.country.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  getDashboardData: async () => {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    
    return {
      tradeSummary,
      monthlyTradeData,
      topImportPartners,
      topExportPartners,
      recentTransactions
    };
  },
  
  // In a real app, you would have methods to add, update, and delete data
  addImport: async (importData: Omit<ImportTransaction, "id">): Promise<ImportTransaction> => {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    
    const newImport: ImportTransaction = {
      ...importData,
      id: `IMP-2025-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    };
    
    // In a real app, this would send the data to your backend/database
    console.log("Adding import:", newImport);
    
    return newImport;
  },
  
  addExport: async (exportData: Omit<ExportTransaction, "id">): Promise<ExportTransaction> => {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    
    const newExport: ExportTransaction = {
      ...exportData,
      id: `EXP-2025-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    };
    
    // In a real app, this would send the data to your backend/database
    console.log("Adding export:", newExport);
    
    return newExport;
  }
};

export default apiService;
