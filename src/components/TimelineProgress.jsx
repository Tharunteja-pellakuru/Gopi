import { useEffect, useState } from 'react';

export default function TimelineProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setScrollPercent(percent);

      // Generate SMPTE Timecode based on percent (0 to 60 seconds at 24 fps)
      const totalFrames = Math.floor((percent / 100) * 60 * 24); // 60 seconds @ 24fps
      const frames = totalFrames % 24;
      const totalSeconds = Math.floor(totalFrames / 24);
      const seconds = totalSeconds % 60;
      const minutes = Math.floor(totalSeconds / 60);

      const pad = (num) => String(num).padStart(2, '0');
      setTimecode(`${pad(0)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[6px] bg-slate-100 z-[999] border-b border-slate-200/60 overflow-visible select-none">
      {/* Scroll indicator bar */}
      <div 
        className="h-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 relative transition-all duration-75 ease-out"
        style={{ width: `${scrollPercent}%` }}
      >
        {/* Playhead indicator dot */}
        <div className="absolute right-0 top-0 w-[2px] h-3 bg-green-500 shadow-[0_0_8px_rgba(22,163,74,0.4)]" />
      </div>

      {/* Floating Timecode display */}
      <div className="absolute top-[8px] right-4 bg-white/95 border border-slate-200/80 text-[10px] px-2.5 py-0.5 rounded-full font-mono text-green-600 font-semibold tracking-widest pointer-events-none shadow-sm backdrop-blur-sm">
        {timecode}
      </div>
    </div>
  );
}
