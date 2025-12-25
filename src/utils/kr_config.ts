export const ALL_SOCIAL = ['卡扣', '棒群', '混合', '引导弹窗', '提高质量_']
export const BAND_ONLY = ['棒群']
export const KAKAO_ONLY = ['卡扣', '引导弹窗', '提高质量_']

// 过滤条件类型：支持函数、字符串、正则、数组/Set
type FilterCondition
  = | ((nameVersion: string) => boolean)
    | string
    | RegExp
    | string[]
    | Set<string>

// 将过滤条件转换为过滤函数
function normalizeFilter(filter?: FilterCondition): ((nameVersion: string) => boolean) | undefined {
  if (!filter)
    return undefined

  // 函数直接返回
  if (typeof filter === 'function')
    return filter

  // 字符串：精确匹配
  if (typeof filter === 'string') {
    return nv => nv === filter
  }

  // 正则表达式
  if (filter instanceof RegExp) {
    return nv => filter.test(nv)
  }

  // 数组或 Set：包含检查
  if (Array.isArray(filter) || filter instanceof Set) {
    const set = new Set(Array.isArray(filter) ? filter : filter)
    return nv => set.has(nv)
  }

  return undefined
}

// 常用的过滤工具函数
export const Filters = {
  // 精确匹配
  exact: (...names: string[]) => (nv: string) => names.includes(nv),

  // 匹配特定人的所有版本
  byPerson: (name: string) => (nv: string) => nv.startsWith(`${name}_`),

  // 匹配特定版本号
  byVersion: (version: number) => (nv: string) => nv.endsWith(`_${version}`),

  // 匹配版本 0
  version0: (nv: string) => nv.endsWith('_0'),

  // 匹配版本 1
  version1: (nv: string) => nv.endsWith('_1'),

  // 匹配版本 0 和 1
  version01: (nv: string) => /_[01]$/.test(nv),

  // 前缀匹配
  startsWith: (prefix: string) => (nv: string) => nv.startsWith(prefix),

  // 后缀匹配
  endsWith: (suffix: string) => (nv: string) => nv.endsWith(suffix),

  // 正则匹配
  regex: (pattern: RegExp) => (nv: string) => pattern.test(nv),

  // 反转过滤条件（NOT）
  not: (filter: (nv: string) => boolean) => (nv: string) => !filter(nv),

  // 排除特定配置
  exclude: (...names: string[]) => (nv: string) => !names.includes(nv),

  // 排除特定人的所有版本
  excludePerson: (name: string) => (nv: string) => !nv.startsWith(`${name}_`),

  // 排除特定版本号
  excludeVersion: (version: number) => (nv: string) => !nv.endsWith(`_${version}`),

  // 组合多个过滤器（AND）
  and: (...filters: Array<(nv: string) => boolean>) => (nv: string) =>
    filters.every(f => f(nv)),

  // 组合多个过滤器（OR）
  or: (...filters: Array<(nv: string) => boolean>) => (nv: string) =>
    filters.some(f => f(nv)),
} as const

const c = {
  柳秀真: {
    name: '유수진',
    versions: [
      { static_prefix: 'lxz_', version: 0, sockal_type: ALL_SOCIAL },
      { static_prefix: 'lxz1_', version: 1, sockal_type: KAKAO_ONLY },
    ],
  },
  宣大仁: {
    name: '선대인',
    versions: [
      { static_prefix: 'xdr_', version: 0, sockal_type: ALL_SOCIAL },
      { static_prefix: 'xdr1_', version: 1, sockal_type: ALL_SOCIAL },
      { static_prefix: 'xdr2_', version: 2, sockal_type: ALL_SOCIAL },
      { static_prefix: 'xdr3_', version: 3, sockal_type: KAKAO_ONLY },
    ],
  },
  南锡宽: {
    name: '남석관',
    versions: [
      { static_prefix: 'nxk_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  富人电视: {
    name: '부자티비',
    versions: [
      { static_prefix: 'frds_', version: 0, sockal_type: ALL_SOCIAL },
      { static_prefix: 'frds1_', version: 1, sockal_type: ALL_SOCIAL },
    ],
  },
  闵秀雅: {
    name: '민수아',
    versions: [
      { static_prefix: 'mxy_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  朴世益: {
    name: '박세익',
    versions: [
      { static_prefix: 'psy_', version: 0, sockal_type: ALL_SOCIAL },
      { static_prefix: 'psy1_', version: 1, sockal_type: ALL_SOCIAL },
    ],
  },
  金永益: {
    name: '김영익',
    versions: [
      { static_prefix: 'jyy_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  金光石: {
    name: '김광석',
    versions: [
      { static_prefix: 'jgs_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  廉承煥: {
    name: '염승환',
    versions: [
      { static_prefix: 'lch_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  洪春旭: {
    name: '홍춘욱',
    versions: [
      { static_prefix: 'hcx_', version: 0, sockal_type: ALL_SOCIAL },
      { static_prefix: 'hcx1_', version: 1, sockal_type: ALL_SOCIAL },
    ],
  },
  总理猴: {
    name: '소수몽키',
    versions: [
      { static_prefix: 'zlh_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  国家人口和经济研究所: {
    name: '전인구경제연구소',
    versions: [
      { static_prefix: 'yjs_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  小猴属: {
    name: '소수몽키',
    versions: [
      { static_prefix: 'xhs_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  金美京: {
    name: '김미경',
    versions: [
      { static_prefix: 'jmj_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  舒卡世界漫画: {
    name: '슈카월드 코믹스',
    versions: [
      { static_prefix: 'yu_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  常言道语: {
    name: '노말이',
    versions: [
      { static_prefix: 'cydy_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  郑在浩: {
    name: '정재호',
    versions: [
      { static_prefix: 'zzh_', version: 0, sockal_type: ALL_SOCIAL },
    ],
  },
  孔炳浩: {
    name: '공병호',
    versions: [
      { static_prefix: 'kbh1_', version: 0, sockal_type: ALL_SOCIAL },
      { static_prefix: 'kbh2_', version: 1, sockal_type: ALL_SOCIAL },
    ],
  },
  吴建英: {
    name: '오건영',
    versions: [
      { static_prefix: 'wjy1_', version: 0, sockal_type: ALL_SOCIAL },
      { static_prefix: 'wjy2_', version: 1, sockal_type: ALL_SOCIAL },
    ],
  },
  金钟锋: {
    name: '김종봉',
    versions: [
      { static_prefix: 'jzf_', version: 0, sockal_type: BAND_ONLY },
      { static_prefix: 'jzf1_', version: 1, sockal_type: KAKAO_ONLY },
    ],
  },
  安迪李: {
    name: 'Andy Lee',
    versions: [
      { static_prefix: 'aly0_', version: 0, sockal_type: KAKAO_ONLY },
    ],
  },
} as const

export function generateKrConfig(
  filter?: FilterCondition,
  exclude?: FilterCondition,
) {
  const filterFn = normalizeFilter(filter)
  const excludeFn = normalizeFilter(exclude)

  return Object.entries(c)
    .flatMap(([name_zh, person]) =>
      person.versions.flatMap((version) => {
        const nameVersion = `${name_zh}_${version.version}`

        // 如果被排除，则跳过
        if (excludeFn && excludeFn(nameVersion)) {
          return []
        }

        // 如果提供了包含过滤函数，且不匹配，则跳过
        if (filterFn && !filterFn(nameVersion)) {
          return []
        }

        return version.sockal_type.map(t => ({
          params: { people: name_zh, version: String(version.version), t },
          props: { name: person.name, img_prefix: version.static_prefix },
        }))
      }),
    )
}
