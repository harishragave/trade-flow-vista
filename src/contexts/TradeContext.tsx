
import { createContext, useContext, ReactNode, useState } from "react";
import { toast } from "sonner";
import apiService, { 
  ImportTransaction, 
  ExportTransaction, 
  TradeData, 
  Partner 
} from "@/lib/api-service";

interface TradeContextType {
  // Data states
  loading: boolean;
  imports: ImportTransaction[];
  exports: ExportTransaction[];
  monthlyTradeData: TradeData[];
  topImportPartners: any[];
  topExportPartners: any[];
  recentTransactions: any[];
  suppliers: Partner[];
  customers: Partner[];
  logistics: Partner[];
  tradeSummary: {
    totalImports: number;
    totalExports: number;
    tradeBalance: number;
    yearToDateGrowth: number;
  };
  
  // Methods
  fetchImports: (query?: string) => Promise<void>;
  fetchExports: (query?: string) => Promise<void>;
  fetchDashboardData: () => Promise<void>;
  fetchPartners: (type: "suppliers" | "customers" | "logistics", query?: string) => Promise<void>;
  addImport: (data: Omit<ImportTransaction, "id">) => Promise<void>;
  addExport: (data: Omit<ExportTransaction, "id">) => Promise<void>;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [imports, setImports] = useState<ImportTransaction[]>([]);
  const [exports, setExports] = useState<ExportTransaction[]>([]);
  const [monthlyTradeData, setMonthlyTradeData] = useState<TradeData[]>([]);
  const [topImportPartners, setTopImportPartners] = useState<any[]>([]);
  const [topExportPartners, setTopExportPartners] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<Partner[]>([]);
  const [customers, setCustomers] = useState<Partner[]>([]);
  const [logistics, setLogistics] = useState<Partner[]>([]);
  const [tradeSummary, setTradeSummary] = useState({
    totalImports: 0,
    totalExports: 0,
    tradeBalance: 0,
    yearToDateGrowth: 0
  });

  const fetchImports = async (query = "") => {
    try {
      setLoading(true);
      const data = await apiService.getImports(query);
      setImports(data);
    } catch (error) {
      console.error("Error fetching imports:", error);
      toast.error("Failed to load import data");
    } finally {
      setLoading(false);
    }
  };

  const fetchExports = async (query = "") => {
    try {
      setLoading(true);
      const data = await apiService.getExports(query);
      setExports(data);
    } catch (error) {
      console.error("Error fetching exports:", error);
      toast.error("Failed to load export data");
    } finally {
      setLoading(false);
    }
  };

  const fetchPartners = async (type: "suppliers" | "customers" | "logistics", query = "") => {
    try {
      setLoading(true);
      const data = await apiService.getPartners(type, query);
      
      switch (type) {
        case "suppliers":
          setSuppliers(data);
          break;
        case "customers":
          setCustomers(data);
          break;
        case "logistics":
          setLogistics(data);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      toast.error(`Failed to load ${type} data`);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDashboardData();
      setMonthlyTradeData(data.monthlyTradeData);
      setTopImportPartners(data.topImportPartners);
      setTopExportPartners(data.topExportPartners);
      setRecentTransactions(data.recentTransactions);
      setTradeSummary(data.tradeSummary);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const addImport = async (data: Omit<ImportTransaction, "id">) => {
    try {
      setLoading(true);
      await apiService.addImport(data);
      toast.success("Import transaction added successfully");
      await fetchImports();
    } catch (error) {
      console.error("Error adding import:", error);
      toast.error("Failed to add import transaction");
    } finally {
      setLoading(false);
    }
  };

  const addExport = async (data: Omit<ExportTransaction, "id">) => {
    try {
      setLoading(true);
      await apiService.addExport(data);
      toast.success("Export transaction added successfully");
      await fetchExports();
    } catch (error) {
      console.error("Error adding export:", error);
      toast.error("Failed to add export transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TradeContext.Provider
      value={{
        loading,
        imports,
        exports,
        monthlyTradeData,
        topImportPartners,
        topExportPartners,
        recentTransactions,
        suppliers,
        customers,
        logistics,
        tradeSummary,
        fetchImports,
        fetchExports,
        fetchDashboardData,
        fetchPartners,
        addImport,
        addExport
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error("useTrade must be used within a TradeProvider");
  }
  return context;
};
