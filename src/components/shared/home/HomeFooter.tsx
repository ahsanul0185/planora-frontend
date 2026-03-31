import Link from "next/link";
import Image from "next/image";

export function HomeFooter() {
  return (
    <footer className="bg-[#f3f4f1] w-full rounded-t-[2rem] pt-24 pb-12 px-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 max-w-[1440px] mx-auto mt-40">
      <div className="col-span-2 lg:col-span-2">
        <Link href="/" className="inline-block mb-6">
          <Image src="/planora-logo.png" alt="Planora" width={150} height={20} className="h-5 w-auto object-contain" />
        </Link>
        <p className="text-[#191c1b]/70 leading-[1.6] max-w-sm mb-8">
          The premier canvas for elite event orchestration. Empowering modern tastemakers to craft and manage exclusive gatherings with architectural precision and editorial grace.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-primary hover:opacity-100 opacity-80 transition-all">
            <span className="material-symbols-outlined">brand_awareness</span>
          </Link>
          <Link href="#" className="text-primary hover:opacity-100 opacity-80 transition-all">
            <span className="material-symbols-outlined">public</span>
          </Link>
          <Link href="#" className="text-primary hover:opacity-100 opacity-80 transition-all">
            <span className="material-symbols-outlined">share</span>
          </Link>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-[0.65rem] uppercase tracking-widest text-primary mb-6">Platform</h4>
        <ul className="space-y-4">
          <li><Link href="/events" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Explore Events</Link></li>
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Features</Link></li>
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Pricing</Link></li>
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">For Organizers</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-[0.65rem] uppercase tracking-widest text-primary mb-6">Company</h4>
        <ul className="space-y-4">
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">About</Link></li>
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Careers</Link></li>
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Contact</Link></li>
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Press Kit</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-[0.65rem] uppercase tracking-widest text-primary mb-6">Legal</h4>
        <ul className="space-y-4">
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Privacy Policy</Link></li>
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Terms of Service</Link></li>
          <li><Link href="#" className="text-[#191c1b]/70 text-sm hover:underline decoration-1 underline-offset-4 transition-all">Cookie Settings</Link></li>
        </ul>
      </div>
      <div className="col-span-full border-t border-[#c0c9c3]/30 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-xs text-[#191c1b]/50">© {new Date().getFullYear()} Planora. The Digital Maître D’.</span>
        <div className="flex gap-8 items-center">
          <span className="text-xs text-[#191c1b]/50">Developed by Ahsanul</span>
          <span className="w-1 h-1 rounded-full bg-primary/20"></span>
          <span className="text-xs text-[#191c1b]/50">Available Globally</span>
        </div>
      </div>
    </footer>
  );
}
