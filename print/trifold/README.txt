源点AI｜210 × 140 mm 三折页制作源

最终交付：output/pdf/
尺寸 Authority：用户转述设计师明确要求，整张展开净尺寸 210 × 140 mm。
不再使用“折后 A5”的错误尺寸前提；210 × 140 mm 是指定生产尺寸。
文字 Authority：content.json（用户定稿），本次未修改。
面序：已确认标准包心折，外侧折入页／封底／封面。
版式：build.py；三栏名义等宽，各 70 mm，折后约 70 × 140 mm。
整张净尺寸必须保持 210 × 140 mm；具体生产折位由印厂按纸张确认。
输出净尺寸 CMYK PDF（210 × 140 mm）与四周 3 mm 出血 CMYK PDF（216 × 146 mm）。
文件均为 2 页：第 1 页外侧，第 2 页内侧；不附额外标记页或裁切标记区域。
Logo：引用 public/assets/brand/yorigen-origin-y.svg 原文件。
截图：assets/ 下三张冻结影片画面，不修改影片或产品源码。

重排说明
正文重新排版至 7.5–8.2 pt，不是将 444 mm 旧稿整体缩放。
产品截图用于场景识别，旁边的矢量正文承担阅读内容。
主体三栏文字框距离名义折线与左右裁切边各至少 5 mm；上下至少 4 mm。
内页的总标题及导语属于展开通栏区，不要求各自在单一折面内。
主二维码边长 24 mm，次二维码 20 mm，均含 4 模块白色静区。
保留旧版已经采用的文案取舍：可选三行内页页脚不重复呈现；产品长期主张已作为标题逐字呈现。

依赖与重建
使用本机 Codex Python runtime，reportlab、pypdf、Pillow，以及 tmp/pdfs/deps 下的 fonttools、svglib、zxing-cpp。
中文字体来自本机 PingFang SC；最终 PDF 嵌入字体子集。
在仓库根目录运行：
/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 print/trifold/build.py
pdftoppm -r 160 -png output/pdf/Yorigen_Trifold_Print_216x146mm_Bleed3mm.pdf tmp/pdfs/print-check
pdftoppm -r 160 -png output/pdf/Yorigen_Trifold_210x140mm.pdf tmp/pdfs/net-check
/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 print/trifold/preflight.py

如需重新提取现有冻结影片画面：node print/trifold/render-stills.mjs

检查覆盖
78 项文字字符串完整性；两份文件各 2 页的全部页面边界，误差小于 0.001 mm；
UserUnit=1、Rotation=0、PrintScaling=None；主体分栏安全距离与文字框不重叠；
字体嵌入；图片 CMYK；两个最终 PDF 的二维码在 160 dpi 与 80 dpi 渲染图正确解码。
交付前还需逐页目视检查最终渲染图。

旧稿仅作追溯，不再用于生产：
archive/20261007-replaced-dimensions/：更早的 442 × 210 mm 稿。
archive/20261010-replaced-444x210mm/：错误尺寸前提下的 444 × 210 mm 稿及原交接说明。
生产限制详见 output/pdf/印刷说明.txt；未做实体打样或印厂专用 ICC 校样。
