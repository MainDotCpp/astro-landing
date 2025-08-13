export function toProviderSymbol(symbol: string, exchange?: string): string {
  // If symbol has suffix already, return as is
  if (symbol.includes('.'))
    return symbol
  // Simple heuristic: numeric code => KR market
  if (/^\d{6}$/.test(symbol)) {
    const suf = exchange === 'KQ' ? 'KQ' : 'KS'
    return `${symbol}.${suf}`
  }
  return symbol
}
