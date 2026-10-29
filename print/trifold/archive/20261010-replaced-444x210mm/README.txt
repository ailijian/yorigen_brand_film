源点AI A5 三折页制作源

最终交付：output/pdf/
文字 Authority：content.json（用户定稿）。
面序：用户于本任务中确认标准包心折，外侧折入页／封底／封面。
版式：build.py；折后标称 A5（148 × 210 mm），标准设计展开 444 × 210 mm。
本次不预扣包心折收口量；具体生产收口由印厂刀模确定。
输出净尺寸 CMYK PDF（444 × 210 mm）与四周 3 mm 出血 CMYK PDF（450 × 216 mm）。
两份文件无额外裁切标记区域，文件名即真实页面宽高。
Logo：引用 public/assets/brand/yorigen-origin-y.svg 原文件。
截图：assets/ 下三张冻结影片画面，源自现有 Master；不修改影片或产品源码。

构建使用本机 Codex Python runtime，reportlab、pypdf、Pillow，以及本任务临时安装到 tmp/pdfs/deps 的 fonttools、svglib、zxing-cpp。
中文字体来自本机 PingFang SC；最终 PDF 已嵌入字体子集，不要求印厂另装字体。

在仓库根目录运行：
/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 print/trifold/build.py
pdftoppm -r 160 -png output/pdf/Yorigen_A5_Trifold_Print_450x216mm_Bleed3mm.pdf tmp/pdfs/print-check
pdftoppm -r 160 -png output/pdf/Yorigen_A5_Trifold_444x210mm.pdf tmp/pdfs/net-check
/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 print/trifold/preflight.py

如需要重新提取现有冻结影片画面：
node print/trifold/render-stills.mjs

本任务最终 PDF 已逐页目视检查，并通过：
- 78 项文字字符串核对；
- 两份 PDF 的两页 MediaBox / CropBox / TrimBox / BleedBox 实测到 0.001 mm；
- UserUnit=1、Rotation=0、PrintScaling=None；
- 名义分栏安全距离；
- 全部字体嵌入；
- 三张图片在两个版本中均为 DeviceCMYK；
- 两个二维码从两个最终 PDF 的 160 dpi 与 80 dpi 渲染图正确解码。

旧版 442 × 210 mm 工艺补偿稿与 458 × 226 mm 带标记稿移到 archive/20261007-replaced-dimensions/，不再作为当前交付。

生产限制详见 output/pdf/印刷说明.txt；未做实体打样或印厂专用 ICC 校样。
