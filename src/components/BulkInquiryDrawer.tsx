import React, { useState } from 'react';
import { InquiryItem, BuyerDetails } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  Mail, 
  Printer, 
  Building, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  ShoppingBag, 
  CheckCircle, 
  Percent,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BulkInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onUpdateQty: (bookId: string, newQty: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearAll: () => void;
}

export const BulkInquiryDrawer: React.FC<BulkInquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearAll,
}) => {
  const [buyerInfo, setBuyerInfo] = useState<BuyerDetails>({
    name: '',
    businessName: '',
    businessType: 'Retail Bookstore',
    phone: '',
    email: '',
    city: '',
    state: 'Uttar Pradesh',
    deliveryRequirement: 'Immediate (1-3 Days)',
    notes: '',
  });

  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!isOpen) return null;

  // Calculate totals
  const totalCopies = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalMrp = items.reduce((sum, item) => sum + item.book.mrp * item.quantity, 0);
  const estimatedWholesaleCost = items.reduce((sum, item) => {
    const unitRate = item.book.wholesaleEstimatedPrice || Math.round(item.book.mrp * (1 - item.book.wholesaleDiscountPercent / 100));
    return sum + unitRate * item.quantity;
  }, 0);
  const estimatedSavings = totalMrp - estimatedWholesaleCost;

  // Format WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = `*BULK BOOK QUOTATION INQUIRY - BOOK.COM LUCKNOW*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Buyer / Store:* ${buyerInfo.businessName || 'Not specified'}\n`;
    msg += `*Contact Person:* ${buyerInfo.name || 'Not specified'}\n`;
    msg += `*Phone / WhatsApp:* ${buyerInfo.phone || 'Not specified'}\n`;
    msg += `*City & State:* ${buyerInfo.city || 'Not specified'}, ${buyerInfo.state}\n`;
    msg += `*Business Type:* ${buyerInfo.businessType}\n`;
    if (buyerInfo.deliveryRequirement) {
      msg += `*Required Timeline:* ${buyerInfo.deliveryRequirement}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*REQUESTED TITLES (${items.length} titles, ${totalCopies} total copies):*\n\n`;

    items.forEach((item, idx) => {
      const approxRate = item.book.wholesaleEstimatedPrice || Math.round(item.book.mrp * (1 - item.book.wholesaleDiscountPercent / 100));
      msg += `${idx + 1}. *${item.book.title}*\n`;
      msg += `   • Publisher: ${item.book.publisher}\n`;
      msg += `   • Qty: *${item.quantity} copies* | MRP: ₹${item.book.mrp} (Trade Margin ~${item.book.wholesaleDiscountPercent}%)\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Total Catalog MRP:* ₹${totalMrp.toLocaleString()}\n`;
    msg += `*Approx. Wholesale Amount:* ₹${estimatedWholesaleCost.toLocaleString()}\n`;
    if (buyerInfo.notes) {
      msg += `*Special Note / Transport Request:* ${buyerInfo.notes}\n`;
    }
    msg += `\nPlease send final invoice quote with transport details to Lucknow / ${buyerInfo.city || 'my city'}.`;

    return msg;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerInfo.name || !buyerInfo.phone) {
      alert('Please enter your Name and Mobile Number to generate the quotation inquiry.');
      return;
    }
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmittedMessage(true);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Bulk Books Quotation Inquiry - ${buyerInfo.businessName || buyerInfo.name} (${buyerInfo.city})`);
    const body = encodeURIComponent(generateWhatsAppMessage());
    window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Bulk Quotation Inquiry</h2>
              <p className="text-xs text-slate-400">
                {items.length} titles selected • {totalCopies} total copies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Clear all books"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Your Quotation Cart is Empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Browse our competitive exams & educational books catalog and click "Add to Bulk Quote" to build your wholesale order list.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Browse Catalog Books
              </button>
            </div>
          ) : (
            <>
              {/* Selected Books List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <span>Selected Books ({items.length})</span>
                  <span>Quantity & Margin</span>
                </div>

                <div className="space-y-2.5">
                  {items.map((item) => {
                    const unitWholesale = item.book.wholesaleEstimatedPrice || Math.round(item.book.mrp * (1 - item.book.wholesaleDiscountPercent / 100));
                    return (
                      <div
                        key={item.book.id}
                        className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className="w-11 h-15 rounded bg-slate-800 flex-shrink-0 overflow-hidden shadow-xs border border-slate-300 relative"
                          >
                            <img
                              src={item.book.coverImage}
                              alt={item.book.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div
                              className="absolute inset-0 flex items-center justify-center text-white text-[8px] font-bold p-1 text-center"
                              style={{ background: item.book.accentColor, zIndex: -1 }}
                            >
                              {item.book.publisher.substring(0, 8)}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                              {item.book.title}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {item.book.publisher} • {item.book.language}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-[11px]">
                              <span className="text-slate-400 line-through">MRP ₹{item.book.mrp}</span>
                              <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded text-[10px]">
                                ~{item.book.wholesaleDiscountPercent}% OFF
                              </span>
                              <span className="font-semibold text-slate-800">
                                Unit ~₹{unitWholesale}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Counter & Remove */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.book.id, Math.max(item.book.minOrderQty, item.quantity - 5))}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                              title="Decrease copies"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min={item.book.minOrderQty}
                              step={5}
                              value={item.quantity}
                              onChange={(e) => onUpdateQty(item.book.id, Math.max(1, Number(e.target.value)))}
                              className="w-12 text-center text-xs font-bold text-slate-800 outline-none border-x border-slate-200 py-1"
                            />
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.book.id, item.quantity + 5)}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                              title="Increase copies"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right min-w-[70px]">
                            <div className="text-xs font-bold text-slate-900">
                              ₹{(unitWholesale * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {item.quantity} copies
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.book.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Estimate Summary Box */}
              <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-4 border border-red-200/80 space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Total Catalog MRP Value:</span>
                  <span className="font-semibold text-slate-800">₹{totalMrp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-800 font-semibold">
                  <span>Estimated Trade Profit / Discount:</span>
                  <span>-₹{estimatedSavings.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-red-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-extrabold text-slate-900">
                      Approx. Wholesale Net Total:
                    </span>
                    <p className="text-[10px] text-slate-500">
                      Final invoice may have extra transport/volume concessions
                    </p>
                  </div>
                  <span className="text-xl font-black text-red-700 font-mono">
                    ₹{estimatedWholesaleCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Buyer Contact Form for Direct WhatsApp / Email Booking */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-red-600" />
                  Your Business & Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={buyerInfo.name}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Bookstore / Coaching / School Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Saraswati Pustak Bhandar"
                      value={buyerInfo.businessName}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, businessName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={buyerInfo.phone}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      City / District & State *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gorakhpur, UP"
                      value={buyerInfo.city}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Business Type
                    </label>
                    <select
                      value={buyerInfo.businessType}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, businessType: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Retail Bookstore">Retail Bookstore (किताब विक्रेता)</option>
                      <option value="Coaching Institute">Coaching Institute / Library</option>
                      <option value="School / College Library">School / College Library</option>
                      <option value="Distributor / Reseller">Distributor / Regional Reseller</option>
                      <option value="Student Group / Bulk Buyer">Student Group / Bulk Buyer</option>
                      <option value="Other">Other Institutional Buyer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Delivery Requirement
                    </label>
                    <select
                      value={buyerInfo.deliveryRequirement}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, deliveryRequirement: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Immediate (1-3 Days)">Immediate Dispatch (1-3 Days)</option>
                      <option value="Within 1 Week">Within 1 Week</option>
                      <option value="General Quote Enquiry">Only Quotation & Price Check</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs">
                    Special Note / Any specific publisher requirement:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please quote transport charges for Kanpur, or include 2025 editions only..."
                    value={buyerInfo.notes}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, notes: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer CTA */}
        {items.length > 0 && (
          <div className="bg-slate-900 p-4 border-t border-slate-800 space-y-2.5">
            <button
              onClick={handleSendWhatsApp}
              id="drawer-send-whatsapp-inquiry-btn"
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Quotation to Vikash Agrawal on WhatsApp (+91 {BUSINESS_INFO.whatsapp})</span>
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={handleSendEmail}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <span>Email Quotation</span>
              </button>

              <button
                type="button"
                onClick={handlePrintSlip}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print Quotation Slip</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
