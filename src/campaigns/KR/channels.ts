import type { CtaAction } from '@/campaigns/types'

/**
 * Map a URL routeId segment back to a CtaAction.
 *
 * routeId values match those declared in personas.ts:
 *   kakao       → Kakao direct
 *   band        → Band direct
 *   modal-kakao → Kakao modal
 *   form-kakao  → Kakao form
 *   choice      → Kakao + Band choice
 *   (anything else) → Kakao direct fallback
 */
export function resolveAction(routeId: string): CtaAction {
  switch (routeId) {
    case 'kakao':
      return { platform: 'kakao', mode: 'direct' }
    case 'band':
      return { platform: 'band', mode: 'direct' }
    case 'modal-kakao':
      return { platform: 'kakao', mode: 'modal' }
    case 'form-kakao':
      return { platform: 'kakao', mode: 'form' }
    case 'choice':
      return {
        platform: 'kakao',
        mode: 'choice',
        secondary: { platform: 'band', mode: 'direct' },
      }
    default:
      return { platform: 'kakao', mode: 'direct' }
  }
}
