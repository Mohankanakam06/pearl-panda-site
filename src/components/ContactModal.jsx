import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

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
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0B1F16] border-4 border-[#FFFFFF] shadow-brutal-white-lg p-6 sm:p-10 z-10 my-8">

        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="CLOSE"
          className="absolute top-4 right-4 p-2 bg-[#050d08] border-2 border-white hover:bg-[#2E8B3C] text-white transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-[#38E54D] border-3 border-[#0B1F16] shadow-brutal text-[#0B1F16] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 stroke-[3]" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              INQUIRY TRANSMITTED!
            </h3>
            <p className="text-sm text-white/80 max-w-md mx-auto mb-6 leading-relaxed font-body">
              Thank you for reaching out to Pearl Panda. We will review your project parameters and dispatch a tailored scope, timeline, and proposal within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-8 py-3 text-sm font-bold"
            >
              RETURN TO STUDIO
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DAAF37] border-2 border-[#0B1F16] shadow-brutal-sm text-[#0B1F16] font-mono text-[10px] uppercase tracking-widest font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                PROJECT INQUIRY // TAILORED PROPOSAL
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                LET'S BUILD SOMETHING EXCEPTIONAL
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 font-body">
                Specify your technical requirements. We'll respond with an engineered roadmap and investment scope.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Select Service Type */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] mb-1 font-bold">
                  Service / Architecture Needed
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#050d08] border-2 border-white/40 focus:border-[#38E54D] text-white text-xs sm:text-sm focus:outline-none"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0B1F16] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Industry */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] mb-1 font-bold">
                  Your Industry Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#050d08] border-2 border-white/40 focus:border-[#38E54D] text-white text-xs sm:text-sm focus:outline-none"
                >
                  {industriesList.map((ind) => (
                    <option key={ind} value={ind} className="bg-[#0B1F16] text-white">
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] mb-1 font-bold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#050d08] border-2 border-white/40 focus:border-[#38E54D] text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] mb-1 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#050d08] border-2 border-white/40 focus:border-[#38E54D] text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] mb-1 font-bold">
                  Project Vision & Timeline
                </label>
                <textarea
                  rows="3"
                  placeholder="Share a brief overview of your business goals, target launch date, or desired features..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#050d08] border-2 border-white/40 focus:border-[#38E54D] text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  data-cursor="SUBMIT"
                  className="btn-brutal w-full py-3.5 px-6 bg-[#38E54D] text-[#0B1F16] font-display font-bold text-base hover:bg-[#48f060] flex items-center justify-center gap-2 border-3 border-[#0B1F16] shadow-brutal"
                >
                  <span>REQUEST CUSTOM PROPOSAL & SCOPE</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>

              <div className="text-center pt-1 font-mono text-[10px] text-white/50 tracking-wider uppercase">
                GUARANTEED RESPONSE WITHIN 24 BUSINESS HOURS // ZERO OBLIGATION
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
