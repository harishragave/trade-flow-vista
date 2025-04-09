
import { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { 
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  BarChart, 
  Settings, 
  Users, 
  FileText,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Layout = () => {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: ArrowDownCircle, label: "Imports", path: "/imports" },
    { icon: ArrowUpCircle, label: "Exports", path: "/exports" },
    { icon: BarChart, label: "Analytics", path: "/analytics" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Users, label: "Partners", path: "/partners" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    toast.success("You have been logged out successfully");
  };

  if (!isMounted) return null;

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden bg-background w-full">
        <Sidebar>
          <SidebarHeader className="border-b py-4">
            <h2 className="px-2 text-lg font-medium">TradeFlow Vista</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.path}
                        tooltip={item.label}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto pt-16">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
