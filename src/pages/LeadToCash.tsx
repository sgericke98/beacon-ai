import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { LeadToCashAgent } from "@/components/LeadToCashAgent";

const LeadToCash = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-card px-6">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Lead-to-Cash Analysis</h1>
            </div>
          </header>
          
          <div className="flex-1 p-6">
            <LeadToCashAgent />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LeadToCash;