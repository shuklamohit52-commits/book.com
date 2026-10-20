/**
 * Pincode lookup helper for Indian Postal codes.
 * Queries postalpincode.in API with fallback and caching.
 */

interface PincodeLookupResult {
  city: string;
  state: string;
  district?: string;
  areaNames?: string[];
}

const pincodeCache: Record<string, PincodeLookupResult> = {};

export async function lookupPincode(pincode: string): Promise<PincodeLookupResult | null> {
  const cleanPin = pincode.trim().replace(/\D/g, '');
  if (cleanPin.length !== 6) return null;

  if (pincodeCache[cleanPin]) {
    return pincodeCache[cleanPin];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    if (Array.isArray(data) && data[0]?.Status === 'Success' && Array.isArray(data[0].PostOffice) && data[0].PostOffice.length > 0) {
      const postOffice = data[0].PostOffice[0];
      const areas = data[0].PostOffice.map((po: any) => po.Name).slice(0, 5);

      const result: PincodeLookupResult = {
        city: postOffice.District || postOffice.Block || postOffice.Circle || '',
        state: postOffice.State || '',
        district: postOffice.District,
        areaNames: areas,
      };

      pincodeCache[cleanPin] = result;
      return result;
    }
  } catch (err) {
    console.warn('Pincode auto-lookup fetch error:', err);
  }

  return null;
}
