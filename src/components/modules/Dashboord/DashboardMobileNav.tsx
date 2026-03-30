"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardMobileNavProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileNav = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardMobileNavProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Link href={dashboardHome} className="flex items-center gap-2">
          <Image
            src="/planora-logo.png"
            alt="Planora"
            width={120}
            height={32}
            className="h-5 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Nav Links */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);
                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 h-5 w-1 rounded-r-full bg-primary" />
                      )}
                      <Icon
                        className={cn(
                          "h-4 w-4 transition-colors",
                          isActive
                            ? "text-primary"
                            : "group-hover:text-foreground"
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
              {sectionIdx < navItems.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Footer */}
      <div className="shrink-0 border-t px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <span className="text-sm font-bold text-primary">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold">{userInfo.name}</p>
            <p className="truncate text-xs capitalize text-muted-foreground">
              {userInfo.role.toLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobileNav;
