/**
 * Discount calculation utility for Book.com Lucknow:
 * - Single book (1 copy): 25% discount
 * - 2 to 10 books: 30% discount
 * - 11 to 50 books (user specified 10-50): 35% discount
 * - Beyond 50 books (> 50 copies): 40% discount
 */

export interface DiscountSlabInfo {
  discountPercent: number;
  label: string;
  nextTierHint?: string;
  badgeColor: string;
}

export function getDiscountForQuantity(totalQuantity: number): DiscountSlabInfo {
  if (totalQuantity <= 1) {
    return {
      discountPercent: 25,
      label: 'Student Single Book Offer (25% OFF)',
      nextTierHint: 'Buy 2 or more books to unlock 30% discount!',
      badgeColor: 'bg-emerald-600 text-white',
    };
  } else if (totalQuantity <= 10) {
    return {
      discountPercent: 30,
      label: 'Student / Group Discount (30% OFF)',
      nextTierHint: 'Add more than 10 books to unlock 35% discount!',
      badgeColor: 'bg-teal-600 text-white',
    };
  } else if (totalQuantity <= 50) {
    return {
      discountPercent: 35,
      label: 'Bulk Student / Coaching Discount (35% OFF)',
      nextTierHint: 'Order more than 50 books to unlock 40% wholesale discount!',
      badgeColor: 'bg-indigo-600 text-white',
    };
  } else {
    return {
      discountPercent: 40,
      label: 'Super Wholesale / Institutional Discount (40% OFF)',
      badgeColor: 'bg-purple-600 text-white',
    };
  }
}

/**
 * Calculates item pricing based on order total quantity or specific item quantity
 */
export function calculateItemDiscountedPrice(mrp: number, discountPercent: number): number {
  return Math.round(mrp * (1 - discountPercent / 100));
}
