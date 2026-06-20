import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MessageCircle, Phone, ChevronDown, Check } from 'lucide-react';
import Magnet from '../components/Magnet';

const InstagramIcon = (props) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const socials = [
  { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/pg_officially?igsh=bGU2OHI3bDdwcnNy', color: 'hover:text-pink-600 hover:border-pink-200 bg-pink-50/50' },
  { name: 'WhatsApp', icon: Phone, href: 'https://wa.me/919347552708', color: 'hover:text-green-600 hover:border-green-200 bg-green-50/50' },
  { name: 'Email', icon: Mail, href: 'mailto:gopichandpellakuru71@gmail.com', color: 'hover:text-blue-600 hover:border-blue-200 bg-blue-50/50' },
  { name: 'Discord', icon: MessageCircle, href: 'https://discord.com', color: 'hover:text-indigo-600 hover:border-indigo-200 bg-indigo-50/50' },
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
      className="relative min-h-screen py-24 px-6 md:px-12 bg-white flex justify-center items-center overflow-hidden"
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

      <div className="max-w-6xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
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
          <div className="flex flex-col gap-3 max-w-sm">
            {socials.map((social) => {
              const IconComponent = social.icon;
              return (
                <Magnet key={social.name} range={20} strength={0.2}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl border border-slate-200 text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50/50 shadow-sm shadow-slate-100 transition-all duration-300 w-[260px] cursor-none ${social.color}`}
                    data-cursor="link"
                  >
                    <IconComponent size={18} />
                    <span className="font-mono text-xs font-semibold tracking-wider uppercase">
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

