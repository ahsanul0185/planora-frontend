import Image from "next/image";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f9faf6] z-[9999]">
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

