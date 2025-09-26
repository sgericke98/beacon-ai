"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatAgent } from "@/components/ChatAgent";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
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
  FileText,
  Brain,
  Zap,
  Eye,
  Settings,
  Database,
  LineChart,
  PieChart,
  Users,
  Calendar,
  ArrowRight,
  RefreshCw,
  Bot
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

const mockAnomalies = [
  {
    id: 1,
    type: "Conversion Rate Drop",
    title: "Lead to Opportunity conversion rate dropped 23%",
    description: "Significant decrease from 45% to 22% in the last 30 days for Enterprise segment",
    severity: "high",
    impact: "High Revenue Impact",
    affectedValue: "$247,000",
    confidence: 94,
    recommendation: "Review lead qualification criteria and sales training for Enterprise prospects",
    timeframe: "Last 30 days",
    category: "conversion"
  },
  {
    id: 2,
    type: "Pricing Inconsistency",
    title: "Deal pricing variance exceeds normal range",
    description: "Multiple deals closed at 40%+ discount without proper approval workflow",
    severity: "medium",
    impact: "Medium Revenue Impact",
    affectedValue: "$89,500",
    confidence: 87,
    recommendation: "Implement stricter discount approval process and sales manager oversight",
    timeframe: "Last 45 days",
    category: "pricing"
  },
  {
    id: 3,
    type: "Sales Cycle Anomaly",
    title: "Extended sales cycles in Mid-Market segment",
    description: "Average sales cycle increased from 45 to 78 days, indicating potential process bottlenecks",
    severity: "medium",
    impact: "Medium Revenue Impact",
    affectedValue: "$156,000",
    confidence: 91,
    recommendation: "Analyze Mid-Market sales process and identify bottlenecks in deal progression",
    timeframe: "Last 60 days",
    category: "timing"
  },
  {
    id: 4,
    type: "Quote Abandonment",
    title: "Unusual spike in quote abandonment rate",
    description: "Quote-to-close rate dropped from 78% to 43% with no clear business reason",
    severity: "high",
    impact: "High Revenue Impact",
    affectedValue: "$312,000",
    confidence: 89,
    recommendation: "Review quote complexity, pricing strategy, and competitor analysis",
    timeframe: "Last 21 days",
    category: "abandonment"
  }
];

export function LeadToCashAgent() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("Last 30 days");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isRunningAI, setIsRunningAI] = useState(false);
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const { toast } = useToast();

  const runAIAnalysis = async () => {
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    setIsRunningAI(true);
    
    try {
      // Simulate AI analysis with Perplexity API call
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are an expert sales analytics AI. Analyze lead-to-cash flow data for anomalies and provide actionable insights.'
            },
            {
              role: 'user',
              content: 'Analyze our lead-to-cash flow data for the last 90 days. Look for conversion rate drops, pricing inconsistencies, sales cycle anomalies, and quote abandonment patterns. Provide specific recommendations for improvement.'
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('AI Analysis Result:', data);
      }
      
      // Simulate analysis completion
      setTimeout(() => {
        setIsRunningAI(false);
        setAiAnalysisComplete(true);
        toast({
          title: "AI Analysis Complete",
          description: `Found ${mockAnomalies.length} anomalies in your lead-to-cash flow.`,
        });
      }, 4000);
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      // Still show mock data for demo
      setTimeout(() => {
        setIsRunningAI(false);
        setAiAnalysisComplete(true);
        toast({
          title: "AI Analysis Complete",
          description: `Found ${mockAnomalies.length} anomalies in your lead-to-cash flow.`,
        });
      }, 4000);
    }
  };

  // Mock contract data for detailed view
  const mockContracts = {
    "ACME-2024-001": {
      id: "ACME-2024-001",
      clientName: "ACME Corporation",
      contractValue: "$156,000",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      autoRenewal: true,
      renewalIncrease: "3%",
      billingFrequency: "Monthly",
      usageLimit: "10,000 API calls/month",
      overageRate: "$0.05 per call",
      lastBilled: "2024-12-01",
      currentUsage: "8,432 calls",
      paymentTerms: "Net 30",
      issues: [
        "Volume discount threshold not applied in billing system",
        "Missing overage charges for September 2024"
      ],
      keyTerms: [
        "20% discount applies when monthly usage exceeds 15,000 calls",
        "Automatic renewal with 3% annual increase",
        "60-day notice required for cancellation"
      ]
    },
    "TECHCORP-2023-156": {
      id: "TECHCORP-2023-156", 
      clientName: "TechCorp Industries",
      contractValue: "$89,500",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      autoRenewal: true,
      renewalIncrease: "5%",
      billingFrequency: "Quarterly",
      usageLimit: "Unlimited",
      overageRate: "N/A",
      lastBilled: "2024-09-01",
      currentUsage: "N/A",
      paymentTerms: "Net 45",
      issues: [
        "Auto-renewal increase not reflected in billing system",
        "Contract renewed at previous year's rate"
      ],
      keyTerms: [
        "5% annual increase on auto-renewal",
        "Quarterly billing in advance", 
        "90-day notice required for termination"
      ]
    },
    "GLOBALINC-2024-089": {
      id: "GLOBALINC-2024-089",
      clientName: "Global Inc.",
      contractValue: "$234,700",
      startDate: "2024-03-01", 
      endDate: "2025-02-28",
      autoRenewal: true,
      renewalIncrease: "4%",
      billingFrequency: "Monthly",
      usageLimit: "25,000 transactions/month",
      overageRate: "$0.15 per transaction",
      lastBilled: "2024-12-01",
      currentUsage: "33,540 transactions",
      paymentTerms: "Net 15",
      issues: [
        "Overage charges not applied for Q3 2024",
        "Usage exceeded limit by 34% without billing adjustment"
      ],
      keyTerms: [
        "Usage overage billed monthly at $0.15 per transaction",
        "Volume discounts available at 50,000+ transactions",
        "Service level agreement guarantees 99.9% uptime"
      ]
    }
  };

  const openContractReview = (contractId: string) => {
    setSelectedContract(mockContracts[contractId as keyof typeof mockContracts]);
    setShowContractDialog(true);
  };

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
        <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">L2C Analysis Agent</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Comprehensive analytics and revenue leakage detection for your sales process.
        </p>
      </div>

      <Card className="border-0 shadow-card">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="h-4 w-4" />
              Analytics Dashboard
            </TabsTrigger>
            <TabsTrigger value="ai-anomalies" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Brain className="h-4 w-4" />
              AI Anomaly Detection
              {aiAnalysisComplete && <Badge variant="destructive" className="ml-2">{mockAnomalies.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="revenue-leakage" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <AlertTriangle className="h-4 w-4" />
              Revenue Leakage
              <Badge variant="destructive" className="ml-2">3</Badge>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Bot className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

        <TabsContent value="ai-anomalies" className="space-y-6">
          {/* AI Analysis Section */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">AI-Powered Anomaly Detection</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Advanced machine learning analysis to identify revenue optimization opportunities
                    </CardDescription>
                  </div>
                </div>
                {!isRunningAI && !aiAnalysisComplete && (
                  <Button 
                    onClick={runAIAnalysis}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Bot className="h-5 w-5" />
                    Run AI Analysis
                  </Button>
                )}
              </div>
            </CardHeader>
            
            {!isRunningAI && !aiAnalysisComplete && (
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI Analysis Ready</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Run comprehensive AI analysis to detect anomalies, identify trends, and uncover revenue optimization opportunities in your lead-to-cash process.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span>Conversion Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      <span>Pricing Patterns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-success" />
                      <span>Cycle Time Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-success" />
                      <span>Risk Detection</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}

            {isRunningAI && (
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI Analysis in Progress</h3>
                  <p className="text-muted-foreground mb-6">
                    Analyzing your lead-to-cash data with advanced machine learning algorithms...
                  </p>
                  
                  <div className="space-y-4 max-w-md mx-auto">
                    <Progress value={75} className="w-full" />
                    <div className="text-sm text-muted-foreground space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span>Data preprocessing complete</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span>Pattern recognition in progress</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                        <span>Generating insights and recommendations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}

            {aiAnalysisComplete && (
              <CardContent>
                <div className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-destructive/10 border-destructive/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          <div>
                            <div className="text-2xl font-bold text-destructive">{mockAnomalies.length}</div>
                            <div className="text-sm text-muted-foreground">Anomalies Found</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-warning/10 border-warning/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-warning" />
                          <div>
                            <div className="text-2xl font-bold text-warning">$804K</div>
                            <div className="text-sm text-muted-foreground">Revenue at Risk</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-primary/10 border-primary/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          <div>
                            <div className="text-2xl font-bold text-primary">91%</div>
                            <div className="text-sm text-muted-foreground">Avg Confidence</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-success/10 border-success/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-success" />
                          <div>
                            <div className="text-2xl font-bold text-success">$250K</div>
                            <div className="text-sm text-muted-foreground">Quick Wins</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Anomaly Cards */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Detected Anomalies</h3>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Re-run Analysis
                      </Button>
                    </div>
                    
                    {mockAnomalies.map((anomaly) => (
                      <Card 
                        key={anomaly.id} 
                        className={`border-l-4 hover:shadow-md transition-shadow ${
                          anomaly.severity === 'high' ? 'border-l-destructive bg-destructive/5' : 'border-l-warning bg-warning/5'
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${
                                  anomaly.severity === 'high' ? 'bg-destructive/20' : 'bg-warning/20'
                                }`}>
                                  {anomaly.category === 'conversion' && <TrendingUp className="h-4 w-4 text-destructive" />}
                                  {anomaly.category === 'pricing' && <DollarSign className="h-4 w-4 text-warning" />}
                                  {anomaly.category === 'timing' && <Clock className="h-4 w-4 text-warning" />}
                                  {anomaly.category === 'abandonment' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-base">{anomaly.title}</h4>
                                  <Badge variant="outline" className="mt-1">{anomaly.confidence}% confidence</Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{anomaly.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                                <div>
                                  <span className="text-muted-foreground">Impact Level:</span>
                                  <div className="font-medium">{anomaly.impact}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Affected Value:</span>
                                  <div className="font-medium text-destructive">{anomaly.affectedValue}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Time Frame:</span>
                                  <div className="font-medium">{anomaly.timeframe}</div>
                                </div>
                              </div>

                              <div className="bg-background/50 rounded-lg p-3 mb-4">
                                <div className="text-xs font-medium text-muted-foreground mb-1">AI RECOMMENDATION</div>
                                <p className="text-sm">{anomaly.recommendation}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="default" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{anomaly.title}</DialogTitle>
                                  <DialogDescription>
                                    Detailed analysis and actionable recommendations
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Full Analysis</h4>
                                    <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Recommended Actions</h4>
                                    <p className="text-sm text-muted-foreground">{anomaly.recommendation}</p>
                                  </div>
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button>Implement Fix</Button>
                                    <Button variant="outline">Schedule Review</Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button variant="outline" size="sm">
                              <Zap className="h-4 w-4 mr-2" />
                              Quick Fix
                            </Button>
                            
                            <Button variant="ghost" size="sm">
                              Dismiss
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Customer Segment</label>
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
          {/* Contract Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Contract Portfolio Overview</CardTitle>
                    <CardDescription>
                      Analysis of 47 active contracts for revenue leakage detection
                    </CardDescription>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Add Contracts
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">47</div>
                  <div className="text-sm text-muted-foreground">Active Contracts</div>
                </div>
                <div className="bg-card border rounded-lg p-4">
                  <div className="text-2xl font-bold text-success">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Contract Value</div>
                </div>
                <div className="bg-card border rounded-lg p-4">
                  <div className="text-2xl font-bold text-warning">$89K</div>
                  <div className="text-sm text-muted-foreground">At Risk Revenue</div>
                </div>
                <div className="bg-card border rounded-lg p-4">
                  <div className="text-2xl font-bold text-destructive">3</div>
                  <div className="text-sm text-muted-foreground">Critical Issues</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Leakage Issues */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <CardTitle>Revenue Leakage Detection</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">3 Critical</Badge>
                  <Badge variant="secondary">2 Medium</Badge>
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Re-analyze
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
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
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            issue.status === 'high' ? 'destructive' :
                            issue.status === 'medium' ? 'secondary' :
                            'outline'
                          }>
                            {issue.impact} impact
                          </Badge>
                          <Badge variant="outline">
                            ${(Math.random() * 50000 + 10000).toLocaleString()}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          Contract: ACME-2024-{String(issue.id).padStart(3, '0')} • Last updated: 2 days ago
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => openContractReview("ACME-2024-001")}
                          >
                            Review Contract
                          </Button>
                          <Button size="sm" variant="outline">
                            Mark Resolved
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Additional Revenue Leakage Items */}
                <Card className="border-l-4 border-l-warning">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span className="font-medium">Auto-renewal Mismatch</span>
                        <Badge variant="outline">87% confidence</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Medium impact</Badge>
                        <Badge variant="outline">$23,400</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Contract specifies auto-renewal with 5% increase, but billing system shows flat renewal rate for past 6 months.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Contract: TECHCORP-2023-156 • Last updated: 1 week ago
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => openContractReview("TECHCORP-2023-156")}
                        >
                          Review Contract
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark Resolved
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-warning">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span className="font-medium">Usage Overage Detection</span>
                        <Badge variant="outline">92% confidence</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Medium impact</Badge>
                        <Badge variant="outline">$15,670</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Client exceeded usage limits by 34% in Q3 but no overage charges were applied according to contract terms.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Contract: GLOBALINC-2024-089 • Last updated: 3 days ago
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => openContractReview("GLOBALINC-2024-089")}
                        >
                          Review Contract
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark Resolved
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="h-[600px]">
              <ChatAgent agentType="lead-to-cash" />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* Contract Review Dialog */}
      <Dialog open={showContractDialog} onOpenChange={setShowContractDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Review: {selectedContract?.clientName}
            </DialogTitle>
            <DialogDescription>
              Detailed contract analysis and revenue leakage detection
            </DialogDescription>
          </DialogHeader>
          
          {selectedContract && (
            <div className="space-y-6">
              {/* Contract Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Contract Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contract ID:</span>
                      <span className="font-medium">{selectedContract.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Client:</span>
                      <span className="font-medium">{selectedContract.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value:</span>
                      <span className="font-medium text-success">{selectedContract.contractValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Term:</span>
                      <span className="font-medium">{selectedContract.startDate} - {selectedContract.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Billing:</span>
                      <span className="font-medium">{selectedContract.billingFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Terms:</span>
                      <span className="font-medium">{selectedContract.paymentTerms}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Usage & Billing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Usage Limit:</span>
                      <span className="font-medium">{selectedContract.usageLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Usage:</span>
                      <span className="font-medium">{selectedContract.currentUsage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Overage Rate:</span>
                      <span className="font-medium">{selectedContract.overageRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Billed:</span>
                      <span className="font-medium">{selectedContract.lastBilled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Auto-Renewal:</span>
                      <Badge variant={selectedContract.autoRenewal ? "default" : "secondary"}>
                        {selectedContract.autoRenewal ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Renewal Increase:</span>
                      <span className="font-medium">{selectedContract.renewalIncrease}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Issues Detected */}
              <Card className="border-destructive/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    Revenue Leakage Issues ({selectedContract.issues.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedContract.issues.map((issue: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        <span className="text-sm">{issue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Terms */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Key Contract Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedContract.keyTerms.map((term: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                        <span>{term}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1">
                  Generate Recovery Invoice
                </Button>
                <Button variant="outline" className="flex-1">
                  Mark Issues Resolved
                </Button>
                <Button variant="outline">
                  Export Contract Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* API Key Dialog */}
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Analysis Setup</DialogTitle>
            <DialogDescription>
              Enter your Perplexity API key to enable AI-powered anomaly detection. 
              You can get your API key from the Perplexity AI dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">Perplexity API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="pplx-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setShowApiKeyDialog(false);
                  if (apiKey) runAIAnalysis();
                }}
                disabled={!apiKey}
                className="flex-1"
              >
                Start AI Analysis
              </Button>
              <Button variant="outline" onClick={() => setShowApiKeyDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}