import Link from "next/link";

export function HeroSection() {
  return (
    <section className="px-6 md:px-8 max-w-[1440px] mx-auto mb-20 md:mb-32 grid lg:grid-cols-12 gap-12 items-center pt-32">
      <div className="lg:col-span-7">
        <span className="text-[0.65rem] md:text-[0.75rem] tracking-[0.1rem] uppercase text-primary mb-4 md:mb-6 block font-bold">
          Featured Orchestration
        </span>
        <div className="mb-4">
          <span className="text-[10px] md:text-xs font-bold text-[#404944]/60 uppercase tracking-widest">
            October 24, 2025
          </span>
        </div>
        <h1 className="font-newsreader text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-primary mb-6 md:mb-8 -ml-1">
          The Art of the <br /> Perfect Gathering.
        </h1>
        <p className="text-base md:text-lg text-[#404944] max-w-xl leading-relaxed mb-8 md:mb-10">
          Orchestrating the world's most ambitious visions. Planora provides the digital infrastructure for visionary organizers to curate unforgettable experiences with effortless elegance
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/events" className="bg-primary text-white px-10 py-4 rounded-full text-[0.75rem] font-bold tracking-[0.1rem] uppercase shadow-lg text-center hover:opacity-90 transition-opacity">
            Explore Events
          </Link>
          <button className="bg-[#e2e3e0] text-[#191c1b] px-10 py-4 rounded-full text-[0.75rem] font-bold tracking-[0.1rem] uppercase hover:bg-[#d5e7db] transition-colors">
            Learn More
          </button>
        </div>
      </div>
      <div className="lg:col-span-5 relative mt-8 lg:mt-0">
        <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
          <img
            alt="Elegant candlelit dinner party"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMCA_9t6V3PUhigmH6ROkUbE2WNooYb4vHWjL79bzNo1sRsgUj-duuTyac4tbmzW0pPcDzgayjjDl5MvjlRqNbE6vc7hmLtHFi7wPMKaz4Kxy-ZMWdP6JYjmr9WyTqnniRR8bfI9MiFzFN1tm4b034Jj1cAkgqVnwWZ6AE9u957MO1DZTCBn1YuyKpYzjp-vx3O2ZyfoWjmFu1LsAex0YGIysriiLhVR1lT2UPunpwTpc_czkd3lVVUyJM50q_SGf_wjsfcEk8FF3Y"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-white/80 backdrop-blur-md p-4 md:p-8 rounded-xl shadow-xl max-w-[180px] md:max-w-[240px]">
          <span className="material-symbols-outlined text-primary mb-2 text-2xl md:text-3xl">auto_awesome</span>
          <p className="font-newsreader text-base md:text-xl text-primary font-medium">Every detail curated to perfection.</p>
        </div>
      </div>
    </section>
  );
}
