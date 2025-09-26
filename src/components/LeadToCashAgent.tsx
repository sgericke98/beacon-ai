import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  Upload, 
  Filter, 
  BarChart3, 
  AlertTriangle,
  DollarSign,
  Clock,
  Target,
  CheckCircle2,
  FileText
} from "lucide-react";

const timeFilters = ["Last 30 days", "Last 60 days", "Last 90 days", "Last 120 days"];
const dealSizes = ["All Deal Sizes", "Small ($0-10K)", "Medium ($10K-100K)", "Large ($100K+)"];
const customerTiers = ["All", "Enterprise", "Mid-Market", "SMB"];
const countries = ["All", "United States", "Canada", "United Kingdom", "Germany"];
const productTypes = ["All", "Software", "Services", "Hardware"];

const processSteps = [
  {
    id: "opportunity",
    title: "Opportunity Created",
    description: "Lead qualification and initial contact established",
    icon: Target,
    status: "completed"
  },
  {
    id: "quote",
    title: "Quote Generated", 
    description: "Detailed pricing proposal and terms created",
    icon: FileText,
    status: "completed"
  },
  {
    id: "order",
    title: "Order Confirmed",
    description: "Customer commitment and order processing initiated",
    icon: CheckCircle2,
    status: "current"
  },
  {
    id: "invoice",
    title: "Invoice Created",
    description: "Billing document generated and sent to customer",
    icon: DollarSign,
    status: "pending"
  },
  {
    id: "payment",
    title: "Payment Received",
    description: "Transaction completed and revenue recognized",
    icon: TrendingUp,
    status: "pending"
  }
];

const mockLeakageData = [
  {
    id: 1,
    type: "Price Discrepancy",
    description: "Contract shows $50,000 but invoice shows $45,000",
    impact: "$5,000",
    confidence: 95,
    status: "high"
  },
  {
    id: 2,
    type: "Missing Upsell",
    description: "Add-on services mentioned in contract not invoiced",
    impact: "$12,000",
    confidence: 88,
    status: "medium"
  },
  {
    id: 3,
    type: "Billing Delay",
    description: "Invoice date 45 days after contract execution",
    impact: "$2,000",
    confidence: 92,
    status: "low"
  }
];

export function LeadToCashAgent() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("Last 30 days");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setIsAnalyzing(true);
      
      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Lead-to-Cash Analysis Agent</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Comprehensive analytics and revenue leakage detection for your sales process.
        </p>
      </div>

      <Card className="border-0 shadow-card">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="h-4 w-4" />
              Dashboard Analytics
            </TabsTrigger>
            <TabsTrigger value="revenue-leakage" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <AlertTriangle className="h-4 w-4" />
              Revenue Leakage Analysis
              <Badge variant="destructive" className="ml-2">3</Badge>
            </TabsTrigger>
          </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <CardTitle>Dashboard Analytics</CardTitle>
              </div>
              <CardDescription>Smart filters that dynamically update available options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {timeFilters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedTimeFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeFilter(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Deal Size</label>
                  <Select defaultValue="All Deal Sizes">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dealSizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Customer Tier</label>
                  <Select defaultValue="All">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {customerTiers.map((tier) => (
                        <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Country</label>
                  <Select defaultValue="All">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Product Type</label>
                  <Select defaultValue="All">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Flow */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <CardTitle>Process Flow Analytics</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Overall Health</span>
                  <Badge variant="destructive">Requires Action</Badge>
                </div>
              </div>
              <CardDescription>AI-powered performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Quote to Order Time</span>
                  <span className="text-sm text-muted-foreground">139 records</span>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Average</div>
                    <div className="text-2xl font-bold">1.11 days</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Median</div>
                    <div className="text-2xl font-bold">1.11 days</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">90th %</div>
                    <div className="text-2xl font-bold">4.67 days</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="text-success">↗ -88.8%</div>
                    <span>vs last month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-success">↗ -91.3%</div>
                    <span>vs last quarter</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {processSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <Card className={`${
                      step.status === 'completed' ? 'bg-success/10 border-success' :
                      step.status === 'current' ? 'bg-primary/10 border-primary' :
                      'bg-muted border-muted-foreground'
                    }`}>
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-success text-white' :
                          step.status === 'current' ? 'bg-primary text-white' :
                          'bg-muted-foreground text-white'
                        }`}>
                          <step.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-sm mb-2">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                    
                    {index < processSteps.length - 1 && (
                      <div className="absolute top-1/2 -right-2 w-4 h-0.5 bg-border transform -translate-y-1/2 z-10" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue-leakage" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                <CardTitle>Revenue Leakage Analysis</CardTitle>
              </div>
              <CardDescription>
                Upload contracts to detect discrepancies and revenue leakage opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <h3 className="font-medium">Upload Contract Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Support for PDF, DOCX, and TXT files. Maximum 10MB per file.
                  </p>
                  <div className="pt-2">
                    <Input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="contract-upload"
                    />
                    <Button asChild>
                      <label htmlFor="contract-upload" className="cursor-pointer">
                        Choose Files
                      </label>
                    </Button>
                  </div>
                </div>
              </div>

              {uploadedFile && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">{uploadedFile}</span>
                    <Badge variant="outline">Uploaded</Badge>
                  </div>

                  {isAnalyzing && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            <span className="text-sm font-medium">Analyzing contract...</span>
                          </div>
                          <Progress value={75} className="w-full" />
                          <p className="text-xs text-muted-foreground">
                            Comparing contract terms with billing records and invoice data
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {analysisComplete && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-success/10 border border-success rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">Analysis Complete</span>
                        <Badge variant="outline">3 issues found</Badge>
                      </div>

                      {mockLeakageData.map((issue) => (
                        <Card key={issue.id} className={`border-l-4 ${
                          issue.status === 'high' ? 'border-l-destructive' :
                          issue.status === 'medium' ? 'border-l-warning' :
                          'border-l-info'
                        }`}>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className={`h-4 w-4 ${
                                  issue.status === 'high' ? 'text-destructive' :
                                  issue.status === 'medium' ? 'text-warning' :
                                  'text-info'
                                }`} />
                                <span className="font-medium">{issue.type}</span>
                                <Badge variant="outline">{issue.confidence}% confidence</Badge>
                              </div>
                              <Badge variant={
                                issue.status === 'high' ? 'destructive' :
                                issue.status === 'medium' ? 'secondary' :
                                'outline'
                              }>
                                {issue.impact} impact
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                            
                            <div className="flex gap-2">
                              <Button size="sm" variant="default">
                                Review Details
                              </Button>
                              <Button size="sm" variant="outline">
                                Mark as Resolved
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}