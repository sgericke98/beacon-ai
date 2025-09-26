import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Users, FileText, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockAccountDuplicates = [
  { id: 1, name: "Acme Corp", duplicate: "ACME Corporation", confidence: 95, status: "pending" },
  { id: 2, name: "TechStart Inc.", duplicate: "TechStart Incorporated", confidence: 88, status: "pending" },
  { id: 3, name: "Global Systems", duplicate: "Global Systems LLC", confidence: 92, status: "pending" },
];

const mockContractDuplicates = [
  { id: 1, name: "Standard Service Agreement", duplicate: "Std Service Agreement", confidence: 90, status: "pending" },
  { id: 2, name: "Enterprise License", duplicate: "Enterprise Software License", confidence: 85, status: "pending" },
];

export function DataCleaningAgent() {
  const [accountDuplicates, setAccountDuplicates] = useState(mockAccountDuplicates);
  const [contractDuplicates, setContractDuplicates] = useState(mockContractDuplicates);
  const { toast } = useToast();

  const handleMergeAccount = (id: number) => {
    setAccountDuplicates(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Account Merged",
      description: "Duplicate account has been successfully merged.",
    });
  };

  const handleMergeContract = (id: number) => {
    setContractDuplicates(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Contract Merged", 
      description: "Duplicate contract name has been successfully merged.",
    });
  };

  const handleRejectAccount = (id: number) => {
    setAccountDuplicates(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Suggestion Rejected",
      description: "Duplicate suggestion has been rejected.",
    });
  };

  const handleRejectContract = (id: number) => {
    setContractDuplicates(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Suggestion Rejected", 
      description: "Duplicate suggestion has been rejected.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Data Cleaning Agent</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          AI-powered data deduplication and cleaning for your CRM and ERP systems.
        </p>
      </div>

      <Card className="border-0 shadow-card">
        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="accounts" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Users className="h-4 w-4" />
              Account Deduplication
              {accountDuplicates.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {accountDuplicates.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2 py-3 px-6 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4" />
              Contract Name Deduplication
              {contractDuplicates.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {contractDuplicates.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-6 mt-6">
            <Card className="border-0 shadow-card">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="h-6 w-6 text-primary" />
                  Account Deduplication Analysis
                </CardTitle>
                <CardDescription className="text-base">
                  Found {accountDuplicates.length} potential duplicate accounts that require your review.
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4">
              {accountDuplicates.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">All Clean!</h3>
                  <p className="text-muted-foreground">No duplicate accounts detected.</p>
                </div>
              ) : (
                accountDuplicates.map((duplicate) => (
                  <Card key={duplicate.id} className="border border-warning/20 bg-warning/5 rounded-xl hover:shadow-card transition-all duration-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-warning/10 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-warning" />
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">Potential Duplicate Detected</span>
                            <Badge variant="outline" className="ml-2 bg-warning/10 text-warning border-warning/20 font-medium">
                              {duplicate.confidence}% confidence
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Primary Account</label>
                          <p className="font-medium text-muted-foreground bg-background p-3 rounded-lg border">{duplicate.name}</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Duplicate Account</label>
                          <p className="font-medium text-muted-foreground bg-background p-3 rounded-lg border">{duplicate.duplicate}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="text-sm font-semibold text-foreground mb-3 block uppercase tracking-wide">Confidence Score</label>
                        <Progress value={duplicate.confidence} className="h-3" />
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          size="sm" 
                          onClick={() => handleMergeAccount(duplicate.id)}
                          className="flex items-center gap-2"
                          variant="premium"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Merge Accounts
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectAccount(duplicate.id)}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Not a Duplicate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contract Name Deduplication Analysis
              </CardTitle>
              <CardDescription>
                Found {contractDuplicates.length} potential duplicate contract names that require your review.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contractDuplicates.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">All Clean!</h3>
                  <p className="text-muted-foreground">No duplicate contract names detected.</p>
                </div>
              ) : (
                contractDuplicates.map((duplicate) => (
                  <Card key={duplicate.id} className="border-l-4 border-l-warning">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-warning" />
                          <span className="font-medium">Potential Duplicate Detected</span>
                          <Badge variant="outline">{duplicate.confidence}% confidence</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Primary Contract</label>
                          <p className="font-medium">{duplicate.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Duplicate Contract</label>
                          <p className="font-medium">{duplicate.duplicate}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">Confidence Score</label>
                        <Progress value={duplicate.confidence} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleMergeContract(duplicate.id)}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Merge Contracts
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectContract(duplicate.id)}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Not a Duplicate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}