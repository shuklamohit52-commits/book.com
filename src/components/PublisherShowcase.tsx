import React from 'react';
import { PUBLISHERS_DATA } from '../data/categoriesData';
import { BookOpen, Percent, ArrowRight, ShieldCheck } from 'lucide-react';

interface PublisherShowcaseProps {
  onSelectPublisher: (publisherName: string) => void;
}

export const PublisherShowcase: React.FC<PublisherShowcaseProps> = ({
  onSelectPublisher,
}) => {
  return (
    <section id="publishers-association-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            Authorized Direct Distribution
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Major Publishers & Trade Margin Range
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-md">
          Direct wholesale procurement from top competitive exam publications with full replacement guarantee and original holograms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PUBLISHERS_DATA.map((pub) => (
          <div
            key={pub.id}
            onClick={() => onSelectPublisher(pub.filterKey || pub.name.split(' ')[0])}
            className="group bg-white rounded-2xl p-4 border border-slate-200 hover:border-red-500 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Top Code Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg shadow-2xs ${pub.badgeColor}`}>
                  {pub.code}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Active Stock
                </span>
              </div>

              {/* Publisher Title */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                {pub.name}
              </h3>

              {/* Specialty */}
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {pub.specialty}
              </p>

              {/* Popular Titles preview */}
              <div className="mt-3 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Fast Moving:
                </p>
                <div className="flex flex-wrap gap-1">
                  {pub.popularTitles.map((title, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Margin & Filter CTA */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="font-bold text-emerald-700 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5" />
                <span className="text-[11px]">{pub.discountRange.split(' ')[0]} OFF</span>
              </div>
              <span className="text-red-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                View Titles <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
