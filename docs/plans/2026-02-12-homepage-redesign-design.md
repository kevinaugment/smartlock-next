# Homepage Redesign — Industrial Authority Style

## Design Direction

**风格定位**: 行业权威感 — 精密工具站风格，类似 Linear / Figma 的专业感
**核心手法**: 暗色 Hero + SVG 拓扑图案 + 精简结构 + 极致排版

---

## Structure: Before → After

| Before (6 sections) | After (3 sections) |
|---|---|
| Hero (generic SaaS) | Hero (SVG 拓扑背景 + stats 融入) |
| Stats Bar (独立) | *(merged into Hero)* |
| Categories Grid (7 cards) | Categories (保留，微调样式) |
| Calculators (8 cards) | Calculators (Top 4 + View All) |
| "Why Choose?" Features | *(deleted)* |
| CTA "Ready to Get Started?" | *(deleted)* |

---

## Section 1: Hero (Redesign)

**背景**: 保持 `--color-bg-dark` (#0f172a) 深色
- 叠加一个半透明 SVG 拓扑图案（锁图标 + 网络节点 + 连接线），opacity ~0.06
- SVG 内联在 JSX 中，纯 path 元素，零依赖

**布局**: 左对齐（从居中改为左对齐，更有力量感）
- 大标题: "Smart Lock Engineering Hub"（更专业的措辞）
- 副标题: "Technical guides, decision tools, and protocol documentation for access control systems"
- 两个 CTA 按钮保持不变

**Stats**: 融入 Hero 底部，作为一行 4 列 mono 字体数字
- 用细分割线隔开，`opacity: 0.6`，不抢视觉焦点

---

## Section 2: Categories (微调)

**保留现有 3 列 icon-card grid**，改进：
- Section 标题从 "Explore by Category" 改为 "Knowledge Base"（更简洁）
- 删除副标题文字（"Find exactly what you need..."）
- "View All Articles →" 链接保持

---

## Section 3: Calculators (精简)

**从 8 个缩减到 Top 4**（最有价值的工具）:
1. TCO Calculator
2. Battery Life Calculator
3. Protocol Selection Wizard
4. Signal Strength Analyzer

**布局**: 保持 2×2 grid，现有 icon-card 横向布局
- "View All Calculators →" 链接保持

---

## CSS Changes

### 新增
- `.hero--topo`: Hero with SVG topology background layer (position: absolute, pointer-events: none)
- `.hero--left`: Left-aligned hero text variant
- `.hero__stats`: Inline stats row inside hero

### 删除/清理
- 删除 "Why Choose" 和 CTA section 的 JSX（CSS 保留不动，可能被其他页面使用）

---

## Files Modified

| File | Change |
|---|---|
| `app/page.tsx` | 重写 Hero、精简 Calculators 到 Top 4、删除 Features 和 CTA sections |
| `app/globals.css` | 新增 `.hero--topo`, `.hero--left`, `.hero__stats` 样式 |

---

## Verification

1. `npm run build` 无错误
2. 浏览器截图对比 before/after
3. 移动端 375px 视口检查响应式
