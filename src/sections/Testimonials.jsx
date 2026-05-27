import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    quote: "Gopi is a rhythm genius. The way he synced our product reveal with the sound design increased our reel views by 400%. He understands pacing like no other editor.",
    author: "Alex Rivers",
    role: "Director, Neon Pulse Media",
    project: "Midnight Echo Edit",
    accent: "border-l-green-600"
  },
  {
    quote: "Absolutely blew me away. I sent raw A-roll and some B-roll and got back a viral masterpiece. The speed ramps and transition design felt handcrafted, not templated.",
    author: "Sarah Chen",
    role: "Tech YouTuber (1.2M Subs)",
    project: "Velocity Cut Commercial",
    accent: "border-l-emerald-500"
  },
  {
    quote: "He doesn't just edit, he directs the eyes. Retention rate on our shorts went from 45% to 78% after bringing Gopi on. The subtitles and typography choices are top tier.",
    author: "Marcus Thorne",
    role: "Founder, ScaleUp Agency",
    project: "Short-form Brand Campaign",
    accent: "border-l-green-700"
  },
  {
    quote: "Gopi is incredibly reliable and creative. The color grading on our latest cinematic project matches the tone of a Netflix documentary. Highly recommended.",
    author: "Elena Rostov",
    role: "Indie Film Director",
    project: "Lost Frames Documentary",
    accent: "border-l-emerald-600"
  }
];

export default function Testimonials() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section 
      id="testimonials" 
      className="relative py-24 px-6 md:px-12 bg-white flex justify-center items-center overflow-hidden select-none"
    >
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
            Client Feedback
          </span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            REVIEWS & CO-CUTS
          </h2>
          <p className="font-general text-slate-600 max-w-xl mx-auto text-sm md:text-base">
            What creators, agencies, and directors say about collaborating on timing, visual aesthetics, and retention.
          </p>
        </div>

        {/* Draggable Carousel Container */}
        <motion.div 
          ref={carouselRef} 
          className="cursor-grab active:cursor-grabbing overflow-hidden w-full"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-6 md:gap-8 pr-12 w-max"
            data-cursor="drag"
          >
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className={`w-[300px] md:w-[400px] glass-panel p-8 md:p-10 rounded-3xl border-l-4 ${review.accent} flex flex-col justify-between h-[300px] md:h-[340px] pointer-events-none`}
              >
                {/* Quote Text */}
                <p className="font-general text-slate-700 italic text-sm md:text-base leading-relaxed">
                  "{review.quote}"
                </p>

                {/* Author Info */}
                <div className="border-t border-slate-200/60 pt-4 mt-6 flex justify-between items-end">
                  <div>
                    <h4 className="font-clash text-base md:text-lg font-semibold text-slate-900 tracking-tight">
                      {review.author}
                    </h4>
                    <span className="font-general text-[10px] md:text-xs text-slate-500 block mt-0.5">
                      {review.role}
                    </span>
                  </div>

                  <span className="font-mono text-[9px] md:text-[10px] text-green-700 uppercase tracking-widest bg-green-50/50 border border-green-200/50 px-2.5 py-0.5 rounded">
                    {review.project}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Swipe Hint */}
        <div className="flex justify-center items-center gap-2 mt-8 font-mono text-[10px] text-slate-400 tracking-wider">
          <span>← DRAG OR SWIPE SLIDER TO SCRUB THROUGH REVIEWS →</span>
        </div>

      </div>
    </section>
  );
}

