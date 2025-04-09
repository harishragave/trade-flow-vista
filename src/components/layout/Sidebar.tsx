
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  BarChart, 
  Settings, 
  Users, 
  FileText
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: ArrowDownCircle, label: "Imports", path: "/imports" },
    { icon: ArrowUpCircle, label: "Exports", path: "/exports" },
    { icon: BarChart, label: "Analytics", path: "/analytics" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Users, label: "Partners", path: "/partners" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-background transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <h2 className="text-lg font-medium">TradeFlow Vista</h2>
      </div>
      <nav className="flex flex-col gap-2 p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
