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
import beaconLogo from "@/assets/beacon-logo.webp";

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
      <SidebarContent className="bg-card border-r">
        {/* Logo */}
        <div className="p-4 border-b">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <img src={beaconLogo} alt="Beacon" className="h-8 w-auto" />
            </div>
          ) : (
            <div className="flex justify-center">
              <img src={beaconLogo} alt="Beacon" className="h-6 w-auto" />
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
                  className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer"
                  onClick={() => toggleCategory(category.title)}
                >
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4 text-muted-foreground" />
                    {!collapsed && (
                      <>
                        <SidebarGroupLabel className="text-sm font-medium">
                          {category.title}
                        </SidebarGroupLabel>
                        {hasActiveItems && (
                          <Badge variant="secondary" className="text-xs">
                            {category.items.filter(item => item.active).length}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                  {!collapsed && (
                    <ChevronRight 
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
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
                            className={`${collapsed ? 'justify-center px-2' : 'px-6'} ${
                              isActive(item.url) ? 'bg-primary text-primary-foreground' : ''
                            } ${!item.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {item.active ? (
                              <NavLink to={item.url}>
                                <Database className="h-4 w-4" />
                                {!collapsed && <span className="text-sm">{item.title}</span>}
                              </NavLink>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                {!collapsed && <span className="text-sm">{item.title}</span>}
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
        <div className="p-4 border-t">
          <Button asChild variant="outline" size="sm" className="w-full">
            <NavLink to="/setup">
              <Settings className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Setup</span>}
            </NavLink>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}