源点AI 4K 电视品牌总览海报

交付文件位于 output/poster/：
Yorigen_Brand_Poster_3840x2160.html：可离线打开的单文件 HTML，内嵌 Logo、三个原始截图和两个矢量二维码。
Yorigen_Brand_Poster_3840x2160.png：3840 × 2160 px，16:9，RGB，内嵌 sRGB 配置；电视播放使用此文件。

需求依据：2026-10-12 用户提供的海报方案与指定阿织截图。
原图保存在 assets/azhi-user-screenshot.png，1170 × 2532 px。
阿织原图包含状态栏及悬浮设置按钮，均按用户要求原样保留，没有去除或重绘。
Judgment 与阿造直接引用此前拍摄并冻结的 public/assets/judgment/J3-01.png 和 public/assets/azao/ZA2-04-evidence.png。
所有截图完整等比展示；阿造为桌面宽屏，不强裁成手机长图。
使用 public/assets/brand/yorigen-brand-lockup.svg 冻结描边母品牌资产。
配色沿用现有 filmTokens 和 V4 品牌手册：#0D2B45、#22C39E、#5968F2、#FBFBF8。

版式：左侧品牌，中间三产品卡片，右侧双二维码。
主要文字、Logo、截图和二维码在四周 160 px 安全区内。
两个二维码均为 500 × 500 px，Q 级纠错，4 模块白色静区；屏幕播放没有动画或远程资源。
HTML 随窗口等比适配画布，画布本身始终为 3840 × 2160。
HTML 使用本机中文系统字体，不分发系统字体文件；跨设备排版可能有轻微差异，PNG 为定版画面。

在项目根目录重建：
/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 design/poster/build.py
node design/poster/render.mjs
/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 design/poster/verify.py

导出使用已安装 Playwright 和本项目现有 Chrome Headless Shell，不修改影片或产品源代码、不启动产品后台。
校验结果见 output/poster/preflight.json 与 layout-check.json。
检查覆盖：像素尺寸、RGB/sRGB、完整文案、安全边距、无溢出、截图比例及原文件哈希、离线加载、窗口适配、4K/1080p/720p 导出图双二维码解码。
最终还需目视检查；真实 3–8 米观感和扫码距离受电视尺寸、亮度、反光及手机摄像头影响，未作现场实测。
