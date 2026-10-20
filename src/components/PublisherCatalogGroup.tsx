import React, { useState, useMemo } from 'react';
import { Book, InquiryItem } from '../types';
import { BookCard } from './BookCard';
import { 
  Building2, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  Percent,
  CheckCircle2
} from 'lucide-react';

interface PublisherCatalogGroupProps {
  books: Book[];
  inquiryItems: InquiryItem[];
  onAddToInquiry: (book: Book, qty: number) => void;
  onQuickView: (book: Book) => void;
  onDirectBuy: (book: Book, qty: number) => void;
  selectedPublisherFilter: string;
  onSelectPublisherFilter: (pub: string) => void;
}

// Brand metadata for top publishers
const PUBLISHER_META: Record<string, { color: string; badge: string; description: string }> = {
  'Samayik Ghatna Chakra': {
    color: 'from-rose-600 to-red-700',
    badge: 'IAS / UPPSC Purvavlokan Specialist',
    description: 'Purvavlokan GS Series, Drishti Current Affairs, RO/ARO, Police & State PSC',
  },
  'Youth Competition Times (YCT)': {
    color: 'from-emerald-600 to-teal-700',
    badge: 'Police / Railways / TET Solved Papers',
    description: 'UP Police Constable, PET, Railway NTPC/ALP, Technical Exams & Chapterwise Solved',
  },
  'Lucent Publications': {
    color: 'from-amber-600 to-orange-700',
    badge: 'General Knowledge & Science Benchmark',
    description: 'Lucent Samanya Gyan, General Science & Objective GK (Hindi & English)',
  },
  'Kiran Publication': {
    color: 'from-blue-600 to-indigo-700',
    badge: 'SSC & Banking PYQ Champion',
    description: 'SSC CGL Maths 11800+, Reasoning, English, Khan Sir NCERT series & Banking',
  },
  'Rojgar with Ankit (RWA)': {
    color: 'from-sky-600 to-blue-700',
    badge: 'UP Police & SSC GD Favourite',
    description: 'Ankit Bhati Yellow GK Book, GS Nidhi Naveen Sharma, Maths Maharathi & Delhi Police',
  },
  'Cosmos Publications': {
    color: 'from-teal-600 to-cyan-700',
    badge: 'Mahesh Barnwal NCERT Sar Sangrah',
    description: 'NCERT Sar Sangrah One-Liner (Class 6-12), Indian Geography & Constitution',
  },
  'McGraw Hill': {
    color: 'from-purple-600 to-pink-700',
    badge: 'Standard UPSC Civil Services Texts',
    description: 'Indian Polity by M Laxmikanth, Nitin Singhania Art & Culture, Ancient India Poonam Dalal',
  },
  'Disha Publication': {
    color: 'from-indigo-600 to-blue-700',
    badge: 'UPSC / UPPSC Solved & Errorless Leader',
    description: '10,000+ Objective GS, Errorless 39 Years NEET/JEE, UPPSC Mains & NCERT Digest',
  },
  'RBD Publications (Khan Sir)': {
    color: 'from-red-600 to-amber-700',
    badge: 'Khan Sir & Gagan Pratap Sir Official',
    description: 'NCERT X-Ray Saar Sangrah, Student Atlas, BPSC Question Killer & Complete Maths Practice',
  },
  'Pariksha Vani (Baudhik Prakashan)': {
    color: 'from-emerald-700 to-green-900',
    badge: 'UPPSC & State PCS GS Specialists',
    description: 'Bhartiya Samvidhan, Bharat Ka Bhugol, Krishi Praudyogiki, Paryavaran & Adhyaywar Hal Prashna',
  },
  'KBC-Nano Publications': {
    color: 'from-cyan-600 to-blue-700',
    badge: 'BPSC & Bihar Samagra Benchmark',
    description: '70th BPSC Mains, Samanya Gyan NCERT Par Adharit, Bihar Samagra & UPPSC Compass',
  },
  'Rajeev Prakashan': {
    color: 'from-rose-600 to-pink-800',
    badge: 'UP Police, CTET & Navodaya Guide',
    description: 'UP Police Constable & UPSI 54 Solved Papers, CTET 31 Solved Papers, UPSSSC PET 2027',
  },
  'Aash Publication': {
    color: 'from-amber-600 to-orange-700',
    badge: 'Railway ALP & Tech Brahmastra (Er. S.K. Jha)',
    description: 'Specialist for ALP CBT-2 Basic Science, Electrician, Fitter & NCERT Exemplar Vigyan',
  },
  'Vidya Prakashan': {
    color: 'from-yellow-700 to-amber-800',
    badge: 'Super TET, TGT & CHS Entrance',
    description: 'UPESSC TGT Subjectwise Solved Papers, Super TET Sahayak Adhyapak, BHU CHS Class 9 & 11',
  },
  'T Balaji Publications (TBP)': {
    color: 'from-teal-600 to-emerald-800',
    badge: 'NIELIT O Level, CCC & Computer Master',
    description: 'M1-R5 to M4-R5 Modules, Python Programming, IoT, Web Design, ADCA & Tally Prime 2.0',
  },
  'Test Prep Publications': {
    color: 'from-blue-600 to-sky-800',
    badge: 'UP Nursing, ASI & General Hindi',
    description: 'B.Sc. Nursing UPCNET 3.0, English Vocabulary by Azeem Khan, Samanya Hindi 4200+ by Mohit Shukla',
  },
  'SSG Gurukul': {
    color: 'from-violet-600 to-indigo-800',
    badge: 'UPSSSC Junior Assistant & Test Prep',
    description: 'UPSSSC Kanishth Lipik Practice Sets & Shubhangu Sir One Day Exam Series',
  },
  'Arihant Publications': {
    color: 'from-purple-600 to-pink-700',
    badge: 'NDA, CDS & Teacher Eligibility Benchmark',
    description: 'Pathfinder NDA/NA, SP Bakshi Objective General English, CTET Success Master & Magbooks',
  },
  'Drishti IAS Publications': {
    color: 'from-teal-700 to-cyan-800',
    badge: 'UPSC Civil Services Quick Books',
    description: 'Drishti Quick Book Bhartiya Samvidhan, Bhugol, Arthvyavastha & Current Affairs Today',
  },
  'NCERT': {
    color: 'from-slate-700 to-slate-900',
    badge: 'Central Government Textbooks (Class 1-12)',
    description: 'Official NCERT Textbooks, Exemplar Problems, Hindi & English Medium Foundations',
  },
  'Quanta Publication': {
    color: 'from-violet-600 to-purple-800',
    badge: 'Banking & Quantitative Aptitude',
    description: 'Aashish Arora Quant, Ankganit, Levelwise banking practice guides',
  },
};

export const PublisherCatalogGroup: React.FC<PublisherCatalogGroupProps> = ({
  books,
  inquiryItems,
  onAddToInquiry,
  onQuickView,
  onDirectBuy,
  selectedPublisherFilter,
  onSelectPublisherFilter,
}) => {
  // Track which publishers are expanded to show all books
  const [expandedPublishers, setExpandedPublishers] = useState<Record<string, boolean>>({});

  // Group books by publisher
  const groupedPublishers = useMemo(() => {
    const map: Record<string, Book[]> = {};
    books.forEach((book) => {
      const pub = book.publisher || 'Other Publishers';
      if (!map[pub]) {
        map[pub] = [];
      }
      map[pub].push(book);
    });

    // Sort by count descending so prominent publishers come first
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [books]);

  const toggleExpand = (publisherName: string) => {
    setExpandedPublishers((prev) => ({
      ...prev,
      [publisherName]: !prev[publisherName],
    }));
  };

  // If a specific publisher is filtered, show all its books directly
  const isSinglePublisherActive = selectedPublisherFilter !== 'all';

  return (
    <div className="space-y-10">
      {/* Student Discount Slab Notification Pill */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-black tracking-wide flex items-center gap-2">
              <span>Student & Bulk Purchase Discount Scheme</span>
              <span className="bg-yellow-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </h4>
            <p className="text-xs text-emerald-100 mt-0.5">
              • <strong>1 Book (Single): 25% OFF</strong> • <strong>2–10 Books: 30% OFF</strong> • <strong>10–50 Books: 35% OFF</strong> • <strong>50+ Books: 40% OFF</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[11px] bg-white/20 backdrop-blur-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" />
            <span>Single Books Delivered Pan-India</span>
          </span>
        </div>
      </div>

      {/* Publisher Sections */}
      {groupedPublishers.map(([publisherName, publisherBooks]) => {
        const isExpanded = expandedPublishers[publisherName] || isSinglePublisherActive;
        // Show first 4 books by default; clicking "View More" reveals all
        const displayBooks = isExpanded ? publisherBooks : publisherBooks.slice(0, 4);
        const meta = PUBLISHER_META[publisherName] || {
          color: 'from-slate-700 to-slate-900',
          badge: 'Verified Publisher',
          description: `Complete catalog of competitive & academic books published by ${publisherName}`,
        };

        const remainingCount = publisherBooks.length - 4;

        return (
          <section
            key={publisherName}
            id={`pub-section-${publisherName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5"
          >
            {/* Publisher Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-start sm:items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.color} text-white flex items-center justify-center font-black text-sm shadow-md flex-shrink-0`}
                >
                  <Building2 className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      {publisherName}
                    </h3>
                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                      {publisherBooks.length} Titles
                    </span>
                    <span className="bg-red-50 text-red-700 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-red-200">
                      {meta.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    {meta.description}
                  </p>
                </div>
              </div>

              {/* View More / View Less Toggle Header Button */}
              {publisherBooks.length > 4 && !isSinglePublisherActive && (
                <button
                  onClick={() => toggleExpand(publisherName)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer self-start sm:self-auto"
                >
                  <span>
                    {isExpanded ? 'Show Top 4 Titles' : `View All ${publisherBooks.length} Titles (+${remainingCount} more)`}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transition-transform" />
                  )}
                </button>
              )}
            </div>

            {/* Books Grid under this Publisher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {displayBooks.map((book) => {
                const isInInquiry = inquiryItems.some((item) => item.book.id === book.id);
                return (
                  <BookCard
                    key={book.id}
                    book={book}
                    isInInquiry={isInInquiry}
                    onAddToInquiry={onAddToInquiry}
                    onQuickView={onQuickView}
                    onDirectBuy={onDirectBuy}
                  />
                );
              })}
            </div>

            {/* Bottom Expand Bar when not expanded */}
            {publisherBooks.length > 4 && !isExpanded && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => toggleExpand(publisherName)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-yellow-400" />
                  <span>
                    Explore Full {publisherName} Catalog ({remainingCount} more titles available)
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
