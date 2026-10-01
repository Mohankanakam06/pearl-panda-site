import React, { useState } from 'react';
import { Utensils, Calendar, Building2, ShoppingBag, UserCheck, Rocket, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const industriesData = [
  {
    id: 'cafes',
    name: 'Cafés & Restaurants',
    icon: Utensils,
    tag: 'HOSPITALITY',
    digitalNeeds: 'Menu / food showcase, location, reservations or enquiries, offers, Instagram content and promotions.',
    socialExamples: 'Food photography posts, menu highlights, offers, reels, ambience and customer-focused content.',
    features: [
      'Interactive digital menu & food showcase',
      'Location, directions & Google Business schema',
      'Table reservations & enquiry routing',
      'Promotional offers & Instagram reels support'
    ]
  },
  {
    id: 'events',
    name: 'Events & Event Companies',
    icon: Calendar,
    tag: 'EXPERIENCES',
    digitalNeeds: 'Event showcase, enquiry forms, event galleries, promotional content and social media campaigns.',
    socialExamples: 'Event promotions, countdowns, highlights, venue content, announcements and post-event content.',
    features: [
      'Comprehensive event showcase & agendas',
      'Direct ticket & attendance enquiry forms',
      'High-resolution event media galleries',
      'Promotional countdowns & hype campaigns'
    ]
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: Building2,
    tag: 'DEVELOPMENT',
    digitalNeeds: 'Property listings, project showcases, enquiry forms, lead-focused landing pages and property content.',
    socialExamples: 'Property showcases, walkthrough content, project updates, location highlights and enquiry-focused posts.',
    features: [
      'Filterable property listings & catalogs',
      'Project showcase pages & spec sheets',
      'Lead-focused landing pages & enquiry forms',
      'Walkthrough videos & property content'
    ]
  },
  {
    id: 'retail',
    name: 'Retail & Local Businesses',
    icon: ShoppingBag,
    tag: 'COMMERCE',
    digitalNeeds: 'Product / service showcase, contact information, promotions and consistent social media content.',
    socialExamples: 'Product showcases, new arrivals, offers, launches and promotional content.',
    features: [
      'Product & service showcase catalog',
      'Direct contact information & local SEO',
      'Seasonal promotional offer banners',
      'Consistent weekly social media assets'
    ]
  },
  {
    id: 'creators',
    name: 'Creators & Personal Brands',
    icon: UserCheck,
    tag: 'MEDIA',
    digitalNeeds: 'Portfolio, personal website, content presence, profile building and social media management.',
    socialExamples: 'Personal content, portfolio highlights, educational / entertainment content and audience engagement.',
    features: [
      'Clean personal portfolio & biography',
      'Audience content presence & newsletter hub',
      'Profile building & brand collaboration forms',
      'Educational carousels & engagement copy'
    ]
  },
  {
    id: 'startups',
    name: 'Startups & Small Businesses',
    icon: Rocket,
    tag: 'VENTURES',
    digitalNeeds: 'Company website, service pages, lead forms, launch content and ongoing social media presence.',
    socialExamples: 'Founder journey, launch announcements, feature highlights, and customer testimonials.',
    features: [
      'Modern company website & service pages',
      'High-converting lead generation forms',
      'Launch content & promotional roadmap',
      'Ongoing monthly social media presence'
    ]
  }
];

export default function IndustriesSection({ onOpenContact }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeIndustry = industriesData[selectedIdx];
  const Icon = activeIndustry.icon;

  return (
    <section id="industries" className="relative z-20 py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#FFFFFF] text-[#0B1F16] border-y-4 border-[#0B1F16] select-none shadow-brutal">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B1F16] border-2 border-[#0B1F16] text-[#70B85A] font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-brutal-sm">
              <span className="w-2 h-2 bg-[#38E54D]" />
              <span>INDUSTRIES WE SERVE // PRD SECTION 3</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#0B1F16] leading-[0.92]">
              TAILORED TO YOUR <br />
              <span className="text-[#2E8B3C]">SPECIFIC INDUSTRY</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#0B1F16]/80 font-body leading-relaxed border-l-4 border-[#2E8B3C] pl-4 font-medium">
            Our services can be tailored to different industries, with the website and social media style adapted to each business.
          </p>
        </div>

        {/* 6 Industry Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {industriesData.map((ind, idx) => {
            const ItemIcon = ind.icon;
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIdx(idx)}
                className={`p-4 border-3 text-left transition-all flex flex-col justify-between h-32 select-none ${
                  isSelected
                    ? 'bg-[#0B1F16] text-white border-[#0B1F16] shadow-brutal'
                    : 'bg-[#F8F9F5] text-[#0B1F16] border-[#0B1F16]/30 hover:border-[#0B1F16] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <ItemIcon className={`w-5 h-5 ${isSelected ? 'text-[#38E54D]' : 'text-[#2E8B3C]'}`} />
                  <span className="font-mono text-[10px] font-bold opacity-60">0{idx + 1}</span>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase font-bold tracking-wider opacity-75">
                    {ind.tag}
                  </div>
                  <div className="font-display text-sm uppercase leading-tight font-bold">
                    {ind.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Industry Deep-Dive Card */}
        <div className="p-8 sm:p-12 md:p-14 bg-[#0B1F16] text-white border-4 border-[#0B1F16] shadow-brutal-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Requirements & Needs */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-[#2E8B3C] text-white border border-white">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#70B85A] font-bold">
                    INDUSTRY BLUEPRINT // 0{selectedIdx + 1}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tight">
                    {activeIndustry.name}
                  </h3>
                </div>
              </div>

              {/* Typical Digital Needs */}
              <div className="mt-6 mb-6 p-4 bg-[#050d08] border-2 border-[#70B85A]/40">
                <span className="font-mono text-xs text-[#DAAF37] font-bold uppercase tracking-wider block mb-1">
                  TYPICAL DIGITAL NEEDS:
                </span>
                <p className="text-sm sm:text-base text-white/90 font-body leading-relaxed">
                  {activeIndustry.digitalNeeds}
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeIndustry.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#38E54D] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenContact(`Industry Inquiry: ${activeIndustry.name}`)}
                data-cursor="ENQUIRE"
                className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold flex items-center gap-3 border-2 border-white hover:bg-white"
              >
                <span>ENQUIRE FOR {activeIndustry.name.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Right Column: Industry-Specific Social Media Examples */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#050d08] border-3 border-[#DAAF37]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#DAAF37] font-bold uppercase tracking-wider mb-4 border-b border-[#DAAF37]/30 pb-2">
                <Sparkles className="w-4 h-4 text-[#DAAF37]" />
                <span>INDUSTRY-SPECIFIC SOCIAL MEDIA</span>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body mb-6">
                {activeIndustry.socialExamples}
              </p>

              <div className="p-3 bg-[#0B1F16] border border-white/20 font-mono text-xs text-white/70 space-y-1.5">
                <div className="text-[#38E54D] font-bold uppercase">MONTHLY CADENCE INCLUDES:</div>
                <div>• Content Planning &amp; Posting Calendar</div>
                <div>• Branded Social Posts &amp; Carousels</div>
                <div>• Captions, Hooks &amp; Calls-to-Action</div>
                <div>• Publishing Support &amp; Monthly Review</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
