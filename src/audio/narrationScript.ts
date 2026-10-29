export type NarrationSegment = {
  id: string;
  startSeconds: number;
  endSeconds: number;
  kind: "speech" | "silence";
  text: string | null;
  performance: string;
};

export const narrationSegments: readonly NarrationSegment[] = [
  {
    id: "01",
    startSeconds: 0.9,
    endSeconds: 4.6,
    kind: "speech",
    text: "AI正在让每个人能做的事情越来越多。",
    performance: "平静观察。",
  },
  {
    id: "02",
    startSeconds: 4.9,
    endSeconds: 8.0,
    kind: "speech",
    text: "写代码、做分析、生成方案、推进项目。",
    performance: "四个动作轻微加速。",
  },
  {id: "03", startSeconds: 8.0, endSeconds: 10.4, kind: "silence", text: null, performance: "真正静音。"},
  {
    id: "04",
    startSeconds: 10.4,
    endSeconds: 13.3,
    kind: "speech",
    text: "可答案越容易，有些问题反而越重要。",
    performance: "音量略收，轻强调‘问题’。",
  },
  {
    id: "05",
    startSeconds: 13.8,
    endSeconds: 16.9,
    kind: "speech",
    text: "这个结论，我该不该信？",
    performance: "轻强调‘信’。",
  },
  {
    id: "06",
    startSeconds: 17.4,
    endSeconds: 20.6,
    kind: "speech",
    text: "AI更强了，我自己有没有变强？",
    performance: "轻强调‘我自己’。",
  },
  {
    id: "07",
    startSeconds: 21.1,
    endSeconds: 25.2,
    kind: "speech",
    text: "AI可以持续做产品，我还在掌控它吗？",
    performance: "轻强调‘掌控’。",
  },
  {id: "08", startSeconds: 25.2, endSeconds: 26.3, kind: "silence", text: null, performance: "真正静音。"},
  {
    id: "09",
    startSeconds: 26.3,
    endSeconds: 31.3,
    kind: "speech",
    text: "源点AI关心的，是你能不能判断、成长，并掌控真实成果。",
    performance: "自然陈述，不读成广告 slogan。",
  },
  {
    id: "10",
    startSeconds: 32.1,
    endSeconds: 40.0,
    kind: "speech",
    text: "三个AI一致，也不代表多了三份证据。\nAI给出答案，判断还得由你来做。",
    performance: "前句制造认知反差；轻强调‘三份证据’、‘判断’和‘你’，不责备。",
  },
  {id: "11", startSeconds: 40.0, endSeconds: 42.0, kind: "silence", text: null, performance: "真正静音。"},
  {
    id: "12",
    startSeconds: 42.0,
    endSeconds: 50.7,
    kind: "speech",
    text: "做出来，只是一份结果。\n阿织关心的是，它能不能真正变成你的能力。",
    performance: "更柔和；‘你的能力’落稳，不使用教师口吻。",
  },
  {id: "13", startSeconds: 50.7, endSeconds: 53.0, kind: "silence", text: null, performance: "真正静音。"},
  {
    id: "14",
    startSeconds: 53.0,
    endSeconds: 63.0,
    kind: "speech",
    text: "AI可以声明完成。\n范围由你确认，结果由证据证明。\nAI负责执行，产品始终由你掌控。",
    performance: "坚定但不强硬；依次轻强调‘范围’、‘证据’、‘掌控’，最后一句略慢。",
  },
  {id: "15", startSeconds: 63.0, endSeconds: 65.9, kind: "silence", text: null, performance: "真正静音。"},
  {
    id: "16",
    startSeconds: 65.9,
    endSeconds: 69.7,
    kind: "speech",
    text: "没有固定顺序。\n需要什么，就从哪里开始。",
    performance: "像解除限制，不是 CTA。",
  },
  {id: "17", startSeconds: 69.7, endSeconds: 71.3, kind: "silence", text: null, performance: "真正静音。"},
  {
    id: "18",
    startSeconds: 71.3,
    endSeconds: 74.8,
    kind: "speech",
    text: "源点AI。\n看清自己，织成能力，掌控成果。",
    performance: "稳定结论，不喊话；三个短语之间自然微停顿。",
  },
  {id: "19", startSeconds: 74.8, endSeconds: 76.0, kind: "silence", text: null, performance: "最后保持静音。"},
] as const;

export const spokenNarrationSegments = narrationSegments.filter((segment) => segment.kind === "speech");

export const narrationSegmentAt = (seconds: number) =>
  narrationSegments.find((segment) => seconds >= segment.startSeconds && seconds < segment.endSeconds) ?? null;
