"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/user.types";
import { HomeUserDropdown } from "./HomeUserDropdown";
import { CategoryDropdown } from "./CategoryDropdown";
import { getEventCategories } from "@/services/eventCategory.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface HomeNavbarProps {
  userInfo?: UserInfo | null;
}

export function HomeNavbar({ userInfo }: HomeNavbarProps) {
  const router = useRouter();
  const { data: categoryResponse } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
    staleTime: 1000 * 60 * 60,
  });

  const categories = categoryResponse?.data ?? [];

  return (
    <nav className="fixed top-5 max-w-[1440px] w-full border border-primary/10 flex justify-between items-center px-8 py-6 left-1/2 -translate-x-1/2 z-50 bg-[#f9faf6]/80 backdrop-blur-[20px] shadow-[0_20px_40px_rgba(25,28,27,0.04)] rounded-xl">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center">
          <Image src="/planora-logo.png" alt="Planora" width={150} height={20} className="h-5 w-auto object-contain" />
        </Link>
        <div className="hidden lg:flex gap-8 items-center">
          <CategoryDropdown categories={categories} />
          <Link href="/events" className="text-[#191c1b]/60 font-medium hover:text-primary transition-colors">
            Events
          </Link>
          <Link href="/about" className="text-[#191c1b]/60 font-medium hover:text-primary transition-colors">
            About
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        {userInfo ? (
          <HomeUserDropdown userInfo={userInfo} />
        ) : (
          <>
            <Link href="/login" className="text-[#191c1b]/60 font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register">
              <Button className="bg-primary text-white px-6 py-5 rounded-full text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all">
                Signup
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
