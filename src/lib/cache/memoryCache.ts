type Loader<T> = () => Promise<T>

interface CacheEntry<T> {
  expiresAt: number
  value?: T
  loading?: Promise<T>
}

const store = new Map<string, CacheEntry<any>>()

export async function getOrSet<T>(key: string, ttlMs: number, loader: Loader<T>): Promise<T> {
  const now = Date.now()
  const entry = store.get(key)

  if (entry) {
    // if loading in progress, reuse it
    if (entry.loading)
      return entry.loading
    // if not expired, return value
    if (entry.value !== undefined && entry.expiresAt > now)
      return entry.value as T
  }

  const p = loader()
    .then((val) => {
      store.set(key, { value: val, expiresAt: now + ttlMs })
      return val
    })
    .finally(() => {
      const e = store.get(key)
      if (e)
        e.loading = undefined
    })

  store.set(key, { ...(entry ?? {}), loading: p, expiresAt: now + ttlMs })
  return p
}

export function del(key: string) {
  store.delete(key)
}

export function clearAll() {
  store.clear()
}
