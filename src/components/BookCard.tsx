import React, { useState } from 'react';
import { Book } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getDiscountForQuantity, calculateItemDiscountedPrice } from '../services/discountService';
import { 
  Eye, 
  Plus, 
  Check, 
  MessageSquare, 
  BookOpen, 
  Flame, 
  Sparkles, 
  Zap,
  GraduationCap
} from 'lucide-react';

interface BookCardProps {
  book: Book;
  isInInquiry: boolean;
  onAddToInquiry: (book: Book, qty: number) => void;
  onQuickView: (book: Book) => void;
  onDirectBuy?: (book: Book, qty: number) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isInInquiry,
  onAddToInquiry,
  onQuickView,
  onDirectBuy,
}) => {
  // Allow single book selection for students! (1 copy minimum)
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discountInfo = getDiscountForQuantity(selectedQty);
  const unitRate = calculateItemDiscountedPrice(book.mrp, discountInfo.discountPercent);

  const handleAdd = () => {
    onAddToInquiry(book, selectedQty);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWhatsAppBookInquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Hello Vikash ji (Book.com Lucknow), I want to inquire/order:\n\n*Book:* ${book.title}\n*Publisher:* ${book.publisher}\n*Quantity:* ${selectedQty} ${selectedQty === 1 ? 'copy (Student)' : 'copies'}\n*MRP:* ₹${book.mrp}\n*Discount:* ${discountInfo.discountPercent}% OFF\n*Rate:* ₹${unitRate}/pc\n\nPlease confirm availability and dispatch details.`;
    window.open(`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      id={`book-card-${book.id}`}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {book.bestseller && (
          <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            <Flame className="w-3 h-3 text-yellow-200" />
            Bestseller
          </span>
        )}
        {book.isNewRelease && (
          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-200" />
            2026 Edition
          </span>
        )}
      </div>

      {/* Language / Publisher Badge Top Right */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
          {book.language}
        </span>
      </div>

      {/* Real Book Cover Image Section */}
      <div
        onClick={() => onQuickView(book)}
        className="relative bg-gradient-to-b from-slate-100 to-slate-200/80 p-5 flex items-center justify-center cursor-pointer overflow-hidden border-b border-slate-100 min-h-[220px]"
      >
        <div className="absolute inset-0 bg-radial from-white/80 via-slate-100/60 to-transparent" />

        {/* 3D Realistic Book Display Frame */}
        <div 
          className="relative z-1 w-36 h-52 sm:w-40 sm:h-56 rounded-r-md rounded-l-xs shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1 overflow-hidden bg-slate-900 flex flex-col justify-between border-y border-r border-slate-300/40"
          style={{
            boxShadow: '8px 12px 24px -4px rgba(0, 0, 0, 0.3), inset 3px 0 5px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Spine 3D Lighting Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10 pointer-events-none border-r border-white/10" />

          {/* Real Photo or Fallback Cover */}
          {!imageError ? (
            <div className="relative w-full h-full flex flex-col justify-between bg-slate-800">
              <img
                src={book.coverImage}
                alt={book.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent p-2.5 pt-6 text-white z-5">
                <p className="text-[10px] font-black uppercase text-amber-400 truncate tracking-wide">
                  {book.publisher}
                </p>
                <p className="text-[11px] font-bold line-clamp-2 leading-tight drop-shadow-md">
                  {book.title}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="w-full h-full p-3.5 text-white flex flex-col justify-between relative"
              style={{
                background: `linear-gradient(135deg, ${book.accentColor}, #0f172a)`
              }}
            >
              <div className="pl-2 flex items-center justify-between">
                <span className="text-[9px] font-extrabold tracking-wider uppercase opacity-90 truncate max-w-[100px]">
                  {book.publisher}
                </span>
                <BookOpen className="w-3.5 h-3.5 opacity-80" />
              </div>
              <div className="pl-2 my-auto">
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  {book.categoryName}
                </div>
                <h3 className="text-xs font-black line-clamp-3 leading-snug mt-0.5 drop-shadow-xs font-serif">
                  {book.title}
                </h3>
              </div>
              <div className="pl-2 border-t border-white/20 pt-1.5 flex items-center justify-between text-[8px] font-bold">
                <span>{book.edition}</span>
                <span className="bg-white/20 px-1 py-0.5 rounded text-[8px]">{book.binding || 'Paperback'}</span>
              </div>
            </div>
          )}

          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(book);
            }}
            className="bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-1.5 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer transform group-hover:scale-105 duration-200"
          >
            <Eye className="w-4 h-4 text-red-600" />
            Quick Preview & Details
          </button>
        </div>
      </div>

      {/* Book Information Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Publisher & Student Badge */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-semibold text-red-600 truncate max-w-[150px]">
              {book.publisher}
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              1 Book: 25% OFF
            </span>
          </div>

          {/* Book Title */}
          <h3
            onClick={() => onQuickView(book)}
            className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-red-600 cursor-pointer transition-colors leading-snug"
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Hindi Title Subtext */}
          {book.hindiTitle && (
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
              {book.hindiTitle}
            </p>
          )}

          <p className="text-[11px] text-slate-400 mt-1 truncate">
            By {book.author}
          </p>
        </div>

        {/* Dynamic Discount & Pricing Box */}
        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 space-y-1.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-500">MRP: </span>
              <span className="text-xs text-slate-400 line-through font-medium">
                ₹{book.mrp}
              </span>
            </div>
            <div className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md ${discountInfo.badgeColor}`}>
              <span>{discountInfo.discountPercent}% OFF</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60">
            <span className="text-xs font-bold text-slate-700">
              {selectedQty === 1 ? 'Single Student Price:' : 'Offer Price:'}
            </span>
            <span className="text-base font-extrabold text-slate-900 font-mono">
              ₹{unitRate}
              <span className="text-[10px] text-slate-400 font-normal ml-0.5">/unit</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2 pt-1">
          {/* Quantity Selector + Add to Cart */}
          <div className="flex items-center gap-2">
            <div className="w-28">
              <select
                value={selectedQty}
                onChange={(e) => setSelectedQty(Number(e.target.value))}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-2 py-2 text-xs font-bold text-slate-800 outline-none focus:border-red-500 cursor-pointer"
                title="Select Quantity (Single book eligible for 25% discount)"
              >
                <option value={1}>1 copy (25% OFF)</option>
                <option value={2}>2 copies (30% OFF)</option>
                <option value={5}>5 copies (30% OFF)</option>
                <option value={10}>10 copies (30% OFF)</option>
                <option value={15}>15 copies (35% OFF)</option>
                <option value={25}>25 copies (35% OFF)</option>
                <option value={50}>50 copies (35% OFF)</option>
                <option value={100}>100 copies (40% OFF)</option>
              </select>
            </div>

            <button
              onClick={handleAdd}
              id={`add-to-quote-${book.id}`}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : isInInquiry
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added!
                </>
              ) : isInInquiry ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  In Cart ({selectedQty})
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Dual Action: Direct Purchase via Razorpay OR Inquire on WhatsApp */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => onDirectBuy ? onDirectBuy(book, selectedQty) : handleAdd()}
              id={`direct-buy-razorpay-${book.id}`}
              className="py-1.5 px-2 rounded-xl text-[11px] font-bold text-white bg-slate-900 hover:bg-red-600 transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
              title="Direct purchase via Razorpay / COD"
            >
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>⚡ Buy Now</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppBookInquire}
              id={`whatsapp-inquire-${book.id}`}
              className="py-1.5 px-2 rounded-xl text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1 cursor-pointer truncate"
            >
              <MessageSquare className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
