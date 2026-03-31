
import Link from "next/link";

export function CTASection() {
  return (
    <section className="px-6 md:px-8 max-w-[1440px] mx-auto mb-24 md:mb-40">
      <div className="bg-primary text-white p-10 md:p-16 lg:p-24 rounded-3xl relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <img
            alt="Crowd background"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDILnpfme97Q_OQp9KmjvKKNdaWqsPmuT22lr-8wBzGIDhF0Wm-pAP-nsfENXxQl3afNMcAIpeXTpMs38isPOxK2F36mUMRHCjTX8B3qa94zN3M-_s7v5FabUXdgCrGFC3B8s5Aau9NljYtNn4hPOeGG3Iihu-PTENHGOF4g1mTA4YRd3lQd-AFfUfcRtnZF3r6pGIa7bWighB0sI6yye5qqTyGJ4QzFDVdmXbBqFsHpEihZn2DtWHz2RQsosKH-U1hq4pSvSH-CkLg"
          />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-newsreader text-4xl md:text-5xl lg:text-6xl font-medium mb-6 md:mb-8">
            Begin Your Next Chapter.
          </h2>
          <p className="text-base md:text-lg opacity-80 mb-8 md:mb-12">
            Whether hosting an intimate gathering or a global summit, Planora provides the digital infrastructure for excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="bg-white text-primary px-10 md:px-12 py-4 rounded-full text-[0.7rem] md:text-[0.75rem] font-bold tracking-[0.1rem] uppercase hover:opacity-90 transition-opacity whitespace-nowrap">
              Create Events
            </Link>
            <Link href="/events" className="border border-white/30 text-white px-10 md:px-12 py-4 rounded-full text-[0.7rem] md:text-[0.75rem] font-bold tracking-[0.1rem] uppercase hover:bg-white/10 transition-all whitespace-nowrap">
              Join Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
