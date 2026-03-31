import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="bg-[#f7faf7] min-h-screen">
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-8 w-40 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-20 w-full md:w-3/4 mb-10 rounded-xl" />
            <div className="flex flex-wrap gap-12">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <div className="w-full max-w-sm p-8 rounded-2xl bg-white shadow-[0_32px_64px_-16px_rgba(24,28,27,0.1)]">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-24 rounded-full" />
                </div>
                <Skeleton className="h-10 w-32 rounded-lg" />
              </div>
              <Skeleton className="h-14 w-full rounded-xl mb-6" />
              <div className="space-y-3">
                <Skeleton className="h-3 w-3/4 mx-auto" />
                <Skeleton className="h-2 w-1/2 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12">
            <Skeleton className="w-full h-[500px] rounded-3xl" />
          </div>
          
          <div className="lg:col-span-8 space-y-12 pr-0 lg:pr-12 mt-20">
            <section className="space-y-6">
              <Skeleton className="h-10 w-48 rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full rounded-md" />
                <Skeleton className="h-6 w-full rounded-md" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
              </div>
            </section>
            <div className="h-px bg-[#e0e3e0] opacity-20"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Skeleton className="h-32 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl" />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8 mt-20">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
