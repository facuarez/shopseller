// TikTok Shop EU Cross-Border Shipping Rate Card
// Effective as of November 23, 2025 — Excluding VAT
// Source: https://seller-es.tiktok.com/university/essay?knowledge_id=4191863377200918

type ShippingMatrix = Record<string, Record<string, number>>
type BuyerFeeMatrix = Record<string, Record<string, Record<string, { home: number; pudo: number }>>>

export const SELLER_NET: ShippingMatrix = {
  es: { fr: 2.60, de: 3.10, it: 3.10, ie: 3.10, es: 2.50 },
  fr: { es: 3.10, de: 2.85, it: 3.10, ie: 3.10, fr: 2.50 },
  de: { es: 3.10, fr: 3.10, it: 3.10, ie: 3.10, de: 2.50 },
  it: { es: 3.10, fr: 3.10, de: 3.10, ie: 3.10, it: 2.50 },
  ie: { es: 3.10, fr: 3.10, de: 3.10, it: 3.10, ie: 2.50 },
}

export const BUYER_FEES: BuyerFeeMatrix = {
  de: {
    es: { '0-5': { home: 3.30, pudo: 2.47 }, '5-10': { home: 4.95, pudo: 4.12 }, '10-30': { home: 9.08, pudo: 8.26 } },
    fr: { '0-5': { home: 4.16, pudo: 3.33 }, '5-10': { home: 5.83, pudo: 4.99 }, '10-30': { home: 9.99, pudo: 9.16 } },
    it: { '0-5': { home: 4.09, pudo: 3.27 }, '5-10': { home: 5.73, pudo: 4.91 }, '10-30': { home: 9.83, pudo: 9.01 } },
    ie: { '0-5': { home: 6.50, pudo: 5.68 }, '5-10': { home: 8.12, pudo: 7.31 }, '10-30': { home: 12.19, pudo: 11.37 } },
  },
  fr: {
    es: { '0-5': { home: 3.30, pudo: 2.47 }, '5-10': { home: 4.95, pudo: 4.12 }, '10-30': { home: 9.08, pudo: 8.26 } },
    de: { '0-5': { home: 4.19, pudo: 3.35 }, '5-10': { home: 5.87, pudo: 5.03 }, '10-30': { home: 10.08, pudo: 9.24 } },
    it: { '0-5': { home: 4.09, pudo: 3.27 }, '5-10': { home: 5.73, pudo: 4.91 }, '10-30': { home: 9.83, pudo: 9.01 } },
    ie: { '0-5': { home: 6.50, pudo: 5.68 }, '5-10': { home: 8.12, pudo: 7.31 }, '10-30': { home: 12.19, pudo: 11.37 } },
  },
  it: {
    es: { '0-5': { home: 3.30, pudo: 2.47 }, '5-10': { home: 4.95, pudo: 4.12 }, '10-30': { home: 9.08, pudo: 8.26 } },
    de: { '0-5': { home: 4.19, pudo: 3.35 }, '5-10': { home: 5.87, pudo: 5.03 }, '10-30': { home: 10.08, pudo: 9.24 } },
    fr: { '0-5': { home: 4.16, pudo: 3.33 }, '5-10': { home: 5.83, pudo: 4.99 }, '10-30': { home: 9.99, pudo: 9.16 } },
    ie: { '0-5': { home: 6.50, pudo: 5.68 }, '5-10': { home: 8.12, pudo: 7.31 }, '10-30': { home: 12.19, pudo: 11.37 } },
  },
  es: {
    de: { '0-5': { home: 4.19, pudo: 3.35 }, '5-10': { home: 5.87, pudo: 5.03 }, '10-30': { home: 10.08, pudo: 9.24 } },
    fr: { '0-5': { home: 4.16, pudo: 3.33 }, '5-10': { home: 5.83, pudo: 4.99 }, '10-30': { home: 9.99, pudo: 9.16 } },
    it: { '0-5': { home: 4.09, pudo: 3.27 }, '5-10': { home: 5.73, pudo: 4.91 }, '10-30': { home: 9.83, pudo: 9.01 } },
    ie: { '0-5': { home: 6.50, pudo: 5.68 }, '5-10': { home: 8.12, pudo: 7.31 }, '10-30': { home: 12.19, pudo: 11.37 } },
  },
  ie: {
    es: { '0-5': { home: 3.30, pudo: 2.47 }, '5-10': { home: 4.95, pudo: 4.12 }, '10-30': { home: 9.08, pudo: 8.26 } },
    de: { '0-5': { home: 4.19, pudo: 3.35 }, '5-10': { home: 5.87, pudo: 5.03 }, '10-30': { home: 10.08, pudo: 9.24 } },
    fr: { '0-5': { home: 4.16, pudo: 3.33 }, '5-10': { home: 5.83, pudo: 4.99 }, '10-30': { home: 9.99, pudo: 9.16 } },
    it: { '0-5': { home: 4.09, pudo: 3.27 }, '5-10': { home: 5.73, pudo: 4.91 }, '10-30': { home: 9.83, pudo: 9.01 } },
  },
}

export function getWeightTier(weightKg: number | string): string {
  const w = parseFloat(String(weightKg)) || 0
  if (w <= 5) return '0-5'
  if (w <= 10) return '5-10'
  return '10-30'
}

export function getSellerNet(from: string, to: string): number {
  return SELLER_NET[from]?.[to] ?? 3.10
}

export function getBuyerFee(from: string, to: string, weightKg: number | string, delivery: 'home' | 'pudo' = 'home'): number {
  const tier = getWeightTier(weightKg)
  const fees = BUYER_FEES[from]?.[to]?.[tier]
  if (!fees) return 0
  return delivery === 'pudo' ? fees.pudo : fees.home
}

export function getTtsFee(from: string, to: string, weightKg: number | string, delivery: 'home' | 'pudo' = 'home'): number {
  return getSellerNet(from, to) + getBuyerFee(from, to, weightKg, delivery)
}

export const WEIGHT_TIERS = [
  { id: '0-5', label: '0 – 5 kg' },
  { id: '5-10', label: '5 – 10 kg' },
  { id: '10-30', label: '10 – 30 kg' },
]
