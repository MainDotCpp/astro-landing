import type { Bar, Quote } from '@/lib/market/types'
import process from 'node:process'
import { getOrSet } from '@/lib/cache/memoryCache'

import { toProviderSymbol } from '@/lib/market/symbols'

const API_KEY = (import.meta as any)?.env?.ALPHA_VANTAGE_API_KEY || process.env.ALPHA_VANTAGE_API_KEY
const BASE = 'https://www.alphavantage.co/query'

function assertKey() {
  if (!API_KEY)
    throw new Error('MISSING_API_KEY')
}

async function httpJson(url: string) {
  const res = await fetch(url)
  if (!res.ok)
    throw new Error(`HTTP_${res.status}`)
  const data = await res.json()
  if (data.Note || data.Information)
    throw new Error('PROVIDER_RATE_LIMITED')
  return data
}

export async function fetchQuote(symbols: Array<{ symbol: string, exchange?: string }>): Promise<Quote[]> {
  assertKey()
  const tasks = symbols.map(async (s) => {
    const ps = toProviderSymbol(s.symbol, s.exchange)
    const key = `av:quote:${ps}`
    return getOrSet(key, 60_000, async () => {
      const url = `${BASE}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(ps)}&apikey=${API_KEY}`
      const data = await httpJson(url)
      const q = data['Global Quote']
      if (!q)
        throw new Error('SYMBOL_NOT_FOUND')
      const price = Number(q['05. price'])
      const prev = Number(q['08. previous close'])
      const change = price - prev
      const changePct = prev ? change / prev : 0
      const updatedAt = new Date().toISOString()
      const out: Quote = {
        symbol: s.symbol,
        price,
        change,
        changePct,
        prevClose: prev,
        updatedAt,
      }
      return out
    })
  })
  return Promise.all(tasks)
}

export async function fetchDailyBars(symbol: string, exchange?: string, range: '1m' | '3m' | '6m' | '1y' | '5y' = '1y'): Promise<Bar[]> {
  assertKey()
  const ps = toProviderSymbol(symbol, exchange)
  const key = `av:daily:${ps}`
  return getOrSet(key, 30 * 60_000, async () => {
    const url = `${BASE}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${encodeURIComponent(ps)}&outputsize=full&apikey=${API_KEY}`
    const data = await httpJson(url)
    const series = data['Time Series (Daily)'] as Record<string, any>
    if (!series)
      throw new Error('SERIES_NOT_FOUND')
    const bars: Bar[] = Object.entries(series).map(([date, v]) => ({
      t: new Date(`${date}T00:00:00Z`).getTime(),
      o: Number(v['1. open']),
      h: Number(v['2. high']),
      l: Number(v['3. low']),
      c: Number(v['4. close']),
      v: Number(v['6. volume']),
    }))
    bars.sort((a, b) => a.t - b.t)
    const cutoff = (months: number) => Date.now() - months * 30 * 24 * 60 * 60 * 1000
    const map: Record<typeof range, number> = { '1m': cutoff(1), '3m': cutoff(3), '6m': cutoff(6), '1y': cutoff(12), '5y': cutoff(60) }
    const fromTs = map[range]
    return bars.filter(b => b.t >= fromTs)
  })
}
