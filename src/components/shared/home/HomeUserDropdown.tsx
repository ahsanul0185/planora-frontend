"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserInfo } from "@/types/user.types"
import { logoutUser } from "@/services/auth.services"
import { Key, LayoutDashboard, LogOut, User } from "lucide-react"
import Link from "next/link"
import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils"

interface HomeUserDropdownProps {
    userInfo: UserInfo
}

export const HomeUserDropdown = ({ userInfo }: HomeUserDropdownProps) => {
  const dashboardHome = getDefaultDashboardRoute(userInfo.role as UserRole);

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center rounded-full transition-colors focus:outline-none ring-2 ring-primary/20 hover:ring-primary/40">
                <div className="h-8 w-8 md:h-10 md:w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <span className="text-xs md:text-sm font-semibold text-primary">
                        {userInfo.name.charAt(0).toUpperCase()}
                    </span>
                </div>
            </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end" className="w-56 mt-2 z-[100]">
            <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userInfo.name}</p>
                    <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                    <p className="text-xs text-primary capitalize">
                        {userInfo.role.toLowerCase().replace("_", " ")}
                    </p>
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator/>

            <DropdownMenuItem asChild>
                <Link href={dashboardHome} className="flex items-center cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4"/>
                    Dashboard
                </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
                <Link href={"/my-profile"} className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4"/>
                    My Profile
                </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
                <Link href={"/change-password"} className="flex items-center cursor-pointer">
                    <Key className="mr-2 h-4 w-4"/>
                    Change Password
                </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={() => logoutUser()} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                <LogOut className="mr-2 h-4 w-4"/>
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
