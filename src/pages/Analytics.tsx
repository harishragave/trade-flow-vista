
import { BarChart, LineChart, PieChart, ArrowUpFromLine, ShoppingCart } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

const analyticsData = {
  monthly: [
    { name: "Jan", imports: 4000, exports: 2400 },
    { name: "Feb", imports: 3000, exports: 1398 },
    { name: "Mar", imports: 2000, exports: 9800 },
    { name: "Apr", imports: 2780, exports: 3908 },
    { name: "May", imports: 1890, exports: 4800 },
    { name: "Jun", imports: 2390, exports: 3800 },
    { name: "Jul", imports: 3490, exports: 4300 },
    { name: "Aug", imports: 3490, exports: 4300 },
    { name: "Sep", imports: 3490, exports: 4300 },
    { name: "Oct", imports: 3490, exports: 4300 },
    { name: "Nov", imports: 4000, exports: 2400 },
    { name: "Dec", imports: 3000, exports: 1398 }
  ],
  categoryImports: [
    { name: "Electronics", value: 4000 },
    { name: "Textiles", value: 3000 },
    { name: "Automotive", value: 2000 },
    { name: "Food", value: 2780 },
    { name: "Chemicals", value: 1890 }
  ],
  categoryExports: [
    { name: "Software", value: 4200 },
    { name: "Machinery", value: 3500 },
    { name: "Pharmaceuticals", value: 2900 },
    { name: "Agriculture", value: 2100 },
    { name: "Raw Materials", value: 1800 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Detailed trade performance analysis and trends
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Annual Growth"
          value="15.2%"
          description="Year over year"
          trend={4}
          icon={<ArrowUpFromLine />}
        />
        <StatCard
          title="Trade Volume"
          value="$5.8M"
          description="Last 12 months"
          trend={7}
          icon={<BarChart />}
        />
        <StatCard
          title="Import Categories"
          value="42"
          description="Active categories"
          icon={<ShoppingCart />}
        />
        <StatCard
          title="Export Markets"
          value="28"
          description="Countries served"
          trend={3}
          icon={<PieChart />}
        />
      </div>

      <Tabs defaultValue="trends">
        <TabsList className="mb-4">
          <TabsTrigger value="trends">Trade Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="comparison">Import/Export Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Annual Trade Trends</CardTitle>
              <CardDescription>Monthly import and export volumes for the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={analyticsData.monthly}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorImports" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExports" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <RechartsTooltip />
                    <Legend />
                    <Area type="monotone" dataKey="imports" stroke="#8884d8" fillOpacity={1} fill="url(#colorImports)" />
                    <Area type="monotone" dataKey="exports" stroke="#82ca9d" fillOpacity={1} fill="url(#colorExports)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Import Categories</CardTitle>
              <CardDescription>Distribution by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.categoryImports}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.categoryImports.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Export Categories</CardTitle>
              <CardDescription>Distribution by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.categoryExports}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#82ca9d"
                      dataKey="value"
                    >
                      {analyticsData.categoryExports.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Import vs Export Comparison</CardTitle>
              <CardDescription>Monthly comparison of import and export volumes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={analyticsData.monthly}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="imports" fill="#8884d8" name="Imports" />
                    <Bar dataKey="exports" fill="#82ca9d" name="Exports" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
