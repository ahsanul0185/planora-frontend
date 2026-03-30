import { HomeNavbar } from "@/components/shared/home/HomeNavbar";
import { HomeFooter } from "@/components/shared/home/HomeFooter";
import { getUserInfo } from "@/services/auth.services";
export const dynamic = "force-dynamic";

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getUserInfo();
  
  return (
   <div className="font-inter bg-[#f9faf6]">
     <HomeNavbar userInfo={userInfo} />
     {children}
     <HomeFooter />
   </div>
  );
}
