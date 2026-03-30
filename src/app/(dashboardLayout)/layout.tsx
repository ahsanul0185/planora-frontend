import DashboardNavbar from "@/components/modules/Dashboord/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboord/DashboardSidebar";
import React from "react";

const RootDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Right side: navbar + scrollable content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RootDashboardLayout;