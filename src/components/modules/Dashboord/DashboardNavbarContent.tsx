"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.types";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardMobileNav from "./DashboardMobileNav";
import NotificationDropdown from "./NotificationDropdown";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardNavbarContent = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      {/* Mobile hamburger + sheet */}
      <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0">
          <DashboardMobileNav
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
          />
        </SheetContent>
      </Sheet>

      {/* Mobile logo — only visible on mobile (sidebar hides on mobile) */}
      <Link
        href={dashboardHome}
        className="flex items-center md:hidden"
        aria-label="Go to dashboard home"
      >
        <Image
          src="/planora-logo.png"
          alt="Planora"
          width={110}
          height={30}
          className="h-5 w-auto object-contain"
          priority
        />
      </Link>

      {/* Spacer pushes notification to right */}
      <div className="flex-1" />

      {/* Notification bell */}
      <NotificationDropdown />
    </header>
  );
};

export default DashboardNavbarContent;