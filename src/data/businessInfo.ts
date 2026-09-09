import { BusinessDetails } from '../types';

export const BUSINESS_INFO: BusinessDetails = {
  brandName: 'Book.com',
  subTitle: 'Educational Books Supplier & Competitive Exams Books Wholesale Distributor',
  ownerName: 'Vikash Agrawal',
  designation: 'Branch Head / Proprietor',
  address: '173/21A, Dr. B.N. Verma Road, Aminabad',
  landmark: 'Near Kaiserbagh Bus Stand',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  pincode: '226018',
  email: 'agbook.com@gmail.com',
  phones: ['9369532755', '9415281234'],
  whatsapp: '9369532755',
  gstin: '09ADTPA1819R1ZW',
  aadhaar: '326695655537',
  pan: 'ADTPA1819R',
  workingHours: 'Monday - Saturday: 10:30 AM to 8:30 PM (Sunday Open for Bulk Transports)',
};

export const WHOLESALE_SLABS = [
  {
    slab: 'Small Bulk / Starter Order',
    qty: '10 - 49 Copies',
    discount: '30% - 38% OFF MRP',
    benefit: 'Fast Courier / Local Transport, Mixed titles allowed',
  },
  {
    slab: 'Commercial Retail Order',
    qty: '50 - 199 Copies',
    discount: '40% - 48% OFF MRP',
    benefit: 'Bundled Box Packing, Direct Transport Bilti / LR dispatched same day',
  },
  {
    slab: 'Institutional & Super Wholesale',
    qty: '200+ Copies / Bulk Cartons',
    discount: '50% - 58%+ OFF MRP',
    benefit: 'Maximum publisher trade discounts, Free transport freight concessions & credit invoice with GST ITC',
  },
];

export const TOP_ANNOUNCEMENTS = [
  {
    id: '1',
    text: '🔥 2025-2026 Latest Editions for UP Police, SSC CGL/CHSL, Railways & UPSC available in ready bulk stock!',
    highlight: 'Latest Stock 2025-26',
    type: 'urgent' as const,
  },
  {
    id: '2',
    text: '📦 Direct Wholesale Dispatches from Aminabad, Lucknow to all districts of Uttar Pradesh, Bihar, MP & Delhi-NCR.',
    highlight: 'Pan-India Logistics',
    type: 'dispatch' as const,
  },
  {
    id: '3',
    text: '💰 Special Margin Schemes for Coaching Institutes, Bookstores, School Libraries & College Counters!',
    highlight: 'Max Trade Margin',
    type: 'offer' as const,
  },
  {
    id: '4',
    text: '📞 Direct Bulk Order Booking via WhatsApp: +91 9369532755 | Phone: +91 9415281234',
    highlight: 'Instant WhatsApp Booking',
    type: 'info' as const,
  },
  {
    id: '5',
    text: '📑 100% Genuine Publisher Stock with Original Holograms & GST Input Tax Credit (ITC) Billing.',
    highlight: 'Verified GST Bill',
    type: 'urgent' as const,
  },
];
