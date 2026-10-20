import React from 'react';
import { RazorpayPaymentSuccess } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { 
  CheckCircle, 
  X, 
  Printer, 
  MessageSquare, 
  ShieldCheck, 
  Copy, 
  Check, 
  Truck,
  User, 
  MapPin, 
  Clock,
  Building
} from 'lucide-react';

interface PaymentSuccessModalProps {
  paymentData: RazorpayPaymentSuccess | null;
  onClose: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  paymentData,
  onClose,
}) => {
  const [copiedId, setCopiedId] = React.useState(false);

  if (!paymentData) return null;

  const totalCopies = paymentData.items.reduce((acc, it) => acc + it.quantity, 0);
  const isCod = paymentData.paymentMethod === 'cod';

  const copyPaymentId = () => {
    navigator.clipboard.writeText(paymentData.payment_id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleWhatsAppReceipt = () => {
    let msg = isCod
      ? `*CASH ON DELIVERY (COD) ORDER CONFIRMATION - BOOK.COM LUCKNOW*\n`
      : `*PAID ONLINE ORDER CONFIRMATION - BOOK.COM LUCKNOW*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Order Status:* ${isCod ? 'Cash on Delivery (Pending Courier Payment)' : 'Paid Online (Razorpay Verified)'}\n`;
    if (!isCod) {
      msg += `*Razorpay Payment ID:* ${paymentData.payment_id}\n`;
      msg += `*Razorpay Order ID:* ${paymentData.order_id}\n`;
    }
    msg += `*Total Order Value:* ₹${paymentData.amount.toLocaleString()}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Customer Details:*\n`;
    msg += `• Name: ${paymentData.buyerInfo.name}\n`;
    msg += `• Mobile / WhatsApp: ${paymentData.buyerInfo.phone}\n`;
    if (paymentData.buyerInfo.institutionName || paymentData.buyerInfo.businessName) {
      msg += `• School / Coaching / Institute: ${paymentData.buyerInfo.institutionName || paymentData.buyerInfo.businessName}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Delivery Address:*\n`;
    msg += `• House / Flat No: ${paymentData.buyerInfo.houseNo}\n`;
    msg += `• Street / Colony: ${paymentData.buyerInfo.streetAddress}\n`;
    if (paymentData.buyerInfo.landmark) {
      msg += `• Landmark: ${paymentData.buyerInfo.landmark}\n`;
    }
    msg += `• PIN Code: ${paymentData.buyerInfo.pincode}\n`;
    msg += `• City / State: ${paymentData.buyerInfo.city}, ${paymentData.buyerInfo.state}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*TITLES ORDERED (${paymentData.items.length} titles, ${totalCopies} total copies):*\n\n`;

    paymentData.items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.book.title}*\n`;
      msg += `   • Publisher: ${item.book.publisher}\n`;
      msg += `   • Qty: ${item.quantity} ${item.quantity === 1 ? 'copy' : 'copies'} (MRP ₹${item.book.mrp})\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm warehouse parcel packaging and courier tracking consignment slip.`;

    const url = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[92vh]">
        {/* Header with celebration banner */}
        <div className={`p-6 text-white relative overflow-hidden flex-shrink-0 ${
          isCod 
            ? 'bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700' 
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
        }`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full p-2 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-lg">
              {isCod ? <Truck className="w-8 h-8 text-teal-600" /> : <CheckCircle className="w-8 h-8 text-emerald-600" />}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
                {isCod ? (
                  <>
                    <Truck className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Cash on Delivery (COD) Order Placed</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Payment Verified via Razorpay</span>
                  </>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {isCod ? 'Order Placed Successfully!' : 'Online Payment Confirmed!'}
              </h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                Full address dispatched to Book.com Aminabad, Lucknow warehouse
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Metadata Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">
                {isCod ? 'Payment Mode' : 'Payment ID (Razorpay)'}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-mono font-bold text-slate-800 truncate max-w-[150px]">
                  {isCod ? 'Cash on Delivery (COD)' : paymentData.payment_id}
                </span>
                {!isCod && (
                  <button
                    onClick={copyPaymentId}
                    title="Copy Payment ID"
                    className="text-slate-400 hover:text-emerald-600 p-1 cursor-pointer"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Order Reference</span>
              <span className="font-mono font-bold text-slate-800 block truncate mt-0.5">
                {paymentData.order_id}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Order Total</span>
              <span className="text-base font-black text-emerald-700 font-mono block mt-0.5">
                ₹{paymentData.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Complete Delivery Address Section */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Delivery Address & Consignee Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 pt-1">
              <div>
                <span className="text-slate-400">Recipient Name:</span>{' '}
                <strong className="text-slate-900">{paymentData.buyerInfo.name}</strong>
              </div>
              <div>
                <span className="text-slate-400">Mobile / WhatsApp:</span>{' '}
                <strong className="text-slate-900">+91 {paymentData.buyerInfo.phone}</strong>
              </div>
              {(paymentData.buyerInfo.institutionName || paymentData.buyerInfo.businessName) && (
                <div className="sm:col-span-2">
                  <span className="text-slate-400">Institute / School:</span>{' '}
                  <strong className="text-slate-900">
                    {paymentData.buyerInfo.institutionName || paymentData.buyerInfo.businessName}
                  </strong>
                </div>
              )}
              <div className="sm:col-span-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Shipping Address:</span>
                <p className="text-slate-800 font-medium mt-0.5">
                  {paymentData.buyerInfo.houseNo}, {paymentData.buyerInfo.streetAddress}
                  {paymentData.buyerInfo.landmark ? `, Landmark: ${paymentData.buyerInfo.landmark}` : ''}
                </p>
                <p className="text-slate-800 font-bold mt-0.5">
                  {paymentData.buyerInfo.city}, {paymentData.buyerInfo.state} - PIN {paymentData.buyerInfo.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Books Ordered Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Items in Order ({paymentData.items.length} titles • {totalCopies} copies)</span>
              <span>Quantity</span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
              {paymentData.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-3 text-xs hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-11 rounded bg-slate-800 flex-shrink-0 overflow-hidden shadow-2xs">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 line-clamp-1 max-w-[280px]">
                        {item.book.title}
                      </h5>
                      <p className="text-[11px] text-slate-400">
                        {item.book.publisher} • MRP ₹{item.book.mrp}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 font-bold font-mono text-slate-900">
                    {item.quantity} {item.quantity === 1 ? 'copy' : 'copies'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warehouse Dispatch Note */}
          <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Order Confirmed at Aminabad, Lucknow Warehouse</p>
              <p className="text-amber-800 text-[11px] mt-0.5">
                We pack in heavy protective parcel wrapping and dispatch via India Post / DTDC / Speed Post / Direct Transport. Share your receipt on WhatsApp to receive the tracking consignment number.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleWhatsAppReceipt}
            id="whatsapp-confirm-order-btn"
            className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Order & Full Address to WhatsApp (+91 {BUSINESS_INFO.whatsapp})</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              type="button"
              className="flex-1 sm:flex-initial bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white py-3 px-5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
