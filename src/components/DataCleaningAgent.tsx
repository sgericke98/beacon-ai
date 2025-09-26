import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dataSources = [
  { value: "salesforce", label: "Salesforce", icon: Database },
  { value: "hubspot", label: "HubSpot", icon: Users },
  { value: "pipedrive", label: "Pipedrive", icon: TrendingUp },
  { value: "csv", label: "CSV Upload", icon: FileText },
];

const dataTypes = [
  { value: "accounts", label: "Accounts & Companies", description: "Customer and prospect information" },
  { value: "contacts", label: "Contacts & Leads", description: "Individual contact records" },
  { value: "opportunities", label: "Opportunities & Deals", description: "Sales pipeline data" },
  { value: "contracts", label: "Contracts & Agreements", description: "Legal and commercial documents" },
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
    category: "deduplication"
  },
  {
    id: 2,
    type: "Missing Information",
    title: "Complete 156 incomplete contact records",
    description: "Contact records missing phone numbers, addresses, or job titles",
    impact: "Medium",
    affectedRecords: 156,
    timeToFix: "45 min",
    category: "completion"
  },
  {
    id: 3,
    type: "Data Standardization",
    title: "Standardize 89 company name formats",
    description: "Inconsistent naming conventions (Inc., Inc, Incorporated)",
    impact: "Medium",
    affectedRecords: 89,
    timeToFix: "10 min",
    category: "standardization"
  },
  {
    id: 4,
    type: "Invalid Data",
    title: "Fix 12 invalid email addresses",
    description: "Email addresses with formatting errors or typos",
    impact: "High",
    affectedRecords: 12,
    timeToFix: "5 min",
    category: "validation"
  }
];

export function DataCleaningAgent() {
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    apiKey: ""
  });
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

            {/* Credentials Section */}
            {selectedSource && selectedSource !== 'csv' && (
              <div className="space-y-4 p-4 bg-accent/20 rounded-lg border border-accent/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    {selectedSourceInfo && <selectedSourceInfo.icon className="h-4 w-4 text-primary" />}
                  </div>
                  <Label className="text-sm font-semibold text-foreground">
                    {selectedSourceInfo?.label} Connection Details
                  </Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username/Email</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="your.email@company.com"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({...prev, username: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter your API key"
                      value={credentials.apiKey}
                      onChange={(e) => setCredentials(prev => ({...prev, apiKey: e.target.value}))}
                    />
                  </div>
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
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{dataType.label}</h3>
                            {selectedDataTypes.includes(dataType.value) && (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{dataType.description}</p>
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
                    <Button variant="outline" size="sm">
                      Review Details
                    </Button>
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
    </div>
  );
}