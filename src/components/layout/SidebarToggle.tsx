
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  toggleSidebar: () => void;
}

const SidebarToggle = ({ toggleSidebar }: SidebarToggleProps) => {
  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
};

export default SidebarToggle;
