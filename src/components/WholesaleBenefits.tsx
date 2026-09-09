import React from 'react';
import { WHOLESALE_SLABS, BUSINESS_INFO } from '../data/businessInfo';
import { 
  Truck, 
  ReceiptText, 
  ShieldCheck, 
  PackageCheck, 
  Clock, 
  Percent,
  Layers,
  PhoneCall,
  CheckCircle2,
  Building2
} from 'lucide-react';

interface WholesaleBenefitsProps {
  onOpenCustomListModal: () => void;
  onOpenVisitingCard: () => void;
}

export const WholesaleBenefits: React.FC<WholesaleBenefitsProps> = ({
  onOpenCustomListModal,
  onOpenVisitingCard,
}) => {
  return (
    <section id="wholesale-benefits-section" className="space-y-8">
      {/* Slabs Grid */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Wholesale Trade Margin Structure
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif">
            Direct Distributor Discounts for Retailers & Institutes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Transparent pricing based on your purchase volume. Mix and match titles across UPSC, UP Police, SSC, Railways, Teaching, and NCERTs in a single dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHOLESALE_SLABS.map((slab, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 border flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] ${
                idx === 1
                  ? 'bg-gradient-to-b from-red-950/80 to-slate-900 border-red-500/60 shadow-xl ring-2 ring-red-500/30'
                  : 'bg-slate-900/60 border-slate-700/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wide">
                    {slab.slab}
                  </span>
                  {idx === 1 && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="text-2xl sm:text-3xl font-black text-white my-2">
                  {slab.discount}
                </div>

                <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 mb-4">
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Order Size: {slab.qty}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {slab.benefit}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">Dispatch:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Within 24-48 Hrs
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner Inside Box */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Bulk Purchase for Coaching Institute or Library?</h4>
              <p className="text-xs text-slate-400">Get customized quotes on institution letterheads with GST invoice</p>
            </div>
          </div>

          <button
            onClick={onOpenCustomListModal}
            className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-lg"
          >
            Submit Institute Requirements
          </button>
        </div>
      </div>

      {/* 4 Pillars of Distributor Reliability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">UP & Pan-India Transport</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Same-day packing & Bilti booking via trusted transport networks across all districts of UP, Bihar, MP & Delhi.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ReceiptText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">100% GST ITC Invoicing</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            GSTIN: <span className="font-mono font-semibold text-slate-800">{BUSINESS_INFO.gstin}</span>. Claim complete Input Tax Credit on your commercial book purchases.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Original Publisher Stock</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Guaranteed genuine books with original publisher holograms. Zero pirated or outdated print runs.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Single Hub Convenience</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No need to deal with 20 different publishers. Get Lucent, YCT, Ghatna Chakra, Kiran & NCERT in one unified shipment.
          </p>
        </div>
      </div>
    </section>
  );
};
