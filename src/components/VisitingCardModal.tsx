import React from 'react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { BrandLogo } from './BrandLogo';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2,
  Share2,
  Building2
} from 'lucide-react';

interface VisitingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisitingCardModal: React.FC<VisitingCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Book.com - Vikash Agrawal (Lucknow)',
        text: `Book.com - Educational & Competitive Books Wholesale Supplier\nOwner: Vikash Agrawal\nAddress: 173/21, Dr. B.N. Verma Road, Aminabad, Lucknow-226018\nMobile: 9369532755, 9415281234\nGST: 09ADTPA1819R1ZW`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`Book.com - Vikash Agrawal\nPhone: 9369532755\nAddress: 173/21, Dr. B.N. Verma Road, Aminabad, Lucknow\nGST: 09ADTPA1819R1ZW`);
      alert('Business details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold">Official Business Card & Credentials</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Visiting Card Graphical Layout */}
          <div
            id="printable-visiting-card"
            className="relative bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-300 shadow-xl overflow-hidden transition-all"
            style={{
              backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(229, 46, 45, 0.08) 0%, transparent 60%), radial-gradient(circle at 0% 100%, rgba(44, 43, 130, 0.08) 0%, transparent 60%)'
            }}
          >
            {/* Top Red & Indigo Swoosh accents matching original card */}
            <div className="absolute top-0 left-0 w-36 h-12 bg-gradient-to-r from-red-600 to-transparent -rotate-12 transform -translate-x-12 -translate-y-6 opacity-30 pointer-events-none rounded-full" />
            <div className="absolute bottom-0 right-0 w-44 h-14 bg-gradient-to-l from-red-600 via-indigo-900 to-transparent rotate-12 transform translate-x-14 translate-y-6 opacity-30 pointer-events-none rounded-full" />

            {/* Header of Visiting Card */}
            <div className="flex items-start justify-between gap-4 pb-2">
              <div>
                <span className="inline-block bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Wholesale Books Hub
                </span>
              </div>

              {/* Right Owner & Designation */}
              <div className="text-right">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif">
                  Vikash Agrawal
                </h3>
                <p className="text-xs font-bold text-red-600 mt-0.5">
                  (Branch Head / Owner)
                </p>
              </div>
            </div>

            {/* Center Brand Logo & Title */}
            <div className="text-center my-3 py-3 border-y border-slate-100/80 flex flex-col items-center justify-center">
              <BrandLogo size="lg" showSubtitle={true} />
              <p className="text-xs font-bold text-slate-700 tracking-wide mt-2">
                Competitive Examinations & Educational Books Supplier
              </p>
            </div>

            {/* Contact Details Grid on Card */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              {/* Phones */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600 border border-red-200">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">
                    <a href={`tel:${BUSINESS_INFO.phones[1]}`} className="hover:text-red-600">
                      +91 {BUSINESS_INFO.phones[1]}
                    </a>
                    {' , '}
                    <a href={`tel:${BUSINESS_INFO.phones[0]}`} className="hover:text-red-600">
                      +91 {BUSINESS_INFO.phones[0]}
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-400">Calling & WhatsApp Support</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600 border border-red-200">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="font-bold text-slate-900 hover:text-red-600">
                    {BUSINESS_INFO.email}
                  </a>
                  <p className="text-[11px] text-slate-400">Official Wholesale Inquiries</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600 border border-red-200">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    Sales Office: 173/21, Dr. B.N. Verma Road, Aminabad,
                  </p>
                  <p className="text-slate-600 text-xs">
                    (Near Kaiserbagh Bus Stand) Lucknow - 226018, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>

            {/* Official Legal Registrations Strip */}
            <div className="mt-5 pt-3 border-t border-dashed border-slate-300 grid grid-cols-3 gap-2 text-[10px] text-center font-mono">
              <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                <span className="text-slate-400 block">GSTIN</span>
                <span className="font-bold text-slate-900">{BUSINESS_INFO.gstin}</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                <span className="text-slate-400 block">PAN CARD</span>
                <span className="font-bold text-slate-900">{BUSINESS_INFO.pan}</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                <span className="text-slate-400 block">AADHAAR</span>
                <span className="font-bold text-slate-900">{BUSINESS_INFO.aadhaar}</span>
              </div>
            </div>
          </div>

          {/* Card Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              Print Business Card
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4" />
              Share / Copy Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
