
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Server, TableProperties, Key, FileCode, Clock } from "lucide-react";
import QueryViewer from "@/components/database/QueryViewer";

const DatabaseInfo = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Database Information</CardTitle>
        <Database className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-3">
          <div className="grid grid-cols-2 text-xs gap-y-1.5">
            <div className="flex items-center text-muted-foreground">
              <Server className="h-3.5 w-3.5 mr-1.5" /> Server
            </div>
            <div className="font-medium">MySQL 8.0</div>
            
            <div className="flex items-center text-muted-foreground">
              <Database className="h-3.5 w-3.5 mr-1.5" /> Database
            </div>
            <div className="font-medium">trade_flow_db</div>
            
            <div className="flex items-center text-muted-foreground">
              <TableProperties className="h-3.5 w-3.5 mr-1.5" /> Tables
            </div>
            <div className="font-medium">5</div>
            
            <div className="flex items-center text-muted-foreground">
              <Key className="h-3.5 w-3.5 mr-1.5" /> Records
            </div>
            <div className="font-medium">217</div>
            
            <div className="flex items-center text-muted-foreground">
              <FileCode className="h-3.5 w-3.5 mr-1.5" /> Size
            </div>
            <div className="font-medium">1.2 MB</div>
            
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1.5" /> Last Update
            </div>
            <div className="font-medium">Today 9:15 AM</div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <QueryViewer />
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseInfo;
