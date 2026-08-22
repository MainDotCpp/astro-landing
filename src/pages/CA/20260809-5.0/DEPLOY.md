# 部署记录 · CA/20260809-5.0 — Canadian power & grid

> 页面源码：`src/pages/CA/20260809-5.0/index.astro`
> 配图与生成 prompts：`images/_prompts.md`

## 投放位

| 项 | 值 |
|---|---|
| 投放地址 | `https://snartbl.buzz/ke/` |
| 服务器文件 | `hskr2:/www/wwwroot/snartbl.buzz/ke/index.html`（SSH 端口 5522） |
| Meta Pixel | `1361023249485517` |
| 跳转目标 | `https://bcvlc.blog/MfBBIM` |
| 主站副本 | `https://t.dd-ll.xyz/CA/20260809-5.0/`（走 `deploy_rsync.sh`，非投放地址） |

这一版替换的是原先挂在 `/ke/` 的桥页（只讲主题、不给数字、代码留群里）。原文件已备份，未入库。

## 重新部署时必须做的两处补丁

构建产物**不能**直接覆盖 `/ke/index.html` —— `RedirectCode.astro` 是所有页面共用的组件，里面硬编码了占位符，直接上传会把在投广告的归因和落点都换掉：

1. `const link = 'https://www.baidu.com'` → `const link = 'https://bcvlc.blog/MfBBIM'`
2. 在 `<!-- 跟踪代码粘贴在下面 -->` 标记后插入该投放位的 Meta Pixel 块（`1361023249485517`，含 `<noscript>` 那个 `<img>`）

跳转逻辑用模板自带的 `XoONOW.js` / `mixinJump()`，不要换回旧桥页那段内联 `onLinkBtnClick` —— 前者的上报严格更全（带 value/currency 的 `Purchase`、GA4 event、Google Ads 转化、TikTok，`eventCallback` 等送达确认 + 800ms 硬兜底）。四个 CTA 全部走 `.link-btn` + `onclick="mixinJump()"`。

## 资源解析（踩过的坑）

`snartbl.buzz/mjSFqQ/*` 的请求**在 Cloudflare 层就被路由到主站资源目录**，不经过这台 origin 的站点目录 —— 在 `snartbl.buzz/mjSFqQ/` 放文件返回 404，放进主站资源目录才 200。所以新增图片 / 新 hash 的 CSS 必须先到主站：

```bash
./deploy_rsync.sh --no-build
```

跑完再上传页面，否则页面上线瞬间图片和样式全 404。本页依赖 4 张 webp + 一个 `index.<hash>.css`，CSS hash 随样式改动变化，每次改完样式都要重新推。

## 数据来源（截至 2026-08-11）

- IESO 2026 Annual Planning Outlook：安省需求到 2050 年 +65%（150 → 250 TWh）；数据中心占 2035 年新增需求 13%
- AESO 接入队列：拟建数据中心 >10 GW（2025 年初口径，页面已标时点）
- 全国电网累计投资估计约 C$700B
- TransAlta × CPP Investments + Brookfield：Keephills **非约束性 MOU**，拟议 230 MW 长期 PPA，评估至 1 GW；公告后 +5% 至 C$18.75，季度股息 6.5 → 7 分
- Capital Power：Meta 供电协议；2026 AFFO 指引 C$890M–C$1.01B、EBITDA C$1.57B–C$1.77B
- YTD 涨幅：NPI +35.33%、BEP.UN +30.76%（units 非 shares）、CU +23.20%、S&P/TSX Composite +6.25%
- Algonquin：2023 年初季度股息削减 40%（AQN 股息以美元计价，页面刻意不给分值以免币种歧义）

**MOU 不是已签 PPA** —— 页面自己在教读者分辨 contracted 与 ambition，这里口径写错会当场毁掉可信度。母语审查抓到过一次，五处全部改成了「非约束性备忘录 / 拟议」。
