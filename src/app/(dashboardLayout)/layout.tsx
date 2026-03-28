import DashboardSidebar from "@/components/modules/Dashboord/DashboardSidebar"
import React from "react"

const RootDashboardLayout = async ({children} : {children: React.ReactNode}) => {
  return (
    <div className="flex h-screen overflow-hidden">
        {/* Dashboard Sidebar */}
        <DashboardSidebar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
            <div>
                {children}
            </div>
        </main>
    </div>
  )
}

export default RootDashboardLayout