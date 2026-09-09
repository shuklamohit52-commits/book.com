import React, { useState, useMemo, useEffect } from 'react';
import { BOOKS_CATALOG } from './data/booksData';
import { CATEGORIES_DATA } from './data/categoriesData';
import { BUSINESS_INFO } from './data/businessInfo';
import { Book, ExamCategory, InquiryItem } from './types';

// Components
import { TickerBanner } from './components/TickerBanner';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryFilter } from './components/CategoryFilter';
import { BookCard } from './components/BookCard';
import { BookQuickViewModal } from './components/BookQuickViewModal';
import { BulkInquiryDrawer } from './components/BulkInquiryDrawer';
import { CustomListInquiryModal } from './components/CustomListInquiryModal';
import { VisitingCardModal } from './components/VisitingCardModal';
import { PublisherShowcase } from './components/PublisherShowcase';
import { WholesaleBenefits } from './components/WholesaleBenefits';
import { Footer } from './components/Footer';

// Icons
import { 
  Search, 
  BookOpen, 
  ShoppingBag, 
  FileSpreadsheet, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Filter, 
  Sparkles,
  Award
} from 'lucide-react';

export default function App() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');
  const [onlyBestsellers, setOnlyBestsellers] = useState<boolean>(false);
  const [onlyNewReleases, setOnlyNewReleases] = useState<boolean>(false);

  // Modals & Drawers States
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);
  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState<boolean>(false);
  const [isCustomListModalOpen, setIsCustomListModalOpen] = useState<boolean>(false);
  const [isVisitingCardModalOpen, setIsVisitingCardModalOpen] = useState<boolean>(false);

  // Bulk Inquiry Cart (with localStorage persistence)
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('book_com_inquiry_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    // Default initial starter items for instant showcase
    return [
      { book: BOOKS_CATALOG[0], quantity: 20 },
      { book: BOOKS_CATALOG[2], quantity: 5 },
    ];
  });

  // Persist inquiry items
  useEffect(() => {
    try {
      localStorage.setItem('book_com_inquiry_cart', JSON.stringify(inquiryItems));
    } catch {
      // ignore
    }
  }, [inquiryItems]);

  // Extract unique publisher names
  const publishersList = useMemo(() => {
    const set = new Set<string>();
    BOOKS_CATALOG.forEach((b) => set.add(b.publisher));
    return Array.from(set).sort();
  }, []);

  // Filter books logic
  const filteredBooks = useMemo(() => {
    return BOOKS_CATALOG.filter((book) => {
      // Category filter
      if (selectedCategory !== 'all' && book.category !== selectedCategory) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== 'all' && book.language !== selectedLanguage) {
        return false;
      }

      // Publisher filter
      if (selectedPublisher !== 'all') {
        const pFilter = selectedPublisher.toLowerCase();
        const pBook = book.publisher.toLowerCase();
        if (!pBook.includes(pFilter) && !pFilter.includes(pBook)) {
          return false;
        }
      }

      // Bestseller filter
      if (onlyBestsellers && !book.bestseller) {
        return false;
      }

      // New release filter
      if (onlyNewReleases && !book.isNewRelease) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchHindi = book.hindiTitle?.toLowerCase().includes(q) || false;
        const matchAuthor = book.author.toLowerCase().includes(q);
        const matchPublisher = book.publisher.toLowerCase().includes(q);
        const matchCategory = book.categoryName.toLowerCase().includes(q);
        const matchDesc = book.description.toLowerCase().includes(q);
        const matchFeatures = book.keyFeatures.some((f) => f.toLowerCase().includes(q));

        if (
          !matchTitle &&
          !matchHindi &&
          !matchAuthor &&
          !matchPublisher &&
          !matchCategory &&
          !matchDesc &&
          !matchFeatures
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    selectedCategory,
    selectedLanguage,
    selectedPublisher,
    onlyBestsellers,
    onlyNewReleases,
    searchQuery,
  ]);

  // Inquiry Cart Handlers
  const handleAddToInquiry = (book: Book, qty: number) => {
    setInquiryItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { book, quantity: qty }];
    });
  };

  const handleUpdateQty = (bookId: string, newQty: number) => {
    setInquiryItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const handleRemoveItem = (bookId: string) => {
    setInquiryItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const handleClearAll = () => {
    setInquiryItems([]);
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedLanguage('all');
    setSelectedPublisher('all');
    setOnlyBestsellers(false);
    setOnlyNewReleases(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Top Moving Ticker Banner */}
      <TickerBanner onQuickInquire={() => setIsInquiryDrawerOpen(true)} />

      {/* 2. Main Sticky Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        inquiryCount={inquiryItems.length}
        onOpenInquiryDrawer={() => setIsInquiryDrawerOpen(true)}
        onOpenCustomListModal={() => setIsCustomListModalOpen(true)}
        onOpenVisitingCard={() => setIsVisitingCardModalOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. Hero Carousel Banner & Quick Stats */}
      <HeroCarousel
        onOpenCustomListModal={() => setIsCustomListModalOpen(true)}
        onOpenVisitingCard={() => setIsVisitingCardModalOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-books-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInquiryDrawer={() => setIsInquiryDrawerOpen(true)}
      />

      {/* 4. Main Catalog Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" id="catalog-books-section">
        {/* Category Selector & Quick Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          selectedPublisher={selectedPublisher}
          onSelectPublisher={setSelectedPublisher}
          publishersList={publishersList}
          totalBooksCount={BOOKS_CATALOG.length}
          onlyBestsellers={onlyBestsellers}
          onToggleBestsellers={() => setOnlyBestsellers(!onlyBestsellers)}
          onlyNewReleases={onlyNewReleases}
          onToggleNewReleases={() => setOnlyNewReleases(!onlyNewReleases)}
          resetAllFilters={resetAllFilters}
        />

        {/* Books Grid */}
        <section id="books-grid-showcase" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>Books Showcase Catalog</span>
                <span className="text-sm font-semibold text-slate-500">
                  ({filteredBooks.length} titles)
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Bulk ordering & trade margin catalog. Add items to quote list for WhatsApp quotation.
              </p>
            </div>

            {/* Quick action: upload custom list */}
            <button
              onClick={() => setIsCustomListModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Can't find a title? Upload Custom List</span>
            </button>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                No matching competitive books found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try clearing your search or filter criteria, or send your specific syllabus/book list directly to Vikash Agrawal on WhatsApp.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={resetAllFilters}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => setIsCustomListModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Submit Custom List
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredBooks.map((book) => {
                const isInInquiry = inquiryItems.some((item) => item.book.id === book.id);
                return (
                  <BookCard
                    key={book.id}
                    book={book}
                    isInInquiry={isInInquiry}
                    onAddToInquiry={handleAddToInquiry}
                    onQuickView={(b) => setQuickViewBook(b)}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* 5. Wholesale Slabs & Benefits Section */}
        <WholesaleBenefits
          onOpenCustomListModal={() => setIsCustomListModalOpen(true)}
          onOpenVisitingCard={() => setIsVisitingCardModalOpen(true)}
        />

        {/* 6. Publishers Showcase Section */}
        <PublisherShowcase
          onSelectPublisher={(pub) => {
            setSelectedPublisher(pub);
            const el = document.getElementById('catalog-books-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 7. Aminabad Trade Hub & Vikash Agrawal Message Section */}
        <section id="owner-profile-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                <Award className="w-4 h-4" />
                Message from Branch Head & Proprietor
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
                "Empowering Educational Booksellers & Coaching Institutes Across Uttar Pradesh & India"
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Welcome to <strong>Book.com</strong>. Located at the heart of Aminabad, Lucknow's historic wholesale book market, we specialize in complete distribution networks for competitive exam publications. Whether you are running a retail bookstore in Gorakhpur, Varanasi, Prayagraj, Kanpur, Meerut or managing coaching study material in Delhi, we assure 100% genuine editions, maximum publisher discounts, and reliable transport dispatch.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center">
                    VA
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{BUSINESS_INFO.ownerName}</h3>
                    <p className="text-slate-400 text-[11px]">{BUSINESS_INFO.designation}, Book.com</p>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-200 hidden sm:block" />

                <div className="text-slate-600">
                  <span className="font-semibold text-slate-900">Aminabad Hub: </span>
                  {BUSINESS_INFO.address}, Lucknow
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-900 text-white rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Direct Trade Inquiry
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Speak directly with Vikash Agrawal for dealership margin negotiations, library tender quotes, or school bulk orders.
              </p>
              <div className="space-y-2 pt-1">
                <a
                  href={`tel:${BUSINESS_INFO.phones[0]}`}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Call: +91 {BUSINESS_INFO.phones[0]}
                </a>
                <button
                  onClick={() => setIsVisitingCardModalOpen(true)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  View Visiting Card & GST
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Comprehensive Footer with Verified Registrations & Map */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenVisitingCard={() => setIsVisitingCardModalOpen(true)}
        onOpenCustomListModal={() => setIsCustomListModalOpen(true)}
      />

      {/* Modals & Slide-out Drawers */}
      <BookQuickViewModal
        book={quickViewBook}
        onClose={() => setQuickViewBook(null)}
        onAddToInquiry={handleAddToInquiry}
      />

      <BulkInquiryDrawer
        isOpen={isInquiryDrawerOpen}
        onClose={() => setIsInquiryDrawerOpen(false)}
        items={inquiryItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
      />

      <CustomListInquiryModal
        isOpen={isCustomListModalOpen}
        onClose={() => setIsCustomListModalOpen(false)}
      />

      <VisitingCardModal
        isOpen={isVisitingCardModalOpen}
        onClose={() => setIsVisitingCardModalOpen(false)}
      />
    </div>
  );
}
