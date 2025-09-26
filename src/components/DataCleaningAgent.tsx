import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  Database,
  FileText,
  Users,
  RefreshCw,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Eye,
  History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dataSources = [
  { value: "salesforce", label: "Salesforce", icon: Database },
  { value: "hubspot", label: "HubSpot", icon: Users },
  { value: "pipedrive", label: "Pipedrive", icon: TrendingUp },
  { value: "csv", label: "CSV Upload", icon: FileText },
];

const dataTypes = [
  { 
    value: "accounts", 
    label: "Accounts & Companies", 
    description: "Customer and prospect information",
    count: "2,847 records",
    icon: Database
  },
  { 
    value: "contacts", 
    label: "Contacts & Leads", 
    description: "Individual contact records",
    count: "5,234 records", 
    icon: Users
  },
  { 
    value: "opportunities", 
    label: "Opportunities & Deals", 
    description: "Sales pipeline data",
    count: "1,892 records",
    icon: Target
  },
  { 
    value: "contracts", 
    label: "Contracts & Agreements", 
    description: "Legal and commercial documents",
    count: "1,256 documents",
    icon: FileText
  },
];

const mockAnalysisSteps = [
  {
    id: 1,
    title: "Connecting to Salesforce",
    description: "Establishing secure connection to your CRM",
    status: "completed",
    duration: 2000
  },
  {
    id: 2,
    title: "Reading Accounts Data", 
    description: "Analyzing 2,847 account records",
    status: "completed",
    duration: 3000
  },
  {
    id: 3,
    title: "Reading Contracts Data",
    description: "Processing 1,256 contract documents",
    status: "running",
    duration: 4000
  },
  {
    id: 4,
    title: "Identifying Duplicates",
    description: "AI-powered deduplication analysis",
    status: "pending",
    duration: 5000
  },
  {
    id: 5,
    title: "Data Quality Assessment",
    description: "Evaluating data completeness and accuracy",
    status: "pending",
    duration: 3000
  },
  {
    id: 6,
    title: "Generating Recommendations",
    description: "Creating actionable cleanup suggestions",
    status: "pending",
    duration: 2000
  }
];

const mockRecommendations = [
  {
    id: 1,
    type: "Duplicate Accounts",
    title: "Merge 23 duplicate account records",
    description: "Found accounts with similar names and contact information that should be consolidated",
    impact: "High",
    affectedRecords: 46,
    timeToFix: "15 min",
    category: "deduplication",
    details: {
      summary: "We found 23 sets of duplicate accounts that are likely the same company but stored as separate records.",
      examples: [
        {
          masterRecord: "Acme Corporation",
          duplicateRecords: ["ACME Corp", "Acme Corp.", "ACME Corporation Inc"],
          confidence: "95%",
          reason: "Same company name with minor variations and identical email domain (@acme.com)"
        },
        {
          masterRecord: "TechStart Inc",
          duplicateRecords: ["TechStart Incorporated", "Tech Start Inc"],
          confidence: "92%",
          reason: "Identical phone number and address, same key contacts"
        },
        {
          masterRecord: "Global Systems",
          duplicateRecords: ["Global Systems LLC", "Global Systems Ltd"],
          confidence: "88%",
          reason: "Same website domain and overlapping contact information"
        }
      ],
      impact: "Merging these duplicates will eliminate confusion in sales reports and prevent multiple team members from contacting the same company.",
      recommendedAction: "Merge the duplicate records into the most complete master record and update all related contacts and opportunities."
    }
  }
];

const mockHistory = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:22",
    action: "Merged Duplicate Accounts",
    details: "Successfully merged 5 variations of 'Acme Corp' into one master record. This eliminated confusion and improved data accuracy.",
    user: "AI Agent",
    status: "completed",
    impact: "Improved data accuracy by 15%",
    recordsAffected: 5
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:25:18",
    action: "Standardized Company Names",
    details: "Applied consistent naming rules to 34 companies (e.g., 'Inc.' → 'Inc', 'LLC.' → 'LLC'). Makes searching and reporting more reliable.",
    user: "AI Agent", 
    status: "completed",
    impact: "Enhanced search accuracy",
    recordsAffected: 34
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:20:45",
    action: "Fixed Invalid Email Addresses",
    details: "Corrected 8 email addresses with typos like missing '@' symbols and invalid domains. Prevents bounced emails.",
    user: "John Smith",
    status: "completed",
    impact: "Reduced email bounce rate",
    recordsAffected: 8
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:15:32",
    action: "Enriched Contact Information",
    details: "Added missing phone numbers to 23 contacts using LinkedIn data. Improves sales team outreach capabilities.",
    user: "AI Agent",
    status: "completed",
    impact: "Increased contact completeness",
    recordsAffected: 23
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:10:15",
    action: "Reviewed Duplicate Suggestion",
    details: "Manually reviewed and confirmed that 'Global Inc' and 'Global Industries' are separate companies, not duplicates.",
    user: "Jane Doe",
    status: "rejected",
    impact: "Prevented incorrect merge",
    recordsAffected: 2
  }
];

export function DataCleaningAgent() {
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<typeof mockRecommendations[0] | null>(null);
  const [credentials, setCredentials] = useState({
    username: "admin@company.com",
    password: "••••••••••",
    apiKey: "••••••••••••••••••••"
  });
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();

  const handleDataTypeToggle = (dataType: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataType) 
        ? prev.filter(type => type !== dataType)
        : [...prev, dataType]
    );
  };

  const handleRunAnalysis = () => {
    if (!selectedSource || selectedDataTypes.length === 0) {
      toast({
        title: "Configuration Required",
        description: "Please select a data source and at least one data type.",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    setCurrentStep(0);
    setAnalysisComplete(false);

    // Simulate analysis steps
    const runSteps = () => {
      mockAnalysisSteps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index + 1);
          if (index === mockAnalysisSteps.length - 1) {
            setIsRunning(false);
            setAnalysisComplete(true);
            toast({
              title: "Analysis Complete",
              description: `Found ${mockRecommendations.length} optimization opportunities.`,
            });
          }
        }, step.duration * (index + 1));
      });
    };

    runSteps();
  };

  const handleApplyRecommendation = (id: number) => {
    toast({
      title: "Recommendation Applied",
      description: "Data cleaning action has been queued for execution.",
    });
  };

  const selectedSourceInfo = dataSources.find(source => source.value === selectedSource);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Data Cleaning Orchestrator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          AI-powered data quality analysis and automated cleanup recommendations for your business systems.
        </p>
      </div>

      <Tabs defaultValue="orchestrator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 h-auto">
          <TabsTrigger value="orchestrator" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Settings className="h-4 w-4" />
            Data Orchestrator
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <History className="h-4 w-4" />
            Change History
            <Badge variant="outline">{mockHistory.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orchestrator" className="space-y-6">
          {/* Configuration Section */}
          {!isRunning && !analysisComplete && (
            <Card className="border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">Data Source Configuration</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Configure your data source connection and select the data types to analyze.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Data Source Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">Data Source</Label>
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select your data source" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSources.map((source) => (
                        <SelectItem key={source.value} value={source.value}>
                          <div className="flex items-center gap-3">
                            <source.icon className="h-4 w-4" />
                            {source.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Connection Status */}
                {selectedSource && selectedSource !== 'csv' && (
                  <div className="space-y-4 p-4 bg-success/10 rounded-lg border border-success/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-success/20 rounded-lg">
                          {selectedSourceInfo && <selectedSourceInfo.icon className="h-4 w-4 text-success" />}
                        </div>
                        <Label className="text-sm font-semibold text-foreground">
                          {selectedSourceInfo?.label} Connection
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                          Connected
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Username/Email</Label>
                        <div className="p-2 bg-background/50 rounded border text-sm">
                          {credentials.username}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">API Key</Label>
                        <div className="p-2 bg-background/50 rounded border text-sm font-mono">
                          {credentials.apiKey}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Last sync: 2 minutes ago • Data access: Read/Write permissions active
                    </div>
                  </div>
                )}

                {/* Data Types Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">Data Types to Analyze</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dataTypes.map((dataType) => (
                      <Card 
                        key={dataType.value}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedDataTypes.includes(dataType.value) 
                            ? 'bg-primary/10 border-primary shadow-sm' 
                            : 'hover:bg-accent/50'
                        }`}
                        onClick={() => handleDataTypeToggle(dataType.value)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`p-2 rounded-lg ${
                                selectedDataTypes.includes(dataType.value) 
                                  ? 'bg-primary/20' 
                                  : 'bg-muted/50'
                              }`}>
                                <dataType.icon className={`h-4 w-4 ${
                                  selectedDataTypes.includes(dataType.value) 
                                    ? 'text-primary' 
                                    : 'text-muted-foreground'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium text-sm">{dataType.label}</h3>
                                  {selectedDataTypes.includes(dataType.value) && (
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mb-1">{dataType.description}</p>
                                <p className="text-xs font-medium text-primary">{dataType.count}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Run Button */}
                <div className="pt-4 border-t border-border/50">
                  <Button 
                    onClick={handleRunAnalysis}
                    size="lg"
                    className="w-full md:w-auto flex items-center gap-2"
                    disabled={!selectedSource || selectedDataTypes.length === 0}
                  >
                    <Play className="h-5 w-5" />
                    Start Data Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Running Section */}
          {isRunning && (
            <Card className="border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary">
                    <RefreshCw className="h-6 w-6 opacity-0" />
                  </div>
                  <CardTitle className="text-xl">Running Data Analysis</CardTitle>
                </div>
                <CardDescription>
                  Analyzing your {selectedSourceInfo?.label} data for quality issues and optimization opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {mockAnalysisSteps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep - 1;
                    const isPending = index >= currentStep;
                    
                    return (
                      <div key={step.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-success text-white' :
                          isActive ? 'bg-primary text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : isActive ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          ) : (
                            <span className="text-sm font-medium">{step.id}</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className={`font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>

                        {isActive && (
                          <Badge variant="outline" className="animate-pulse">
                            Processing...
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                            Complete
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {currentStep}/{mockAnalysisSteps.length} steps
                    </span>
                  </div>
                  <Progress value={(currentStep / mockAnalysisSteps.length) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {analysisComplete && (
            <Card className="border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-success" />
                    <CardTitle className="text-xl">Analysis Complete</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    {mockRecommendations.length} recommendations
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  Found {mockRecommendations.length} optimization opportunities that can improve your data quality.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecommendations.map((recommendation) => (
                  <Card key={recommendation.id} className="border-l-4 border-l-primary bg-accent/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            recommendation.impact === 'High' ? 'bg-destructive/10' :
                            'bg-warning/10'
                          }`}>
                            {recommendation.impact === 'High' ? (
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                            ) : (
                              <Target className="h-5 w-5 text-warning" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{recommendation.title}</h3>
                            <p className="text-sm text-muted-foreground">{recommendation.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={recommendation.impact === 'High' ? 'destructive' : 'secondary'}>
                            {recommendation.impact} Impact
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{recommendation.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Affected Records:</span>
                          <div className="font-medium">{recommendation.affectedRecords}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time to Fix:</span>
                          <div className="font-medium">{recommendation.timeToFix}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Category:</span>
                          <div className="font-medium capitalize">{recommendation.category}</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          size="sm"
                          onClick={() => handleApplyRecommendation(recommendation.id)}
                          className="flex items-center gap-2"
                        >
                          <Zap className="h-4 w-4" />
                          Apply Fix
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedRecommendation(recommendation)}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              Review Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{recommendation.title}</DialogTitle>
                              <DialogDescription>
                                Detailed analysis of {recommendation.type.toLowerCase()}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Impact Analysis</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Severity:</span>
                                    <Badge variant={recommendation.impact === 'High' ? 'destructive' : 'secondary'} className="ml-2">
                                      {recommendation.impact}
                                    </Badge>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Records Affected:</span>
                                    <span className="ml-2 font-medium">{recommendation.affectedRecords}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {recommendation.details && (
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Summary</h4>
                                    <p className="text-sm text-muted-foreground">{recommendation.details.summary}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-3">Examples Found ({recommendation.details.examples?.length})</h4>
                                    <div className="space-y-3">
                                      {recommendation.details.examples?.map((example: any, index: number) => (
                                        <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                                          <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                              <div className="font-medium text-sm mb-1">Master: {example.masterRecord}</div>
                                              <div className="text-xs text-muted-foreground mb-2">
                                                Duplicates: {example.duplicateRecords?.join(", ")}
                                              </div>
                                              <div className="text-xs text-muted-foreground">
                                                Confidence: {example.confidence} • {example.reason}
                                              </div>
                                            </div>
                                            <Badge variant="secondary" className="ml-3">{example.confidence}</Badge>
                                          </div>
                                          <Button 
                                            variant="default" 
                                            size="sm"
                                            onClick={() => {
                                              toast({
                                                title: "Merge Applied",
                                                description: `Successfully merged duplicates into "${example.masterRecord}"`,
                                              });
                                            }}
                                            className="w-full"
                                          >
                                            <Zap className="h-4 w-4 mr-2" />
                                            Apply This Merge
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Impact</h4>
                                    <p className="text-sm text-muted-foreground">{recommendation.details.impact}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Recommended Action</h4>
                                    <p className="text-sm text-muted-foreground">{recommendation.details.recommendedAction}</p>
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex gap-2 pt-4 border-t">
                                <Button onClick={() => handleApplyRecommendation(recommendation.id)}>
                                  Apply Recommendation
                                </Button>
                                <Button variant="outline">
                                  Schedule for Later
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="sm">
                          Skip
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="pt-4 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setAnalysisComplete(false);
                      setCurrentStep(0);
                      setSelectedSource("");
                      setSelectedDataTypes([]);
                    }}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Run New Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <History className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Change History</CardTitle>
              </div>
              <CardDescription className="text-base">
                Track all data cleaning actions and their results over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistory.map((change) => (
                  <div key={change.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      change.status === 'completed' ? 'bg-success/10 text-success' :
                      change.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {change.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : change.status === 'rejected' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between mb-1">
                         <h3 className="font-medium text-foreground">{change.action}</h3>
                         <time className="text-xs text-muted-foreground">{change.timestamp}</time>
                       </div>
                       <p className="text-sm text-muted-foreground mb-3">{change.details}</p>
                       
                       {change.impact && (
                         <div className="mb-2 p-2 bg-accent/20 rounded text-xs">
                           <span className="font-medium text-foreground">Impact: </span>
                           <span className="text-muted-foreground">{change.impact}</span>
                         </div>
                       )}
                       
                       <div className="flex items-center gap-4 text-xs">
                         <span className="text-muted-foreground">
                           By: <span className="font-medium">{change.user}</span>
                         </span>
                         {change.recordsAffected && (
                           <span className="text-muted-foreground">
                             Records: <span className="font-medium">{change.recordsAffected}</span>
                           </span>
                         )}
                         <Badge 
                           variant={change.status === 'completed' ? 'default' : 'destructive'}
                           className="text-xs"
                         >
                           {change.status}
                         </Badge>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}