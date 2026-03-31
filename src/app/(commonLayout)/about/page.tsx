import { CTASection } from "@/components/modules/Home/CTASection";
import Image from "next/image";

const AboutPage = () => {
    return (
        <main className="pt-32 md:pt-40 bg-[#f9faf6] dark:bg-zinc-950">
            {/* Section 1: Hero */}
            <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20 md:mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
                    <div className="md:col-span-8">
                        <span className="font-inter text-[0.75rem] uppercase tracking-[0.2rem] text-[#003627] dark:text-emerald-400 mb-6 block">Our Narrative</span>
                        <h1 className="text-5xl md:text-8xl font-newsreader tracking-tighter text-[#003627] dark:text-emerald-50 leading-[0.9]">
                            Orchestrating the Extraordinary.
                        </h1>
                    </div>
                    <div className="md:col-span-4 pb-4">
                        <p className="text-[#404944] dark:text-zinc-400 leading-relaxed text-lg font-inter">
                            We believe that every gathering is a performance, a curated symphony of moments designed to linger long after the last guest has departed.
                        </p>
                    </div>
                </div>
                <div className="w-full h-[400px] md:h-[716px] relative overflow-hidden rounded-xl">
                    <Image 
                        src="https://res.cloudinary.com/dw8bzha3e/image/upload/v1774950850/SLPP_AngkorGrandBallroom_l5tbxv.webp"
                        alt="Grand banquet hall"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#003627]/5"></div>
                </div>
            </section>

            {/* Section 2: The Genesis */}
            <section className="bg-[#f3f4f1] dark:bg-zinc-900/50 py-20 md:py-32 mb-20 md:mb-32">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
                        <div className="md:col-span-5">
                            <h2 className="text-4xl font-newsreader text-[#003627] dark:text-emerald-400 mb-8">The Genesis</h2>
                            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm relative">
                                <Image 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCsfj-XZfduChCgD55YDInrZZLP9bL9xsB_Rl_72jDbXjhNwEfle4QTRiXNNJbipFilCCodj06NemdMRAPlLFeRcLGQE5dGpf7klql7h6IzwQWEKlqEElgmzCZmQQFRjhDGFrcttC8VSjXHP-dcxzcKoXdVK3FatoOrwlXt9dKDxejn5UsdBgdqrcOknV-ZSRpW5IwdWD9SRl_MTyTlnqo-LDN140mi9ZdrAfcQOkZy-JESnijySj5_gerHPqPVu3TL1pxO2q_2dLs"
                                    alt="Founder desk"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-7 flex flex-col justify-center">
                            <p className="text-2xl font-newsreader text-[#191c1b] dark:text-zinc-100 mb-8 leading-snug">
                                Planora was born from a simple realization: the digital age had optimized for logistics, but it had forgotten the soul of the host.
                            </p>
                            <div className="space-y-6 text-[#404944] dark:text-zinc-400 leading-relaxed font-inter">
                                <p>Our journey began in the atelier of experience design, where we saw a growing need for a &quot;Digital Maître D’&quot;—an authority that could handle the complexity of modern gatherings with the grace of a seasoned professional.</p>
                                <p>We didn&apos;t just want to build a tool; we wanted to create a platform that understands the nuance of taste. For the modern tastemaker, an event is more than a date on a calendar; it is a manifestation of identity. Planora provides the framework to let that identity shine through precision orchestration.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Our Philosophy */}
            <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24 md:mb-40">
                <div className="text-center mb-16 md:mb-24">
                    <span className="font-inter text-[0.75rem] uppercase tracking-[0.2rem] text-[#003627] dark:text-emerald-400 mb-4 block">Foundations</span>
                    <h2 className="text-4xl md:text-5xl font-newsreader text-[#003627] dark:text-emerald-50">The Three Pillars</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-[#e7e9e5] dark:bg-zinc-800 flex items-center justify-center mb-8 group-hover:bg-[#1a4d3c] transition-colors duration-500">
                            <span className="material-symbols-outlined text-[#003627] dark:text-emerald-400 group-hover:text-[#8abda7] text-3xl transition-colors duration-500">star</span>
                        </div>
                        <h3 className="text-2xl font-newsreader mb-4 text-[#191c1b] dark:text-zinc-100">Exclusivity</h3>
                        <p className="text-[#404944] dark:text-zinc-400 leading-relaxed px-4 font-inter">Crafting moments that are unique to your vision, ensuring no two experiences are ever mirrored.</p>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-[#e7e9e5] dark:bg-zinc-800 flex items-center justify-center mb-8 group-hover:bg-[#1a4d3c] transition-colors duration-500">
                           <span className="material-symbols-outlined text-[#003627] dark:text-emerald-400 group-hover:text-[#8abda7] text-3xl transition-colors duration-500">architecture</span>
                        </div>
                        <h3 className="text-2xl font-newsreader mb-4 text-[#191c1b] dark:text-zinc-100">Precision</h3>
                        <p className="text-[#404944] dark:text-zinc-400 leading-relaxed px-4 font-inter">Mathematical accuracy in every detail, from guest curation to lighting sequences and floral timing.</p>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-[#e7e9e5] dark:bg-zinc-800 flex items-center justify-center mb-8 group-hover:bg-[#1a4d3c] transition-colors duration-500">
                            <span className="material-symbols-outlined text-[#003627] dark:text-emerald-400 group-hover:text-[#8abda7] text-3xl transition-colors duration-500">auto_awesome</span>
                        </div>
                        <h3 className="text-2xl font-newsreader mb-4 text-[#191c1b] dark:text-zinc-100">Experience</h3>
                        <p className="text-[#404944] dark:text-zinc-400 leading-relaxed px-4 font-inter">Moving beyond utility to create emotional resonance that defines the high-end editorial standard.</p>
                    </div>
                </div>
            </section>

            {/* Section 4: The Inner Circle */}
            <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24 md:mb-40">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                    <div>
                        <span className="font-inter text-[0.75rem] uppercase tracking-[0.2rem] text-[#003627] dark:text-emerald-400 mb-4 block">The Inner Circle</span>
                        <h2 className="text-4xl md:text-5xl font-newsreader text-[#003627] dark:text-emerald-50">Founding Visionaries</h2>
                    </div>
                    <p className="md:max-w-md text-[#404944] dark:text-zinc-400 leading-relaxed font-inter">The architects of the Planora framework, blending background in high fashion, luxury hospitality, and advanced technology.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: "Julian Vane", role: "Creative Director", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDooYIjxzGn9-8OvcCf5P5TM87eOpyEnS58F36KGrMPNM451kSHq0oOar5rNtLr-xoTQa6zQi2waIoFp-Xbz0--6xiyC8K9ODs3A5ZrKH6tSMObTZyUDWDbQCvUtM1o2m_zTDXOt9D-A7SUdJ-Gi7uis1roWOVcZ8VAFxlWEsomtflloC917S90hzjiBDObUnFt-wvrwXFcsVERkSBeQgZVVM-s_2P69sj6aJEjPZaz4TEPoCii4WgUa1H9jQalfIjV5c36gDIhAhk0" },
                        { name: "Elena Rossi", role: "Chief Curator", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLY27Y2-keZIuXLQedW9a-3kFkvlrAKTk6n0Pyo8OMJsOliuNTtgGXVmqjkKNdrsQMiKylEJqAEuaWHhUWTB_0UF5ma_yOIHf6FWU3hn2sWbNbO_CxijGP2M_itdnFwCoTR-BG_Twhg-fOTIb-hOYkSrCDO6tjbww38xZOV2PRqggLPb20A2vN4p8JlOAt73LjG_0gJB6bsmM8uA0yqtJge5iF8Q8knXdTRfu_jfb5cQn0vomqH2KJjKi2fNGVFoxwxppbjAVYYmas" },
                        { name: "Marcus Thorne", role: "Experience Architect", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ7gJvVfkVq69C6OQ_Qu7kKpe5Hfwa4yrDPx0eEmGgJVd8aVJV1XQD0Rf_G7fbtPsPnXLIIjyeCuZrNIi8VT9sGyCqbfDzJipwC4YYiCBdO_78oQDQfiN1hsb2-Kau2R3ZbFgHcrEYL_X6Ieg4K-TWQUqz_lyURk9RB05NLMjMd5Ci3vSmzMcS1O_GsDrb0ZyODwe5qMpWojaRjTXq4NJby-A951hnrh0xPEHzPom9V8tMAa3CECZ2fqRBsqyNLNZaZCnbvE3nK1XZ" },
                        { name: "Sasha Kim", role: "Head of Partnerships", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCydqaANflUPwT0fmVYzrXBdqTKzqBxHhV9aXPZzQ4pYoBZJmmhl1UHpJyKkD8pb2zHV75WeILW-ZaiWzNccOIrHvL-nA_qhcYxbbcx-pkVndNPjRzQrP-rwWRS9Ovj4ulvAoHvIJnRu1P1rcQL74ixsVHMgrQKVL0e9vg56_cYRkBSFufGfYMr7XmROvghbA6gi2WNlcAaQ3dfzdHG0ljw_epyIcxC0C3i77v-xpuzn0eTPL8yFQ6xpFD5AuFYYkPWWhcwlWaqzRjL" }
                    ].map((member, i) => (
                        <div key={i} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#edeeeb] dark:bg-zinc-800">
                            <Image 
                                src={member.img}
                                alt={member.name}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-newsreader text-xl">{member.name}</p>
                                <p className="text-white/70 text-xs uppercase tracking-widest font-inter mt-1">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 5: CTA */}
           <CTASection />
        </main>
    );
};

export default AboutPage;