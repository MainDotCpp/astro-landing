import type {
  ChannelConfig,
  ImageKey,
  Persona,
  PlatformLinks,
  RouteEntry,
  RouteOptions,
} from '@/campaigns/types'

// ─── Channel presets (KR) ────────────────────────────────────────────────────

const ALL_CHANNELS: ChannelConfig = {
  kind: 'routed',
  actions: [
    { routeId: 'kakao', platform: 'kakao', mode: 'direct' },
    { routeId: 'band', platform: 'band', mode: 'direct' },
    { routeId: 'modal-kakao', platform: 'kakao', mode: 'modal' },
    { routeId: 'form-kakao', platform: 'kakao', mode: 'form' },
    { routeId: 'choice', platform: 'kakao', mode: 'choice', secondary: { platform: 'band', mode: 'direct' } },
  ],
}

const KAKAO_CHANNELS: ChannelConfig = {
  kind: 'routed',
  actions: [
    { routeId: 'kakao', platform: 'kakao', mode: 'direct' },
    { routeId: 'modal-kakao', platform: 'kakao', mode: 'modal' },
    { routeId: 'form-kakao', platform: 'kakao', mode: 'form' },
  ],
}

const BAND_ONLY: ChannelConfig = {
  kind: 'fixed',
  action: { platform: 'band', mode: 'direct' },
}

const KAKAO_BAND_CHOICE: ChannelConfig = {
  kind: 'choice',
  primary: { platform: 'kakao', mode: 'direct' },
  secondary: { platform: 'band', mode: 'direct' },
}

// ─── Default links (override per-page as needed) ─────────────────────────────

/**
 * Production links are injected via environment / KRRedirectCode at runtime.
 * These empty strings serve as type-safe placeholders; the legacy jump.ts
 * globals remain the authoritative source until full V2.0 migration is done.
 */
export const DEFAULT_KR_LINKS: PlatformLinks = {
  kakao: '',
  band: '',
}

// ─── Persona catalog ─────────────────────────────────────────────────────────

const personas: Record<string, Persona> = {
  柳秀真: {
    name: '유수진',
    versions: [
      { static_prefix: 'lxz_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'lxz1_', version: 1, channel: KAKAO_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  宣大仁: {
    name: '선대인',
    versions: [
      { static_prefix: 'xdr_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'xdr1_', version: 1, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'xdr2_', version: 2, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'xdr3_', version: 3, channel: KAKAO_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  南锡宽: {
    name: '남석관',
    versions: [
      { static_prefix: 'nxk_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  富人电视: {
    name: '부자티비',
    versions: [
      { static_prefix: 'frds_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'frds1_', version: 1, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  闵秀雅: {
    name: '민수아',
    versions: [
      { static_prefix: 'mxy_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  朴世益: {
    name: '박세익',
    versions: [
      { static_prefix: 'psy_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'psy1_', version: 1, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  金永益: {
    name: '김영익',
    versions: [
      { static_prefix: 'jyy_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  金光石: {
    name: '김광석',
    versions: [
      { static_prefix: 'jgs_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  廉承煥: {
    name: '염승환',
    versions: [
      { static_prefix: 'lch_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  洪春旭: {
    name: '홍춘욱',
    versions: [
      { static_prefix: 'hcx_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'hcx1_', version: 1, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  总理猴: {
    name: '소수몽키',
    versions: [
      { static_prefix: 'zlh_', version: 0, channel: ALL_CHANNELS, images: ['head'] },
    ],
  },
  国家人口和经济研究所: {
    name: '전인구경제연구소',
    versions: [
      { static_prefix: 'yjs_', version: 0, channel: ALL_CHANNELS, images: ['head'] },
    ],
  },
  小猴属: {
    name: '소수몽키',
    versions: [
      { static_prefix: 'xhs_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  金美京: {
    name: '김미경',
    versions: [
      { static_prefix: 'jmj_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  舒卡世界漫画: {
    name: '슈카월드 코믹스',
    versions: [
      { static_prefix: 'yu_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  常言道语: {
    name: '노말이',
    versions: [
      { static_prefix: 'cydy_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  郑在浩: {
    name: '정재호',
    versions: [
      { static_prefix: 'zzh_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  孔炳浩: {
    name: '공병호',
    versions: [
      { static_prefix: 'kbh1_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'kbh2_', version: 1, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  吴建英: {
    name: '오건영',
    versions: [
      { static_prefix: 'wjy1_', version: 0, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
      { static_prefix: 'wjy2_', version: 1, channel: ALL_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  金钟锋: {
    name: '김종봉',
    versions: [
      { static_prefix: 'jzf_', version: 0, channel: BAND_ONLY, images: ['head', 'header', 'img1'] },
      { static_prefix: 'jzf1_', version: 1, channel: KAKAO_CHANNELS, images: ['head', 'header', 'img1'] },
    ],
  },
  安迪李: {
    name: '안디 이',
    versions: [
      { static_prefix: 'aly0_', version: 0, channel: KAKAO_CHANNELS, images: [] },
    ],
  },
  朴斗焕: {
    name: '박두환',
    versions: [
      { static_prefix: 'pdh_', version: 0, channel: KAKAO_BAND_CHOICE, images: ['head'] },
    ],
  },
}

// ─── Route generation ────────────────────────────────────────────────────────

/**
 * Generate static paths for a V2.0 campaign page.
 *
 * @param campaignId  e.g. "20260317-1"
 * @param options     optional image-requirement filter
 * @param links       platform links to embed in props (defaults to empty strings)
 */
export function generateRoutes(
  campaignId: string,
  options?: RouteOptions,
  links: PlatformLinks = DEFAULT_KR_LINKS,
): RouteEntry[] {
  return Object.entries(personas).flatMap(([nameZh, persona]) =>
    persona.versions.flatMap((pv) => {
      if (options?.requireImages) {
        const hasAll = options.requireImages.every(img => pv.images.includes(img as ImageKey))
        if (!hasAll)
          return []
      }

      const routeIds = resolveRouteIds(pv.channel)

      return routeIds.map(routeId => ({
        params: {
          name: nameZh,
          variant: `${campaignId}.${pv.version}.${routeId}`,
        },
        props: {
          name: persona.name,
          img_prefix: pv.static_prefix,
          links,
        },
      }))
    }),
  )
}

/** Extract the list of routeId strings from a ChannelConfig */
function resolveRouteIds(channel: ChannelConfig): string[] {
  switch (channel.kind) {
    case 'routed':
      return channel.actions.map(a => a.routeId)
    case 'fixed':
      return [channel.action.platform]
    case 'choice':
      return ['choice']
  }
}

export { personas }
export type { RouteOptions }
