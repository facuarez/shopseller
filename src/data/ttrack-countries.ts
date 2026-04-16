export const COUNTRIES = [
  { id: 'es', name: 'España', flag: '🇪🇸', tikTokCommission: 9, affiliateOrganic: 15, affiliatePaid: 5 },
  { id: 'fr', name: 'Francia', flag: '🇫🇷', tikTokCommission: 9, affiliateOrganic: 15, affiliatePaid: 5 },
  { id: 'de', name: 'Alemania', flag: '🇩🇪', tikTokCommission: 9, affiliateOrganic: 15, affiliatePaid: 5 },
  { id: 'it', name: 'Italia', flag: '🇮🇹', tikTokCommission: 9, affiliateOrganic: 15, affiliatePaid: 5 },
  { id: 'ie', name: 'Irlanda', flag: '🇮🇪', tikTokCommission: 9, affiliateOrganic: 15, affiliatePaid: 5 },
] as const

export type CountryId = typeof COUNTRIES[number]['id']

export const MARGIN_PRESETS = [0, 60, 80, 100, 120]
