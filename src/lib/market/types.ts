export interface Quote {
  symbol: string
  name?: string
  exchange?: string
  price: number
  change: number
  changePct: number
  prevClose?: number
  currency?: string
  updatedAt: string
}

export interface Bar {
  t: number // epoch ms
  o: number
  h: number
  l: number
  c: number
  v?: number
}

export interface NewsItem {
  id: string
  title: string
  url: string
  source?: string
  publishedAt: string
  sentiment?: 'positive' | 'neutral' | 'negative'
}

export interface IndexQuote extends Quote {
  constituents?: string[]
}

export interface ApiOk<T> {
  ok: true
  data: T
  meta?: Record<string, any>
}

export interface ApiErr {
  ok: false
  error: { code: string, message: string }
  meta?: Record<string, any>
}

export type ApiResp<T> = ApiOk<T> | ApiErr
