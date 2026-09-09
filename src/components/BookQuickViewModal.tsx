import React, { useState } from 'react';
import { Book } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { 
  X, 
  BookOpen, 
  Check, 
  MessageSquare, 
  Plus, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Percent, 
  Layers
} from 'lucide-react';

interface BookQuickViewModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToInquiry: (book: Book, qty: number) => void;
}

export const BookQuickViewModal: React.FC<BookQuickViewModalProps> = ({
  book,
  onClose,
  onAddToInquiry,
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(book?.minOrderQty || 10);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!book) return null;

  const handleAdd = () => {
    onAddToInquiry(book, selectedQty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsApp = () => {
    const text = `Hello Vikash ji (Book.com Lucknow),\n\nI need bulk pricing for:\n*Title:* ${book.title}\n*Publisher:* ${book.publisher}\n*Quantity:* ${selectedQty} copies\n*MRP:* ₹${book.mrp}\n\nPlease quote best wholesale rate and shipping details.`;
    window.open(`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const approxWholesaleRate = book.wholesaleEstimatedPrice || Math.round(book.mrp * (1 - book.wholesaleDiscountPercent / 100));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-full p-2 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Real Book Cover & Specs */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-100 to-slate-200 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            {/* Realistic 3D Cover */}
            <div
              className="w-44 h-64 rounded-r-lg rounded-l-xs shadow-2xl flex flex-col justify-between relative overflow-hidden bg-slate-900 border-r border-y border-slate-300/40"
              style={{
                boxShadow: '10px 16px 30px rgba(0, 0, 0, 0.35), inset 3px 0 5px rgba(255, 255, 255, 0.25)',
              }}
            >
              {/* Spine 3D Lighting Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10 pointer-events-none border-r border-white/10" />

              {!imageError ? (
                <div className="relative w-full h-full flex flex-col justify-between bg-slate-800">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent p-3 pt-8 text-white z-5">
                    <p className="text-[10px] font-black uppercase text-amber-400 truncate tracking-wide">
                      {book.publisher}
                    </p>
                    <p className="text-xs font-bold line-clamp-2 leading-tight drop-shadow-md">
                      {book.title}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="w-full h-full p-4 flex flex-col justify-between text-white relative"
                  style={{
                    background: `linear-gradient(135deg, ${book.accentColor}, #0f172a)`
                  }}
                >
                  <div className="pl-2 flex items-center justify-between text-[10px] font-extrabold uppercase opacity-90">
                    <span>{book.publisher}</span>
                    <BookOpen className="w-4 h-4 opacity-80" />
                  </div>
                  <div className="pl-2 my-auto">
                    <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                      {book.categoryName}
                    </div>
                    <h3 className="text-sm font-black mt-1 leading-snug drop-shadow-xs font-serif">
                      {book.title}
                    </h3>
                  </div>
                  <div className="pl-2 border-t border-white/20 pt-2 flex items-center justify-between text-[9px] font-bold opacity-85">
                    <span>{book.edition}</span>
                    <span>{book.language}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Specs Under Cover */}
            <div className="mt-5 w-full bg-white rounded-xl p-3 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Publisher:</span>
                <span className="font-bold text-slate-800">{book.publisher}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Language:</span>
                <span className="font-semibold text-slate-800">{book.language}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Binding:</span>
                <span className="font-semibold text-slate-800">{book.binding || 'Paperback'}</span>
              </div>
              {book.pages && (
                <div className="flex justify-between text-slate-500">
                  <span>Page Count:</span>
                  <span className="font-semibold text-slate-800">{book.pages} pages</span>
                </div>
              )}
              {book.isbn && (
                <div className="flex justify-between text-slate-500">
                  <span>ISBN / Code:</span>
                  <span className="font-mono text-slate-800">{book.isbn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Wholesale Pricing & Commercial Terms */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                <span>{book.categoryName}</span>
                <span>•</span>
                <span>{book.edition}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {book.title}
              </h2>

              {book.hindiTitle && (
                <p className="text-sm font-medium text-slate-600 mt-1">
                  {book.hindiTitle}
                </p>
              )}

              <p className="text-xs text-slate-400 mt-1">
                Authored / Compiled by: <span className="text-slate-700 font-semibold">{book.author}</span>
              </p>

              {/* Pricing Cards */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Printed MRP</span>
                  <span className="text-lg font-bold text-slate-900">₹{book.mrp}</span>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-emerald-800 font-bold">Trade Discount</span>
                    <span className="bg-emerald-200 text-emerald-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                      {book.wholesaleDiscountPercent}% OFF
                    </span>
                  </div>
                  <span className="text-lg font-black text-emerald-800 font-mono">
                    ₹{approxWholesaleRate}
                    <span className="text-xs font-normal text-emerald-600"> /pc</span>
                  </span>
                </div>
              </div>

              {/* Description & Key Points */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Book Highlights & Exam Relevance:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {book.description}
                </p>

                <ul className="space-y-1 pt-1">
                  {book.keyFeatures.map((feat, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Distributor Badges */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Original Publisher Copy
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Dispatches in 24 Hrs from Lucknow
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  GST Invoice Included
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-200 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Order Qty:</label>
                  <input
                    type="number"
                    min={book.minOrderQty}
                    step={5}
                    value={selectedQty}
                    onChange={(e) => setSelectedQty(Math.max(book.minOrderQty, Number(e.target.value)))}
                    className="w-20 bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-center text-slate-900 outline-none focus:border-red-500"
                  />
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Quotation List!
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add to Quotation ({selectedQty} copies)
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                Ask Vikash Agrawal on WhatsApp (+91 {BUSINESS_INFO.whatsapp})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
