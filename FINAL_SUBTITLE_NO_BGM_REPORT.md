# Yorigen Brand Film — Final Subtitle / No BGM Report

## Final Verdict

**PASS — 最新最终版仅包含锁定画面与烧录字幕，不包含 BGM、VO 或任何音频流。**

## Final Output

- Video: `renders/final/Yorigen_Final_Subtitle_NoBGM_1080p.mp4`
- SRT: `renders/final/Yorigen_Subtitle_SRT.srt`
- Timing Authority: `renders/final/Yorigen_Subtitle_Timing.json`
- Video SHA-256: `e9a6de7cea0e0f953cdd7d18361f1ba89cd4edbb828eae0bf685631726658ade`

## Media Specification

- 1920×1080
- 30fps
- 76.000s
- H.264 / yuv420p
- High-quality CRF 12 render
- Burned-in final subtitles
- Audio streams: **0**

## BGM Removal

- 删除 BGM WAV、BGM provenance、所有含 BGM 的 MP4。
- 删除 BGM generator、determinism validator、audio validator 与 Remotion audio track component。
- Final Composition 不加载 `Audio`、`staticFile(audio)` 或任何音频资源。
- `public/audio` 已退出工作区。

## 0–27s Background Continuity Fix

- 根因：Camera transform 曾施加在整张 `Field` 上，导致背景渐变跟随主体缩放、平移并露出底层画布，形成横向带状和矩形分割。
- 修复：`Field` 现在将固定全画幅背景与可运动内容层分离；Camera 仅作用于路径、节点及文字等世界层。
- 范围：修复覆盖 0–27s 暗场，并统一消除后续使用 Camera transform 时的同类边界风险。
- 顶部色带修复：移除暗场低色差纵向渐变，改用统一 Deep Navy；避免渐变在 8-bit H.264 中量化为可见的水平色阶。
- 保持：字幕、主体构图与 Shot timing 未改变。KF01–KF03 仅因本次暗场背景修订重新锁定哈希；KF04–KF07 保持原哈希。
- 抽查：直接检查 0.5s、6.0s、10.0s、12.0s、15.0s、20.0s、26.0s、26.5s 的渲染帧，并复查成片编码后的 6.0s、10.5s、26.5s；未发现矩形接缝。
- 顶部复查：再次检查编码后 10.5s、20.0s、26.5s；暗场顶部为连续单一色面，无双色分界。

## S04 Narrative Timing Amendment

- 生命周期更新为 `Judgment → Growth → Control → Three Directions`。
- 17.3–20.6s 仅显示 Growth；21.1–24.6s 仅显示 Control，Judgment 与 Growth 的 path / node / label / question opacity 均严格为 0。
- 24.6–25.2s 仅进行一次克制的 Synthesis Reveal；25.2–26.0s 三方向完整保持。
- KF03 Anchor 从 master frame 660 移至 756；Approved KF03 SHA-256 保持 `a426c8a10f8d5b62cebe2c4d550426e82d6ddca6887e43c9d0bab3c73e6e1342`，PNG 像素未变化。
- 新增 `verify:s04-narrative`：验证 master frame 660 为 Origin + Control only，并防止 Judgment / Growth 在 21.1–24.6s 提前回亮。
- 编码后抽查 22.0s 与 25.2s：分别为 Control only 与 Approved Three Directions。

## Final Copy / Product Naming Refinement

- 删除 S02/S03 画面内重复出现的「AI 能做的事越来越多，也越来越快。」及旧 Anchor 辅助文案；9.0s 编码帧确认无该文案。
- S09 Parallel 为三个英文方向补充对应中文产品名：`JUDGMENT / AI 判断力测试`、`GROWTH / 阿织`、`CONTROL / 阿造`。
- 1:07 编码帧确认三组中英文标签完整、无碰撞，并未遮挡 Path、Origin 或字幕。
- KF02 因本次明确批准的画面文案删除更新验证哈希为 `5f22bba38c974e298e955231b94c9bf7794bcb3b44fb3ff6e7b4b70e14db5dc9`；其余六个 Anchor 哈希未变化。

## History / Temporary Cleanup

已从工作区移除：

- Gate 2 截图、截图压缩包与 capture 文件；
- Gate 2–6A 历史报告及上一版 Final BGM 报告；
- Keyframe、Motion V1–V6、Review、fix clips；
- determinism / verification / layout audit 图片；
- scratch voice / Candidate A/B 临时归档；
- 历史 Keyframe、Motion、Review、BGM 一次性渲染脚本与 Composition。

为避免不可恢复删除，上述内容已移到 macOS 废纸篓：

`/Users/lijian/.Trash/yorigen-brand-film-cleanup-20260915`

保留内容仅包括：当前源码、冻结产品素材、Brand Assets、Source Audit、Shot Content Freeze、Production Blueprint、最新最终版及字幕 sidecar。

## Verification

- `pnpm typecheck`: PASS
- `pnpm lint`: PASS
- `pnpm compositions`: PASS
- `pnpm verify:assets`: PASS
- `pnpm verify:subtitles`: PASS
- `pnpm verify:s04-narrative`: PASS
- `pnpm verify:motion-anchors`: 7 / 7 bit-identical PASS
- `pnpm verify:final-media`: PASS
- Final render audio streams: 0
- BGM runtime references: 0

## Final Workspace State

`renders/` 仅保留：

1. `Yorigen_Final_Subtitle_NoBGM_1080p.mp4`
2. `Yorigen_Subtitle_SRT.srt`
3. `Yorigen_Subtitle_Timing.json`

后续如加入 Founder 真人旁白，应在独立的 VO mixing/mastering 流程中处理，不修改当前 Picture 与 Subtitle Lock。
