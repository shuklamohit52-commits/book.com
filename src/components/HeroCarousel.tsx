import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Percent, 
  Truck, 
  PhoneCall, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HeroCarouselProps {
  onOpenCustomListModal: () => void;
  onOpenVisitingCard: () => void;
  onSelectCategory: (categoryId: any) => void;
  onOpenInquiryDrawer: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onOpenCustomListModal,
  onOpenVisitingCard,
  onSelectCategory,
  onOpenInquiryDrawer,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'competitive-exams-master',
      badge: 'All Competitive Exams Distributor • Lucknow',
      title: 'Wholesale Distributor of Competitive Exams Books',
      subtitle: 'Complete Catalog for UPSC, UP Police, SSC, Railways, Banking, Teaching (CTET/UPTET), NEET/JEE & Defence Exams.',
      highlight: 'Up to 55% Wholesale Margin on Bulk Orders',
      accentBg: 'from-slate-900 via-indigo-950 to-red-950',
      tagColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      actionPrimary: { text: 'Browse Catalog & Bulk Quote', action: () => onSelectCategory('all') },
      actionSecondary: { text: 'Custom Book List Enquiry', action: onOpenCustomListModal },
      stats: [
        { label: 'Original Publishers', val: '50+' },
        { label: 'Competitive Titles', val: '10,000+' },
        { label: 'Dispatch Speed', val: '24 Hours' },
        { label: 'Wholesale Margin', val: '30-55%' },
      ],
    },
    {
      id: 'up-police-state-exams',
      badge: 'Mega Recruitment Stock 2025-2026',
      title: 'UP Police, UPSSSC PET, Lekhpal & RO/ARO Books',
      subtitle: 'Ready bulk cartons of Youth Competition Times (YCT), Ghatna Chakra, Kiran, Aditya Hindi & Lucent Samanya Gyan in Aminabad Lucknow.',
      highlight: 'Immediate Bilti & Transport Dispatch for UP & Bihar Bookstores',
      accentBg: 'from-zinc-900 via-red-950 to-indigo-950',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      actionPrimary: { text: 'View UP State Books', action: () => onSelectCategory('up-state-exams') },
      actionSecondary: { text: 'Direct WhatsApp Quotation', action: () => window.open(`https://wa.me/919369532755?text=Hello%20Vikash%20ji,%20I%20need%20bulk%20quote%20for%20UP%20Police%20and%20State%20Exams%20Books.`, '_blank') },
      stats: [
        { label: 'YCT & Ghatna Chakra', val: 'Ready Stock' },
        { label: 'Aditya Hindi', val: 'Best Price' },
        { label: 'Transport Hub', val: 'Aminabad' },
        { label: 'GST Invoicing', val: '100% Legal' },
      ],
    },
    {
      id: 'children-educational-books',
      badge: 'Educational & Children Books Supplier',
      title: 'School Foundation, NCERTs & Children Learning Series',
      subtitle: 'Class 6-12 NCERT Textbooks, Activity Workbooks, Phonics, Moral Storybooks & Pre-School Supplies for Bookstores and School Counters.',
      highlight: 'Maximum Profit Margins for Retail Stationery & Bookstores',
      accentBg: 'from-slate-900 via-emerald-950 to-blue-950',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      actionPrimary: { text: 'Explore Children & School Books', action: () => onSelectCategory('children-books') },
      actionSecondary: { text: 'View Owner Business Card', action: onOpenVisitingCard },
      stats: [
        { label: 'NCERT Sets', val: 'Hindi & Eng' },
        { label: 'Activity & Phonics', val: '55% Margin' },
        { label: 'School Supplies', val: 'Bulk Packing' },
        { label: 'Verified GST', val: '09ADTPA1819R1ZW' },
      ],
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div id="hero-banner-carousel" className="relative bg-slate-900 text-white overflow-hidden shadow-xl">
      {/* Background with decorative glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.accentBg} transition-all duration-1000 ease-in-out`}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Slide Content */}
          <div className="lg:col-span-8 space-y-5">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold backdrop-blur-md transition-all duration-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-none text-white font-serif">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Highlight Banner */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/90 to-amber-600/90 px-4 py-2 rounded-lg text-sm sm:text-base font-bold text-white shadow-lg border border-red-400/30">
              <Percent className="w-5 h-5 text-yellow-300 flex-shrink-0" />
              <span>{slide.highlight}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={slide.actionPrimary.action}
                id="hero-primary-cta"
                className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                {slide.actionPrimary.text}
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={slide.actionSecondary.action}
                id="hero-secondary-cta"
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 font-semibold px-5 py-3.5 rounded-xl backdrop-blur-md transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                {slide.actionSecondary.text}
              </button>

              <a
                href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20inquire%20about%20wholesale%20competitive%20exam%20books.`}
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-cta"
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-4 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                WhatsApp: {BUSINESS_INFO.whatsapp}
              </a>
            </div>
          </div>

          {/* Right Floating Warehouse Card / Stats */}
          <div className="lg:col-span-4">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/60 shadow-2xl space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-sm">
                    LK
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Aminabad Wholesale Hub</h2>
                    <p className="text-xs text-slate-400">Dr. B.N. Verma Road, Lucknow</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OPEN FOR BULK
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {slide.stats.map((st, idx) => (
                  <div key={idx} className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-700/40">
                    <p className="text-xs text-slate-400">{st.label}</p>
                    <p className="text-base font-extrabold text-amber-400 mt-0.5">{st.val}</p>
                  </div>
                ))}
              </div>

              {/* Quick Contacts Block */}
              <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-700/60 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Branch Head:</span>
                  <span className="font-semibold text-white">{BUSINESS_INFO.ownerName}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">GSTIN No:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{BUSINESS_INFO.gstin}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Mobile 1:</span>
                  <a href={`tel:${BUSINESS_INFO.phones[0]}`} className="text-amber-300 font-semibold hover:underline">
                    +91 {BUSINESS_INFO.phones[0]}
                  </a>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Mobile 2:</span>
                  <a href={`tel:${BUSINESS_INFO.phones[1]}`} className="text-amber-300 font-semibold hover:underline">
                    +91 {BUSINESS_INFO.phones[1]}
                  </a>
                </div>
              </div>

              {/* Bottom Quick Card Trigger */}
              <button
                onClick={onOpenVisitingCard}
                id="hero-view-visiting-card-btn"
                className="w-full bg-slate-700/80 hover:bg-slate-700 text-xs font-semibold py-2 rounded-lg text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-600/50"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                View Official Book.com Business Card
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Arrows */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-red-500' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              aria-label="Next slide"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
