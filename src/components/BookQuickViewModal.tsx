import React, { useState } from 'react';
import { Book } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getDiscountForQuantity, calculateItemDiscountedPrice } from '../services/discountService';
import { 
  X, 
  Plus, 
  Check, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  FileText, 
  BookOpen, 
  Sparkles,
  Zap,
  GraduationCap
} from 'lucide-react';

interface BookQuickViewModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToInquiry: (book: Book, qty: number) => void;
  onDirectBuy?: (book: Book, qty: number) => void;
}

export const BookQuickViewModal: React.FC<BookQuickViewModalProps> = ({
  book,
  onClose,
  onAddToInquiry,
  onDirectBuy,
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  if (!book) return null;

  const discountInfo = getDiscountForQuantity(selectedQty);
  const unitRate = calculateItemDiscountedPrice(book.mrp, discountInfo.discountPercent);
  const totalAmount = unitRate * selectedQty;

  const handleAdd = () => {
    onAddToInquiry(book, selectedQty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  const handleWhatsApp = () => {
    const text = `Hello Vikash ji (Book.com Lucknow), I want to inquire/order:\n\n*Book:* ${book.title}\n*Publisher:* ${book.publisher}\n*Quantity:* ${selectedQty} ${selectedQty === 1 ? 'copy (Single student)' : 'copies'}\n*MRP:* ₹${book.mrp}\n*Discount:* ${discountInfo.discountPercent}% OFF\n*Rate:* ₹${unitRate}/pc\n*Total:* ₹${totalAmount}\n\nPlease share delivery options to my location.`;
    window.open(`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-4 sm:px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
              {book.publisher}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-300">
              {book.edition}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            {/* Book Cover Frame */}
            <div className="sm:col-span-5 flex flex-col items-center">
              <div 
                className="w-44 h-64 rounded-r-lg rounded-l-xs shadow-2xl bg-slate-900 overflow-hidden relative border-y border-r border-slate-300"
                style={{
                  boxShadow: '8px 12px 28px -4px rgba(0, 0, 0, 0.4), inset 3px 0 5px rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10 pointer-events-none border-r border-white/10" />
                
                {!imageError ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full p-4 text-white flex flex-col justify-between"
                    style={{
                      background: `linear-gradient(135deg, ${book.accentColor}, #0f172a)`
                    }}
                  >
                    <div>
                      <p className="text-[10px] font-bold text-amber-300">{book.publisher}</p>
                      <h3 className="text-sm font-black mt-2 font-serif">{book.title}</h3>
                    </div>
                    <p className="text-[10px]">{book.edition}</p>
                  </div>
                )}
              </div>

              {/* Student Discount Tag */}
              <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Students: Single Book 25% OFF</span>
              </div>
            </div>

            {/* Book Details */}
            <div className="sm:col-span-7 space-y-3">
              <div>
                <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                  {book.categoryName}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1 leading-snug">
                  {book.title}
                </h3>
                {book.hindiTitle && (
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    {book.hindiTitle}
                  </p>
                )}
                <p className="text-xs text-slate-500 mt-1">
                  By <span className="font-semibold text-slate-700">{book.author}</span>
                </p>
              </div>

              {/* Discount slabs explanation box */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Catalog MRP:</span>
                  <span className="text-sm line-through text-slate-400 font-mono">₹{book.mrp}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Your Applied Discount:
                  </span>
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded ${discountInfo.badgeColor}`}>
                    {discountInfo.discountPercent}% OFF
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1 border-t border-slate-200">
                  <span className="text-xs font-extrabold text-slate-900">Final Price ({selectedQty} {selectedQty === 1 ? 'copy' : 'copies'}):</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-red-600 font-mono">₹{totalAmount}</span>
                    <span className="text-[11px] text-slate-400 block font-normal">(₹{unitRate}/unit)</span>
                  </div>
                </div>

                {/* Slabs hint */}
                <div className="text-[10px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200 space-y-0.5">
                  <p className="font-bold text-slate-700">Student & Bulk Slab Benefits:</p>
                  <p>• 1 Book: <strong>25% OFF</strong> | 2-10 Books: <strong>30% OFF</strong></p>
                  <p>• 11-50 Books: <strong>35% OFF</strong> | 50+ Books: <strong>40% OFF</strong></p>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-1.5 pt-1">
                {book.keyFeatures.map((f, i) => (
                  <p key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-32">
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Select Quantity:</label>
              <select
                value={selectedQty}
                onChange={(e) => setSelectedQty(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-2 py-2 text-xs font-bold text-slate-800 outline-none focus:border-red-500 cursor-pointer"
              >
                <option value={1}>1 copy (25% OFF)</option>
                <option value={2}>2 copies (30% OFF)</option>
                <option value={5}>5 copies (30% OFF)</option>
                <option value={10}>10 copies (30% OFF)</option>
                <option value={20}>20 copies (35% OFF)</option>
                <option value={50}>50 copies (35% OFF)</option>
                <option value={100}>100 copies (40% OFF)</option>
              </select>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                added ? 'bg-emerald-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add to Cart ({selectedQty} {selectedQty === 1 ? 'copy' : 'copies'})
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                if (onDirectBuy) {
                  onDirectBuy(book, selectedQty);
                  onClose();
                } else {
                  handleAdd();
                }
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>⚡ Buy Now (Razorpay / COD)</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
