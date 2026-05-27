import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Maximize2, X, Activity, Rewind, FastForward, Sliders } from 'lucide-react';
import Magnet from '../components/Magnet';

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [modalOpen, setModalOpen] = useState(false);

  const previewVideoRef = useRef(null);
  const modalVideoRef = useRef(null);

  // Sync modal video progress
  const handleTimeUpdate = () => {
    if (!modalVideoRef.current) return;
    const current = modalVideoRef.current.currentTime;
    const dur = modalVideoRef.current.duration || 0;
    setProgress(dur > 0 ? (current / dur) * 100 : 0);

    // Format timecode
    const formatTime = (time) => {
      const mins = Math.floor(time / 60);
      const secs = Math.floor(time % 60);
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    setCurrentTime(formatTime(current));
    setDuration(formatTime(dur));
  };

  const handleProgressChange = (e) => {
    if (!modalVideoRef.current) return;
    const clickPercent = parseFloat(e.target.value);
    const targetTime = (clickPercent / 100) * modalVideoRef.current.duration;
    modalVideoRef.current.currentTime = targetTime;
    setProgress(clickPercent);
  };

  const togglePlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      setIsPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsMuted(modalVideoRef.current.muted);
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      // Trigger play on modal open
      setTimeout(() => {
        if (modalVideoRef.current) {
          modalVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 300);
    } else {
      document.body.style.overflow = '';
      setIsPlaying(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <section 
      id="showreel" 
      className="relative min-h-screen py-24 px-6 md:px-12 bg-white flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
            Featured Reel
          </span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            THE EDITING SHOWREEL
          </h2>
          <p className="font-general text-slate-600 max-w-xl mx-auto text-sm md:text-base">
            A high-octane 60-second cut showcasing rapid-fire transitions, cinematic color spaces, and tight audio beat syncs.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => setModalOpen(true)}
          className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-950 relative group cursor-none shadow-xl shadow-slate-200"
          data-cursor="play"
        >
          {/* Loop Preview Video */}
          <video
            ref={previewVideoRef}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
            autoPlay
            loop
            muted
            playsInline
          >
            <source 
              src="https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf2d061c569ff493b8655097bc8a7f14b62dbb&profile_id=165&oauth2_token_id=57447761" 
              type="video/mp4" 
            />
          </video>

          {/* Vignette bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Play Overlay Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-green-600 group-hover:border-green-600 group-hover:text-white text-white transition-all duration-500 shadow-2xl">
              <Play size={32} fill="currentColor" className="ml-1.5" />
            </div>
          </div>

          {/* Floating Showreel Metrics */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-wrap gap-x-6 gap-y-2 text-[10px] md:text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>CLIP CODING: ProRes 422 HQ</span>
            </div>
            <div>FPS: 23.976</div>
            <div className="hidden sm:block">COLOR: S-LOG3.Cine</div>
          </div>
          
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 font-mono text-[10px] md:text-xs text-green-400">
            [TAP TO RENDER FULLSCREEN]
          </div>
        </motion.div>
      </div>

      {/* FULLSCREEN CUSTOM VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {modalOpen && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[999999] flex flex-col justify-between p-6 select-none"
          >
            {/* Top Bar of Modal */}
            <div className="flex justify-between items-center text-slate-900 border-b border-slate-200/60 pb-4">
              <div>
                <h3 className="font-clash text-lg md:text-xl font-bold tracking-tight">SHOWREEL_MASTER_2026.mp4</h3>
                <p className="font-mono text-[10px] text-slate-500 mt-0.5">SOURCE CODEC: H.264 HEVC • REC709</p>
              </div>
              <Magnet range={20} strength={0.3}>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-none"
                >
                  <X size={20} />
                </button>
              </Magnet>
            </div>

            {/* Middle Container: Video + Simulated Scopes */}
            <div className="flex-1 my-4 flex flex-col lg:flex-row gap-6 items-center justify-center relative overflow-hidden">
              {/* Fullscreen Video Element */}
              <div className="relative aspect-video w-full max-w-4xl rounded-2xl overflow-hidden border border-slate-200/60 bg-black shadow-2xl flex-1 flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                  playsInline
                >
                  <source 
                    src="https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf2d061c569ff493b8655097bc8a7f14b62dbb&profile_id=165&oauth2_token_id=57447761" 
                    type="video/mp4" 
                  />
                </video>
                
                {/* Big play pause icon animation on tap */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                    <Play size={48} className="text-white opacity-60" />
                  </div>
                )}
              </div>

              {/* Side Panels: Audio Scopes & Edit Metrics */}
              <div className="hidden lg:flex flex-col gap-4 w-72 h-[360px] bg-white border border-slate-200 rounded-2xl p-4 font-mono text-[11px] text-slate-600 shadow-md shadow-slate-100 justify-between">
                <div>
                  <div className="flex justify-between items-center text-slate-900 border-b border-slate-200 pb-2 mb-3">
                    <span className="flex items-center gap-1.5"><Activity size={12} className="text-red-500" /> AUDIO PEAK METERS</span>
                    <span className="text-[10px] text-red-500 font-semibold">dbFS</span>
                  </div>
                  {/* Fake Audio Bars scrubbing */}
                  <div className="flex flex-col gap-2">
                    {/* Left Channel */}
                    <div>
                      <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                        <span>CH-1 (L)</span>
                        <span>{isPlaying ? '-1.8 dB' : '-INF'}</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded overflow-hidden flex gap-[1px]">
                        {[...Array(20)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-full flex-1 transition-all duration-150 ${
                              !isPlaying ? 'bg-slate-200' :
                              i > 16 ? 'bg-red-500' :
                              i > 12 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ opacity: isPlaying ? (Math.random() * 0.4 + 0.6) : 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Right Channel */}
                    <div className="mt-1">
                      <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                        <span>CH-2 (R)</span>
                        <span>{isPlaying ? '-2.4 dB' : '-INF'}</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded overflow-hidden flex gap-[1px]">
                        {[...Array(20)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-full flex-1 transition-all duration-150 ${
                              !isPlaying ? 'bg-slate-200' :
                              i > 15 ? 'bg-red-500' :
                              i > 11 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ opacity: isPlaying ? (Math.random() * 0.4 + 0.6) : 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-slate-900 border-b border-slate-200 pb-2 mb-2">
                    <span className="flex items-center gap-1.5"><Sliders size={12} className="text-green-600" /> COLOR SCOPE LUTS</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-slate-500">
                    <div className="flex justify-between">
                      <span>LUT STATE:</span>
                      <span className="text-green-600 font-semibold">KODAK_2383_REC709</span>
                    </div>
                    <div className="flex justify-between">
                      <span>EXPOSURE:</span>
                      <span className="text-slate-800">+0.4 EV</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TEMPERATURE:</span>
                      <span className="text-slate-800">5600 K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VIBRANCE:</span>
                      <span className="text-slate-800">+12%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-2 rounded text-[10px]">
                  <p className="text-slate-900 font-semibold">TIMELINE ANCHORS:</p>
                  <p className="text-slate-500 mt-1">00:02:15 - Beat Drop Cut</p>
                  <p className="text-slate-500">00:08:12 - Speed Ramp FX</p>
                  <p className="text-slate-500">00:15:00 - Outro Glow Fade</p>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col gap-3 border-t border-slate-200/60 pt-4">
              {/* Scrub timeline */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500">{currentTime}</span>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer outline-none"
                  style={{
                    background: `linear-gradient(to right, #16a34a ${progress}%, #e2e8f0 ${progress}%)`
                  }}
                />
                <span className="font-mono text-xs text-slate-500">{duration}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                {/* Left Controls */}
                <div className="flex items-center gap-4 text-slate-500">
                  <button className="hover:text-slate-900 cursor-none" onClick={() => { if (modalVideoRef.current) modalVideoRef.current.currentTime -= 5; }} title="Rewind 5s">
                    <Rewind size={18} />
                  </button>
                  
                  <button 
                    onClick={togglePlay} 
                    className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:scale-105 hover:bg-green-700 transition-all cursor-none shadow-sm shadow-green-500/20"
                  >
                    <Play size={16} fill="white" className={isPlaying ? 'hidden' : 'ml-0.5'} />
                    <span className={isPlaying ? 'block font-bold text-xs' : 'hidden'}>||</span>
                  </button>
                  
                  <button className="hover:text-slate-900 cursor-none" onClick={() => { if (modalVideoRef.current) modalVideoRef.current.currentTime += 5; }} title="Forward 5s">
                    <FastForward size={18} />
                  </button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4 text-slate-500">
                  <button onClick={toggleMute} className="hover:text-slate-900 cursor-none">
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button className="hover:text-slate-900 cursor-none" onClick={() => { if (modalVideoRef.current) modalVideoRef.current.requestFullscreen().catch(() => {}); }}>
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </section>
  );
}

