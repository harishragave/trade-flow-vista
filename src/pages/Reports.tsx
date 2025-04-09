
import { Download, Filter, Calendar, FileText, FileBarChart, FilePieChart } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const reportData = {
  importReports: [
    { id: "IMP001", name: "Monthly Import Summary - Q1", type: "summary", date: "Apr 1, 2025", status: "completed" },
    { id: "IMP002", name: "Product Category Analysis", type: "analysis", date: "Mar 15, 2025", status: "completed" },
    { id: "IMP003", name: "Supplier Performance Report", type: "performance", date: "Mar 10, 2025", status: "completed" },
    { id: "IMP004", name: "Import Cost Analysis", type: "finance", date: "Feb 28, 2025", status: "completed" },
    { id: "IMP005", name: "Monthly Import Summary - Q4", type: "summary", date: "Jan 5, 2025", status: "archived" },
  ],
  exportReports: [
    { id: "EXP001", name: "Quarterly Export Overview", type: "summary", date: "Apr 5, 2025", status: "completed" },
    { id: "EXP002", name: "Market Distribution Analysis", type: "analysis", date: "Mar 20, 2025", status: "completed" },
    { id: "EXP003", name: "Export Revenue Report", type: "finance", date: "Mar 15, 2025", status: "completed" },
    { id: "EXP004", name: "Customer Satisfaction Survey", type: "feedback", date: "Feb 25, 2025", status: "draft" },
    { id: "EXP005", name: "Quarterly Export Overview - Q4", type: "summary", date: "Jan 10, 2025", status: "archived" },
  ],
  customReports: [
    { id: "CUS001", name: "Trade Balance Analysis", type: "analysis", date: "Apr 2, 2025", status: "completed" },
    { id: "CUS002", name: "Market Opportunity Research", type: "research", date: "Mar 25, 2025", status: "draft" },
    { id: "CUS003", name: "Annual Performance Comparison", type: "performance", date: "Mar 1, 2025", status: "completed" },
    { id: "CUS004", name: "Shipping Cost Optimization", type: "optimization", date: "Feb 20, 2025", status: "draft" },
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500">Completed</Badge>;
    case "draft":
      return <Badge variant="outline">Draft</Badge>;
    case "archived":
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getReportIcon = (type: string) => {
  switch (type) {
    case "summary":
      return <FileText className="h-4 w-4 mr-2" />;
    case "analysis":
      return <FileBarChart className="h-4 w-4 mr-2" />;
    case "finance":
      return <FilePieChart className="h-4 w-4 mr-2" />;
    default:
      return <FileText className="h-4 w-4 mr-2" />;
  }
};

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const renderReportTable = (reports: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id} className={selectedReport === report.id ? "bg-muted" : ""}>
            <TableCell className="font-medium">{report.id}</TableCell>
            <TableCell>
              <div className="flex items-center">
                {getReportIcon(report.type)}
                {report.name}
              </div>
            </TableCell>
            <TableCell className="capitalize">{report.type}</TableCell>
            <TableCell>{report.date}</TableCell>
            <TableCell>{getStatusBadge(report.status)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedReport(report.id)}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Access, generate and download trade reports
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button>
            <Calendar className="h-4 w-4 mr-2" /> Generate New Report
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Download All
        </Button>
      </div>

      <Tabs defaultValue="import">
        <TabsList className="mb-4">
          <TabsTrigger value="import">Import Reports</TabsTrigger>
          <TabsTrigger value="export">Export Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import Reports</CardTitle>
              <CardDescription>View and manage your import-related reports</CardDescription>
            </CardHeader>
            <CardContent>
              {renderReportTable(reportData.importReports)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>View and manage your export-related reports</CardDescription>
            </CardHeader>
            <CardContent>
              {renderReportTable(reportData.exportReports)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>View and manage your custom-generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              {renderReportTable(reportData.customReports)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
