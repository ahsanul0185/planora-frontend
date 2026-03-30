// import { getEventBySlug } from "@/services/event.services";
// import { format } from "date-fns";
// import { 
//   Calendar, 
//   Clock, 
//   MapPin, 
//   Globe, 
//   Users, 
//   Share2, 
//   Heart, 
//   Ticket, 
//   ExternalLink, 
//   ChevronRight,
//   User
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { Button } from "@/components/ui/button";

// interface EventPageProps {
//   params: Promise<{ slug: string }>;
// }

// export default async function EventDetailsPage({ params }: EventPageProps) {
//   const { slug } = await params;
  
//   let event;
//   try {
//     event = await getEventBySlug(slug);
//   } catch (error) {
//     console.error("Error fetching event:", error);
//     notFound();
//   }

//   if (!event) notFound();

//   const isPast = new Date(event.startDate) < new Date();
//   const isFree = event.registrationFee === 0;

//   return (
//     <main className="min-h-screen bg-[#f7faf7] pt-24 pb-32">
//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
//           <div className="lg:col-span-8">
//             <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#d1e7e2] text-[#374b47] text-[10px] font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//               {event.category?.name || "Event Details"}
//             </div>
            
//             <h1 className="font-newsreader text-5xl md:text-7xl font-bold tracking-tight text-[#181c1b] leading-[1.1] mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
//               {event.title}
//             </h1>

//             <div className="flex flex-wrap gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
//               <div className="flex items-center gap-5">
//                 <div className="w-14 h-14 rounded-2xl bg-[#f1f4f1] flex items-center justify-center text-[#004337]">
//                   <Calendar className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-bold text-[#3f4945] opacity-40 uppercase tracking-widest mb-1">DATE</p>
//                   <p className="text-lg font-bold text-[#181c1b]">{format(new Date(event.startDate), "MMMM dd, yyyy")}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-5">
//                 <div className="w-14 h-14 rounded-2xl bg-[#f1f4f1] flex items-center justify-center text-[#004337]">
//                   <Clock className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-bold text-[#3f4945] opacity-40 uppercase tracking-widest mb-1">TIME</p>
//                   <p className="text-lg font-bold text-[#181c1b]">
//                     {format(new Date(event.startDate), "hh:mm a")} — {format(new Date(event.endDate), "hh:mm a")}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-4 flex justify-end">
//             <div className="w-full max-w-sm p-10 rounded-[2.5rem] bg-white shadow-[0_32px_64px_-16px_rgba(24,28,27,0.06)] animate-in fade-in slide-in-from-right-12 duration-1000">
//               <div className="flex justify-between items-baseline mb-8">
//                 <span className="text-[10px] font-bold text-[#3f4945] opacity-40 uppercase tracking-[0.2em]">Admission</span>
//                 <span className="text-3xl font-newsreader font-bold text-[#004337]">
//                   {isFree ? "Free Entry" : `${event.currency} ${event.registrationFee.toFixed(2)}`}
//                 </span>
//               </div>
              
//               <Button 
//                 className="w-full h-16 bg-gradient-to-br from-[#004337] to-[#005d4d] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-lg"
//                 disabled={isPast}
//               >
//                 {isPast ? "Event Concluded" : (isFree ? "Secure Spot" : "Reserve Ticket")}
//               </Button>
              
//               <p className="text-center text-[11px] text-[#3f4945] opacity-40 mt-6 tracking-wide">
//                 {event.maxParticipants ? `Limited capacity: Only ${event.maxParticipants} spaces available.` : "Open to all registered attendees."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Global Cover Image */}
//         <div className="relative w-full h-[300px] md:h-[600px] rounded-[3rem] overflow-hidden mb-20 shadow-2xl animate-in zoom-in-95 duration-1000">
//           <Image 
//             src={event.bannerImage || "https://images.unsplash.com/photo-1540575861501-7ad058de3952?auto=format&fit=crop&q=80"}
//             alt={event.title}
//             fill
//             className="object-cover opacity-90 transition-transform duration-[2000ms] hover:scale-105"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#181c1b]/40 to-transparent" />
//         </div>

//         {/* Bento Grid Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//           {/* Main Column */}
//           <div className="lg:col-span-8 space-y-20">
//             <section>
//               <h2 className="text-[10px] font-bold text-[#004337] uppercase tracking-[0.3em] mb-10 pb-4 border-b border-[#004337]/5">
//                 About the Event
//               </h2>
//               <div className="prose prose-lg max-w-none">
//                 <div className="text-[#3f4945] text-xl leading-relaxed font-light whitespace-pre-wrap">
//                   {event.description}
//                 </div>
//               </div>
//             </section>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//               <section>
//                 <h3 className="flex items-center gap-3 text-sm font-bold text-[#181c1b] uppercase tracking-widest mb-6">
//                   <MapPin className="h-4 w-4 text-[#004337]" />
//                   Physical Venue
//                 </h3>
//                 <div className="p-8 rounded-3xl bg-[#f1f4f1] space-y-2">
//                   <p className="text-lg font-bold text-[#181c1b]">
//                     {event.isOnline ? "Virtual Experience" : (event.venueName || "Location TBD")}
//                   </p>
//                   {event.venueAddress && (
//                     <p className="text-[#3f4945] opacity-70 leading-relaxed font-medium">
//                       {event.venueAddress}
//                     </p>
//                   )}
//                   {!event.isOnline && (
//                     <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venueName} ${event.venueAddress}`)}`} target="_blank" className="inline-flex items-center gap-2 mt-6 text-[#004337] font-bold text-xs uppercase tracking-widest hover:underline underline-offset-8">
//                       View on Map <ChevronRight className="h-3 w-3" />
//                     </Link>
//                   )}
//                 </div>
//               </section>

//               <section>
//                 <h3 className="flex items-center gap-3 text-sm font-bold text-[#181c1b] uppercase tracking-widest mb-6">
//                   <Globe className="h-4 w-4 text-[#004337]" />
//                   Digital Gateway
//                 </h3>
//                 <div className="p-8 rounded-3xl bg-[#f1f4f1] space-y-4">
//                   <p className="text-[#3f4945] opacity-70 leading-relaxed font-medium">
//                     {event.isOnline 
//                       ? "This is a digital-first event. You will receive the broadcast link 24 hours prior to commencement."
//                       : "Hybrid options may be available. Physical presence is encouraged for the full curator experience."}
//                   </p>
//                   {event.isOnline && event.onlineLink && (
//                     <div className="pt-2">
//                        <span className="text-[10px] bg-[#004337] text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest">
//                         Digital Access Included
//                        </span>
//                     </div>
//                   )}
//                 </div>
//               </section>
//             </div>

//             {/* Map Embed Section */}
//             {event.mapEmbedCode && (
//               <section className="pt-10">
//                 <h3 className="flex items-center gap-3 text-sm font-bold text-[#181c1b] uppercase tracking-widest mb-8">
//                   <MapPin className="h-4 w-4 text-[#004337]" />
//                   Location Exploration
//                 </h3>
//                 <div 
//                   className="w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-inner grayscale-[0.5] hover:grayscale-0 transition-all duration-700" 
//                   dangerouslySetInnerHTML={{ __html: event.mapEmbedCode.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="100%"') }} 
//                 />
//               </section>
//             )}
//           </div>

//           {/* Sidebar Column */}
//           <div className="lg:col-span-4 space-y-12">
//             {/* Curator/Organizer Card */}
//             <div className="p-10 rounded-[2.5rem] bg-[#f1f4f1] relative overflow-hidden group">
//               <div className="absolute top-0 right-0 p-8 opacity-5">
//                 <User className="h-32 w-32" />
//               </div>
              
//               <h3 className="text-[10px] font-bold text-[#3f4945] opacity-40 uppercase tracking-[0.3em] mb-10">
//                 The Curator
//               </h3>
              
//               <div className="flex items-center gap-6 mb-10">
//                 <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
//                   <Image 
//                     src={event.organizer?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"}
//                     alt={event.organizer?.name}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <p className="text-xl font-bold text-[#181c1b] mb-1 group-hover:text-[#004337] transition-colors">
//                     {event.organizer?.name}
//                   </p>
//                   <p className="text-xs text-[#3f4945] font-medium opacity-60 italic">
//                     Lead Organizer
//                   </p>
//                 </div>
//               </div>
              
//               <Button variant="outline" className="w-full h-12 bg-white/50 border-none rounded-xl text-[#004337] font-bold hover:bg-white transition-all shadow-sm">
//                 Message Curator
//               </Button>
//             </div>

//             {/* Event Meta Card */}
//             <div className="p-10 rounded-[2.5rem] bg-[#181c1b] text-white space-y-8">
//               <h3 className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">
//                 Gathering Details
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center pb-6 border-b border-white/10">
//                   <div className="flex items-center gap-3 text-white/60">
//                     <Users className="h-4 w-4" />
//                     <span className="text-xs font-medium tracking-wide">Capacity</span>
//                   </div>
//                   <span className="text-sm font-bold">{event.maxParticipants || "Unlimited"}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center pb-6 border-b border-white/10">
//                   <div className="flex items-center gap-3 text-white/60">
//                     <Ticket className="h-4 w-4" />
//                     <span className="text-xs font-medium tracking-wide">Exclusivity</span>
//                   </div>
//                   <span className="text-sm font-bold uppercase tracking-widest text-[#a6f1dc]">{event.visibility}</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3 text-white/60">
//                     <Clock className="h-4 w-4" />
//                     <span className="text-xs font-medium tracking-wide">Deadline</span>
//                   </div>
//                   <span className="text-sm font-bold">
//                     {event.registrationDeadline ? format(new Date(event.registrationDeadline), "MMM dd") : "Open"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Share Widget */}
//             <div className="flex items-center gap-4">
//                <Button className="flex-1 h-14 bg-white border border-[#004337]/10 rounded-2xl text-[#004337] font-bold hover:bg-[#f1f4f1] transition-all">
//                 <Share2 className="h-4 w-4 mr-2" />
//                 Share
//                </Button>
//                <Button variant="ghost" className="h-14 w-14 bg-white border border-[#004337]/10 rounded-2xl text-[#004337] hover:bg-[#f1f4f1] transition-all">
//                 <Heart className="h-5 w-5" />
//                </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Bar */}
//       <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
//         <div className="bg-[#f7faf7]/80 backdrop-blur-2xl rounded-[2rem] p-4 flex items-center justify-between shadow-[0_32px_64px_-16px_rgba(24,28,27,0.15)] border border-white/40">
//           <div className="pl-6 hidden sm:block">
//             <p className="text-[9px] font-bold text-[#3f4945] opacity-40 uppercase tracking-[0.2em] mb-1">Upcoming Milestone</p>
//             <p className="font-newsreader font-bold text-xl text-[#004337]">Confirm Attendance</p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex flex-col items-end mr-4">
//               <span className="text-[10px] font-bold text-[#3f4945] opacity-40 uppercase tracking-widest">Entry</span>
//               <span className="text-lg font-bold text-[#004337]">
//                 {isFree ? "Complimentary" : `${event.currency} ${event.registrationFee}`}
//               </span>
//             </div>
//             <Button 
//               className="px-12 h-14 bg-[#004337] text-white font-bold rounded-2xl hover:bg-[#002e26] transition-all shadow-lg active:scale-95"
//               disabled={isPast}
//             >
//               {isPast ? "Registration Closed" : (isFree ? "Register Now" : "Pay & Join")}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


import { getEventBySlug } from "@/services/event.services";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  Ticket,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailsPage({ params }: EventPageProps) {
  const { slug } = await params;

  let event;
  try {
    event = await getEventBySlug(slug);
  } catch (error) {
    console.error("Error fetching event:", error);
    notFound();
  }

  if (!event) notFound();

  const isPast = new Date(event.startDate) < new Date();
  const isFree = event.registrationFee === 0;

  return (
    <main className="min-h-screen bg-[#f7faf7] pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-8">

        {/* ── Hero Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">

          {/* Left: Title + meta */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#d1e7e2] text-[#374b47] text-sm font-semibold mb-6">
              {event.category?.name || "Event Details"}
            </div>

            <h1 className="font-newsreader text-6xl md:text-7xl font-extrabold tracking-tighter text-[#004337] leading-tight mb-8">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e6e9e6] flex items-center justify-center text-[#004337]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#3f4945] uppercase tracking-widest">DATE</p>
                  <p className="text-lg font-bold text-[#181c1b]">
                    {format(new Date(event.startDate), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e6e9e6] flex items-center justify-center text-[#004337]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#3f4945] uppercase tracking-widest">TIME</p>
                  <p className="text-lg font-bold text-[#181c1b]">
                    {format(new Date(event.startDate), "hh:mm a")} —{" "}
                    {format(new Date(event.endDate), "hh:mm a")} GMT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Ticket card */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="w-full max-w-sm p-8 rounded-2xl bg-white shadow-[0_24px_40px_-10px_rgba(24,28,27,0.06)]">
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-bold text-[#6f7975] uppercase tracking-widest">
                  Entry Fee
                </span>
                <span className="font-newsreader text-2xl font-extrabold text-[#004337]">
                  {isFree ? "Free" : `$${event.registrationFee.toFixed(2)}`}
                </span>
              </div>

              <button
                className="w-full py-4 bg-gradient-to-br from-[#004337] to-[#005d4d] text-white font-bold rounded-lg mb-4 active:scale-[0.98] transition-all text-base shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPast}
              >
                {isPast ? "Event Concluded" : isFree ? "Secure Spot" : "Register Now"}
              </button>

              <p className="text-center text-xs text-[#6f7975]">
                {event.maxParticipants
                  ? "Limited seats available. Secure yours today."
                  : "Open to all registered attendees."}
              </p>
            </div>
          </div>
        </div>

        {/* ── Full-width Cover Image ── */}
        <div className="h-[500px] rounded-3xl overflow-hidden bg-[#e6e9e6] mb-20 shadow-2xl group">
          <Image
            src={
              event.bannerImage ||
              "https://images.unsplash.com/photo-1540575861501-7ad058de3952?auto=format&fit=crop&q=80"
            }
            alt={event.title}
            width={1400}
            height={500}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Main Column ── */}
          <div className="lg:col-span-8 space-y-12 pr-0 lg:pr-12">

            {/* About */}
            <section>
              <h2 className="font-newsreader text-3xl font-bold text-[#004337] mb-6">
                About the Event
              </h2>
              <div className="text-[#3f4945] text-lg leading-relaxed space-y-4 whitespace-pre-wrap">
                {event.description}
              </div>
            </section>

            <div className="h-px bg-[#e0e3e0]" />

            {/* Venue + Digital Access */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-[#004337] mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> Venue
                </h3>
                <p className="text-[#3f4945] font-medium leading-relaxed">
                  {event.isOnline ? "Virtual Experience" : event.venueName || "Location TBD"}
                  {event.venueAddress && (
                    <>
                      <br />
                      {event.venueAddress}
                    </>
                  )}
                </p>
                {!event.isOnline && (
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${event.venueName} ${event.venueAddress}`
                    )}`}
                    target="_blank"
                    className="inline-block mt-4 text-[#004337] font-semibold hover:underline underline-offset-4"
                  >
                    Get Directions
                  </Link>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#004337] mb-4 flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" /> Digital Access
                </h3>
                <p className="text-[#3f4945] font-medium leading-relaxed">
                  {event.isOnline
                    ? "Virtual attendees will receive a high-fidelity spatial audio link 24 hours prior to the event start time."
                    : "Hybrid options may be available. Physical presence is encouraged for the full curator experience."}
                </p>
                {event.isOnline && event.onlineLink && (
                  <span className="inline-block mt-4 text-[10px] bg-[#004337] text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                    Digital Access Included
                  </span>
                )}
              </div>
            </section>

            {/* Map Embed */}
            {event.mapEmbedCode && (
              <section>
                <h3 className="flex items-center gap-3 text-sm font-bold text-[#181c1b] uppercase tracking-widest mb-6">
                  <MapPin className="h-4 w-4 text-[#004337]" /> Location
                </h3>
                <div
                  className="w-full h-[400px] rounded-2xl overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: event.mapEmbedCode
                      .replace(/width="[^"]*"/, 'width="100%"')
                      .replace(/height="[^"]*"/, 'height="100%"'),
                  }}
                />
              </section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-4 space-y-8">

            {/* Organizer Card */}
            <div className="p-8 rounded-2xl bg-[#f1f4f1]">
              <h3 className="text-sm font-bold text-[#6f7975] uppercase tracking-widest mb-6">
                Organized By
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-white shadow-md flex-shrink-0">
                  <Image
                    src={
                      event.organizer?.image ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                    }
                    alt={event.organizer?.name || "Organizer"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-newsreader text-lg font-bold text-[#004337]">
                    {event.organizer?.name}
                  </p>
                  <p className="text-sm text-[#6f7975]">Director, CuratorEvents</p>
                </div>
              </div>
              <button className="w-full py-3 rounded-lg bg-white text-[#004337] font-bold hover:bg-[#ecefec] transition-colors shadow-sm">
                Contact Organizer
              </button>
            </div>

            {/* Gathering Details — dark card */}
            <div className="p-8 rounded-2xl bg-[#181c1b] text-white space-y-6">
              <h3 className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em]">
                Gathering Details
              </h3>

              <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 text-white/60">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide">Capacity</span>
                </div>
                <span className="text-sm font-bold">
                  {event.maxParticipants || "Unlimited"}
                </span>
              </div>

              <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 text-white/60">
                  <Ticket className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide">Exclusivity</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-[#a6f1dc]">
                  {event.visibility}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-white/60">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide">Deadline</span>
                </div>
                <span className="text-sm font-bold">
                  {event.registrationDeadline
                    ? format(new Date(event.registrationDeadline), "MMM dd")
                    : "Open"}
                </span>
              </div>
            </div>

            {/* Map thumbnail */}
            <div className="rounded-2xl overflow-hidden bg-[#e6e9e6] h-64 relative">
              <div className="absolute inset-0 bg-[#004337]/10" />
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${event.venueName} ${event.venueAddress}`
                )}`}
                target="_blank"
                className="absolute bottom-4 left-4 right-4"
              >
                <div
                  className="p-4 rounded-xl border border-white/20"
                  style={{ background: "rgba(247,250,247,0.8)", backdropFilter: "blur(20px)" }}
                >
                  <p className="text-xs font-bold text-[#004337] flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" /> VIEW IN GOOGLE MAPS
                  </p>
                </div>
              </Link>
            </div>

            {/* Share / Favourite */}
            <div className="flex items-center gap-4">
              <button className="flex-1 h-14 bg-white border border-[#004337]/10 rounded-2xl text-[#004337] font-bold hover:bg-[#f1f4f1] transition-all shadow-sm flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button className="h-14 w-14 bg-white border border-[#004337]/10 rounded-2xl text-[#004337] hover:bg-[#f1f4f1] transition-all flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Action Bar ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-4rem)] max-w-2xl">
        <div
          className="rounded-2xl p-4 flex items-center justify-between border border-white/40 shadow-[0_24px_40px_-10px_rgba(24,28,27,0.06)]"
          style={{ background: "rgba(247,250,247,0.8)", backdropFilter: "blur(20px)" }}
        >
          <div className="pl-4 hidden sm:block">
            <p className="text-xs font-bold text-[#6f7975] uppercase tracking-tighter">
              Next Action
            </p>
            <p className="font-newsreader font-bold text-xl text-[#004337]">
              {isPast ? "Event Has Ended" : "Save to Calendar"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 rounded-xl hover:bg-[#ecefec] transition-colors">
              <Share2 className="h-5 w-5 text-[#004337]" />
            </button>
            <button className="p-3 rounded-xl hover:bg-[#ecefec] transition-colors">
              <Heart className="h-5 w-5 text-[#004337]" />
            </button>
            <button
              className="px-8 py-3 bg-[#004337] text-white font-bold rounded-xl active:scale-95 transition-all shadow-md hover:bg-[#002e26] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPast}
            >
              {isPast
                ? "Closed"
                : isFree
                ? "Register — Free"
                : `Register — $${event.registrationFee}`}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}