import { motion } from 'framer-motion';
import { Film, Music, Radio, Sliders, Layers } from 'lucide-react';

const YoutubeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const services = [
  {
    title: 'Reel & TikTok Editing',
    desc: 'Retention-focused edits with premium subtitles, graphic callouts, sound effects, and hyper-fast loops that keep viewers looping.',
    time: '24-48hr Turnaround',
    icon: Film,
    accent: 'bg-green-50 text-green-600'
  },
  {
    title: 'YouTube Video Editing',
    desc: 'Full-length story assembly with dynamic intros, sound-design soundscapes, visual graphics, B-roll integration, and high pacing.',
    time: '3-5 Days Turnaround',
    icon: YoutubeIcon,
    accent: 'bg-emerald-50 text-emerald-600'
  },
  {
    title: 'Music Video Syncs',
    desc: 'Kinetic music edits synced frame-by-frame with audio rhythms. Features heavy speed ramps, color flashes, strobe transitions, and VFX.',
    time: '5-7 Days Turnaround',
    icon: Music,
    accent: 'bg-green-100 text-green-700'
  },
  {
    title: 'Short-form Campaigns',
    desc: 'Structured social video campaigns designed for personal brands and agencies to scale distribution and authority on platforms.',
    time: 'Weekly Delivery',
    icon: Radio,
    accent: 'bg-emerald-100 text-emerald-700'
  },
  {
    title: 'Color Grading (LUTS)',
    desc: 'Transform raw Log files (S-Log, D-Log, RED IPP2) into rich cinematic grades with custom styling, contrast curves, and matching tones.',
    time: 'ProRes Master Delivery',
    icon: Sliders,
    accent: 'bg-green-50 text-green-600'
  },
  {
    title: 'Motion Graphics',
    desc: 'Sleek custom typography titles, callout arrows, lower-thirds overlays, mockups, and subtle 3D tracking integrated into edits.',
    time: 'Included or Standalone',
    icon: Layers,
    accent: 'bg-emerald-50 text-emerald-600'
  }
];

export default function Services() {
  return (
    <section 
      id="services" 
      className="relative py-24 px-6 md:px-12 bg-white flex justify-center items-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-1/4 left-[-10%] w-[50vw] h-[50vw] bg-green-500/5 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
              Capabilities
            </span>
            <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              WHAT I DELIVER
            </h2>
          </div>
          <p className="font-general text-slate-600 max-w-sm text-left text-sm md:text-base">
            Professional video engineering services tailormade for modern digital channels, high attention spans, and creative brands.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                className="p-8 rounded-3xl bg-white border border-slate-200/80 hover:bg-slate-50/40 hover:border-green-600/30 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 flex flex-col justify-between h-[320px] shadow-md shadow-slate-100 group cursor-none"
                data-cursor="view"
              >
                {/* Header part */}
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 ${service.accent}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-clash text-xl md:text-2xl font-semibold text-slate-900 tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="font-general text-slate-600 text-xs md:text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* Footer part */}
                <div className="flex justify-between items-center border-t border-slate-200/60 pt-4 mt-6">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    TIMEFRAME
                  </span>
                  <span className="font-mono text-[10px] text-slate-900 tracking-wider font-semibold">
                    {service.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

