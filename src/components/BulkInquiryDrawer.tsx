import React, { useState } from 'react';
import { InquiryItem, BuyerDetails, RazorpayPaymentSuccess } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { initiateRazorpayPayment } from '../services/razorpay';
import { getDiscountForQuantity, calculateItemDiscountedPrice } from '../services/discountService';
import { AddressForm } from './AddressForm';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  ShoppingBag, 
  Sparkles, 
  CreditCard, 
  Lock, 
  Loader2, 
  AlertCircle,
  Truck,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

interface BulkInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onUpdateQty: (bookId: string, newQty: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearAll: () => void;
  onPaymentSuccess?: (paymentData: RazorpayPaymentSuccess) => void;
}

export const BulkInquiryDrawer: React.FC<BulkInquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearAll,
  onPaymentSuccess,
}) => {
  const [buyerInfo, setBuyerInfo] = useState<BuyerDetails>({
    name: '',
    phone: '',
    email: '',
    houseNo: '',
    streetAddress: '',
    landmark: '',
    pincode: '',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    institutionName: '',
    businessName: '',
    buyerRole: 'Student',
    businessType: 'Student (Single / Multi Copy)',
    paymentMethod: 'razorpay',
    deliveryRequirement: 'Immediate (1-3 Days)',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [formValidationWarning, setFormValidationWarning] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate totals and tiered discount
  const totalCopies = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalMrp = items.reduce((sum, item) => sum + item.book.mrp * item.quantity, 0);
  
  // Calculate discount based on total copies
  const discountSlab = getDiscountForQuantity(totalCopies);
  const discountPercent = discountSlab.discountPercent;

  const totalDiscountedAmount = items.reduce((sum, item) => {
    const unitPrice = calculateItemDiscountedPrice(item.book.mrp, discountPercent);
    return sum + unitPrice * item.quantity;
  }, 0);

  const totalSavings = totalMrp - totalDiscountedAmount;

  // Validate address before payment or COD
  const validateForm = (): boolean => {
    setFormValidationWarning(null);
    setPaymentError(null);

    if (!buyerInfo.name.trim()) {
      setFormValidationWarning('Please enter your Name.');
      return false;
    }
    const cleanPhone = buyerInfo.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormValidationWarning('Please enter a valid 10-digit Mobile / WhatsApp Number.');
      return false;
    }
    if (!buyerInfo.houseNo.trim()) {
      setFormValidationWarning('Please enter House No. / Flat / Building / Room Number.');
      return false;
    }
    if (!buyerInfo.streetAddress.trim()) {
      setFormValidationWarning('Please enter Road / Street / Colony Name.');
      return false;
    }
    const cleanPin = buyerInfo.pincode.replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      setFormValidationWarning('Please enter a valid 6-digit PIN Code.');
      return false;
    }
    if (!buyerInfo.city.trim() || !buyerInfo.state.trim()) {
      setFormValidationWarning('Please enter or verify your City and State.');
      return false;
    }
    return true;
  };

  // Generate detailed WhatsApp Order Message (including full address and all order items)
  const generateOrderWhatsAppMessage = (mode: 'online_paid' | 'cod' | 'inquiry', paymentId?: string, orderId?: string) => {
    let title = '📦 *NEW BOOK ORDER - BOOK.COM LUCKNOW*';
    if (mode === 'online_paid') {
      title = '✅ *PAID ONLINE ORDER CONFIRMATION - BOOK.COM LUCKNOW*';
    } else if (mode === 'cod') {
      title = '🚚 *CASH ON DELIVERY (COD) ORDER - BOOK.COM LUCKNOW*';
    }

    let msg = `${title}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    if (mode === 'online_paid') {
      msg += `*Payment Mode:* Paid Online via Razorpay\n`;
      msg += `*Razorpay Payment ID:* ${paymentId || 'N/A'}\n`;
      msg += `*Razorpay Order ID:* ${orderId || 'N/A'}\n`;
      msg += `*Payment Status:* SUCCESS\n`;
    } else if (mode === 'cod') {
      msg += `*Payment Mode:* Cash on Delivery (COD)\n`;
      msg += `*Payment Status:* To be paid upon delivery to courier\n`;
    } else {
      msg += `*Inquiry Type:* Price & Transport Quotation\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *CUSTOMER & CONTACT DETAILS:*\n`;
    msg += `• Name: *${buyerInfo.name}*\n`;
    msg += `• Mobile / WhatsApp: *${buyerInfo.phone}*\n`;
    if (buyerInfo.email) msg += `• Email: ${buyerInfo.email}\n`;
    if (buyerInfo.institutionName || buyerInfo.businessName) {
      msg += `• School / Coaching / Institute: *${buyerInfo.institutionName || buyerInfo.businessName}*\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📍 *FULL DELIVERY ADDRESS:*\n`;
    msg += `• House / Flat No: ${buyerInfo.houseNo}\n`;
    msg += `• Road / Street: ${buyerInfo.streetAddress}\n`;
    if (buyerInfo.landmark) msg += `• Landmark: ${buyerInfo.landmark}\n`;
    msg += `• PIN Code: *${buyerInfo.pincode}*\n`;
    msg += `• City / District: *${buyerInfo.city}*\n`;
    msg += `• State: *${buyerInfo.state}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📚 *ORDERED TITLES (${items.length} titles, ${totalCopies} total copies):*\n\n`;

    items.forEach((item, idx) => {
      const unitRate = calculateItemDiscountedPrice(item.book.mrp, discountPercent);
      const subtotal = unitRate * item.quantity;
      msg += `${idx + 1}. *${item.book.title}*\n`;
      msg += `   • Publisher: ${item.book.publisher}\n`;
      msg += `   • Qty: *${item.quantity} ${item.quantity === 1 ? 'copy' : 'copies'}* @ ₹${unitRate}/pc (MRP ₹${item.book.mrp})\n`;
      msg += `   • Subtotal: ₹${subtotal.toLocaleString()}\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Total MRP:* ₹${totalMrp.toLocaleString()}\n`;
    msg += `*Discount Applied:* *${discountPercent}% OFF* (${discountSlab.label})\n`;
    msg += `*Total Savings:* ₹${totalSavings.toLocaleString()}\n`;
    msg += `*Final Payable Amount:* *₹${totalDiscountedAmount.toLocaleString()}*\n`;
    if (buyerInfo.notes) {
      msg += `*Special Instruction:* ${buyerInfo.notes}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm order packaging and tracking slip from Aminabad, Lucknow warehouse.`;

    return msg;
  };

  // Online Razorpay Payment handler
  const handleOnlinePayment = async () => {
    if (!validateForm()) return;

    if (totalDiscountedAmount < 1) {
      setPaymentError('Minimum order amount must be at least ₹1.');
      return;
    }

    setIsProcessingPayment(true);

    try {
      await initiateRazorpayPayment({
        amountInRupees: totalDiscountedAmount,
        items,
        buyerInfo: {
          ...buyerInfo,
          paymentMethod: 'razorpay',
        },
        onSuccess: (paymentData) => {
          setIsProcessingPayment(false);
          const fullPaymentData: RazorpayPaymentSuccess = {
            ...paymentData,
            amount: totalDiscountedAmount,
            buyerInfo: { ...buyerInfo, paymentMethod: 'razorpay' },
            paymentMethod: 'razorpay',
          };

          // Send WhatsApp details automatically to owner + customer
          const waMessage = generateOrderWhatsAppMessage('online_paid', paymentData.payment_id, paymentData.order_id);
          const url = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}`;
          window.open(url, '_blank');

          onClearAll();
          onClose();
          if (onPaymentSuccess) {
            onPaymentSuccess(fullPaymentData);
          }
        },
        onError: (errMessage) => {
          setIsProcessingPayment(false);
          setPaymentError(errMessage);
        },
        onDismiss: () => {
          setIsProcessingPayment(false);
        },
      });
    } catch (err: any) {
      setIsProcessingPayment(false);
      setPaymentError(err.message || 'Payment initiation failed.');
    }
  };

  // Cash on Delivery (COD) handler
  const handleCashOnDelivery = () => {
    if (!validateForm()) return;

    const codPaymentData: RazorpayPaymentSuccess = {
      order_id: `COD_${Date.now()}`,
      payment_id: `COD_PENDING_${Date.now().toString().slice(-6)}`,
      amount: totalDiscountedAmount,
      items: [...items],
      buyerInfo: {
        ...buyerInfo,
        paymentMethod: 'cod',
      },
      timestamp: new Date().toISOString(),
      paymentMethod: 'cod',
    };

    // Open WhatsApp with all order details and full address
    const waMessage = generateOrderWhatsAppMessage('cod', codPaymentData.payment_id, codPaymentData.order_id);
    const url = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}`;
    window.open(url, '_blank');

    onClearAll();
    onClose();
    if (onPaymentSuccess) {
      onPaymentSuccess(codPaymentData);
    }
  };

  // General WhatsApp Inquiry
  const handleSendWhatsAppInquiry = () => {
    if (!buyerInfo.name || !buyerInfo.phone) {
      setFormValidationWarning('Please provide at least your Name and Phone Number to inquire on WhatsApp.');
      return;
    }
    const message = generateOrderWhatsAppMessage('inquiry');
    const url = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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
              <h2 className="text-base sm:text-lg font-bold">Shopping Cart & Checkout</h2>
              <p className="text-xs text-slate-400">
                {items.length} titles • {totalCopies} {totalCopies === 1 ? 'copy' : 'copies'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Clear all books"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
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
              <h3 className="text-base font-bold text-slate-800">Your Cart is Empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Students get 25% discount on even a single book purchase! Add any competitive book to place your order.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Browse Books Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Discount Slab Highlight Banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-3.5 rounded-2xl shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-200" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      {discountSlab.label}
                    </span>
                  </div>
                  <span className="bg-white text-emerald-800 font-mono font-black text-xs px-2 py-0.5 rounded-full">
                    {discountPercent}% OFF APPLIED
                  </span>
                </div>
                {discountSlab.nextTierHint && (
                  <p className="text-[11px] text-emerald-100">
                    💡 {discountSlab.nextTierHint}
                  </p>
                )}
              </div>

              {/* Selected Books List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <span>Cart Items ({items.length})</span>
                  <span>Quantity & Price</span>
                </div>

                <div className="space-y-2.5">
                  {items.map((item) => {
                    const unitPrice = calculateItemDiscountedPrice(item.book.mrp, discountPercent);
                    const subtotal = unitPrice * item.quantity;

                    return (
                      <div
                        key={item.book.id}
                        className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-12 h-16 rounded bg-slate-800 flex-shrink-0 overflow-hidden shadow-xs border border-slate-300 relative">
                            <img
                              src={item.book.coverImage}
                              alt={item.book.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-red-600 block uppercase">
                              {item.book.publisher}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                              {item.book.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="text-slate-400 line-through">MRP ₹{item.book.mrp}</span>
                              <span className="font-bold text-emerald-700">₹{unitPrice}/pc</span>
                              <span className="text-emerald-700 font-semibold">({discountPercent}% OFF)</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls & Delete */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => onUpdateQty(item.book.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-mono font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQty(item.book.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right min-w-[70px]">
                            <span className="text-xs font-extrabold text-slate-900 font-mono block">
                              ₹{subtotal.toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.book.id)}
                            className="text-slate-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                            title="Remove book"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Total Catalog MRP ({totalCopies} {totalCopies === 1 ? 'copy' : 'copies'}):</span>
                  <span className="font-mono line-through">₹{totalMrp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-700 font-bold">
                  <span>Student / Bulk Discount ({discountPercent}% OFF):</span>
                  <span className="font-mono">- ₹{totalSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900">
                  <div>
                    <span className="text-sm font-black">Total Payable Amount:</span>
                    <p className="text-[10px] text-slate-500">GST Invoice included • Direct dispatch</p>
                  </div>
                  <span className="text-2xl font-black text-red-600 font-mono">
                    ₹{totalDiscountedAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Comprehensive Full Address Form with Auto Pincode Lookup */}
              <AddressForm
                buyerInfo={buyerInfo}
                onChange={setBuyerInfo}
                isStudent={totalCopies < 5}
              />

              {/* Payment Method Selector (Razorpay vs Cash on Delivery) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-red-600" />
                  <span>Select Payment Method</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Razorpay Online */}
                  <label
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'razorpay'
                        ? 'border-red-600 bg-red-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment_mode"
                          checked={paymentMethod === 'razorpay'}
                          onChange={() => setPaymentMethod('razorpay')}
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-xs font-extrabold text-slate-900">
                          Pay Online (Razorpay)
                        </span>
                      </div>
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                        Fastest Dispatch
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5">
                      UPI (Google Pay, PhonePe, Paytm), Credit/Debit Card & NetBanking.
                    </p>
                  </label>

                  {/* Option 2: Cash on Delivery (COD) */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment_mode"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-xs font-extrabold text-slate-900">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        COD Available
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5">
                      Pay cash to courier when book parcel arrives at your doorstep.
                    </p>
                  </label>
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs">
                  Special Delivery Instructions / Landmark details:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please call before delivery, or deliver after 2 PM..."
                  value={buyerInfo.notes || ''}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white resize-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer CTA */}
        {items.length > 0 && (
          <div className="bg-slate-900 p-4 border-t border-slate-800 space-y-2.5">
            {/* Form Validation Warning */}
            {formValidationWarning && (
              <div className="bg-amber-500/20 border border-amber-500/50 rounded-xl p-2.5 text-xs text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{formValidationWarning}</span>
              </div>
            )}

            {/* Payment Gateway Error Alert */}
            {paymentError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-2.5 text-xs text-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{paymentError}</span>
              </div>
            )}

            {/* Main Action Button depending on Selected Payment Method */}
            {paymentMethod === 'razorpay' ? (
              <button
                onClick={handleOnlinePayment}
                disabled={isProcessingPayment}
                id="drawer-razorpay-direct-pay-btn"
                className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-98 text-white font-black py-3 px-4 rounded-xl shadow-xl transition-all flex flex-col items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group border border-red-500/30"
              >
                <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold">
                  {isProcessingPayment ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <CreditCard className="w-5 h-5 text-yellow-300" />
                  )}
                  <span>
                    {isProcessingPayment
                      ? 'Opening Razorpay Gateway...'
                      : `Pay ₹${totalDiscountedAmount.toLocaleString()} Online via Razorpay`}
                  </span>
                </div>
                <span className="text-[11px] font-normal text-red-100/90 flex items-center gap-1.5 mt-0.5">
                  <Lock className="w-3 h-3 text-red-200" />
                  <span>Full address & receipt automatically sent to WhatsApp (+91 {BUSINESS_INFO.whatsapp})</span>
                </span>
              </button>
            ) : (
              <button
                onClick={handleCashOnDelivery}
                id="drawer-cod-order-btn"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 active:scale-98 text-white font-black py-3 px-4 rounded-xl shadow-xl transition-all flex flex-col items-center justify-center cursor-pointer group border border-emerald-500/30"
              >
                <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold">
                  <Truck className="w-5 h-5 text-yellow-300" />
                  <span>Place Cash on Delivery (COD) Order • ₹{totalDiscountedAmount.toLocaleString()}</span>
                </div>
                <span className="text-[11px] font-normal text-emerald-100 flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-200" />
                  <span>Order & Full Address will be instantly sent to WhatsApp</span>
                </span>
              </button>
            )}

            {/* Option to inquire / discuss on WhatsApp */}
            <button
              onClick={handleSendWhatsAppInquiry}
              id="drawer-send-whatsapp-inquiry-btn"
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer border border-slate-700"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Or Inquire / Negotiate on WhatsApp (+91 {BUSINESS_INFO.whatsapp})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
