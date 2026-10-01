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

  // Exact 6 industries from PRD
  const industriesList = [
    'Cafés & Restaurants',
    'Events & Event Companies',
    'Real Estate',
    'Retail & Local Businesses',
    'Creators & Personal Brands',
    'Startups & Small Businesses'
  ];

  // Exact 3 Website Types + Monthly Social Package + Combo from PRD
  const serviceOptions = [
    '1. Basic Portfolio Website',
    '2. Website with Backend',
    '3. Full Backend Website',
    'Social Media — Monthly Package',
    'Website + Social Media Combo (Combined Option)'
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
              ENQUIRY TRANSMITTED!
            </h3>
            <p className="text-sm text-white/80 max-w-md mx-auto mb-6 leading-relaxed font-body">
              Thank you for contacting Pearl Panda. We will review your selected service and industry requirements and respond with current rates, scope details, and package breakdown.
            </p>
            <div className="font-mono text-xs text-[#DAAF37] uppercase font-bold mb-6">
              Clean. Friendly. Modern. Memorable.
            </div>
            <button
              onClick={onClose}
              className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-8 py-3 text-sm font-bold"
            >
              RETURN TO SITE
            </button>
          </div>
        ) : (
          <div>
            {/* Header from PRD */}
            <div className="mb-6 border-b-2 border-white/20 pb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#050d08] border border-[#DAAF37] text-[#DAAF37] font-mono text-[11px] font-bold uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#DAAF37]" />
                <span>PRD SECTION 9 // PACKAGE &amp; PRICING</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tight">
                CONTACT PEARL PANDA
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-body mt-1 leading-relaxed">
                Website services are quoted according to the selected website type and project requirements. Social media services are offered as monthly packages. Package contents and deliverables are confirmed before work begins.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Service Type from PRD */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] font-bold mb-1.5">
                  SELECT SERVICE TYPE / PACKAGE
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#050d08] border-2 border-white px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#38E54D]"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0B1F16]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Industry from PRD */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] font-bold mb-1.5">
                  SELECT INDUSTRY
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#050d08] border-2 border-white px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#38E54D]"
                >
                  {industriesList.map((ind) => (
                    <option key={ind} value={ind} className="bg-[#0B1F16]">
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] font-bold mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#050d08] border-2 border-white px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38E54D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] font-bold mb-1.5">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@business.com"
                    className="w-full bg-[#050d08] border-2 border-white px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38E54D]"
                  />
                </div>
              </div>

              {/* Message / Requirements */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#70B85A] font-bold mb-1.5">
                  PROJECT REQUIREMENTS / AUDIENCE
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business, audience, and requirements..."
                  className="w-full bg-[#050d08] border-2 border-white px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38E54D]"
                />
              </div>

              {/* PRD Note on Rates */}
              <div className="text-[11px] font-mono text-[#DAAF37] leading-relaxed">
                * Rates are not fixed on the website; we will reply with current rates, scope options, and package details.
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  data-cursor="SUBMIT"
                  className="btn-brutal bg-[#38E54D] text-[#0B1F16] w-full py-3.5 sm:py-4 text-sm font-bold flex items-center justify-center gap-2 border-3 border-[#FFFFFF] shadow-brutal-white hover:bg-[#48f060]"
                >
                  <span>SUBMIT ENQUIRY FOR RATES &amp; DETAILS</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
