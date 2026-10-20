export type ExamCategory =
  | 'all'
  | 'upsc-civil-services'
  | 'ssc-cgl-chsl'
  | 'banking-ibps-sbi'
  | 'railways-rrb'
  | 'up-state-exams'
  | 'teaching-tet-ctet'
  | 'engineering-polytechnic'
  | 'neet-jee-science'
  | 'defence-nda-cds'
  | 'ncert-school'
  | 'children-books'
  | 'gk-current-affairs';

export interface Book {
  id: string;
  title: string;
  hindiTitle?: string;
  author: string;
  publisher: string;
  publisherLogo?: string;
  category: ExamCategory;
  categoryName: string;
  mrp: number;
  wholesaleDiscountPercent: number; // e.g. 40% wholesale margin
  wholesaleEstimatedPrice?: number;
  minOrderQty: number; // e.g. 5 or 10 copies for wholesale
  language: 'Hindi' | 'English' | 'Bilingual (Hindi/Eng)';
  edition: string; // e.g. "2025-2026 Edition"
  isbn?: string;
  pages?: number;
  binding?: 'Paperback' | 'Hardcover' | 'Spiral / Booklet';
  description: string;
  keyFeatures: string[];
  inStock: boolean;
  bestseller?: boolean;
  isNewRelease?: boolean;
  coverImage: string;
  coverGradient: string;
  accentColor: string;
}

export interface CategoryInfo {
  id: ExamCategory;
  name: string;
  hindiName: string;
  icon: string;
  description: string;
  badgeCount?: number;
}

export interface PublisherInfo {
  id: string;
  name: string;
  code: string;
  established?: string;
  specialty: string;
  discountRange: string;
  popularTitles: string[];
  badgeColor: string;
  filterKey?: string;
}

export interface InquiryItem {
  book: Book;
  quantity: number;
}

export interface BuyerDetails {
  name: string;
  phone: string;
  email?: string;
  // Full delivery address
  houseNo: string; // House / Flat / Shop / Room No
  streetAddress: string; // Road / Street / Colony Name
  landmark?: string; // Landmark
  pincode: string; // 6-digit PIN code
  city: string; // Auto-filled via PIN code or manual
  state: string; // Auto-filled via PIN code or manual
  // Optional Institute / Bookstore
  institutionName?: string; // Optional coaching, school, bookstore or institute name
  businessName?: string; // Backwards compatible
  buyerRole?: 'Student' | 'Retail Bookstore' | 'Coaching Institute' | 'School / College Library' | 'Distributor / Reseller' | 'Other';
  businessType?: 'Student (Single / Multi Copy)' | 'Retail Bookstore' | 'Coaching Institute' | 'School / College Library' | 'Distributor / Reseller' | 'Student Group / Bulk Buyer' | 'Other';
  paymentMethod?: 'razorpay' | 'cod';
  deliveryRequirement?: 'Immediate (1-3 Days)' | 'Within 1 Week' | 'General Quote Enquiry';
  notes?: string;
}

export interface Announcement {
  id: string;
  text: string;
  highlight?: string;
  type: 'urgent' | 'offer' | 'info' | 'dispatch';
}

export interface BusinessDetails {
  brandName: string;
  subTitle: string;
  ownerName: string;
  designation: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  phones: string[];
  whatsapp: string;
  gstin: string;
  aadhaar: string;
  pan: string;
  workingHours: string;
}

export interface RazorpayPaymentSuccess {
  order_id: string;
  payment_id: string;
  signature?: string;
  amount: number; // in Rupees
  items: InquiryItem[];
  buyerInfo: BuyerDetails;
  timestamp: string;
  paymentMethod?: 'razorpay' | 'cod';
}


