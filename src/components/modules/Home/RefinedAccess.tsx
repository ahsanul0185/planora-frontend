export function RefinedAccess() {
  return (
    <section className="py-24 bg-[#f1f4f1]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* Public Free */}
          <div className="md:col-span-8 bg-white rounded-2xl p-12 flex flex-col justify-between relative overflow-hidden group shadow-sm">
            <div className="z-10">
              <h2 className="text-4xl font-newsreader text-[#004337] mb-4 tracking-tighter">Public Free</h2>
              <p className="text-[#3f4945] text-sm max-w-sm mb-8">
                Discover open experiences accessible to everyone in the community. No barriers, just inspiration.
              </p>
              <button className="text-sm px-4 py-2 border-2 border-[#004337] text-[#004337] font-medium rounded-lg hover:bg-[#004337] hover:text-white transition-all">
                Explore Collections
              </button>
            </div>
            <div className="absolute bottom-[-20px] right-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[300px] select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                groups
              </span>
            </div>
          </div>

          {/* Public Paid */}
          <div className="md:col-span-4 bg-[#004337] text-white rounded-2xl p-10 flex flex-col justify-end relative overflow-hidden group shadow-lg">
            <div className="z-10">
              <h2 className="text-4xl font-newsreader mb-2 tracking-tighter">Public Paid</h2>
              <p className="text-[#a6f1dc] text-sm opacity-80 mb-6 font-light">Premium ticketed events.</p>
              <span className="material-symbols-outlined text-5xl">confirmation_number</span>
            </div>
            <div className="absolute top-10 right-10 opacity-20 group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-9xl">monetization_on</span>
            </div>
          </div>

          {/* Private Free */}
          <div className="md:col-span-4 bg-[#e0e3e0] rounded-2xl p-10 flex flex-col justify-center items-center text-center group">
            <span className="material-symbols-outlined text-5xl text-[#004337] mb-4">lock</span>
            <h2 className="text-4xl font-newsreader text-[#004337] tracking-tighter mb-2">Private Free</h2>
            <p className="text-[#3f4945] text-sm">Invitation-only social gatherings.</p>
          </div>

          {/* Private Paid */}
          <div className="md:col-span-8 bg-[#005d4d] rounded-2xl p-12 flex items-center justify-between group overflow-hidden shadow-lg">
            <div className="max-w-md">
              <h2 className="text-4xl font-newsreader text-white mb-4 tracking-tighter">Private Paid</h2>
              <p className="text-[#a6f1dc] text-sm opacity-80 mb-6 font-light">
                The most exclusive tiers of access. Restricted circles, premium amenities.
              </p>
            </div>
            <div className="hidden lg:block transform group-hover:scale-125 transition-transform duration-500">
              <span className="material-symbols-outlined text-[320px] text-white opacity-20">diamond</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
