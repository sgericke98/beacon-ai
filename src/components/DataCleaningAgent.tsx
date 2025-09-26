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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Data Cleaning Agent</h1>
        <p className="text-muted-foreground">
          AI-powered data deduplication and cleaning for your CRM and ERP systems.
        </p>
      </div>

      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Account Deduplication
            {accountDuplicates.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {accountDuplicates.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Contract Name Deduplication
            {contractDuplicates.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {contractDuplicates.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Account Deduplication Analysis
              </CardTitle>
              <CardDescription>
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
                          <label className="text-sm font-medium text-muted-foreground">Primary Account</label>
                          <p className="font-medium">{duplicate.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Duplicate Account</label>
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
                          onClick={() => handleMergeAccount(duplicate.id)}
                          className="flex items-center gap-2"
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
    </div>
  );
}