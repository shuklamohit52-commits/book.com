import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { 
  X, 
  FileSpreadsheet, 
  MessageSquare, 
  Send, 
  Building, 
  Phone, 
  MapPin, 
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

interface CustomListInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomListInquiryModal: React.FC<CustomListInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [storeName, setStoreName] = useState('');
  const [contactName, setContactName] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [bookListText, setBookListText] = useState('');

  if (!isOpen) return null;

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !mobile || !bookListText) {
      alert('Please fill your Name, Mobile Number and Book list requirement.');
      return;
    }

    let text = `*CUSTOM BULK BOOKS QUOTATION REQUEST - BOOK.COM LUCKNOW*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Store / Institute:* ${storeName || 'Individual / Bulk Order'}\n`;
    text += `*Contact Person:* ${contactName}\n`;
    text += `*Mobile / WhatsApp:* ${mobile}\n`;
    text += `*Destination City:* ${city || 'Lucknow / UP'}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*MY REQUIRED BOOK LIST / SYLLABUS:*\n\n${bookListText}\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Kindly provide availability, maximum publisher discount, and dispatch bilti timeline.`;

    const url = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Send Your Custom Book List</h2>
              <p className="text-xs text-slate-400">
                Paste typed list, exam syllabus, or handwritten quantities
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitWhatsApp} className="p-5 space-y-4">
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              Quick 30-Minute Wholesale Quotation Response!
            </p>
            <p className="text-amber-800 leading-relaxed">
              Managing 50+ publishers directly from Aminabad, Lucknow. Paste your required titles, coaching study material needs, or school book list below for the best trade rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikash / Ramesh"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Store / Coaching Name
              </label>
              <input
                type="text"
                placeholder="e.g. Pioneer Academy / Gupta Books"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                WhatsApp Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9369532755"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                City / District (for transport) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lucknow / Kanpur / Varanasi"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Type or Paste Required Books, Publishers & Quantities *
            </label>
            <textarea
              required
              rows={5}
              placeholder={`Example:
1. Lucent GK Hindi - 25 copies
2. Ghatna Chakra Purvavlokan History & Polity - 10 sets
3. Kiran SSC Maths 11800+ - 20 copies
4. UP Police Constable YCT Solved Papers - 50 copies
5. Class 6-12 NCERT History Hindi - 5 sets`}
              value={bookListText}
              onChange={(e) => setBookListText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Send Book List to Vikash Agrawal on WhatsApp (+91 {BUSINESS_INFO.whatsapp})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
