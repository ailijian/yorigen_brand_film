源点AI 4K 展会海报

交付文件位于 output/poster/：
Yorigen_Brand_Poster_3840x2160.html：可离线打开的单文件 HTML，内嵌 Logo、三个原始截图、两个矢量二维码和用户提供的公众号原码。
Yorigen_Brand_Poster_3840x2160.png：3840 × 2160 px，16:9，RGB，内嵌 sRGB 配置；电视播放使用此文件。

需求依据：2026-10-12 用户提供的海报方案与指定阿织截图。
同日按用户要求，面向普通展会观众简化文案；主标题改为“让 AI 帮你学习，帮你做事”。
用“AI 的话该不该信、从想做的事开始学、看清做到哪和好不好”解释三个产品，保留正式产品名、原始截图、网址和现有版式。
没有新增免费、零基础保证、包学会或自动完成全部工作的承诺；阿造仍限定为用 AI 做软件，不泛化为万能生活助手。
此前版本及源模板保留在 archive/20261012-before-expo-copy/，不修改冻结品牌资产或其他宣传物料。
同日按用户要求加入微信公众号二维码，原文件保存为 assets/wechat-official-qr.jpg，344 × 344 px，JPEG，含品牌标志，字节未改动。
公众号原码解码地址：http://weixin.qq.com/r/mp/qSdgeDDEN21IrXQb93K7。没有重新生成、绘制或替换原码。
加入公众号前的展会版及源文件保留在 archive/20261012-before-wechat-qr/。
原图保存在 assets/azhi-user-screenshot.png，1170 × 2532 px。
阿织原图包含状态栏及悬浮设置按钮，均按用户要求原样保留，没有去除或重绘。
Judgment 与阿造直接引用此前拍摄并冻结的 public/assets/judgment/J3-01.png 和 public/assets/azao/ZA2-04-evidence.png。
所有截图完整等比展示；阿造为桌面宽屏，不强裁成手机长图。
使用 public/assets/brand/yorigen-brand-lockup.svg 冻结描边母品牌资产。
配色沿用现有 filmTokens 和 V4 品牌手册：#0D2B45、#22C39E、#5968F2、#FBFBF8。

版式：左侧品牌，中间三产品卡片；右侧上方快测大码，下方官网和公众号并排。
主要文字、Logo、截图和二维码在四周 160 px 安全区内。
快测码 500 × 500 px，官网码 400 × 400 px，均为 Q 级纠错、4 模块白色静区。
公众号码显示原图 344 × 344 px，四周另加 28 px 白边，总计 400 × 400 px；保留原有静区及中心标志。
屏幕播放没有动画或远程资源。公众号关注流程仍需用微信现场确认，不以二维码成功解码代替关注成功。
HTML 随窗口等比适配画布，画布本身始终为 3840 × 2160。
HTML 使用本机中文系统字体，不分发系统字体文件；跨设备排版可能有轻微差异，PNG 为定版画面。

在项目根目录重建：
/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 design/poster/build.py
node design/poster/render.mjs
/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 design/poster/verify.py

导出使用已安装 Playwright 和本项目现有 Chrome Headless Shell，不修改影片或产品源代码、不启动产品后台。
校验结果见 output/poster/preflight.json 与 layout-check.json。
检查覆盖：像素尺寸、RGB/sRGB、完整文案、安全边距、无溢出、扫码区元素两两间距、截图和公众号码原文件哈希、离线加载、窗口适配、4K/1080p/720p 导出图三个二维码解码。
最终还需目视检查；真实 3–8 米观感和扫码距离受电视尺寸、亮度、反光及手机摄像头影响，未作现场实测。
