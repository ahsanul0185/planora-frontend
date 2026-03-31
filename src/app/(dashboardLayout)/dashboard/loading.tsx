import Image from "next/image";

export default function DashboardLoading() {
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="animate-pulse">
        <Image 
          src="/planora-logo.png" 
          alt="Planora" 
          width={220} 
          height={30} 
          className="h-10 md:h-12 w-auto object-contain opacity-70"
          priority
        />
      </div>
    </div>
  );
}

