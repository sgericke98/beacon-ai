import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, DollarSign, Target, ArrowRight, Zap, TrendingUp, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-card px-6">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Beacon Platform</h1>
            </div>
          </header>
          
          <div className="flex-1 p-6">
            <div className="max-w-4xl space-y-8">
              {/* Welcome Section */}
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome to Beacon Platform
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  AI-powered agents that transform your business data into actionable insights. 
                  Connect your systems and let our agents optimize your operations.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-muted-foreground">Active Agents</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mx-auto mb-2">
                      <Users className="h-6 w-6 text-success" />
                    </div>
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm text-muted-foreground">Agent Categories</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-lg mx-auto mb-2">
                      <Target className="h-6 w-6 text-warning" />
                    </div>
                    <div className="text-2xl font-bold">Demo</div>
                    <div className="text-sm text-muted-foreground">Current Mode</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-info/10 rounded-lg mx-auto mb-2">
                      <Zap className="h-6 w-6 text-info" />
                    </div>
                    <div className="text-2xl font-bold">∞</div>
                    <div className="text-sm text-muted-foreground">Scalable</div>
                  </CardContent>
                </Card>
              </div>

              {/* Available Agents */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Available Agents</h2>
                
                <div className="grid gap-4">
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Data Cleaning Agent
                            <Badge>Active</Badge>
                          </CardTitle>
                          <CardDescription>
                            AI-powered deduplication for accounts and contract names. 
                            Automatically detects and resolves data inconsistencies.
                          </CardDescription>
                        </div>
                        <Button asChild>
                          <Link to="/agents/data-cleaning" className="flex items-center gap-2">
                            Open Agent
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Lead-to-Cash Analysis Agent
                            <Badge>Active</Badge>
                          </CardTitle>
                          <CardDescription>
                            Comprehensive sales process analytics with revenue leakage detection. 
                            Upload contracts to identify billing discrepancies.
                          </CardDescription>
                        </div>
                        <Button asChild>
                          <Link to="/agents/lead-to-cash" className="flex items-center gap-2">
                            Open Agent
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              {/* Coming Soon */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Coming Soon</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="opacity-60">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        People Agents
                      </CardTitle>
                      <CardDescription>
                        HR analytics, talent acquisition, and employee insights.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="opacity-60">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Finance Agents
                      </CardTitle>
                      <CardDescription>
                        Financial forecasting, budget analysis, and cost optimization.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="opacity-60">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Strategy Agents
                      </CardTitle>
                      <CardDescription>
                        Market analysis, competitive intelligence, and growth planning.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              {/* Setup CTA */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle>Ready to Get Started?</CardTitle>
                  <CardDescription>
                    Connect your CRM and ERP systems to unlock the full power of AI agents.
                  </CardDescription>
                  <div className="pt-4">
                    <Button asChild size="lg">
                      <Link to="/setup" className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Setup Integrations
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
