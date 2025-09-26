import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DataCleaningAgent } from "@/components/DataCleaningAgent";

const DataCleaning = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-card px-6">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Data Cleaning Orchestrator</h1>
            </div>
          </header>
          
          <div className="flex-1 p-6">
            <DataCleaningAgent />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DataCleaning;