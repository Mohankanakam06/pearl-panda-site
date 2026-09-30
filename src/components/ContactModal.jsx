import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, initialService = '' }) {
  if (!isOpen) return null;

  const [serviceType, setServiceType] = useState(
    initialService || 'Website + Social Media Combo'
  );
  const [industry, setIndustry] = useState('Cafés & Restaurants');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const industriesList = [
    'Cafés & Restaurants',
    'Events & Entertainment',
    'Real Estate & Developments',
    'Retail & Local Brands',
    'Creators & Personal Brands',
    'Startups & Technology Ventures',
    'Other Industry'
  ];

  const serviceOptions = [
    'Bespoke Portfolio & Brand Showcase',
    'Dynamic Web Platform & Database',
    'Custom Web Application & Digital Product',
    'Monthly Social Media Direction',
    'Website + Social Media Combo (Recommended)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#08180e] border border-[#2E8B3C]/50 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/90 z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#38E54D]/20 border border-[#38E54D] text-[#38E54D] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-3xl font-bold text-white mb-2">
              Inquiry Received!
            </h3>
            <p className="text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you for reaching out to Pearl Panda. We will review your project requirements and share a tailored scope, timeline, and proposal within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#38E54D] text-[#050e08] font-bold text-xs uppercase tracking-wider hover:bg-[#48f060] transition"
            >
              Back to Website
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DAAF37]/15 border border-[#DAAF37]/40 text-[#DAAF37] font-mono-tag text-[10px] uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-3 h-3" />
                PROJECT INQUIRY • TAILORED PROPOSAL
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Let's Build Something Exceptional
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Tell us about your brand vision. We'll respond with a customized roadmap and investment scope.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Select Service Type */}
              <div>
                <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#A8F5B8] mb-1.5 font-medium">
                  Service / Architecture Needed
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-[#38E54D] focus:outline-none"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#08180e] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Industry */}
              <div>
                <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#A8F5B8] mb-1.5 font-medium">
                  Your Industry Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-[#38E54D] focus:outline-none"
                >
                  {industriesList.map((ind) => (
                    <option key={ind} value={ind} className="bg-[#08180e] text-white">
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#A8F5B8] mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm placeholder:text-white/30 focus:border-[#38E54D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#A8F5B8] mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm placeholder:text-white/30 focus:border-[#38E54D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#A8F5B8] mb-1.5 font-medium">
                  Project Vision & Timeline
                </label>
                <textarea
                  rows="3"
                  placeholder="Share a brief overview of your business goals, target launch date, or desired features..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm placeholder:text-white/30 focus:border-[#38E54D] focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#38E54D] hover:bg-[#48f060] text-[#050e08] font-display font-bold text-sm tracking-wide shadow-lg shadow-[#38E54D]/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <span>Request Custom Proposal & Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] font-mono-tag text-white/40">
                  Clean • Friendly • Modern • Memorable
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
