
export function Testimonials() {
  return (
    <section className="px-8 max-w-[1440px] mx-auto my-40">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden w-full max-w-md mx-auto">
            <img
              className="w-full h-full object-cover"
              alt="Portrait of Julian Montgomery"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUJM6-nk-Rug_HBAcsxsrlYh9bNq--RL5Ccr1LeBAiVTU0Rn1yRgo8QqvlNHfuEBFcuzMxhcx8Y1UXUqTOZVQ6touK8P1Hd7OYWMZzIv1ZJMAHYDRJudE6kPtoFvyFvxOqTSapRI8z6vHFqOFZXSpsTiMmcmAfuacc1ot5MIUboHfXweb_30nes9V-X1sUUlO19AvMEcuh8X0egcfTK2v8QmfHlZnTM2o18Xc7cwYOMs3XxBBZ4RbAsKzMCSMLYCvwc31Kyyw70Mll"
            />
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-2xl flex items-center justify-center -translate-y-1/2">
            <span className="material-symbols-outlined text-white text-8xl">format_quote</span>
          </div>
        </div> 
        <div>
          <h2 className="font-newsreader text-4xl text-primary font-medium mb-12">
            Voices of the Circle
          </h2>
          <blockquote className="mb-12">
            <p className="font-newsreader text-3xl leading-tight text-[#191c1b] mb-8">
              "Planora has transformed how we approach high-ticket event management. The editorial interface isn't just a skin; it's a statement of quality that our clients recognize immediately."
            </p>
            <cite className="not-italic">
              <span className="block font-bold text-primary uppercase tracking-[0.1rem] text-sm">
                Julian Montgomery
              </span>
              <span className="block text-[#404944] text-sm mt-1">
                Founding Director, Apex Curations
              </span>
            </cite>
          </blockquote>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-[#c0c9c3] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-[#c0c9c3] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
