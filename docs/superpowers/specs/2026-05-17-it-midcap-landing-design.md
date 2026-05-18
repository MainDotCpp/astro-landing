# 设计文档：意大利中小盘价值发现落地页（IT · v4.0 · 数字原生风）

- 日期：2026-05-17
- 状态：已批准，实施中
- 路径：`src/pages/IT/Gianluca Paolucci/20260517-4.0/index.astro`

## 主题

意大利 FTSE Mid Cap 被低估公司——数据发现式开局 + 清单悬念转化

## 视觉系统

- 底色 `#FAFAFA`，主文字 `#111111`，次要 `#6B7280`
- 涨色 `#059669`，跌色 `#DC2626`，强调/CTA `#2563EB`
- 卡片边框 `#E5E7EB`
- 字体：Inter + JetBrains Mono（数字）
- 动效：fade-up + countUp（IntersectionObserver，无三方库）

## 页面结构

1. Sticky 报头
2. Hero 大数据钩子（-34% 估值折价）
3. 三张数据对比卡片（P/E, Yield, 增长）
4. 为什么被低估（三条结构性原因）
5. 筛选标准（5 条）
6. 模糊名单转化块（5 家遮罩公司）
7. 人设块（简化版）
8. CTA Finale（WhatsApp 绿按钮）
9. 合规 Footer（复用 ITComplianceFooter）

## 合规

- 所有数字 "indicativi a scopo illustrativo"
- 模糊名单 = "观察列表"非推荐
- 每块含免责小字
- Footer 全量合规声明
