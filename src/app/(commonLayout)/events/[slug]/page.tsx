import { getEventBySlug } from "@/services/event.services";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  Users, 
  Share2, 
  Heart, 
  Ticket, 
  ExternalLink, 
  ChevronRight,
  User
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth.services";
import JoinEventButton from "@/components/modules/EventParticipation/JoinEventButton";
import { getCurrencySymbol } from "@/lib/utils";
import EventActions from "@/components/modules/EventParticipation/EventActions";
import { getMyBookmarks } from "@/services/bookmark.services";
import EventReviews from "@/components/modules/Events/EventReviews";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailsPage({ params }: EventPageProps) {
  const { slug } = await params;
  const userInfo = await getUserInfo();
  
  let event;
  try {
    event = await getEventBySlug(slug);
  } catch (error) {
    console.error("Error fetching event:", error);
    notFound();
  }

  if (!event) notFound();

  let isBookmarked = false;
  if (userInfo) {
    try {
      const bookmarks = await getMyBookmarks();
      isBookmarked = bookmarks.some((b: any) => b.id === event.id);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    }
  }

  const isPast = new Date(event.startDate) < new Date();
  const isFree = event.registrationFee === 0;

  return (
    <main className="bg-[#f7faf7] text-[#181c1b] font-['Inter'] selection:bg-[#a6f1dc] selection:text-[#002019]">

<div className="pt-40 pb-24 max-w-7xl mx-auto px-8">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
<div className="lg:col-span-8">
<div className="flex items-center gap-4 mb-6">
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d1e7e2] text-[#374b47] text-sm font-['Inter'] font-semibold">
      {event.category?.icon && (
        <img src={event.category.icon} alt={event.category.name} className="w-4 h-4 object-contain" />
      )}
      {event.category?.name || "Event Categories"}
  </div>
  {event._count && event._count.participations > 0 && (
    <div className="inline-flex items-center gap-1 text-sm font-['Inter'] text-[#3f4945]">
      <Users className="h-4 w-4" />
      <span>{event._count.participations} joined</span>
    </div>
  )}
</div>
<h1 className="text-6xl md:text-7xl font-newsreader font-extrabold tracking-tighter text-[#004337] leading-tight mb-8">
                    {event.title}
                </h1>
<div className="flex flex-wrap gap-12">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-[#e6e9e6] flex items-center justify-center text-[#004337]">
<Calendar className="h-5 w-5" />
</div>
<div>
<p className="text-sm font-['Inter'] text-[#3f4945] font-semibold">DATE</p>
<p className="text-lg font-['Inter'] font-bold">{format(new Date(event.startDate), "MMMM dd, yyyy")}</p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-[#e6e9e6] flex items-center justify-center text-[#004337]">
<Clock className="h-5 w-5" />
</div>
<div>
<p className="text-sm font-['Inter'] text-[#3f4945] font-semibold">TIME</p>
<p className="text-lg font-['Inter'] font-bold">
    {format(new Date(event.startDate), "HH:mm")} — {format(new Date(event.endDate), "HH:mm")} {event.timezone}
</p>
</div>
</div>
</div>
</div>
<div className="lg:col-span-4 flex justify-end">
<div className="w-full max-w-sm p-8 rounded-2xl bg-[#ffffff] shadow-[0_32px_64px_-16px_rgba(24,28,27,0.1)]">
<div className="flex justify-between items-center mb-6">
<div className="flex flex-col gap-1.5">
<span className="text-xs font-['Inter'] text-[#3f4945] font-bold uppercase tracking-widest">Entry Fee</span>
<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit shadow-sm ${event.visibility === 'PUBLIC' ? 'bg-[#d1e7e2] text-[#004337]' : 'bg-[#e6e9e6] text-[#3f4945]'}`}>
    {event.visibility === 'PUBLIC' ? 'Public Event' : 'Private Event'}
</span>
</div>
<span className="text-3xl font-newsreader font-extrabold text-[#004337]">
    {isFree ? "Free Entry" : `${getCurrencySymbol(event.currency || 'USD')}${event.registrationFee.toFixed(2)}`}
</span>
</div>
<JoinEventButton 
    event={event} 
    userInfo={userInfo} 
    isPast={isPast}
    className={`w-full py-4 bg-gradient-to-br from-[#004337] to-[#005d4d] text-[#ffffff] font-bold rounded-lg mb-4 active:scale-[0.98] transition-all ${isPast ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
/>
<div className="space-y-2">
  <p className="text-center text-xs text-[#3f4945]">
      {event.maxParticipants ? `Limited capacity: ${event.maxParticipants} spaces.` : "Open to all registered attendees."}
  </p>
  {event.registrationDeadline && (
    <p className="text-center text-[10px] text-[#3f4945] uppercase tracking-wider font-bold">
      Registration ends: {format(new Date(event.registrationDeadline), "MMM dd, yyyy")}
    </p>
  )}
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-12 relative">
  <div className="h-[500px] rounded-3xl overflow-hidden bg-[#f1f4f1]">
    <img 
      alt={event.title} 
      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" 
      src={event.bannerImage || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"} 
    />
  </div>

  <div className="absolute bottom-0 translate-y-[50%] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-4rem)] max-w-2xl">
    <div className="backdrop-blur-2xl bg-white/70 rounded-2xl p-4 shadow-[0_32px_64px_-16px_rgba(24,28,27,0.2)] flex items-center justify-between border border-white/40">
      <div className="pl-4 hidden sm:block">
        <p className="text-xs font-['Inter'] text-[#3f4945] font-bold uppercase tracking-tighter">Next Action</p>
        <p className="font-['Inter'] font-bold text-[#004337]">Save to Calendar</p>
      </div>
      <div className="flex items-center gap-3">
        <EventActions 
          event={event} 
          userInfo={userInfo} 
          initialBookmarked={isBookmarked} 
        />
        <JoinEventButton 
           event={event} 
           userInfo={userInfo} 
           isPast={isPast}
           className={`px-8 py-3 bg-[#004337] text-[#ffffff] font-bold rounded-xl active:scale-95 transition-all ${isPast ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
        />
      </div>
    </div>
  </div>
</div>

<div className="lg:col-span-8 space-y-12 pr-0 lg:pr-12 mt-20">
<section>
<h2 className="text-3xl font-newsreader font-bold text-[#004337] mb-6">About the Event</h2>
<div className="prose prose-lg text-[#3f4945] leading-relaxed font-['Inter'] space-y-4">
    <div className="whitespace-pre-wrap">{event.description}</div>
</div>

{event.tags && event.tags.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-8">
    {event.tags.map((tag: any) => (
      <span key={tag.id} className="px-3 py-1 rounded-lg bg-[#e6e9e6] text-[#374b47] text-xs font-semibold uppercase tracking-wider">
        #{tag.name}
      </span>
    ))}
  </div>
)}
</section>
<div className="h-px bg-[#e0e3e0] opacity-20"></div>
<section className="grid grid-cols-1 md:grid-cols-2 gap-12">
<div>
<h3 className="text-xl font-newsreader font-bold text-[#004337] mb-4 flex items-center gap-2">
<MapPin className="h-5 w-5" /> Venue
                        </h3>
<p className="text-[#3f4945] font-medium">{event.venueName}<br/>{event.venueAddress}</p>
{!event.isOnline && (
  <a 
     target="_blank"
     className="inline-block mt-4 text-[#004337] font-semibold hover:underline underline-offset-4" 
     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venueName} ${event.venueAddress}`)}`}
  >
     Get Directions
  </a>
)}
</div>
<div>
<h3 className="text-xl font-newsreader font-bold text-[#004337] mb-4 flex items-center gap-2">
<Globe className="h-5 w-5" /> Digital Access
                        </h3>
<p className="text-[#3f4945] font-medium">
    {event.isOnline 
      ? `This event is online. ${event.onlineLink ? "Join via link below after registration." : "You will receive a secure meeting link prior to the event."}`
      : "In-person attendance only. Physical proximity encouraged for networking."}
</p>
{event.isOnline && event.onlineLink && (
  <a 
     href={event.onlineLink}
     target="_blank"
     className="inline-flex items-center gap-2 mt-4 text-[#004337] font-semibold hover:underline underline-offset-4"
  >
     Meeting Link <ExternalLink className="h-4 w-4" />
  </a>
)}
</div>
</section>
      <div className="h-px bg-[#e0e3e0] opacity-20"></div>
      <EventReviews eventId={event.id} />
</div>

<div className="lg:col-span-4 space-y-8 mt-20">

<div className="p-8 rounded-2xl bg-[#f1f4f1]">
<h3 className="text-sm text-[#3f4945] font-bold uppercase tracking-widest mb-6">Organized By</h3>
<div className="flex items-center gap-4 mb-6">
<div className="w-14 h-14 rounded-full bg-[#d1e7e2] flex items-center justify-center overflow-hidden border-2 border-[#bec9c4]">
  {event.organizer?.image ? (
    <img alt={event.organizer.name} className="w-full h-full object-cover" src={event.organizer.image} />
  ) : (
    <span className="text-xl font-newsreader font-bold text-[#004337]">
      {event.organizer?.name?.charAt(0).toUpperCase() || "U"}
    </span>
  )}
</div>
<div>
<p className="text-lg font-newsreader font-bold text-[#004337]">{event.organizer?.name}</p>
<p className="text-sm text-[#3f4945]">Lead Organizer</p>
</div>
</div>
<Link 
  href={`mailto:${event.organizer?.email}`}
  className="w-full py-3 rounded-lg bg-[#ffffff] text-[#004337] font-bold hover:bg-white transition-colors border border-[#e0e3e0] text-center block"
>
    Contact Organizer
</Link>
</div>

<div className="rounded-2xl overflow-hidden bg-[#e6e9e6] h-64 relative">
   {event.mapEmbedCode ? (
     <div 
        className="w-full h-full grayscale-[0.5] hover:grayscale-0 transition-opacity duration-700"
        dangerouslySetInnerHTML={{ __html: event.mapEmbedCode.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="100%"') }} 
     />
   ) : (
     <img alt="Location Map" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6dVMFUewZCuqq4HRNbso_Lcbs3qr1OJMhpitzXc2EE595r7g9Kzk107bK90nUbEsvhj9S1uMPAJe1JQTbARjV1bJ4Ips0vXVM3MPx_772bSsvg0XM0ED4Mq9sU1JEZfCzJTmSPy0TJrWru1j-ca9aTM7342kArGq_VHzDtJcufrBDu8M_Zm8Yz8sg05qSbajhGK5oxK3lEyo5qXE451HISzUnslqCc_ObwlubZUz0St-NxaL5KvLaM8qSTmOO7z-yQqqfbO4Od9We"/>
   )}
<div className="absolute inset-0 bg-[#004337]/10"></div>
<div className="absolute bottom-4 left-4 right-4 p-4 backdrop-blur-xl bg-white/80 rounded-xl border border-white/20">
<p className="text-xs font-['Inter'] font-bold text-[#004337] flex items-center gap-2">
<ExternalLink className="h-4 w-4" /> VIEW IN GOOGLE MAPS
                        </p>
</div>
</div>
</div>
</div>
</div>

</main>
  );
}
