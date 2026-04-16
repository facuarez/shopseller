import { getSellerNet, getBuyerFee, getWeightTier } from '@/data/ttrack-shipping'

interface FormulaResult {
  pvp: number; tikCost: number; affCost: number; benefit: number; ivaCost: number; valid: boolean
}

function ttsFormula(tikP: number, affP: number, ctot: number, minProfit: number, cpaAds: number, IVA: number): FormulaResult {
  const denominator = (1 / IVA) - (tikP + affP) / 100
  if (denominator <= 0) return { pvp: 0, tikCost: 0, affCost: 0, benefit: 0, ivaCost: 0, valid: false }
  const pvp = (ctot + minProfit + cpaAds) / denominator
  const tikCost = pvp * tikP / 100
  const affCost = pvp * affP / 100
  const ivaCost = pvp - (pvp / IVA)
  const benefit = (pvp / IVA) - tikCost - affCost - cpaAds - ctot
  return { pvp, tikCost, affCost, benefit, ivaCost, valid: true }
}

export interface CountryConfig {
  id: string; name: string; flag: string; tikTokCommission: number;
  affiliateOrganic: number; affiliatePaid: number;
  _affiliateOrganic?: string; _affiliatePaid?: string;
  _paidEnabled?: boolean; _cpaTtsAds?: string; _active?: boolean;
}

export interface CalculatorInputs {
  cost: string; returnRate: string; tikTokCommission: string; marginPercent: string;
  weightKg: string; originCountry: string; countries: CountryConfig[];
  ivaPct: string; shippingMode: string;
}

export interface CalculatorResult {
  country: CountryConfig; organic: FormulaResult; paid: FormulaResult | null;
  ctot: number; sellerNet: number; sellerShippingCost: number; dev: number;
  cost: number; minProfit: number; tikP: number; ivaPct: number;
  shippingMode: string; buyerFeeForMode: number; weightTier: string;
  buyerFeeHome: number; buyerFeePudo: number; ttsFeeHome: number; ttsFeePudo: number;
}

export function calculateAll(inputs: CalculatorInputs): CalculatorResult[] {
  const { cost, returnRate, tikTokCommission, marginPercent, weightKg, originCountry, countries, ivaPct, shippingMode } = inputs
  const cost_ = parseFloat(cost) || 0
  const returnRate_ = parseFloat(returnRate) || 0
  const tikP = parseFloat(tikTokCommission) || 0
  const marginPct_ = parseFloat(marginPercent) || 0
  const minProfit = cost_ * marginPct_ / 100
  const weight = parseFloat(weightKg) || 0.5
  const weightTier = getWeightTier(weight)
  const IVA = 1 + (parseFloat(ivaPct) || 21) / 100
  const mode = shippingMode || 'free'

  const results: CalculatorResult[] = []
  for (const country of countries) {
    if (!country._active) continue
    const affOrg = parseFloat(country._affiliateOrganic ?? String(country.affiliateOrganic)) || 0
    const affPaid = parseFloat(country._affiliatePaid ?? String(country.affiliatePaid)) || 0
    const cpaAds = parseFloat(country._cpaTtsAds ?? '0') || 0
    const paidEnabled = country._paidEnabled || false

    const sellerNet = getSellerNet(originCountry, country.id)
    const buyerFeeHome = getBuyerFee(originCountry, country.id, weight, 'home')
    const buyerFeePudo = getBuyerFee(originCountry, country.id, weight, 'pudo')
    const dev = cost_ * returnRate_ / 100
    const buyerFeeForMode = mode === 'home' ? buyerFeeHome : mode === 'pudo' ? buyerFeePudo : 0
    const sellerShippingCost = mode === 'free' ? sellerNet + buyerFeeHome : sellerNet
    const ctot = cost_ + sellerShippingCost + dev

    const organic = ttsFormula(tikP, affOrg, ctot, minProfit, 0, IVA)
    const paid = paidEnabled ? ttsFormula(tikP, affPaid, ctot, minProfit, cpaAds, IVA) : null

    results.push({
      country, organic, paid, ctot, sellerNet, sellerShippingCost, dev, cost: cost_, minProfit, tikP,
      ivaPct: parseFloat(ivaPct) || 21, shippingMode: mode, buyerFeeForMode,
      weightTier, buyerFeeHome, buyerFeePudo,
      ttsFeeHome: sellerNet + buyerFeeHome, ttsFeePudo: sellerNet + buyerFeePudo,
    })
  }
  return results
}

export function profitStatus(benefit: number, minProfit: number): 'good' | 'fair' | 'bad' {
  if (minProfit <= 0) return benefit > 0 ? 'good' : 'bad'
  if (benefit >= minProfit * 0.95) return 'good'
  if (benefit >= minProfit * 0.5) return 'fair'
  return 'bad'
}
