import React, { useState, useEffect } from 'react';
import { BuyerDetails } from '../types';
import { lookupPincode } from '../services/pincodeService';
import { MapPin, Building, User, Phone, Mail, Home, Navigation, Loader2, CheckCircle2 } from 'lucide-react';

interface AddressFormProps {
  buyerInfo: BuyerDetails;
  onChange: (updated: BuyerDetails) => void;
  isStudent?: boolean;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  buyerInfo,
  onChange,
  isStudent = false,
}) => {
  const [isLookingUpPin, setIsLookingUpPin] = useState(false);
  const [pinSuccessMsg, setPinSuccessMsg] = useState<string | null>(null);

  const handlePincodeChange = async (pinVal: string) => {
    const clean = pinVal.replace(/\D/g, '').slice(0, 6);
    onChange({ ...buyerInfo, pincode: clean });

    if (clean.length === 6) {
      setIsLookingUpPin(true);
      setPinSuccessMsg(null);
      const res = await lookupPincode(clean);
      setIsLookingUpPin(false);
      if (res && res.city && res.state) {
        onChange({
          ...buyerInfo,
          pincode: clean,
          city: res.city,
          state: res.state,
        });
        setPinSuccessMsg(`Auto-detected: ${res.city}, ${res.state}`);
      }
    } else {
      setPinSuccessMsg(null);
    }
  };

  return (
    <div className="space-y-3.5 bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-red-600" />
          <span>Full Delivery Address & Contact Details</span>
        </h4>
        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
          Required for Dispatch
        </span>
      </div>

      {/* Row 1: Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Recipient / Student Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={buyerInfo.name}
              onChange={(e) => onChange({ ...buyerInfo, name: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Mobile / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210 (10 digits)"
              value={buyerInfo.phone}
              onChange={(e) => onChange({ ...buyerInfo, phone: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Optional Coaching / Institute Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            School / Coaching / Institute / Bookstore <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="e.g. Target IAS Academy / DPS / Self Student"
              value={buyerInfo.institutionName || buyerInfo.businessName || ''}
              onChange={(e) =>
                onChange({
                  ...buyerInfo,
                  institutionName: e.target.value,
                  businessName: e.target.value,
                })
              }
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Email ID <span className="text-slate-400 font-normal">(For order receipt)</span>
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              placeholder="e.g. student@gmail.com"
              value={buyerInfo.email || ''}
              onChange={(e) => onChange({ ...buyerInfo, email: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Row 3: House / Flat / Room Number & Street Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Flat / House No. / Building / Room No. <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Home className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              required
              placeholder="e.g. House No. 42-B, 2nd Floor, Room 10"
              value={buyerInfo.houseNo}
              onChange={(e) => onChange({ ...buyerInfo, houseNo: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Road / Street / Colony / Area Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Navigation className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              required
              placeholder="e.g. Aliganj Main Road, Sector B"
              value={buyerInfo.streetAddress}
              onChange={(e) => onChange({ ...buyerInfo, streetAddress: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Row 4: Landmark and PIN Code (with Auto City & State resolution) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Famous Landmark <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Near Shiv Mandir / Metro Pillar 42"
            value={buyerInfo.landmark || ''}
            onChange={(e) => onChange({ ...buyerInfo, landmark: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-bold text-slate-700">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] text-emerald-700 font-semibold">Auto-fills City & State</span>
          </div>
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              required
              placeholder="e.g. 226018"
              value={buyerInfo.pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            {isLookingUpPin && (
              <Loader2 className="w-3.5 h-3.5 text-red-600 animate-spin absolute right-3 top-2.5" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              City / Dist <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="City"
              value={buyerInfo.city}
              onChange={(e) => onChange({ ...buyerInfo, city: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="State"
              value={buyerInfo.state}
              onChange={(e) => onChange({ ...buyerInfo, state: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-medium"
            />
          </div>
        </div>
      </div>

      {pinSuccessMsg && (
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span>{pinSuccessMsg}</span>
        </div>
      )}
    </div>
  );
};
