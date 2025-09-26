"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, DollarSign, Target, ArrowRight, Zap, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b bg-card/50 backdrop-blur-sm px-6 sticky top-0 z-40">
            <SidebarTrigger />
            <div className="ml-4 flex items-center gap-3">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Business Intelligence</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-success">System Online</span>
              </div>
            </div>
          </header>
          
          <div className="flex-1 flex">
            {/* Main Dashboard Content */}
            <div className="flex-1 p-6">
              <div className="max-w-6xl space-y-8">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-8 border border-primary/20">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                  <div className="relative text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-primary">AI Platform Active</span>
                    </div>
                    <div className="gradient-lovable bg-clip-text text-transparent">
                      <h1 className="text-5xl font-bold tracking-tight">
                        Welcome to Beacon Platform
                      </h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                      AI-powered agents that transform your business data into actionable insights. 
                      Connect your systems and let our agents optimize your operations.
                    </p>
                    <div className="flex items-center justify-center gap-6 pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>2 Active Agents</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-info rounded-full"></div>
                        <span>Real-time Processing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="group hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-lg">
                              <BarChart3 className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">2</div>
                          </div>
                          <div className="text-sm font-medium text-muted-foreground">Active Agents</div>
                          <div className="text-xs text-success mt-1">✓ Running</div>
                        </div>
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="group hover:shadow-elegant transition-all duration-300 border-l-4 border-l-accent">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                              <Users className="h-5 w-5 text-accent" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">4</div>
                          </div>
                          <div className="text-sm font-medium text-muted-foreground">Categories</div>
                          <div className="text-xs text-info mt-1">Available</div>
                        </div>
                        <div className="w-2 h-2 bg-info rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="group hover:shadow-elegant transition-all duration-300 border-l-4 border-l-warning">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
                              <Target className="h-5 w-5 text-warning" />
                            </div>
                            <div className="text-lg font-bold text-foreground">Demo</div>
                          </div>
                          <div className="text-sm font-medium text-muted-foreground">Mode</div>
                          <div className="text-xs text-warning mt-1">Testing</div>
                        </div>
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="group hover:shadow-elegant transition-all duration-300 border-l-4 border-l-info">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-info/10 rounded-lg">
                              <Zap className="h-5 w-5 text-info" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">∞</div>
                          </div>
                          <div className="text-sm font-medium text-muted-foreground">Scalable</div>
                          <div className="text-xs text-info mt-1">Enterprise</div>
                        </div>
                        <div className="w-2 h-2 bg-info rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Available Agents */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">Available Agents</h2>
                      <p className="text-muted-foreground mt-1">AI-powered tools ready for deployment</p>
                    </div>
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                      2 Active
                    </Badge>
                  </div>
                  
                  <div className="grid gap-6">
                    <Card className="group hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-xl">
                                <BarChart3 className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-xl font-semibold text-foreground">
                                  Data Cleaning
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className="gradient-primary text-white border-0 text-xs">Active</Badge>
                                  <div className="flex items-center gap-1 text-xs text-success">
                                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                                    <span>Processing</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <CardDescription className="text-base leading-relaxed">
                              AI-powered deduplication for accounts and contract names. 
                              Automatically detects and resolves data inconsistencies across your systems.
                            </CardDescription>
                            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                <span>Real-time processing</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-info rounded-full"></div>
                                <span>99.9% accuracy</span>
                              </div>
                            </div>
                          </div>
                          <Button asChild size="lg" className="shadow-elegant hover:shadow-xl transition-all duration-300">
                            <Link href="/agents/data-cleaning" className="flex items-center gap-2">
                              Open Agent
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>

                    <Card className="group hover:shadow-elegant transition-all duration-300 border-l-4 border-l-accent bg-gradient-to-r from-accent/5 to-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-accent" />
                              </div>
                              <div>
                                <CardTitle className="text-xl font-semibold text-foreground">
                                  L2C Analysis Agent
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">Active</Badge>
                                  <div className="flex items-center gap-1 text-xs text-success">
                                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                                    <span>Analyzing</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <CardDescription className="text-base leading-relaxed">
                              Comprehensive sales process analytics with revenue leakage detection. 
                              Upload contracts to identify billing discrepancies automatically.
                            </CardDescription>
                            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                <span>Revenue optimization</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-info rounded-full"></div>
                                <span>Contract analysis</span>
                              </div>
                            </div>
                          </div>
                          <Button asChild size="lg" variant="secondary" className="shadow-elegant hover:shadow-xl transition-all duration-300">
                            <Link href="/agents/lead-to-cash" className="flex items-center gap-2">
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
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">Coming Soon</h2>
                      <p className="text-muted-foreground mt-1">Advanced AI agents in development</p>
                    </div>
                    <Badge variant="outline" className="border-warning/20 bg-warning/5 text-warning">
                      In Development
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="group hover:shadow-elegant transition-all duration-300 opacity-70 hover:opacity-90 border border-warning/20 bg-gradient-to-br from-warning/5 to-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
                            <Users className="h-5 w-5 text-warning" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-foreground">People Agents</CardTitle>
                            <Badge variant="outline" className="border-warning/20 bg-warning/5 text-warning text-xs mt-1">
                              Q2 2024
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          HR analytics, talent acquisition, and employee insights powered by advanced AI.
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Card className="group hover:shadow-elegant transition-all duration-300 opacity-70 hover:opacity-90 border border-info/20 bg-gradient-to-br from-info/5 to-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-info/10 rounded-lg">
                            <DollarSign className="h-5 w-5 text-info" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-foreground">Finance Agents</CardTitle>
                            <Badge variant="outline" className="border-info/20 bg-info/5 text-info text-xs mt-1">
                              Q3 2024
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          Financial forecasting, budget analysis, and cost optimization with real-time insights.
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Card className="group hover:shadow-elegant transition-all duration-300 opacity-70 hover:opacity-90 border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                            <Target className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-foreground">Strategy Agents</CardTitle>
                            <Badge variant="outline" className="border-accent/20 bg-accent/5 text-accent text-xs mt-1">
                              Q4 2024
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          Market analysis, competitive intelligence, and strategic growth planning.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>

                {/* Setup CTA */}
                <Card className="relative overflow-hidden gradient-lovable text-white shadow-elegant border-0">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="relative p-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Ready to Deploy</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                      Connect your CRM and ERP systems to unlock the full power of AI agents. 
                      Transform your business data into actionable insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" variant="secondary" className="shadow-card hover:shadow-xl transition-all duration-300">
                        <Link href="/setup" className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          Setup Integrations
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          View Dashboard
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Enterprise Security</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>99.9% Uptime</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
