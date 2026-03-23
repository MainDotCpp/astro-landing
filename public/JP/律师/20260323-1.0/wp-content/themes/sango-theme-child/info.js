document.addEventListener('DOMContentLoaded', () => {
  const cookieName = 'from'

  // 'from' Cookie が既に存在するか確認
  const cookies = document.cookie.split(';').map(c => c.trim())
  const fromExists = cookies.some(c => c.startsWith(`${cookieName}=`))

  if (fromExists)
    return

  // slug を取得
  const path = window.location.pathname
  const slug = path.endsWith('/') ? path.slice(0, -1).split('/').pop() : path.split('/').pop()

  console.log('slug:', slug)

  if (slug) {
    const maxDays = 400 // 最大有効日数
    const date = new Date()
    date.setTime(date.getTime() + (maxDays * 24 * 60 * 60 * 1000))
    const expires = `expires=${date.toUTCString()}`

    document.cookie = `${cookieName}=${encodeURIComponent(slug)};${expires};path=/`
  }
})

document.addEventListener('DOMContentLoaded', () => {
  // fromパラメータからfrom Cookieを保存し、URLをクリーンアップ
  (function handleFromParameter() {
    const url = new URL(window.location.href)
    const from = url.searchParams.get('from')

    if (from) {
      // Cookieに保存（有効期限365日）
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
      document.cookie = `from=${encodeURIComponent(from)}; expires=${expires}; path=/`

      // fromパラメータを削除してURLを書き換え（履歴には残さない）
      url.searchParams.delete('from')
      window.history.replaceState({}, document.title, url.toString())
    }
  })()

  // .info-line click is handled by onLinkBtnClick() in index.html
})
