import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { BUSINESS_INFO } from '../data/businessInfo';
import { 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  FileSpreadsheet, 
  IdCard, 
  ShoppingCart, 
  Menu, 
  X, 
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { ExamCategory } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  inquiryCount: number;
  onOpenInquiryDrawer: () => void;
  onOpenCustomListModal: () => void;
  onOpenVisitingCard: () => void;
  selectedCategory: ExamCategory;
  onSelectCategory: (cat: ExamCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  inquiryCount,
  onOpenInquiryDrawer,
  onOpenCustomListModal,
  onOpenVisitingCard,
  selectedCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Super Top Contact Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left address & GST */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span>{BUSINESS_INFO.address}, {BUSINESS_INFO.landmark}, {BUSINESS_INFO.city}-{BUSINESS_INFO.pincode}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-[11px] text-emerald-400 font-mono">
              GST: {BUSINESS_INFO.gstin}
            </span>
          </div>

          {/* Right quick phone & email */}
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${BUSINESS_INFO.phones[0]}`}
              className="inline-flex items-center gap-1 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>+91 {BUSINESS_INFO.phones[0]}</span>
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="hidden sm:inline-flex items-center gap-1 hover:text-white font-medium transition-colors"
            >
              <Mail className="w-3 h-3 text-red-400" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="cursor-pointer" onClick={() => onSelectCategory('all')}>
            <BrandLogo size="md" />
          </div>

          {/* Search Box with icon and clear button */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                id="catalog-global-search-input"
                placeholder="Search competitive books, exams (UPSC, SSC, UP Police...), publishers (Lucent, YCT, Kiran)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs p-0.5 rounded-full hover:bg-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Custom List Quote Button */}
            <button
              onClick={onOpenCustomListModal}
              id="header-custom-list-btn"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-600" />
              <span>Upload Book List</span>
            </button>

            {/* Visiting Card Button */}
            <button
              onClick={onOpenVisitingCard}
              id="header-visiting-card-btn"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all cursor-pointer"
            >
              <IdCard className="w-4 h-4 text-red-600" />
              <span>Visiting Card</span>
            </button>

            {/* Direct WhatsApp Instant Quote */}
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20place%20a%20bulk%20wholesale%20order%20from%20Book.com.`}
              target="_blank"
              rel="noreferrer"
              id="header-direct-whatsapp-btn"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            {/* Bulk Quote / Cart Button */}
            <button
              onClick={onOpenInquiryDrawer}
              id="header-bulk-quote-cart-btn"
              className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Bulk Quotation</span>
              <span className="sm:hidden">Quote</span>
              {inquiryCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-white text-red-700 font-extrabold text-xs rounded-full shadow-xs">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 md:hidden rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books, exams, publishers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-100 text-xs rounded-lg border border-slate-200 outline-none focus:border-red-500 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-slate-400 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 space-y-2 pb-2">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  onOpenCustomListModal();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 bg-amber-50 text-amber-900 rounded-lg flex items-center gap-2 border border-amber-200"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                Upload Book List
              </button>
              <button
                onClick={() => {
                  onOpenVisitingCard();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 bg-slate-100 text-slate-800 rounded-lg flex items-center gap-2 border border-slate-200"
              >
                <IdCard className="w-4 h-4 text-red-600" />
                Visiting Card
              </button>
            </div>
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20place%20a%20bulk%20wholesale%20order%20from%20Book.com.`}
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 bg-emerald-600 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp (+91 {BUSINESS_INFO.whatsapp})
            </a>
            <div className="text-[11px] text-slate-500 text-center pt-1 font-mono">
              GST: {BUSINESS_INFO.gstin} | PAN: {BUSINESS_INFO.pan}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
