export function RefinedAccess() {
  return (
    <section className="px-8 max-w-[1440px] mx-auto mb-40">
      <div className="text-center mb-16">
        <h2 className="font-newsreader text-4xl text-primary font-medium">Refined Access</h2>
        <p className="text-[#404944] mt-2">Filter by exclusivity and value</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-10 rounded-2xl text-center group hover:bg-primary transition-all cursor-pointer shadow-sm">
          <div className="w-16 h-16 bg-[#edeeeb] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">
              lock_open
            </span>
          </div>
          <span className="font-bold text-xs uppercase tracking-widest text-primary group-hover:text-white">
            Public Free
          </span>
        </div>
        <div className="bg-white p-10 rounded-2xl text-center group hover:bg-primary transition-all cursor-pointer shadow-sm">
          <div className="w-16 h-16 bg-[#edeeeb] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">
              payments
            </span>
          </div>
          <span className="font-bold text-xs uppercase tracking-widest text-primary group-hover:text-white">
            Public Paid
          </span>
        </div>
        <div className="bg-white p-10 rounded-2xl text-center group hover:bg-primary transition-all cursor-pointer shadow-sm">
          <div className="w-16 h-16 bg-[#edeeeb] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">
              key
            </span>
          </div>
          <span className="font-bold text-xs uppercase tracking-widest text-primary group-hover:text-white">
            Private Free
          </span>
        </div>
        <div className="bg-white p-10 rounded-2xl text-center group hover:bg-primary transition-all cursor-pointer shadow-sm">
          <div className="w-16 h-16 bg-[#edeeeb] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">
              verified
            </span>
          </div>
          <span className="font-bold text-xs uppercase tracking-widest text-primary group-hover:text-white">
            Private Paid
          </span>
        </div>
      </div>
    </section>
  );
}
