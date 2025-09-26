"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, 
  Plus, 
  Settings, 
  Database, 
  Cloud,
  Zap,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const integrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Connect your Salesforce CRM for account and opportunity data",
    icon: Cloud,
    status: "disconnected",
    type: "CRM"
  },
  {
    id: "netsuite", 
    name: "NetSuite",
    description: "Connect your NetSuite ERP for billing and financial data",
    icon: Database,
    status: "disconnected", 
    type: "ERP"
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Connect your HubSpot CRM for lead and contact data",
    icon: Zap,
    status: "disconnected",
    type: "CRM"
  }
];

export function SetupPage() {
  const [connections, setConnections] = useState(integrations);
  const [showConnectionForm, setShowConnectionForm] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = (integrationId: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === integrationId 
          ? { ...conn, status: "connected" }
          : conn
      )
    );
    setShowConnectionForm(null);
    
    const integration = connections.find(c => c.id === integrationId);
    toast({
      title: "Connection Successful",
      description: `Successfully connected to ${integration?.name}. Data sync will begin shortly.`,
    });
  };

  const connectedCount = connections.filter(c => c.status === "connected").length;
  const totalCount = connections.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">System Setup</h1>
        <p className="text-muted-foreground">
          Connect your CRM and ERP systems to enable AI agent functionality.
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Integration Progress
              </CardTitle>
              <CardDescription>
                {connectedCount} of {totalCount} systems connected
              </CardDescription>
            </div>
            <Badge variant={connectedCount === totalCount ? "default" : "secondary"}>
              {Math.round((connectedCount / totalCount) * 100)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Setup Progress</span>
              <span>{connectedCount}/{totalCount} systems</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(connectedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Cards */}
      <div className="grid gap-4">
        {connections.map((integration) => (
          <Card key={integration.id} className={`${
            integration.status === "connected" 
              ? "border-success bg-success/5" 
              : "border-border"
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    integration.status === "connected" 
                      ? "bg-success/20" 
                      : "bg-muted"
                  }`}>
                    <integration.icon className={`h-5 w-5 ${
                      integration.status === "connected" 
                        ? "text-success" 
                        : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {integration.type}
                      </Badge>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {integration.status === "connected" ? (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setShowConnectionForm(integration.id)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {showConnectionForm === integration.id && (
              <CardContent className="border-t bg-muted/20">
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${integration.id}-url`}>Server URL</Label>
                      <Input 
                        id={`${integration.id}-url`}
                        placeholder={`Enter your ${integration.name} URL`}
                        defaultValue={
                          integration.id === "salesforce" ? "https://yourorg.salesforce.com" :
                          integration.id === "netsuite" ? "https://system.netsuite.com" :
                          "https://app.hubspot.com"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${integration.id}-token`}>API Token</Label>
                      <Input 
                        id={`${integration.id}-token`}
                        type="password"
                        placeholder="Enter your API token"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <Button 
                      onClick={() => handleConnect(integration.id)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Connect {integration.name}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowConnectionForm(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      {connectedCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Next Steps
            </CardTitle>
            <CardDescription>
              Great! You've connected {connectedCount} system{connectedCount !== 1 ? 's' : ''}. 
              Here's what happens next:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Data synchronization will begin automatically</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">AI agents will start analyzing your data</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Initial insights will be available within 15 minutes</span>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}