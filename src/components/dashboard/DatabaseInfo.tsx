
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Server, HardDrive, Code } from "lucide-react";
import QueryViewer from "@/components/database/QueryViewer";

const DatabaseInfo = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Database Information</CardTitle>
        <QueryViewer />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium">
            <Server className="mr-2 h-4 w-4 text-muted-foreground" />
            Database Type
          </div>
          <div className="pl-6 text-sm">MySQL 8.0</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium">
            <Database className="mr-2 h-4 w-4 text-muted-foreground" />
            Connection
          </div>
          <div className="pl-6 text-sm text-muted-foreground">
            <code className="text-xs">mysql://user:****@localhost:3306/trade_flow_db</code>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium">
            <HardDrive className="mr-2 h-4 w-4 text-muted-foreground" />
            Storage
          </div>
          <div className="pl-6 text-sm">
            <div className="flex items-center justify-between">
              <span>Used Space</span>
              <span>45.8 MB</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[12%] rounded-full bg-primary"></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium">
            <Code className="mr-2 h-4 w-4 text-muted-foreground" />
            Tables
          </div>
          <div className="pl-6 grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">imports</div>
            <div className="text-right">18 rows</div>
            <div className="text-muted-foreground">exports</div>
            <div className="text-right">22 rows</div>
            <div className="text-muted-foreground">partners</div>
            <div className="text-right">13 rows</div>
            <div className="text-muted-foreground">trade_summary</div>
            <div className="text-right">1 row</div>
            <div className="text-muted-foreground">trade_monthly</div>
            <div className="text-right">12 rows</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseInfo;
