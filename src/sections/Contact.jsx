import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronDown, Check } from 'lucide-react';
import Magnet from '../components/Magnet';

const InstagramIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2C6.534 2 2.085 6.448 2.08 11.91c0 1.748.458 3.45 1.321 4.956L2 22l5.251-1.378a9.837 9.837 0 0 0 4.74 1.208h.004c5.454 0 9.905-4.45 9.91-9.913a9.813 9.813 0 0 0-2.904-6.917zM11.993 20.143c-1.482 0-2.934-.397-4.21-1.15l-.302-.18-3.13.82.834-3.05-.198-.314a8.219 8.219 0 0 1-1.258-4.36c.005-4.543 3.7-8.235 8.247-8.235 2.2 0 4.27.859 5.823 2.416a8.19 8.19 0 0 1 2.41 5.83c-.005 4.544-3.7 8.238-8.246 8.238zm4.52-6.17c-.247-.124-1.463-.72-1.69-.803-.226-.08-.392-.12-.556.125-.165.244-.64.801-.783.965-.143.165-.287.186-.534.061-.247-.125-1.043-.385-1.986-1.227-.733-.654-1.229-1.463-1.373-1.71-.143-.247-.015-.38.109-.504.112-.112.247-.29.37-.435.124-.145.165-.248.248-.414.083-.165.04-.31-.02-.435-.062-.124-.557-1.343-.763-1.84-.2-.48-.401-.416-.556-.424-.144-.007-.31-.008-.475-.008-.165 0-.433.062-.66.31-.227.249-.867.848-.867 2.07 0 1.22.888 2.397.986 2.531.099.135 1.747 2.668 4.232 3.74.59.255 1.05.408 1.41.52.595.19 1.135.162 1.563.098.477-.07 1.463-.598 1.669-1.176.206-.578.206-1.072.144-1.176-.062-.103-.227-.165-.474-.29z"/>
  </svg>
);

const EmailIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H19V8.5l-7 5-7-5V21H2.5A1.5 1.5 0 0 1 1 19.5v-15c0-.85.65-1.5 1.5-1.5H4L12 8l8-6h1.5A1.5 1.5 0 0 1 24 4.5z" />
  </svg>
);

const DiscordIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.078.078 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

const socials = [
  { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/pg_officially?igsh=bGU2OHI3bDdwcnNy', color: 'hover:text-[#E1306C] hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5' },
  { name: 'WhatsApp', icon: WhatsAppIcon, href: 'https://wa.me/919347552708', color: 'hover:text-[#25D366] hover:border-[#25D366]/30 hover:bg-[#25D366]/5' },
  { name: 'Email', icon: EmailIcon, href: 'mailto:gopichandpellakuru71@gmail.com', color: 'hover:text-[#EA4335] hover:border-[#EA4335]/30 hover:bg-[#EA4335]/5' },
  { name: 'Discord', icon: DiscordIcon, href: 'https://discord.com', color: 'hover:text-[#5865F2] hover:border-[#5865F2]/30 hover:bg-[#5865F2]/5' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', project: 'Short-form', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'Short-form', label: 'Instagram Reel / Short-form Campaign' },
    { value: 'Music Sync', label: 'Music Video / Beat Sync Edit' },
    { value: 'YouTube', label: 'YouTube Assembly' },
    { value: 'Color Grading', label: 'Color Grading / VFX' },
    { value: 'Custom', label: 'Other Custom Project' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.project,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', project: 'Short-form', message: '' });
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error Details:", error?.text || error);
      alert(`Failed to send email: ${error?.text || "Please check your console for details"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-24 bg-white flex justify-center items-center overflow-hidden"
    >
      {/* Background Animated Glows & Particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-green-500/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-green-500/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Contact Info */}
        <div className="lg:col-span-5 text-left">
          <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
            Collaboration
          </span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            LET'S CUT <br />
            SOMETHING <br />
            <span className="text-green-600 italic font-normal">CINEMATIC.</span>
          </h2>
          <p className="font-general text-slate-600 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
            Got an Instagram Reel edit campaign, YouTube flow, or creative sync project? Fill in details, or slide directly into my socials below.
          </p>

          {/* Social Quick Links */}
          <div className="flex flex-wrap gap-3 mt-4 max-w-sm">
            {socials.map((social) => {
              const IconComponent = social.icon;
              return (
                <Magnet key={social.name} range={15} strength={0.25}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group/social flex items-center justify-start w-14 hover:w-[160px] h-14 rounded-2xl border border-slate-200 text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50/50 shadow-sm shadow-slate-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-none ${social.color}`}
                    data-cursor="link"
                  >
                    <div className="flex items-center justify-center min-w-[54px] h-full">
                      <IconComponent size={20} />
                    </div>
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase opacity-0 translate-x-2 group-hover/social:opacity-100 group-hover/social:translate-x-0 transition-all duration-500 delay-75 whitespace-nowrap">
                      {social.name}
                    </span>
                  </a>
                </Magnet>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="lg:col-span-7 w-full">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="w-full bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 relative p-8 md:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mb-6">
                  <Send size={24} />
                </div>
                <h3 className="font-clash text-2xl font-bold text-slate-900 mb-2">SEQUENCE EXPORTED!</h3>
                <p className="font-general text-sm text-slate-500">
                  Your message has rendered successfully. I will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
                    placeholder="Enter name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
                    placeholder="Enter email"
                  />
                </div>

                {/* Project Type Dropdown */}
                <div className="flex flex-col gap-2 text-left relative">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    PROJECT CATEGORY
                  </label>
                  
                  {/* Click-away overlay backplate */}
                  {dropdownOpen && (
                    <div 
                      className="fixed inset-0 z-10 cursor-default" 
                      onClick={() => setDropdownOpen(false)} 
                    />
                  )}

                  <div className="relative z-20">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full flex items-center justify-between bg-white border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-300 cursor-pointer text-left"
                    >
                      <span>{categories.find(c => c.value === formData.project)?.label || formData.project}</span>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu List */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute z-30 w-full mt-2 bg-white border border-slate-200/80 rounded-xl shadow-lg shadow-slate-100/50 overflow-hidden"
                        >
                          <div className="p-1.5 flex flex-col gap-1">
                            {categories.map((category) => {
                              const isSelected = formData.project === category.value;
                              return (
                                <button
                                  key={category.value}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, project: category.value });
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors duration-200 ${
                                    isSelected 
                                      ? 'bg-green-50 text-green-700 font-medium' 
                                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                  }`}
                                >
                                  <span>{category.label}</span>
                                  {isSelected && <Check size={14} className="text-green-600" />}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    BRIEF DESCRIPTION
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 resize-none"
                    placeholder="Describe your editing project scope..."
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-2">
                  <Magnet range={25} strength={0.25} className="w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-general font-bold text-sm transition-all duration-300 cursor-none shadow-md shadow-green-500/15 disabled:opacity-70 disabled:cursor-not-allowed"
                      data-cursor="link"
                    >
                      {isSubmitting ? 'Exporting...' : 'Export Message'} <Send size={16} />
                    </button>
                  </Magnet>
                </div>

              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

