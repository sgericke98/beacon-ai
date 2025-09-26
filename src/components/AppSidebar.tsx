"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  DollarSign,
  Target,
  Database,
  TrendingUp,
  Settings,
  ChevronRight,
  Plus
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Logo will be served from public/assets

const categories = [
  {
    title: "Sales",
    icon: BarChart3,
    items: [
      { title: "L2C Analysis", url: "/agents/lead-to-cash", active: true },
    ]
  },
  {
    title: "Data",
    icon: Database,
    items: [
      { title: "Data Cleaning", url: "/agents/data-cleaning", active: true },
    ]
  },
  {
    title: "People",
    icon: Users,
    items: [
      { title: "Coming Soon", url: "#", active: false },
    ]
  },
  {
    title: "Finance",
    icon: DollarSign,
    items: [
      { title: "Coming Soon", url: "#", active: false },
    ]
  },
  {
    title: "Strategy", 
    icon: Target,
    items: [
      { title: "Coming Soon", url: "#", active: false },
    ]
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState(["Sales", "Data"]);

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryTitle) 
        ? prev.filter(c => c !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar className="w-64 border-r border-border/50">
      <SidebarContent className="bg-card/50 backdrop-blur-sm shadow-elegant">
        {/* Logo */}
        <div className="p-6 border-b border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
          <div className="flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"></div>
              <div className="relative bg-card/80 backdrop-blur-md rounded-2xl p-5 border border-primary/30 shadow-lg">
                <img 
                  src="/assets/beacon_powered_techtorch-logo-white.svg" 
                  alt="Beacon Platform" 
                  className="h-8 w-auto transition-all duration-500 group-hover:scale-110 drop-shadow-xl" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto p-2">
          <div className="space-y-1">
            {categories.map((category) => {
              const isExpanded = expandedCategories.includes(category.title);
              const hasActiveItems = category.items.some(item => item.active);
              
              return (
                <div key={category.title} className="space-y-1">
                  <div 
                    className="group flex items-center justify-between px-4 py-3.5 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-primary/20"
                    onClick={() => toggleCategory(category.title)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="p-2.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 shadow-sm">
                          <category.icon className="h-4 w-4 text-primary" />
                        </div>
                        {hasActiveItems && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card animate-pulse shadow-sm"></div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <SidebarGroupLabel className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {category.title}
                        </SidebarGroupLabel>
                        {hasActiveItems && (
                          <span className="text-xs text-muted-foreground font-medium">
                            {category.items.filter(item => item.active).length} active agent{category.items.filter(item => item.active).length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {hasActiveItems && (
                        <Badge variant="outline" className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/30 px-3 py-1 font-semibold shadow-sm">
                          {category.items.filter(item => item.active).length}
                        </Badge>
                      )}
                      <ChevronRight 
                        className={`h-4 w-4 text-muted-foreground transition-all duration-300 ${
                          isExpanded ? 'rotate-90 text-primary' : 'group-hover:text-primary'
                        }`} 
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="ml-8 space-y-2 border-l-2 border-gradient-to-b from-primary/30 to-accent/30 pl-6 py-3 bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl">
                      {category.items.map((item) => (
                        <div key={item.title} className="group">
                          <SidebarMenuButton 
                            asChild
                            className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive(item.url) ? 'gradient-primary text-primary-foreground shadow-elegant border border-primary/30' : 'hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 hover:shadow-md border border-transparent hover:border-primary/20'
                            } ${!item.active ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {item.active ? (
                              <Link href={item.url} className="flex items-center gap-4 group">
                                <div className="relative">
                                  <Database className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                                  {isActive(item.url) && (
                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full animate-pulse shadow-sm"></div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <span className="text-sm font-semibold text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                                    {item.title}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <div className="flex items-center gap-4 group">
                                <div className="relative">
                                  <Plus className="h-4 w-4 text-muted-foreground group-hover:text-warning transition-colors duration-300" />
                                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-warning/60 rounded-full shadow-sm"></div>
                                </div>
                                <div className="flex-1 flex items-center justify-between">
                                  <span className="text-sm font-semibold text-muted-foreground group-hover:text-warning transition-colors duration-300">
                                    {item.title}
                                  </span>
                                  <Badge variant="outline" className="text-xs bg-gradient-to-r from-warning/10 to-warning/5 text-warning border-warning/30 px-3 py-1 font-semibold shadow-sm">
                                    Coming Soon
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </SidebarMenuButton>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-border/50 bg-gradient-to-t from-primary/10 via-accent/5 to-transparent">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-success/10 to-success/5 rounded-xl border border-success/20 shadow-sm">
              <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse shadow-sm"></div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-success">System Online</span>
                <span className="text-xs text-success/70">All services operational</span>
              </div>
            </div>
            
            <Button asChild variant="outline" size="sm" className="w-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:border-primary/30 border-primary/20">
              <Link href="/setup" className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <span className="font-semibold">Setup & Configuration</span>
              </Link>
            </Button>
            
            <div className="text-center pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-sm"></div>
                <span className="text-xs font-semibold text-primary">Beacon Platform v2.0</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}