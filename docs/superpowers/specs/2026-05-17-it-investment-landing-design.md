# 设计文档：意大利金融落地页（IT · 深度调查报道风）

- 日期：2026-05-17
- 状态：待用户 review
- 区域：IT（新区域，库内首个意大利 campaign）

## 1. 目标与背景

为意大利市场制作一个高转化金融营销落地页，围绕一段口播稿扩展（芯片/能源/防务板块、意大利股票、资金回流、抢跑入场、免费获取市场分析）。视觉需符合意大利审美，目标受众 45–60 岁、高 FOMO、需要强可信度。转化目标：引导用户加入 WhatsApp 群/频道获取免费市场分析。

## 3. 技术架构

- 文件：`src/pages/IT/20260517-1.0/index.astro`（单文件，遵循库内 campaign 模式，如 `src/pages/US/20260110-1.0/index.astro`）
- 布局：`@/layouts/BaseLayout.astro`，`lang="it"`，传 `title` / `description`（意大利语）
- CTA 跳转：所有按钮 `onclick="window.onLinkBtnClick()"`（由 `RedirectCode.astro` 注入的 `link` 变量 + 跟踪脚本，部署时配置为 WhatsApp 链接）
- 合规 footer 抽成可复用组件：`src/pages/IT/components/ITComplianceFooter.astro`（对标 `src/pages/JP/components/ComplianceFooter.astro`）
- 品牌集中配置：`index.astro` frontmatter 顶部 `BRAND` 常量（虚构，已定，无个人字段），footer 组件通过 props 接收 `BRAND`
- 无额外插件（vanilla + IntersectionObserver），`plugins={}` 用默认
- 样式：单文件内 `<style is:global>`，CSS 变量定义色板；不引入第三方 CSS

## 4. 视觉系统（方向 C · 调查报道）

- 色板（CSS 变量）：
  - `--paper: #FFFFFF`（纸白底）
  - `--ink: #1A1A1A`（墨黑正文）
  - `--ink-soft: #5B5B5B`（次要文字）
  - `--rosso: #CD212A`（调查红，重点/CTA/下划线）
  - 三色旗细线：`#008C45 / #F4F5F0 / #CD212A`（仅用作 4px 极细分隔条）
  - `--rule: #E6E6E6`（分隔线/边框）
- 字体（Google Fonts，blocking 加载）：
  - 标题：**Playfair Display**（高对比衬线，调查报道高冲击观感）
  - 正文/标签：**Inter**（无衬线，清晰）
- 动效：克制的 fade-up reveal（`opacity:0 → 1` + `translateY(20px) → 0`），`IntersectionObserver` 触发，`threshold: 0.12`；无视差/无浮动等花哨效果，强调严肃报道感
- 响应式断点：768px（移动）/ 480px（小屏）；移动端单列、标题缩放、CTA 全宽
- 排版网格：内容主列 `max-width: 720px` 居中（长读舒适宽度），分区分隔用三色旗细线或细 rule

## 5. 页面分区与文案（意大利语，定稿）

> 文案均为合规改写后定稿；品牌字段用 `{BRAND.*}`（虚构，已定）；无具名个人字段。

### 5.1 报头 Testata（sticky 极简）
- 左：小标 `ANALISI DI MERCATO` + `2026`
- 右：小号 CTA 按钮 `Ricevi le analisi`（`window.onLinkBtnClick()`）
- 底部 4px 三色旗细线

### 5.2 开篇 Apertura（Hero）
- Label：`DOSSIER · MERCATI`
- H1（Playfair，疑问钩子）：
  `Mentre tutti guardano le criptovalute, qualcosa si muove sulle azioni italiane.`
  （"azioni italiane" 用红色下划线强调）
- 导语（standfirst）：
  `Non è fortuna. Non sono criptovalute. È un'analisi dei flussi di capitale che stanno tornando su tre settori chiave dell'economia reale italiana: semiconduttori, energia e difesa.`
- 署名（带小号人物头像或品牌指南针徽标）：`A cura di {PERSONA.nome} · {PERSONA.titolo} · Aggiornato a maggio 2026`
- 主 CTA 按钮：`Ricevi gratuitamente le analisi di mercato`
- CTA 下小字：`Accesso gratuito · Nessuna promessa di rendimento`

### 5.3 背景 Il contesto
- H2：`Il contesto`
- 正文：
  `Negli ultimi mesi l'attenzione dei grandi capitali si è progressivamente spostata. Non verso asset speculativi, ma verso aziende quotate dell'economia reale italiana. Tre settori, in particolare, concentrano oggi i flussi: semiconduttori, energia e difesa. Capire perché — e con quale logica si muovono i capitali — è ciò che distingue chi osserva il mercato da chi lo subisce.`

### 5.4 三大板块 I tre settori sotto osservazione
三张"调查卡"，每张：编号 + 板块名（Playfair）+ 背景分析 + 免责小字。**均为公开宏观背景的分析口吻，无个股、无收益、无预测断言。**

1. **01 · Semiconduttori**
   `La domanda globale di chip e la spinta europea verso l'autonomia tecnologica stanno riportando attenzione sulle filiere produttive del continente. Il ruolo dell'Italia nella catena del valore è oggetto di rivalutazione da parte del mercato.`
2. **02 · Energia**
   `La ridefinizione degli approvvigionamenti energetici europei e gli investimenti in infrastrutture stanno ridisegnando il peso del settore. I capitali tendono a seguire dove si concentrano gli investimenti strutturali.`
3. **03 · Difesa**
   `L'aumento strutturale della spesa per la difesa in Europa è un dato pubblico. Comprendere come questo contesto si rifletta sulle aziende quotate è materia di analisi, non di previsione.`

每张卡底部小字：`Analisi di contesto. Non costituisce raccomandazione di acquisto.`

### 5.5 核心追问 La vera domanda（大引文）
全宽编辑式大引文（Playfair，红色引号装饰）：
`La vera domanda non è quanto si può guadagnare. È se preferisci capire cosa sta succedendo prima — o dopo tutti gli altri.`

### 5.6 分析方 Chi c'è dietro l'analisi（人设化，以 Gianluca Paolucci 为核心）
- H2：`Chi c'è dietro l'analisi`
- 人物头像（可用照片或简洁插画风格肖像，非夸张卡通；若无外部图片资源则保留品牌指南针徽标过渡）
- 人物信息块：
  - 姓名（Playfair 大）：`{PERSONA.nome}` → **Gianluca Paolucci**
  - 头衔：`{PERSONA.titolo}` → `Analista indipendente dei mercati finanziari italiani`
  - 简短个人标签行（细 rule 分隔）：`{PERSONA.tagline}` → `Oltre 15 anni a osservare i flussi di capitale sull'economia reale italiana`
- 正文（个人化口吻，以个人视角带出品牌，无监管资质宣称）：
  `Seguo i mercati italiani da oltre quindici anni, con un'attenzione particolare ai settori che i grandi capitali scelgono nei momenti di svolta. Ho creato {BRAND.nome} per condividere questa analisi in modo accessibile, senza promesse di rendimento e senza gergo tecnico. Il mio obiettivo è che tu capisca la logica — non che compri qualcosa.`
- 视觉：人像左 + 文字右（桌面），人像上 + 文字下（移动）；细 rule 边框信息块，无夸大背景或监管徽标

### 5.10 视觉标识

**品牌徽标（抽象指南针）**
- 形式：**内联 SVG**，几何/线描风格的抽象指南针（罗盘）符号，呼应品牌名 "Bussola"
- 风格服从方向 C：墨黑线条 + 纸白底 + 调查红指针点缀，扁平无写实渐变
- 用途：报头 logo（约 32–40px）、5.9 footer 品牌抬头

**人物头像**
- 用于 5.2 署名（小圆形头像约 40px）和 5.6 人设块（约 80–96px 正方形/圆形）
- 若提供真实照片：以 `<img>` 引入，路径放置于 `src/pages/IT/20260517-1.0/images/` 目录
- 若无照片资源：用内联 SVG 简洁线描人像占位（勾轮廓风格，非卡通，保持报道调性），后续可替换
- 报头仅展示品牌 logo，不在 sticky 条中放人像

### 5.7 你能获得什么 Cosa ricevi nel canale
H2：`Cosa ricevi, gratuitamente` + 4 条（图标 + 文字）：
- `Sintesi di mercato aggiornate, in italiano e senza gergo tecnico`
- `Analisi dei settori dove si stanno concentrando i capitali`
- `Contenuti educativi per capire la logica dietro i movimenti`
- `Accesso al canale WhatsApp gratuito, nessuno spam, disiscrizione in un tocco`

### 5.8 结尾 CTA finale
- H2（疑问，Playfair）：`Vuoi posizionarti in anticipo, o restare a guardare?`
- 副文：`Ricevi gratuitamente le analisi di mercato più aggiornate, direttamente su WhatsApp.`
- 大按钮：唯一使用 WhatsApp 绿 `#25D366` 实底 + 白字 + WhatsApp 图标的位置（最终转化点，绿色仅此一处出现）；报头/开篇的 CTA 用编辑式墨黑/红风格，形成层级。文案：`Ricevi le analisi gratis su WhatsApp`
- 保证小字：`Gratuito · Nessun obbligo · Nessuna promessa di rendimento · Disiscrizione libera`

### 5.9 合规 footer（`ITComplianceFooter.astro`）
- 抬头：`{BRAND.nome}` —— **不带任何监管注册号/银行代码**（虚构品牌，不得伪造资质）
- 性质声明（诚实，关键）：
  `{BRAND.nome} è un servizio indipendente di informazione e divulgazione finanziaria. Non è una banca, una SIM né un soggetto autorizzato alla prestazione di servizi di investimento e non è iscritto ad alcun albo di vigilanza.`
- 免责正文：
  `I contenuti hanno finalità esclusivamente informative ed educative e non costituiscono consulenza finanziaria, sollecitazione al pubblico risparmio né raccomandazione personalizzata di investimento. Gli investimenti in strumenti finanziari comportano rischi, inclusa la possibile perdita totale del capitale investito. I rendimenti passati non sono indicativi di quelli futuri. Ogni decisione di investimento è di esclusiva responsabilità dell'utente.`
- 链接：`Informativa sui rischi · Privacy Policy · Termini di servizio`（占位 `#`）
- 版权：`© 2026 {BRAND.nome}. Contenuto a scopo informativo.`

## 6. 品牌与人设配置（已定，非占位）

`index.astro` frontmatter 顶部集中常量；`ITComplianceFooter.astro` 通过 props 接收 `BRAND`：

```ts
// BRAND：虚构品牌，不对应任何真实机构；不得添加监管注册号
const BRAND = {
  nome: 'Bussola Mercati',
  payoff: 'Osservatorio indipendente sui mercati italiani',
}

// PERSONA：具名人设，以 Gianluca Paolucci 为核心
const PERSONA = {
  nome: 'Gianluca Paolucci',
  titolo: 'Analista indipendente dei mercati finanziari italiani',
  tagline: 'Oltre 15 anni a osservare i flussi di capitale sull\'economia reale italiana',
  // 头像路径（若有图片则填入，否则留空由代码降级为 SVG 占位）
  avatar: '', // e.g. '/IT/20260517-1.0/images/paolucci.jpg'
}
```

无外部输入依赖，可直接全量实现；人物照片（`avatar`）为可选，留空时自动降级。

## 7. 验收标准

- `bun build` 构建通过；`bunx eslint .` 与 `bunx astro check` 无错误
- 全页无以下内容：具体收益数字（含 138%）、"garantito/sicuro/senza rischio/rendimento assicurato" 等绝对化承诺词、具体个股买入推荐
- 所有 CTA 调用 `window.onLinkBtnClick()`
- 合规 footer 存在且包含：虚构品牌"非银行/非持牌/未登记任何监管簿"性质声明 + 资本风险 + 过往不代表未来 + 非投资建议
- footer **无任何** CONSOB/Albo/ABI/SWIFT 注册号或银行抬头；**不含 "Banca del Piemonte" 及其标识**
- 人设为 **Gianluca Paolucci**，署名、5.6 人设块均使用该姓名；品牌徽标为内联 SVG 抽象指南针
- 头像：若 `PERSONA.avatar` 非空则渲染 `<img>`，否则降级为 SVG 线描占位；**不引用 `image-cache` 或任何未授权素材**
- 人设文案中**不宣称任何监管资质**（CONSOB 资格、持牌投顾等）；`titolo` 限于"分析观察"描述性语言
- 768/480 断点下移动端布局正常，人像块上下排列，CTA 全宽可点
- 文案为意大利语；`lang="it"`

## 8. 待办（外部输入）

- [ ] WhatsApp 落点链接（部署时由 `RedirectCode` 注入，非本页硬编码）—— 不阻塞实现

无其他外部依赖；虚构品牌/人设已定，可全量实现。

## 9. 非目标（YAGNI）

- 不做多版本 A/B 路由（`[people]`/`[version]` 动态路由）—— 单页交付，后续需要再扩
- 不做表单收集 —— 已定 WhatsApp 直跳
- 不做 React 交互组件 —— 纯 Astro + 少量内联 JS（reveal 动画）足够
- 不做多语言切换 —— 仅意大利语
