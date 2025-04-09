
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Database, Server } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { sampleQueries } from "@/lib/database-service";

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Simulate database connection
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <Database className="h-4 w-4 text-muted-foreground" />
              <Badge variant={isConnected ? "secondary" : "outline"} className="h-5 px-1.5">
                {isConnected ? (
                  <>
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span className="text-xs">MySQL</span>
                  </>
                ) : (
                  <>
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    <span className="text-xs">Connecting...</span>
                  </>
                )}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-md p-0">
            <div className="p-3">
              <div className="mb-2 font-semibold">Database Connection</div>
              <div className="text-xs text-muted-foreground mb-2">
                Simulated MySQL connection for demo purposes.
              </div>
              <div className="flex items-center gap-2 text-xs mb-1">
                <Server className="h-3 w-3" />
                <span className="font-medium">Server:</span> 
                <span className="text-muted-foreground">localhost:3306</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Database className="h-3 w-3" />
                <span className="font-medium">Database:</span> 
                <span className="text-muted-foreground">trade_flow_db</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ConnectionStatus;
