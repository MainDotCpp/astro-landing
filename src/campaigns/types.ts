// ─── Image ───────────────────────────────────────────────────────────────────

export type ImageKey = 'head' | 'header' | 'img1'

// ─── Platform × Mode ─────────────────────────────────────────────────────────

export type Platform
  = | 'kakao'
    | 'band'
    | 'line'
    | 'whatsapp'
    | 'telegram'

export type CtaMode
  = | 'direct'
    | 'modal'
    | 'form'
    | 'choice'

export interface CtaAction {
  platform: Platform
  mode: CtaMode
  /** Only required when mode = 'choice': the second platform's action */
  secondary?: Pick<CtaAction, 'platform' | 'mode'>
}

/** Per-platform deep-link URLs, provided by each route file or persona config */
export type PlatformLinks = Partial<Record<Platform, string>>

// ─── Channel configuration ───────────────────────────────────────────────────

/**
 * routed  — each action gets its own URL segment (KR multi-channel tracking)
 * fixed   — one fixed action for every page variant (JP LINE, US WhatsApp, …)
 * choice  — two platforms shown together on one page (KR Kakao + Band)
 */
export type ChannelConfig
  = | { kind: 'routed', actions: Array<CtaAction & { routeId: string }> }
    | { kind: 'fixed', action: CtaAction }
    | { kind: 'choice', primary: CtaAction, secondary: CtaAction }

// ─── Persona ─────────────────────────────────────────────────────────────────

export interface PersonaVersion {
  /** File-name prefix for campaign images, e.g. "psy_" */
  static_prefix: string
  version: number
  channel: ChannelConfig
  images: ImageKey[]
}

export interface Persona {
  /** Display name in the target language */
  name: string
  versions: PersonaVersion[]
}

// ─── Route generation ────────────────────────────────────────────────────────

export interface RouteOptions {
  /** Only include persona-versions that declare all listed images */
  requireImages?: ImageKey[]
}

export interface RouteEntry {
  params: { name: string, variant: string }
  props: { name: string, img_prefix: string, links: PlatformLinks }
}
