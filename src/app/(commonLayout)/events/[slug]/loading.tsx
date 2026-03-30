import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f7faf7] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <Skeleton className="h-6 w-32 rounded-full mb-8" />
            <Skeleton className="h-20 w-3/4 mb-10" />
            <div className="flex gap-12">
              <div className="flex items-center gap-5">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-end">
             <Skeleton className="w-full max-w-sm h-64 rounded-[2.5rem]" />
          </div>
        </div>

        <Skeleton className="w-full h-[600px] rounded-[3rem] mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <div className="space-y-10">
               <Skeleton className="h-4 w-40" />
               <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
               <Skeleton className="h-48 rounded-3xl" />
               <Skeleton className="h-48 rounded-3xl" />
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-12">
             <Skeleton className="h-64 rounded-[2.5rem]" />
             <Skeleton className="h-64 rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    </main>
  );
}
