import { getEventReviews } from "@/services/review.services";
import { Star, User } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

interface EventReviewsProps {
  eventId: string;
}

export default async function EventReviews({ eventId }: EventReviewsProps) {
  const { data: reviews } = await getEventReviews(eventId);

  const averageRating = reviews && reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="mt-16 pt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-newsreader font-bold text-[#004337] mb-2">Participant Reviews</h2>
          <p className="text-[#3f4945] font-['Inter']">Real feedback from community members who attended this event.</p>
        </div>
        
        {reviews && reviews.length > 0 && (
          <div className="flex items-center gap-4 bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#e0e3e0]">
             <div className="text-4xl font-newsreader font-black text-[#004337]">{averageRating}</div>
             <div>
                <div className="flex text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 fill-current ${i < Math.round(Number(averageRating)) ? "text-amber-500" : "text-gray-200"}`} />
                  ))}
                </div>
                <div className="text-xs uppercase tracking-widest font-bold text-[#3f4945]">{reviews.length} Reviews</div>
             </div>
          </div>
        )}
      </div>

      {(!reviews || reviews.length === 0) ? (
        <div className="bg-[#ffffff] rounded-3xl p-12 text-center border-2 border-dashed border-[#e0e3e0]">
          <div className="w-16 h-16 bg-[#f1f4f1] rounded-full flex items-center justify-center mx-auto mb-6 text-[#bec9c4]">
             <Star className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-newsreader font-bold text-[#004337] mb-2">No reviews yet</h3>
          <p className="text-[#3f4945] max-w-sm mx-auto">Be the first to share your experience after attending this event. Your feedback helps organizers improve!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#ffffff] p-8 rounded-3xl border border-[#e0e3e0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#d1e7e2] overflow-hidden bg-[#f1f4f1] flex items-center justify-center relative">
                    {review.user?.image ? (
                        <Image fill src={review.user.image} alt={review.user.name} className="object-cover" />
                    ) : (
                        <User className="h-6 w-6 text-[#bec9c4]" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-newsreader font-bold text-[#004337]">{review.user.name}</h4>
                    <p className="text-xs text-[#3f4945] font-['Inter'] uppercase tracking-widest leading-none mt-1">
                        {format(new Date(review.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-amber-500 gap-1 bg-[#fffbf0] px-2 py-1 rounded-full border border-amber-100">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs font-bold leading-none">{review.rating}</span>
                </div>
              </div>
              <p className="text-[#3f4945] font-['Inter'] leading-relaxed italic text-sm">
                "{review.body || "A great event! Highly recommend."}"
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
