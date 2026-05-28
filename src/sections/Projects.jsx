import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Midnight Echo',
    category: 'Music Sync Edit',
    duration: '0:45',
    video: 'https://player.vimeo.com/external/409099132.sd.mp4?s=d1cc32b694b2a8d115fa7621422797e8838d172e&profile_id=165&oauth2_token_id=57447761',
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-7 h-[500px]',
    glowColor: 'group-hover:border-green-600/30 group-hover:shadow-[0_10px_30px_rgba(22,163,74,0.08)]',
    accent: 'text-green-600 bg-green-50/80 border-green-200/50'
  },
  {
    id: 2,
    title: 'Neon Pulse',
    category: 'Cinematic Reel',
    duration: '1:12',
    video: 'https://player.vimeo.com/external/517616239.sd.mp4?s=58e22e9e9514757c9a6efbd8fa87ca5ef5718dfd&profile_id=165&oauth2_token_id=57447761',
    gridClass: 'col-span-1 md:col-span-1 lg:col-span-5 h-[500px]',
    glowColor: 'group-hover:border-green-500/30 group-hover:shadow-[0_10px_30px_rgba(34,197,94,0.08)]',
    accent: 'text-green-600 bg-green-50/80 border-green-200/50'
  },
  {
    id: 3,
    title: 'Lost Frames',
    category: 'Visual Storytelling',
    duration: '2:30',
    video: 'https://player.vimeo.com/external/391039396.sd.mp4?s=8abf419ed2701b22e1b1d7d079d8e5781a70ff50&profile_id=165&oauth2_token_id=57447761',
    gridClass: 'col-span-1 md:col-span-1 lg:col-span-4 h-[400px]',
    glowColor: 'group-hover:border-green-700/30 group-hover:shadow-[0_10px_30px_rgba(21,128,61,0.08)]',
    accent: 'text-green-700 bg-green-50/80 border-green-200/50'
  },
  {
    id: 4,
    title: 'Velocity Cut',
    category: 'Short-form Edit',
    duration: '0:30',
    video: 'https://player.vimeo.com/external/384761655.sd.mp4?s=4a202e86be2e7dae812d1b827e8a9390234a413d&profile_id=165&oauth2_token_id=57447761',
    gridClass: 'col-span-1 md:col-span-1 lg:col-span-4 h-[400px]',
    glowColor: 'group-hover:border-green-400/30 group-hover:shadow-[0_10px_30px_rgba(134,239,172,0.08)]',
    accent: 'text-green-600 bg-green-50/80 border-green-200/50'
  },
  {
    id: 5,
    title: 'Dream Sequence',
    category: 'Instagram Reel',
    duration: '0:15',
    video: 'https://player.vimeo.com/external/554181213.sd.mp4?s=a7d2e06180a9d9e4a3c104445585b4b1a41cc63e&profile_id=165&oauth2_token_id=57447761',
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-4 h-[400px]',
    glowColor: 'group-hover:border-emerald-600/30 group-hover:shadow-[0_10px_30px_rgba(5,150,105,0.08)]',
    accent: 'text-emerald-700 bg-emerald-50/80 border-emerald-200/50'
  }
];

function ProjectCard({ project }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden border border-slate-200/60 bg-white shadow-md shadow-slate-100 group cursor-none transition-all duration-500 w-[85vw] flex-shrink-0 snap-center md:w-auto ${project.gridClass} ${project.glowColor}`}
      data-cursor="view"
    >
      {/* Video Loop - starts paused, plays on hover */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08] group-hover:opacity-[0.85] group-hover:scale-105 transition-all duration-700 pointer-events-none"
        loop
        muted
        playsInline
      >
        <source src={project.video} type="video/mp4" />
      </video>

      {/* Dynamic Overlay Gradient: White-fading in default state, Dark-fading in hover state */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent group-hover:from-slate-950/90 group-hover:via-slate-950/30 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

      {/* Hover Light Leak Overlay Effect (Greenish Tint) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-tr from-green-500/20 via-transparent to-emerald-500/20 transition-opacity duration-700 pointer-events-none" />

      {/* Metadata Top Left */}
      <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-none">
        <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider border backdrop-blur-sm transition-colors duration-500 ${project.accent}`}>
          {project.category}
        </span>
      </div>

      {/* Duration Top Right */}
      <div className="absolute top-6 right-6 pointer-events-none">
        <span className="font-mono text-[10px] text-slate-600 bg-white/80 border border-slate-200/60 px-2 py-0.5 rounded backdrop-blur-sm group-hover:text-slate-200 group-hover:bg-slate-900/60 group-hover:border-slate-800 transition-colors duration-500">
          {project.duration}
        </span>
      </div>

      {/* Project Details Bottom */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div className="pointer-events-none">
          <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors duration-500 tracking-wider block mb-1">
            PROJECT 0{project.id}
          </span>
          <h3 className="font-clash text-2xl md:text-3xl font-semibold text-slate-800 group-hover:text-white tracking-tight leading-tight group-hover:translate-x-1 transition-all duration-500">
            {project.title}
          </h3>
        </div>

        {/* Small Action Icon */}
        <div className="w-10 h-10 rounded-full border border-slate-200 bg-white/80 group-hover:border-white/20 group-hover:bg-white/20 flex items-center justify-center text-slate-800 group-hover:text-white opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
          <ExternalLink size={16} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section 
      id="work" 
      className="relative min-h-screen py-24 px-6 md:px-12 bg-white flex justify-center items-center overflow-hidden"
    >
      <div className="max-w-7xl w-full z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
              Selected Projects
            </span>
            <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              FEATURED CUTS
            </h2>
          </div>
          <p className="font-general text-slate-600 max-w-md text-left text-sm md:text-base">
            Hover over each project card to trigger rendering preview. Staggered grid layouts showcase high-fidelity rhythm.
          </p>
        </div>

        {/* Asymmetrical Grid / Mobile Swipe Carousel */}
        <div className="flex md:grid overflow-x-auto snap-x snap-mandatory md:overflow-visible hide-scrollbar md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

