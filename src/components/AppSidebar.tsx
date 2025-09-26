import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
import beaconLogo from "@/assets/beacon-logo-black.webp";

const categories = [
  {
    title: "Sales",
    icon: BarChart3,
    items: [
      { title: "Data Cleaning Agent", url: "/agents/data-cleaning", active: true },
      { title: "Lead-to-Cash Analysis", url: "/agents/lead-to-cash", active: true },
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
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState(["Sales"]);

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryTitle) 
        ? prev.filter(c => c !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="bg-card border-r shadow-card">
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <img src={beaconLogo} alt="Beacon" className="h-10 w-auto" />
            </div>
          ) : (
            <div className="flex justify-center">
              <img src={beaconLogo} alt="Beacon" className="h-8 w-auto" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.title);
            const hasActiveItems = category.items.some(item => item.active);
            
            return (
              <SidebarGroup key={category.title}>
                <div 
                  className="flex items-center justify-between px-4 py-3 hover:bg-accent/50 cursor-pointer rounded-lg mx-2 transition-all duration-200"
                  onClick={() => toggleCategory(category.title)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <category.icon className="h-4 w-4 text-primary" />
                    </div>
                    {!collapsed && (
                      <>
                        <SidebarGroupLabel className="text-sm font-semibold text-foreground">
                          {category.title}
                        </SidebarGroupLabel>
                        {hasActiveItems && (
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                            {category.items.filter(item => item.active).length}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                  {!collapsed && (
                    <ChevronRight 
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`} 
                    />
                  )}
                </div>

                {(isExpanded || collapsed) && (
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {category.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton 
                            asChild
                            className={`${collapsed ? 'justify-center px-2' : 'px-4 ml-4'} py-2 rounded-lg transition-all duration-200 ${
                              isActive(item.url) ? 'gradient-primary text-primary-foreground shadow-elegant' : 'hover:bg-accent'
                            } ${!item.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {item.active ? (
                              <NavLink to={item.url} className="flex items-center gap-3">
                                <Database className="h-4 w-4" />
                                {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                              </NavLink>
                            ) : (
                              <div className="flex items-center gap-3">
                                <Plus className="h-4 w-4" />
                                {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                              </div>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                )}
              </SidebarGroup>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border/50">
          <Button asChild variant="outline" size="sm" className="w-full shadow-sm hover:shadow-md">
            <NavLink to="/setup" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {!collapsed && <span>Setup</span>}
            </NavLink>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}