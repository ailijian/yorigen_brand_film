# SOURCE AUDIT

> 项目：《从一个源点出发》 / FROM ORIGIN TO AGENCY  
> 审计角色：Source Audit Lead / Product Reality Scout  
> 审计快照：2026-09-11 10:56 CST 左右；四个产品仓库均在并行开发，本报告冻结于已观察到的这一时点，不追踪其后的持续变更。  
> 边界：只做真实产品、运行态、代码实现与视觉体系审计；未创建 Remotion、Storyboard、影片代码，也未作最终镜头选择。

## 1. Executive Summary

本轮能够支撑下一轮 Shot Content Freeze，但四个产品的证据成熟度不同，不能等量使用。

| 对象 | 真实产品命题 | 本轮最强证据 | 可拍摄性结论 | 必须保留的边界 |
| --- | --- | --- | --- | --- |
| Web | 需要什么，就从哪里开始 | 当前源码 + 当前本地运行态 + 5 张 1280×720 截图 | Origin / 点 / 路径适合 Film-native；页面段落可 Runtime capture | 三个产品是并列入口，不是使用漏斗 |
| AI 判断力快测 | AI 给出答案，判断还得由你来做 | 当前 D2 源码、当前完成/结果/分享运行态；真实题目和四动作 | 8–10 秒内可讲清，推荐受控的 Real UI reconstruction | 结果是本次免费快照，不是完整 AI 能力评级 |
| 阿织 | 把想学会的，变成自己的能力 | 当前 V3 源码中的 Goal → Action → Evidence → Review → Capability 闭环 | 产品语义成立；当前 V3 清洁运行态画面仍缺，推荐先补受控状态再重建 | Activity 完成不等于能力；Evidence candidate 不等于 verified |
| 阿造 | AI 负责执行，产品始终由你掌控 | 当前真实 UI + 仓库内确定性 Fixture + 9 张 1440×900 截图 | 最适合直接 Runtime capture | Agent Claim 不是产品事实；用户确认 Boundary 后才执行/验证 |
| 新视觉体系 | 从一个源点出发，沿路径形成 Growth / Control 信号 | 3 份提供的 SVG | 适合抽取为可复用 Motion Primitive | Logo 几何必须作为可替换资产，不得在 Shot 中复制 path |

**事实源优先级**：本轮用户要求与冻结创意方向 → 当前源码/契约 → 当前运行态 → 仓库内 Fixture → 历史验收证据。截图只证明其捕获时的状态，不自动证明线上发布状态。

**核心导演判断**：

- Web 提供品牌世界和三个并列问题；不要把它剪成 Assessment → 阿织 → 阿造的线性转化漏斗。
- 判断力快测最短的可理解闭环是“看到 AI 建议与事实 → 选择信/改/查/停 → 看见为什么”；只拍四个按钮不够。
- 阿织必须拍到状态变化落在 Evidence、Review、Capability 或 Next Action 上，否则会退化成课程列表、打卡或聊天助手。
- 阿造必须拍到 Boundary / Human Decision / Evidence 的因果链；“AI 已完成”应先作为待验证声明出现，而不是胜利终点。

截图目录：[`screenshots/web`](screenshots/web/)、[`screenshots/judgment`](screenshots/judgment/)、[`screenshots/azhi`](screenshots/azhi/)、[`screenshots/azao`](screenshots/azao/)。

## 2. Web

**审计对象**：`YorigenAI/web`；首页 `/`；本轮以源码和 `pnpm dev` 的本地运行态为主要事实源，而不是仅凭线上页面印象。

**当前首页真实信息架构**：

1. Header：品牌入口、产品、课程与内容、企业、开始。
2. Origin Field / Hero：先问“你现在最想推进什么？”，给出四个起点；收束为“看清自己，织成能力，掌控成果。”
3. Three Questions：滚动叙事依次出现时代变化、判断、成长、掌控，再回到源点AI。
4. Spatial Products：同一个源点的三个并列方向——看清自己 / AI 判断力快测、织成能力 / 阿织、掌控成果 / 阿造。
5. Reality：从“AI 说做完了，不代表真的做完了”推进到 Evidence 与能力形成。
6. Open Surface：再次强调“不必按顺序，也不必全部使用”，提供三个产品入口、阿源、内容与企业入口。
7. Footer：Yorigen AI 与“把 AI 认知变成真实能力”。

**Hero / Origin Field**：主标题“你现在最想推进什么？”不是一句品牌宣言式静帧，而是交互起点。四个意图按钮分别对应判断、能力、产品和“还不知道从哪里开始”。背景由大尺度 Y、源点和分叉路径构成；指针会让场偏移/响应，焦点、触屏或 reduced-motion 下保持完整静态场。它既能作为影片开场空间，也保留了“从真实需要出发”的产品含义。

**Y / 点 / 路径组件**：`OriginField` 负责 Hero 场；`QuestionVisual`、`RealityField`、`CapabilityFields`、`OpenSurface` 延续点、路径、场与节点。Y 是品牌结构，点是起点/判断锚点，路径用于表达方向和状态推进。页面没有把方向画成固定产品漏斗。

**三个时代问题**：`ThreeQuestions` 是宽屏 sticky scroll story。`useNarrative` 在桌面且未开启 reduced motion 时测量滚动区，用 `requestAnimationFrame` 写入进度；在移动端或 reduced motion 下转为完整静态阅读。四个叙事状态为：

- 时代变化：“AI 正在让每个人能做的事情快速变多。”
- 判断：“AI 给出的结论，我到底该不该信？”
- 成长：“AI 越来越强，我自己到底有没有变强？”
- 掌控：“AI 可以持续做产品，但产品是否仍然在我的掌控中？”
- 品牌收束：“看清自己，织成能力，掌控成果。”

**产品空间**：`SpatialDifferentiation` 不是三张同质卡片。三个方向共享一个源点与空间场，但在版式、路径与信息层级上分区。产品文案来自 `lib/directions.ts`，本轮运行态的三个产品动作尚未接到完整公开目标页，而是空目标/对话式占位；影片不能暗示已存在的公开转化链路。

**页面核心动效与技术**：React 19 + Vinext SSR；视觉主要是 CSS 与 inline SVG。没有 Canvas、WebGL、Three.js 或 Framer Motion 等 motion library。动画由原生滚动、`requestAnimationFrame`、`IntersectionObserver`、CSS animation/transition 完成；典型时长约 160–880ms，包括路径绘制 800ms、源点出现 450ms、意图出现 500–550ms、路径/状态过渡 180–440ms。所有关键区均有 `prefers-reduced-motion` 处理。

**可脱离页面单独运行的动画**：

- Origin Field 的源点出现、Y/分叉路径 draw-on、指针响应场。
- Three Questions 的阶段进度映射与 `QuestionVisual` 状态切换。
- Spatial Products 的路径/节点/产品场状态。
- Reality 的声明 → Evidence → 能力形成路径。
- Open Surface 的可见性触发、点与路径收束。

这些都依赖较少页面状态，适合抽象为影片原生动效；但应重用语义与视觉规则，不应把 React DOM 动画逐帧搬进影片。

**旧 Logo 出现位置**：`public/brand/yorigen-mark-mono.svg` 被 Header 的 `.brand-mark` 作为 CSS mask 使用；旧品牌还进入 favicon、PWA/Apple/Windows 图标和 `og-image-1200x630.png` 等社交资产。它与本轮提供的新 SVG 视觉体系不是同一资产版本。拍摄当前页面时会拍到旧标；若进入正式成片，品牌负责人需决定保留“真实当时 UI”还是用批准的新资产做合规覆盖。

**最适合复用的 5 个真实视觉瞬间**：

| 次序 | 瞬间 | 为什么成立 | 截图 |
| --- | --- | --- | --- |
| W1 | Origin Field + “你现在最想推进什么？” | 同时建立源点、选择与四个真实起点 | [01 Hero / Origin Field](screenshots/web/01_hero_origin_field.png) |
| W2 | 第一个时代问题：判断 | 直接承接“AI 结论该不该信” | [02 Judgment question](screenshots/web/02_three_questions_judgment.png) |
| W3 | 三问收束为品牌命题 | 从问题转到“看清、织成、掌控” | [03 Synthesis](screenshots/web/03_three_questions_synthesis.png) |
| W4 | 三个并列产品空间 | 证明三者是不同方向而非漏斗 | [04 Spatial products](screenshots/web/04_spatial_product_fields.png) |
| W5 | Result / Evidence / Ability | 为后续产品片段建立共同的“真实成立”标准 | [05 Reality](screenshots/web/05_reality_result_and_ability.png) |

## 3. AI Judgment

**真实入口与产品边界**：入口为 Web 首页 `/`，首屏文案“你真的知道什么时候该信AI吗？”；无需登录、免费开始、几分钟完成。正式流程是一个不计结果的教学例题，再从 8 道内部批准题中抽取 5 道。结果明确写着“这是你在这 5 个 AI 场景里的判断记录，不代表完整 AI 应用能力。”

**信 / 改 / 查 / 停的真实含义**：

- 信：当前建议可直接采用。
- 改：核心方向成立，局部修正后采用。
- 查：缺少一个可能改变是否采用建议的关键事实，先补这个事实。
- 停：停止当前建议的核心动作；之后仍可以做别的事，包括重新查证。

教学反馈还明确：动作针对“AI 当前这条建议”，不等于接下来整个任务能不能继续。这是 8–10 秒理解命题的关键，不应删成四个无解释按钮。

**3–5 道最适合画面的真实候选题**：

| 题目 | 主要动作 | 画面中的关键矛盾 | 适合影片的原因 |
| --- | --- | --- | --- |
| “这套新周报，要怎么往下走？” | 改 | 一个小组的证据不能直接扩张到所有小组 | 能直观看到 Boundary / scope |
| “AI把下一步也排好了” | 改 | “试办后再决定”被 AI 排成提前承诺后三场 | 能体现不是拒绝 AI，而是修正决定边界 |
| “8个网页，都写着同一个数字” | 查 | 八个页面可能共同转载，并非八份独立证据 | “网页数量 ≠ Evidence 数量”极易理解 |
| “现在还能报名吗？” | 查 | 当前 16:07，但余量数据同步于 09:02 | 时间戳把“事实仍需判断”视觉化 |
| “三个AI都给了同一个答案” | 停 | 三个模型读的是同一份不明确原始说明 | “模型数量增加，Evidence 数量没有增加”与品牌命题高度贴合 |

另一个强候选是“新版结账，明天切吗？”→停：10 人成功不能抵消 2 人在核心付款路径失败，产品 Takeaway 为“Evidence 不是投票”。

**Result / AI 判断力快照**：当前 D2 已存在完成页、免费结果、分享、退出和自愿反馈。快照包含 5 次选择 Trail、一个“最值得回看”的 Aha、用户选择与更合适动作、原材料中的关键 Evidence、Takeaway 和“下次可以先问自己”。分享卡由浏览器 Canvas 生成 1080×1440 PNG，提供“洞察/挑战”两类。当前完整付费复盘明确标记为“尚未开放”，不能在影片中暗示可购买或已经可用。

**页面 Transition**：四动作按钮采用约 160ms CSS transition；答案提交成功显示“判断已记录”，约 700ms 后进入下一题；背景点阵有 7s 呼吸循环；reduced-motion 会关闭动画/过渡。页面切换依赖 React state，不依赖视频或第三方动画库。

**Demo State / 依赖**：`pnpm judgment:preview` 会构建当前前端并启动真实 API 与隔离的临时 PostgreSQL，退出后删除记录。无需登录、无需模型调用。题库固定，但每次从 8 题中随机组 5 题并满足动作配额，当前没有面向拍摄的确定性 URL / seed / fixture；所以“指定题目 + 指定结果”的 Runtime capture 不是天然稳定的。

**3 个 8–10 秒候选流程**：

1. **J1 教学例题（理解最快）**  
   Start State：AI 写好已核对的读书会通知，四个动作同时出现。  
   → Action：用户点“信”。  
   → End State：弹层说明“这一次，直接‘信’是合理的”，并完整定义信/改/查/停。  
   8–10 秒理解判断：**强**；观众能看到判断不是一律怀疑 AI。  
   证据：[教学反馈（当前 D2）](screenshots/judgment/12_current_tutorial_feedback.png)。

2. **J2 八个网页并非八份 Evidence**  
   Start State：“8个网页，都写着同一个数字”，但尚未找到原始数据或独立来源。  
   → Action：用户点“查”。  
   → End State：“判断已记录”；后续快照可落到“网页数量，不等于证据数量”。  
   8–10 秒理解判断：**强**；需要在镜头内保留“未找到原始依据”这一事实。  
   证据：[题目](screenshots/judgment/06_question_verify_sources.png)、[选择已记录](screenshots/judgment/07_action_saved_verify.png)。这两张题目态捕获于 D2 结果功能合入前，题面/动作仍可作为真实内容证据，但不得据此表现旧版可返回改答案的行为。

3. **J3 三个模型同意，也可能只有一个来源**  
   Start State：“三个AI都给了同一个答案”，原始说明却并未明确确定日期。  
   → Action：用户点“停”。  
   → End State：结果 Aha 显示“模型数量增加了，Evidence数量没有增加。”  
   8–10 秒理解判断：**最直接贴合宣传片命题**；但真实运行必须先完成 5 题，影片需要受控预置状态或源代码等价重建。  
   证据：[停已记录](screenshots/judgment/10_question_stop_same_source.png)、[当前 D2 快照](screenshots/judgment/14_result_snapshot_top.png)、[分享卡](screenshots/judgment/16_share_card_mobile.png)。

补充运行态：[5 次完成页](screenshots/judgment/13_completion_mobile.png)。`01–11` 为并行开发期间较早的题目态/交互态；`12–16` 才是本轮冻结时点的当前 D2 完成/结果链。

## 4. Azhi

**当前产品事实**：阿织是 Expo Router / React Native 应用，当前 V3 以四个主 Tab 组织：现在、地图、阿织、成长。它不是“课程列表 + AI 对话”，而是把一个明确 Goal 投影为唯一 Current Next Action，再通过活动、提交、证据和人类 Review 推进 Capability。

**真实能力闭环**：

`Learning Goal（用户明确确认） → Current Next Action → Map Node → Learn / Try / Practice / Capability validation → Attempt / Submission → Evidence candidate → Human Review / applicability / quick challenge → Capability / Gate / Milestone → Next Action`

关键语义如下：

- **Capability / Learning Goal**：Goal seed 先形成候选目标、路线与第一动作，只有用户明确确认后才创建正式 Goal。
- **用户起点**：Now 页显示当前 Goal、唯一“现在先做这件事”、为什么是这一步、预计时间、设备和地图位置，而不是泛化推荐列表。
- **Node**：Map 显示阶段、能力结果、节点状态、当前 beacon 与 milestone；节点是能力路径位置，不只是课程目录项。
- **Learn / Try / Practice / Apply**：Activity 可能是学习、尝试、练习或能力验证；页面有开始、提交、结果摘要与 AI/人工协助披露。Apply 体现在真实任务/产物与 Evidence 的适用性，而不是单独打卡。
- **Evidence**：提交先形成 candidate；Evidence Detail 可见 candidate / verified、人工审查、标准与 provenance。
- **Progress / Growth**：Growth 汇总 candidate / verified / rejected 数量、Capability 状态与 Milestone，并明确“课程完成不自动代表掌握”。
- **Next Action**：每次确认后的下一步仍是唯一、可解释、与地图位置一致的动作。

**为什么不应拍成普通 AI 助手**：对话只是辅助层；产品判断落在目标确认、行动、提交、证据、Review 和能力状态变化。只拍“问阿织”或学习列表会丢失其真实差异。

**本轮图片证据的严格限制**：仓库没有可直接交付的当前 V3 清洁截图。现有 7 张图片来自历史迁移目录中的**已验收 D2 真机证据**，可佐证早期 Now / Map / Reference Practice 的产品语义，但不是当前 V3 运行态。图中蓝色悬浮齿轮也是历史测试环境覆盖物。尤其 `03–07` 的跨设备 Reference Practice 明文说明：产品执行结果不等于能力、Evidence、Gate 或 Foundation Completion；这条历史链不能被剪成“完成产品 = 学会能力”。

**3 个 10–12 秒候选流程**：

1. **ZH1 从 Goal 到唯一 Next Action / Map Node**  
   开始：用户已有“AI Builder 入门实战”目标，但不是面对课程列表。  
   ↓ 发生：Now 解释“现在先做这件事”与为什么，用户点“在地图中查看”。  
   ↓ 结束：Map 聚焦当前阶段和节点，前后路径仍可见。  
   状态变化：从抽象目标变成可定位、可执行的下一动作。  
   证据（历史已验收 D2）：[Now](screenshots/azhi/01_now_current_action.jpg)、[Map](screenshots/azhi/02_map_node_path.jpg)。当前 V3 应重新捕获同语义状态。

2. **ZH2 Activity → Evidence → Human Review → Capability**  
   开始：用户进入当前 V3 的 Learn/Try/Practice 或 Capability validation，看到完成定义与允许的协助。  
   ↓ 发生：提交 Attempt / Submission，先产生 Evidence candidate；人类按标准 Review，必要时做 applicability / quick challenge。  
   ↓ 结束：Evidence 变为 verified（或 rejected），Growth 中 Capability / Gate / Milestone 更新，并生成下一动作。  
   状态变化：不是“做完一课”，而是“有证据支持能力状态发生变化”。  
   证据：当前 V3 源码与契约已完整表达；**本轮缺少匹配的当前运行态截图，是首要 Missing Asset**。

3. **ZH3 Goal proposal → 显式确认 → 路线与第一动作**  
   开始：用户提出想学会的能力，系统只给候选 Goal / route / first action preview。  
   ↓ 发生：用户检查完成要求和范围，明确确认。  
   ↓ 结束：正式 Goal、路线和 Current Next Action 被创建。  
   状态变化：模糊学习愿望变成用户拥有、可验证的能力计划。  
   证据：当前 V3 `GoalSeedScreen` 语义；本轮没有对应清洁截图，需在下一轮补拍。

历史跨设备参考链可用于理解 Boundary，但不应作为 ZH2 的替代成片素材：[Reference Practice](screenshots/azhi/03_reference_practice.jpg)、[Practice scope](screenshots/azhi/04_practice_scope.png)、[不完整结果与重试](screenshots/azhi/05_result_partial_retry.jpg)、[结果选择](screenshots/azhi/06_result_choice.jpg)、[Reference Review](screenshots/azhi/07_reference_review.jpg)。

## 5. Azao

**当前产品事实**：阿造是 React / Vite 前端运行在 Tauri 桌面壳中，真实数据边界是本地 SQLite / Evidence / receipts。核心页面不是代码输出窗口，而是 `ProductStatusScreen`：Product Goal、当前问题、待决定、待验证、已验证可用、以后处理、排除项与 Next Action 同处一个连续产品状态中。

**对宣传片命题最重要的状态**：

- **Product Goal** 始终可见，决定当前工作为什么存在。
- **Current Work** 由“建议现在先做这件事”给出，但执行前先展示范围、明确不做、验收标准。
- **Coding Agent / execution** 可以生成 Claim 或执行材料；系统明确“编码助手已声明完成，等待验证”。
- **Boundary** 在执行/检查前形成范围候选，包含本轮检查什么、不检查什么和范围 Hash。
- **Human Decision** 有“确认并生成下一步 / 修改建议 / 稍后继续 / 拒绝建议”等真实选择；确认只保存结构化动作，不在聊天中静默发送。
- **Evidence / verification** 区分 Issue、Pending、Verified；旧报告只能作前后语境，不能证明本轮通过。
- **Continuity** 通过不可变 Handoff / receipt、当前任务、最近变化和后续项保留。
- **Next Action** 只基于本轮已验证状态生成，预览明确“不自动扩大产品范围”，再次由用户确认后才形成任务草稿。

本轮截图来自当前真实 UI 与仓库内建的确定性 Playwright Fixture。Fixture 数据是演示状态，不是假造 UI；没有调用真实 AI、没有操作用户真实项目，也没有把 Fixture 结果描述成生产项目事实。

**3 个 10–12 秒候选流程**：

1. **ZA1 真正需要用户决定的修复边界**  
   Start State：Product Status 显示“1 个问题需要先处理”，当前 Issue 为注册成功后仍停留注册页。  
   → Action：系统预览“只修复注册成功后的页面跳转”，列出本次范围、明确不做、验收标准；用户确认。  
   → End State：不可变“修复 Handoff 已保存”，当前问题/待决定/待验证仍清楚。  
   证据：[产品现状](screenshots/azao/01_product_status_issue.png)、[边界决策](screenshots/azao/02_bounded_repair_decision.png)、[Handoff](screenshots/azao/03_handoff_saved.png)。

2. **ZA2 Agent Claim → 全量复核 → Evidence 成立**  
   Start State：编码助手声明完成，但页面明确“这份仍只是一份声明；完整检查后才会更新为已验证”。  
   → Action：用户预览并确认完整重检 Boundary；系统按当前 Task 版本的全部验收标准建立新检查。  
   → End State：3 项标准进入“已验证可用”，当前范围被本轮 Evidence 证明。  
   证据：[待验证声明](screenshots/azao/04_agent_claim_needs_verification.png)、[完整重检预览](screenshots/azao/05_full_recheck_preview.png)、[复核边界](screenshots/azao/06_recheck_boundary.png)、[已验证范围](screenshots/azao/07_verified_scope.png)。

3. **ZA3 结果成立后，下一步仍清楚且仍由人决定**  
   Start State：当前范围已被本轮 Evidence 证明。  
   → Action：系统只预览“建立下一个最小任务草稿”，明确不自动扩大范围；用户复核并确认。  
   → End State：“下一个任务草稿已建立”，外部打开/复制/发送均未在确认中自动发生。  
   证据：[下一任务预览](screenshots/azao/08_next_task_preview.png)、[草稿已保存](screenshots/azao/09_next_task_draft_saved.png)。

这三条链符合“AI 执行，但产品由你掌控”；应避免用右侧对话栏、终端或代码量作为主画面，因为它们不能证明 Boundary、Evidence 或 Continuity。

## 6. Visual System

本轮只读取并渲染检查了三份 SVG，没有修改。它们是视觉语言事实源，不是将 Logo 几何硬编码进影片的许可。

**1. Master Brand Lockup 构成**：`yorigen_brand_lockup_MASTER_FROZEN_V1_bilingual_deep-navy.svg` 标注 Approved / Frozen。画面由 O1 Origin Y、光学对齐后的中文主字标“源点 AI”和辅助英文 `YORIGEN` 组成；官方英文名为 Yorigen AI。SVG 已将字形转为 4 组 outline path，全部为 Deep Navy `#0D2B45`，渲染不依赖字体。影片实现应把整个 SVG 当作一个可替换资产组件，不拆 path、不在多个 Shot 复制。

**2. Origin Y 的几何和视觉特征**：`yorigen_origin_y_MASTER_CANDIDATE_O1_92deg.svg` 的上臂夹角为 92°，两臂长度 300，竖向 stem 长 198，线宽 43，圆头；中心 origin 圆半径 56.5。三条径向线都从 `(0,0)` 出发，两上臂终点约为 `(-215.802,-208.398)` 与 `(215.802,-208.398)`，下 stem 至 `(0,198)`。视觉上是稳定的源点、向上分叉的选择与向下锚定；中心圆覆盖交汇，保持 Deep Navy。

**3. 当前色彩体系**：

| 角色 | 色值 | 用法 |
| --- | --- | --- |
| Warm canvas | `#FBFBF8` | 大面积暖白背景 |
| Surface | `#FFFFFF` | 卡片与浮层 |
| Neutral plane | `#F7F6F2` | 次级平面 |
| Deepest Navy | `#071722` | 最深文字/暗场 |
| Brand Deep Navy | `#0D2B45` | Origin、Logo、品牌主色 |
| Text Navy | `#102A3E` | 正文主文字 |
| Muted | `#6D7E8C` | 次级信息 |
| Hairline | `#D8E0E6` | 边界与结构线 |
| Ghost | `#AEBCC6` | 非激活路径 |
| Growth Signal | `#22C39E` | 能力形成/成长信号 |
| Control Signal | `#5968F2` | 掌控/确认/边界信号 |

**4. Growth Signal**：mint 色的上升/起伏曲线，从实心 origin 出发，经过路径后到空心 checkpoint。它表达能力逐步形成、证据经过检查后继续生长，不应简化为传统折线 KPI 或“自动升级”。

**5. Control Signal**：indigo 色的竖向 rail、checkpoints 与带方向的曲线段。它表达边界、确认、验证、连续推进；方向是状态推进，不是用箭头替代用户决策。

**6. Path / Signal 视觉语言**：品牌默认态不激活路径；产品状态一次只激活一条路径；路径方向不固定编码某个产品；origin 永远保持 Deep Navy；静态品牌签名始终为 Frozen 单色。Master poster 使用 1 条 Primary + 1 条 Ghost，不做多色“线路图”。若在 Y 上做激活，应只在 Frozen silhouette 上以 clip 覆盖一条 arm，之后恢复中心 Deep Navy origin；不得重新绘制或改变 Y 的几何。

**7. 可转换为 Remotion Motion Primitive 的元素**（仅定义未来可用原语，本轮未实现）：

- Origin point：出现、脉冲、halo、由点触发的路径起笔。
- Primary / Ghost path：受控 draw-on、强调切换、由主路径留下 ghost history。
- One-path activation：在 Frozen Y silhouette 内做单路径 sweep，并恢复中心 origin。
- Growth path：mint 曲线推进、实心起点到空心 checkpoint、Evidence 后的继续生长。
- Control rail：indigo rail、checkpoint 逐项确认、Boundary 锁定后的 directed segment。
- Neutral planes：暖白背景、白色卡片、hairline 边界与大留白，用作真实 UI 的共同容器。

**资产规则**：未来只允许通过单一 `BrandMark` / `BrandLockup` 资产接口载入 SVG；Shot 只控制资产的整体位置、尺度、透明度或 clip，不拥有 Logo path。若 Logo 更新，只替换资产，不修改每个镜头。

## 7. Capture Feasibility Matrix

拍摄方式定义：A = Film-native reconstruction（按真实语义重建影片原生画面）；B = Real UI reconstruction（按真实 UI 契约做受控可拍状态）；C = Runtime capture（直接拍运行中的产品）。

| 项目 | 本地命令 / 目标 Route | 推荐 viewport | 登录 | 后端 / 模型 | Fixture / 确定性 | 动画与捕捉 | 推荐方式 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Web | 在 `YorigenAI/web`：`pnpm dev`；`/` | 1280×720 或 1440×810 | 否 | 首页无真实后端、无模型 | 静态内容本身确定；需固定 scroll / pointer 状态 | rAF 随显示刷新；CSS 160–880ms；Playwright 可稳定截图，滚动录制需锁定时间轴 | **A + C**：Origin/路径用 A，真实页面段落用 C；产品卡可 B 做安全裁切 |
| Judgment | 仓库根：`pnpm judgment:preview`；`/` | 390×844（主）；桌面不超过 640 内容宽 | 否 | 需要命令启动的真实临时 API + PostgreSQL；无模型 | 8 题抽 5 题随机，无公开 seed/拍摄 Fixture；单次 session 内可复现 | 按钮 160ms、自动前进 700ms、背景 7s；Playwright 可捕捉 | **B**：预置指定题与结果最可靠；C 适合完整真实流程，不适合精确排片 |
| Azhi | `pnpm start`；验收 `pnpm start:acceptance`；Expo Router 的 Now / Map / Activity / Evidence / Growth 路由 | 真机 390×844 或同等 iPhone 逻辑尺寸 | 是 | 需要真实 Web/API；正常 provider 可调用模型，验收可 `provider_off` | D9 验收有 actor/persona 与确定性 provider mock，但准备过程会重置专用 `_test` 数据库；没有轻量拍摄 Fixture | RN/Reanimated 以设备刷新率运行；典型进入 170–180ms、current pulse 1200ms、beacon 1800/600ms、sheet 150/220ms；有 reduced-motion；Web Playwright 不是正式捕捉面 | **B**：先用受控验收状态获得 V3 真机基准，再按真实组件重建；不建议直接依赖脆弱的跨服务 C |
| Azao | 普通桌面：`pnpm run tauri:dev`；浏览器 Fixture：见表后完整命令；`/welcome`、`/projects/:projectId` 与 Quick Check | 1440×900（主）或 1280×900 | 真实应用需要；Fixture 可注入测试鉴权 | 真实应用使用本地 Tauri/SQLite；模型可选；Fixture 无真实模型/后端 | 仓库内 Fixture 可确定性重现 Issue、Claim、Boundary、Evidence、Next Action | React/CSS；Playwright 截图模式可禁用动画并稳定捕捉；关键语义不依赖动画 FPS | **C**：仓库 Fixture 的当前 UI 最稳；若文字密度不适合成片，再用 B 做源代码等价裁切 |

阿造本轮浏览器 Fixture 的完整启动环境为：`AIBC_PLAYWRIGHT_AUTH_FIXTURE=1 AIBC_PLAYWRIGHT_CONTINUATION_FIXTURE=1 AIBC_PLAYWRIGHT_QUICK_CHECK_FIXTURE=1 AIBC_PLAYWRIGHT_WORKSPACE_FIXTURE=1 AIBC_PLAYWRIGHT_AUXILIARY_FIXTURE=1 pnpm run dev`。真实截图仍应通过仓库的 Playwright 初始化设置测试鉴权；不要把本轮临时审计代理当成产品启动机制。

**FPS / timing 判断口径**：Web 与 Azhi 的循环动效会跟随浏览器/设备刷新率，不是影片级固定帧时间；Judgment 的关键延迟由代码定时器给出；Azao 的审计画面可在截图模式关闭非必要动画。正式录屏仍应使用固定设备、固定刷新率和单独的帧丢失测试，不能把本轮静态截图等同于已验证的 24/25/30fps 成片素材。

## 8. Candidate Film Moments

以下是供导演裁决的候选地图，不是最终 Shot List，也没有替导演选择成片镜头。

| ID | 建议时长 | Start → Action → End | 一眼能懂的命题 | 证据成熟度 |
| --- | --- | --- | --- | --- |
| W1 | 3–5s | 空间中的源点/Y → 用户意图靠近或路径响应 → 四个真实起点成立 | 需要什么，就从哪里开始 | 当前运行态，强 |
| W2 | 4–6s | 时代变化 → 三问依次显现 → 品牌收束 | AI 更强之后，人仍要判断/成长/掌控 | 当前运行态，强；不要把三问拍成漏斗 |
| W3 | 3–5s | 同一源点 → 三条方向展开 → 三个产品空间并列 | 三个并列品牌命题 | 当前运行态，强 |
| W4 | 3–5s | “AI 说做完了” → Evidence → Ability | 结果成立与能力形成都需要依据 | 当前运行态，强 |
| W5 | 2–4s | Open Surface → 三个独立入口 → “不必按顺序” | 用户从自己的需要开始 | 当前运行态，强 |
| J1 | 8–10s | 已核对通知 → 点“信” → 教学反馈解释四动作 | 判断不是逢 AI 必疑 | 当前 D2，强 |
| J2 | 8–10s | 八网页同数字但来源未知 → 点“查” → 记录/Takeaway | 重复信息不等于独立 Evidence | 题面真实；指定结果需 B |
| J3 | 8–10s | 三个 AI 同答案但同一模糊来源 → 点“停” → Aha 快照 | AI 给答案，判断仍由你做 | 当前 D2 结果强；跨 5 题需 B |
| ZH1 | 10–12s | Goal → 唯一 Next Action → Map 当前 Node | 想学会的事被织成行动路径 | 当前源码强；图片仅历史 D2 |
| ZH2 | 10–12s | Activity/Submission → Evidence candidate → Human Review → Capability/Growth | 关注是否真正形成能力 | 当前源码最强；当前 V3 画面缺失 |
| ZH3 | 10–12s | 模糊愿望 → Goal proposal → 用户确认 → 路线/首动作 | 目标由用户确认，系统把它变成可验证路径 | 当前源码强；当前 V3 画面缺失 |
| ZA1 | 10–12s | 真实 Issue → 预览修复 Boundary → 用户确认 → Handoff | AI 可执行，范围由人掌控 | 当前 UI Fixture，强 |
| ZA2 | 10–12s | Agent Claim → 用户确认复核范围 → 3 项 Verified | “说完成”不等于完成，Evidence 才成立 | 当前 UI Fixture，最强 |
| ZA3 | 10–12s | Verified scope → 下一最小任务预览 → 用户确认 → 草稿收据 | 结果连续、下一步清楚且不自动扩张 | 当前 UI Fixture，强 |

**8–10 秒命题测试**：J1、J2、J3 均可让第一次看到产品的人理解“AI 给出建议，动作仍由你判断”；其中 J2/J3 必须让“已知事实/关键 Evidence”与按钮同框或紧邻，不能只用漂亮的结果卡。ZH2 的理解力最高，但只有补齐当前 V3 的 candidate → review → capability 画面后才达到可冻结状态。ZA2 最完整地覆盖 Agent、Boundary、Human Decision、Evidence 四个元素。

## 9. Risks / Missing Assets

| 风险 / 缺口 | 影响 | 下一轮冻结前需要什么 |
| --- | --- | --- |
| 四个仓库持续并行开发 | 截图和源码可能在导演决策后再次漂移 | 用户明确“开发完成”后再做一次窄范围 delta audit；不要现在反复重审 |
| Web 当前 UI 仍使用旧 Logo | Runtime capture 与新版视觉体系不一致 | 品牌方裁决：保留真实 UI、批准覆盖，或等产品资产升级；不能由影片自行改标 |
| Web 三个产品公开目标当前未完全接通 | 拍点击会出现对话/占位，可能暗示不存在的公开路径 | 成片优先拍空间与命题，不拍未成立的跳转 |
| Judgment 题组随机且无拍摄 seed | 难以在时间码上稳定得到 C01/D02 与指定结果 | 增加不改生产含义的拍摄态方案需另行授权；本轮建议源代码等价的 B |
| Judgment `01–11` 来自 D2 完成/结果合入前 | 题目和视觉仍有证据价值，但旧版返回/编辑语义已过时 | 成片以 `12–16` 和当前源码为准；题目态在最终拍摄前重抓 |
| Judgment 完整复盘尚未开放 | 若拍成付费结果，会发明能力 | 只能使用当前免费 Snapshot、Aha、Takeaway 与分享卡 |
| Azhi 没有当前 V3 清洁运行态截图 | 目前不能只凭图片完成 ZH2 / ZH3 镜头冻结 | 在受控 D9 acceptance 环境中补 Now、Map、Activity、Evidence Detail、Review、Growth 的同一 actor 连续截图/录屏 |
| Azhi 现有图是历史 D2，且有蓝色测试悬浮齿轮 | 直接进片会错代、带测试覆盖物 | 只作参考，不作最终像素素材 |
| Azhi 历史 Reference Practice 明确不创建 Evidence / Gate / Completion | 错剪会变成“做出产品就学会了” | 不把 `03–07` 作为能力形成终点；ZH2 必须使用 V3 正式 Evidence/Review 链 |
| Azhi D9 准备会重置专用 `_test` DB | 本轮 read-only 审计不应改变共享测试状态 | 由产品团队提供隔离 actor/环境或明确授权后再捕捉 |
| Azao 当前截图使用仓库 Fixture | UI 和状态机真实，但数据并非用户真实项目，也未执行真实模型 | 成片可用 Fixture 画面，但文案/字幕不得说成生产客户案例或实时 AI 执行 |
| Azao 桌面信息密度高 | 10–12 秒内全屏阅读困难 | 使用 1440×900 的结构化裁切/推近，依次突出 Issue → Boundary → Evidence，不用终端炫技 |
| 新 Logo 仍可能迭代 | 硬编码 path 会让所有 Shot 失效 | 只引用单一可替换 SVG 资产；在 Picture Lock 前再替换最终批准版 |
| 尚无影片级帧率/色彩/字体捕捉规范 | 静态截图不能证明录屏在目标帧率下稳定 | Shot freeze 后单列 Capture Spec：设备、DPR、刷新率、色彩空间、字体、滚动时间轴、隐私数据清理 |

## 10. Recommendation

**下一轮 Shot Content Freeze 的推荐方法，不是最终镜头选择**：

1. **Web：A + C 混合。** Origin、源点、Primary/Ghost path 与三问状态用 Film-native reconstruction，保持新版视觉体系的一致性；真实首页的产品空间与 Reality 文案保留 Runtime capture 作为产品事实锚点。避免把整页滚动录屏当成影片设计。
2. **AI 判断力快测：B 为主。** 以当前真实组件、题面、动作、Aha 和 Snapshot 为唯一语义源，建立可指定 C01/D02 与结果的受控拍摄状态。J1 可直接基于当前 D2；J2/J3 不应依赖随机抽题等待。优先验证“事实 → 人的动作 → 理由”三步在 8–10 秒内都读得懂。
3. **阿织：先补证据，再 B。** 当前 V3 最值得拍的是 ZH2（Submission → Evidence candidate → Human Review → Capability/Growth），但本轮还不具备像素级冻结条件。先由产品团队提供隔离的 D9 actor 或一组同一状态链的当前 V3 清洁截图/录屏；历史 D2 只用于构图参考。
4. **阿造：C 为主，必要时 B 裁切。** 仓库 Fixture 已能确定性重现 ZA1–ZA3。正式拍摄用固定 1440×900 状态，隐藏测试/对话噪声，以局部推近让 Boundary、Human Decision 和 Evidence 依次成为主语；不拍大量代码或“AI 自动完成一切”。
5. **跨产品连接：用视觉体系，不用假流程。** 可以让同一个 Deep Navy origin 在三个并列方向中分别触发判断、Growth、Control 信号；不能用 UI 操作暗示用户必须先测评、再用阿织、最后用阿造。Growth `#22C39E` 与 Control `#5968F2` 是状态信号，不是永久绑定产品的彩色 Logo。
6. **Logo：单资产替换。** 下一轮若开始技术设计，应先定义唯一 Brand Asset 接口，再由导演/品牌负责人给出最终批准 SVG；任何 Shot 都不复制或改写 Logo path。

**进入 Shot Content Freeze 前的最小补件清单**：

- 阿织当前 V3 的同一 actor 连续证据：Now、Map、Activity、Submission、Evidence candidate、Review、Growth/Capability、Next Action。
- 判断力快测当前 D2 的 C01 与 D02 清洁题目态，以及与各自 Aha 对应的可控结果态。
- Web 旧 Logo 与新版 Logo 在真实 UI 中的处理裁决。
- 阿造正式使用哪一组 Fixture 文案、裁切范围和是否保留右侧阿造对话栏的导演裁决。
- 最终批准的 Brand Lockup / Origin Y SVG 版本与 Capture Spec。

到此停止 Source Audit。后续应等待导演对候选内容、证据缺口和拍摄方式作出裁决；本报告不创建 Remotion、不写 Storyboard、不开始动画，也不自行确定最终 Shot。
