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
import { Menu, Layers, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

interface HomeNavbarProps {
  userInfo?: UserInfo | null;
}

export function HomeNavbar({ userInfo }: HomeNavbarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: categoryResponse } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
    staleTime: 1000 * 60 * 60,
  });

  const categories = categoryResponse?.data ?? [];

  const handleCategoryClick = (id: string) => {
    setIsMobileMenuOpen(false);
    router.push(`/events?categoryId=${id}`);
  };

  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-5 max-w-[1440px] w-[calc(100%-2rem)] md:w-full border border-primary/10 flex justify-between items-center px-4 md:px-8 py-4 md:py-6 left-1/2 -translate-x-1/2 z-50 bg-[#f9faf6]/80 backdrop-blur-[20px] shadow-[0_20px_40px_rgba(25,28,27,0.04)] rounded-xl">
      <div className="flex items-center gap-6 lg:gap-12">
        <Link href="/" className="flex items-center">
          <Image src="/planora-logo.png" alt="Planora" width={150} height={20} className="h-4 md:h-5 w-auto object-contain" />
        </Link>
        <div className="hidden lg:flex gap-8 items-center">
          <CategoryDropdown categories={categories} />
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-[#191c1b]/60 font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden md:flex items-center gap-6">
          {userInfo ? (
            <HomeUserDropdown userInfo={userInfo} />
          ) : (
            <>
              <Link href="/login" className="text-[#191c1b]/60 font-medium hover:text-primary transition-colors">
                Login
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-white px-6 py-5 rounded-full text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all cursor-pointer">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-4">
          {userInfo && <HomeUserDropdown userInfo={userInfo} />}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary cursor-pointer">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#f9faf6] border-l border-primary/10 p-0">
              <SheetHeader className="p-6 border-b border-primary/5">
                <SheetTitle className="text-left">
                  <Image src="/planora-logo.png" alt="Planora" width={120} height={16} className="h-4 w-auto object-contain" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-[calc(100vh-80px)]">
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Nav Links */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#191c1b]/40">Navigation</p>
                    <div className="grid gap-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between p-4 rounded-xl bg-white border border-primary/5 text-[#191c1b] font-semibold hover:bg-primary/5 transition-colors"
                        >
                          {link.name}
                          <ArrowRight className="h-4 w-4 text-primary/40" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#191c1b]/40">Categories</p>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.slice(0, 6).map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category.id)}
                          className="flex flex-col gap-3 p-4 rounded-xl bg-white border border-primary/5 text-left hover:bg-primary/5 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#f1f4f1] flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            {category.icon ? (
                              <Image src={category.icon} alt={category.name} width={16} height={16} className="object-contain" />
                            ) : (
                              <Layers className="h-4 w-4 text-primary/40" />
                            )}
                          </div>
                          <span className="text-sm font-bold text-[#191c1b] line-clamp-1">{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Auth Footer */}
                {!userInfo && (
                  <div className="p-6 bg-white border-t border-primary/5 mt-auto">
                    <div className="grid gap-3">
                      <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-primary text-white py-6 rounded-xl font-bold uppercase tracking-widest text-xs">
                          Create Account
                        </Button>
                      </Link>
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-primary/10 text-primary py-6 rounded-xl font-bold uppercase tracking-widest text-xs">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

