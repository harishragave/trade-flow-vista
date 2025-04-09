
import { useState } from "react";
import { Code, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleQueries } from "@/lib/database-service";

const QueryViewer = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Code className="h-3.5 w-3.5" />
          <span className="text-xs">View SQL</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Database Queries</DialogTitle>
          <DialogDescription>
            Sample SQL queries used for this simulated MySQL database connection
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="create">
          <TabsList className="grid grid-cols-6 mb-2">
            <TabsTrigger value="create">Create Tables</TabsTrigger>
            <TabsTrigger value="imports">Imports</TabsTrigger>
            <TabsTrigger value="exports">Exports</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="add">Add Data</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[400px] rounded-md border p-4 bg-muted/30">
            <TabsContent value="create" className="mt-0">
              <pre className="text-xs">{sampleQueries.createTables}</pre>
            </TabsContent>
            <TabsContent value="imports" className="mt-0">
              <pre className="text-xs">{sampleQueries.getImports}</pre>
            </TabsContent>
            <TabsContent value="exports" className="mt-0">
              <pre className="text-xs">{sampleQueries.getExports}</pre>
            </TabsContent>
            <TabsContent value="partners" className="mt-0">
              <pre className="text-xs">{sampleQueries.getPartners}</pre>
            </TabsContent>
            <TabsContent value="dashboard" className="mt-0">
              <pre className="text-xs">{sampleQueries.getDashboardData}</pre>
            </TabsContent>
            <TabsContent value="add" className="mt-0 space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Add Import</h4>
                <pre className="text-xs">{sampleQueries.addImport}</pre>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Add Export</h4>
                <pre className="text-xs">{sampleQueries.addExport}</pre>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QueryViewer;
