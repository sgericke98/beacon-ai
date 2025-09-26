import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, TrendingUp, Users, DollarSign, Target, CheckCircle, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import beaconLogo from "@/assets/beacon-logo-vertical-white.svg";

const Landing = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Navigation */}
          <header className="h-16 flex items-center border-b bg-card px-6 sticky top-0 z-50">
            <SidebarTrigger />
            <div className="ml-4">
              <span className="text-lg font-semibold text-foreground">Beacon Platform</span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/setup" className="text-foreground hover:text-primary">Setup</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {/* Hero Section */}
            <section className="py-24 px-6 gradient-hero">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                  AI-Powered Business Intelligence
                </Badge>
                
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Transform Your Business Data Into
                  <span className="block text-primary mt-2">
                    Actionable Insights
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Beacon's AI agents automatically detect data inconsistencies, revenue leakage, 
                  and optimization opportunities across your CRM and ERP systems.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="shadow-elegant">
                    <Link to="/dashboard" className="flex items-center gap-2">
                      Start Free Demo
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/setup">View Setup Guide</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-background">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">AI Agents That Work For You</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Deploy specialized AI agents that continuously monitor and optimize your business processes
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="shadow-card border-l-4 border-l-primary hover:shadow-elegant transition-all duration-300 bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BarChart3 className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                      </div>
                      <CardTitle className="text-xl text-card-foreground">Data Cleaning Agent</CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        AI-powered deduplication for accounts and contract names. 
                        Automatically detects and resolves data inconsistencies across your systems.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm text-card-foreground">Account deduplication</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm text-card-foreground">Contract name standardization</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm text-card-foreground">Real-time conflict detection</span>
                        </div>
                      </div>
                      <Button className="w-full mt-6" asChild>
                        <Link to="/agents/data-cleaning">
                          Try Data Cleaning Agent
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card border-l-4 border-l-accent hover:shadow-elegant transition-all duration-300 bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-accent" />
                        </div>
                        <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                      </div>
                      <CardTitle className="text-xl text-card-foreground">Lead-to-Cash Analysis Agent</CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        Comprehensive sales process analytics with revenue leakage detection. 
                        Upload contracts to identify billing discrepancies automatically.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm text-card-foreground">Revenue leakage detection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm text-card-foreground">Contract analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm text-card-foreground">Sales pipeline optimization</span>
                        </div>
                      </div>
                      <Button className="w-full mt-6" variant="secondary" asChild>
                        <Link to="/agents/lead-to-cash">
                          Try L2C Analysis Agent
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-6 bg-muted/30">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Beacon?</h2>
                  <p className="text-lg text-muted-foreground">
                    Built for enterprise-scale data challenges with AI-first approach
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4 p-6 bg-card rounded-lg shadow-card">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">Lightning Fast</h3>
                    <p className="text-muted-foreground">
                      Process millions of records in minutes, not hours. Our AI agents work 24/7 to keep your data clean.
                    </p>
                  </div>

                  <div className="text-center space-y-4 p-6 bg-card rounded-lg shadow-card">
                    <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                      <Shield className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">Enterprise Security</h3>
                    <p className="text-muted-foreground">
                      Bank-grade encryption and compliance with SOC 2, GDPR, and other enterprise security standards.
                    </p>
                  </div>

                  <div className="text-center space-y-4 p-6 bg-card rounded-lg shadow-card">
                    <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                      <Globe className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">Seamless Integration</h3>
                    <p className="text-muted-foreground">
                      Connect with Salesforce, NetSuite, HubSpot, and 100+ other business systems out of the box.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Coming Soon Section */}
            <section className="py-20 px-6 bg-background">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Expanding Agent Ecosystem</h2>
                  <p className="text-lg text-muted-foreground">
                    More specialized AI agents launching soon to cover every aspect of your business
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="opacity-70 hover:opacity-90 transition-opacity bg-card">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-warning" />
                      </div>
                      <CardTitle className="text-card-foreground">People Agents</CardTitle>
                      <CardDescription>
                        HR analytics, talent acquisition insights, and employee engagement optimization
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="opacity-70 hover:opacity-90 transition-opacity bg-card">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-success" />
                      </div>
                      <CardTitle className="text-card-foreground">Finance Agents</CardTitle>
                      <CardDescription>
                        Financial forecasting, budget variance analysis, and automated cost optimization
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="opacity-70 hover:opacity-90 transition-opacity bg-card">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-4">
                        <Target className="h-6 w-6 text-info" />
                      </div>
                      <CardTitle className="text-card-foreground">Strategy Agents</CardTitle>
                      <CardDescription>
                        Market analysis, competitive intelligence, and strategic growth planning
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 gradient-hero">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-4xl font-bold text-foreground">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join forward-thinking companies using AI agents to unlock hidden value in their data
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="shadow-elegant">
                    <Link to="/setup" className="flex items-center gap-2">
                      Start Setup Process
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/dashboard">View Live Demo</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-card py-12 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <img src={beaconLogo} alt="Beacon" className="h-6" />
                    <span className="text-sm text-muted-foreground">
                      © 2024 Beacon. Formerly TechTorch.
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <Link to="/setup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Setup
                    </Link>
                    <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Dashboard
                    </Link>
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                      Demo Mode
                    </Badge>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Landing;