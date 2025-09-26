import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DataCleaningAgent } from "@/components/DataCleaningAgent";
import { ChatAgent } from "@/components/ChatAgent";

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
          
          <div className="flex-1 flex">
            {/* Main Agent Content */}
            <div className="flex-1 p-6">
              <DataCleaningAgent />
            </div>
            
            {/* Chat Agent Sidebar */}
            <div className="w-96 border-l bg-card/50 p-4">
              <ChatAgent agentType="data-cleaning" />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DataCleaning;