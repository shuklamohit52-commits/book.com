import React from 'react';
import { BrandLogo } from './BrandLogo';
import { BUSINESS_INFO } from '../data/businessInfo';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ExamCategory } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  MessageCircle
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: ExamCategory) => void;
  onOpenVisitingCard: () => void;
  onOpenCustomListModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenVisitingCard,
  onOpenCustomListModal,
}) => {
  return (
    <footer id="footer-section" className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner inside Footer */}
      <div className="bg-gradient-to-r from-red-700 via-red-800 to-indigo-950 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-xs">
              <MessageSquare className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Have a Bulk Books Inquiry?</h3>
              <p className="text-xs text-red-100">
                Direct wholesale quotations, same-day transport booking, and dealer price lists
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20place%20a%20bulk%20wholesale%20order%20from%20Book.com.`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp: +91 {BUSINESS_INFO.whatsapp}
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phones[0]}`}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              Call: {BUSINESS_INFO.phones[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Warehouse Location */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-4 inline-block shadow-md">
              <BrandLogo size="md" variant="full" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Book.com is a premier wholesale distributor of competitive exams and educational books in Aminabad, Lucknow. We supply verified genuine editions of Lucent, Kiran, Youth Competition Times, Ghatna Chakra, Arihant, Disha, and NCERTs to bookstores, coaching institutes, and libraries across Uttar Pradesh and Pan-India.
            </p>

            {/* Official Legal Registrations Box */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Business Credentials
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block">GSTIN No:</span>
                  <span className="font-semibold text-emerald-400">{BUSINESS_INFO.gstin}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PAN Card:</span>
                  <span className="font-semibold text-slate-200">{BUSINESS_INFO.pan}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Aadhaar:</span>
                  <span className="font-semibold text-slate-200">{BUSINESS_INFO.aadhaar}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Branch Head:</span>
                  <span className="font-semibold text-amber-300 font-sans">{BUSINESS_INFO.ownerName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Exam Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {CATEGORIES_DATA.slice(1, 8).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-red-500" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Aminabad Office Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Sales Office & Hub
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-slate-400">
                    {BUSINESS_INFO.landmark}, {BUSINESS_INFO.city} - {BUSINESS_INFO.pincode}, {BUSINESS_INFO.state}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Aminabad+Lucknow+Dr+BN+Verma+Road"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline text-[11px] inline-flex items-center gap-1 mt-1 font-semibold"
                  >
                    View on Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${BUSINESS_INFO.phones[0]}`} className="hover:text-white font-semibold">
                    +91 {BUSINESS_INFO.phones[0]}
                  </a>
                  {' , '}
                  <a href={`tel:${BUSINESS_INFO.phones[1]}`} className="hover:text-white font-semibold">
                    +91 {BUSINESS_INFO.phones[1]}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">{BUSINESS_INFO.workingHours}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onOpenVisitingCard}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                Visiting Card
              </button>
              <button
                onClick={onOpenCustomListModal}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                Upload Book List
              </button>
              <a
                href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20inquire%20about%20wholesale%20books%20from%20Book.com.`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-800/60 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Direct
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Book.com • Educational Books Supplier • Lucknow. Managed by Vikash Agrawal. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Wholesale Catalog Only (No Retail Direct Checkout)</span>
            <span>•</span>
            <span className="text-slate-400">Aminabad Trade Market</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Right WhatsApp Widget Button */}
      <a
        href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20inquire%20about%20wholesale%20books%20from%20Book.com.`}
        target="_blank"
        rel="noreferrer"
        id="floating-whatsapp-btn"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ring-4 ring-emerald-500/20"
        title="Direct WhatsApp Wholesale Inquiry"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
          WhatsApp Wholesale
        </span>
      </a>
    </footer>
  );
};
