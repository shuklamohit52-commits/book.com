import React from 'react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ExamCategory } from '../types';
import { 
  Layers, 
  Landmark, 
  Briefcase, 
  Building2, 
  Train, 
  Award, 
  GraduationCap, 
  Atom, 
  Shield, 
  BookOpenCheck, 
  Baby, 
  Globe,
  SlidersHorizontal,
  Flame,
  Sparkles
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: ExamCategory;
  onSelectCategory: (cat: ExamCategory) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  selectedPublisher: string;
  onSelectPublisher: (pub: string) => void;
  publishersList: string[];
  totalBooksCount: number;
  onlyBestsellers: boolean;
  onToggleBestsellers: () => void;
  onlyNewReleases: boolean;
  onToggleNewReleases: () => void;
  resetAllFilters: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedLanguage,
  onSelectLanguage,
  selectedPublisher,
  onSelectPublisher,
  publishersList,
  totalBooksCount,
  onlyBestsellers,
  onToggleBestsellers,
  onlyNewReleases,
  onToggleNewReleases,
  resetAllFilters,
}) => {
  // Mapping of category icon names
  const renderCategoryIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-4 h-4 ${isSelected ? 'text-white' : 'text-red-600'}`;
    switch (iconName) {
      case 'Layers': return <Layers className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Train': return <Train className={className} />;
      case 'Award': return <Award className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Atom': return <Atom className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'BookOpenCheck': return <BookOpenCheck className={className} />;
      case 'Baby': return <Baby className={className} />;
      case 'Globe': return <Globe className={className} />;
      default: return <Layers className={className} />;
    }
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedLanguage !== 'all' || selectedPublisher !== 'all' || onlyBestsellers || onlyNewReleases;

  return (
    <div id="category-filter-section" className="space-y-4">
      {/* Primary Horizontal Category Carousel / Chips */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Exam & Book Categories</span>
            </h2>
            <span className="text-xs bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
              {totalBooksCount} Titles Available
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-semibold text-red-600 hover:text-red-700 underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Scrollable Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                id={`category-btn-${cat.id}`}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20 ring-2 ring-red-600/50'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs hover:border-slate-300'
                }`}
              >
                {renderCategoryIcon(cat.icon, isSelected)}
                <div className="text-left">
                  <div>{cat.name}</div>
                  <div className={`text-[10px] font-normal ${isSelected ? 'text-red-100' : 'text-slate-500'}`}>
                    {cat.hindiName}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Quick Filter Bar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Quick Highlights */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-600 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            Quick Filter:
          </span>

          <button
            onClick={onToggleBestsellers}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              onlyBestsellers
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            Fastest Moving Bestsellers
          </button>

          <button
            onClick={onToggleNewReleases}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              onlyNewReleases
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            2025-26 New Editions
          </button>
        </div>

        {/* Right: Language and Publisher Dropdown */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="language-select" className="text-slate-500 font-medium">Medium:</label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => onSelectLanguage(e.target.value)}
              className="bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-semibold outline-none focus:border-red-500 text-xs cursor-pointer"
            >
              <option value="all">All Languages</option>
              <option value="Hindi">Hindi Medium (हिंदी)</option>
              <option value="English">English Medium</option>
              <option value="Bilingual (Hindi/Eng)">Bilingual (द्विभाषी)</option>
            </select>
          </div>

          {/* Publisher Selector */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="publisher-select" className="text-slate-500 font-medium">Publisher:</label>
            <select
              id="publisher-select"
              value={selectedPublisher}
              onChange={(e) => onSelectPublisher(e.target.value)}
              className="bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-semibold outline-none focus:border-red-500 text-xs cursor-pointer max-w-[160px]"
            >
              <option value="all">All Publishers</option>
              {publishersList.map((pub) => (
                <option key={pub} value={pub}>
                  {pub}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
