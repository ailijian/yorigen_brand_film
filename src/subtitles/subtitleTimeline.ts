import {narrationSegments} from "../audio/narrationScript.ts";

export type SubtitlePlacement = "default" | "assessment" | "azhi";

export type SubtitleEvent = {
  id: string;
  segmentId: string;
  startSeconds: number;
  endSeconds: number;
  text: string;
  placement: SubtitlePlacement;
};

export const subtitleEvents: readonly SubtitleEvent[] = [
  {id: "01", segmentId: "01", startSeconds: 0.9, endSeconds: 4.6, text: "AI正在让每个人能做的事情越来越多。", placement: "default"},
  {id: "02", segmentId: "02", startSeconds: 4.9, endSeconds: 8.0, text: "写代码、做分析、生成方案、推进项目。", placement: "default"},
  {id: "04", segmentId: "04", startSeconds: 10.4, endSeconds: 13.3, text: "可答案越容易，有些问题反而越重要。", placement: "default"},
  {id: "05", segmentId: "05", startSeconds: 13.8, endSeconds: 16.9, text: "这个结论，我该不该信？", placement: "default"},
  {id: "06", segmentId: "06", startSeconds: 17.4, endSeconds: 20.6, text: "AI更强了，我自己有没有变强？", placement: "default"},
  {id: "07", segmentId: "07", startSeconds: 21.1, endSeconds: 25.2, text: "AI可以持续做产品，我还在掌控它吗？", placement: "default"},
  {
    id: "09",
    segmentId: "09",
    startSeconds: 26.3,
    endSeconds: 31.3,
    text: "源点AI关心的，\n是你能不能判断、成长，并掌控真实成果。",
    placement: "default",
  },
  {id: "10a", segmentId: "10", startSeconds: 32.1, endSeconds: 35.8, text: "三个AI一致，也不代表多了三份证据。", placement: "assessment"},
  {id: "10b", segmentId: "10", startSeconds: 36.0, endSeconds: 40.0, text: "AI给出答案，\n判断还得由你来做。", placement: "assessment"},
  {id: "12a", segmentId: "12", startSeconds: 42.0, endSeconds: 44.8, text: "做出来，只是一份结果。", placement: "azhi"},
  {id: "12b", segmentId: "12", startSeconds: 45.0, endSeconds: 50.7, text: "阿织关心的是，\n它能不能真正变成你的能力。", placement: "azhi"},
  {id: "14a", segmentId: "14", startSeconds: 53.0, endSeconds: 55.4, text: "AI可以声明完成。", placement: "default"},
  {id: "14b", segmentId: "14", startSeconds: 55.6, endSeconds: 59.1, text: "范围由你确认，\n结果由证据证明。", placement: "default"},
  {id: "14c", segmentId: "14", startSeconds: 59.3, endSeconds: 63.0, text: "AI负责执行，\n产品始终由你掌控。", placement: "default"},
  {id: "16a", segmentId: "16", startSeconds: 65.9, endSeconds: 67.4, text: "没有固定顺序。", placement: "default"},
  {id: "16b", segmentId: "16", startSeconds: 67.6, endSeconds: 69.7, text: "需要什么，就从哪里开始。", placement: "default"},
  {id: "18a", segmentId: "18", startSeconds: 71.3, endSeconds: 72.5, text: "源点AI。", placement: "default"},
] as const;

export const subtitlePlacements = {
  default: {left: 64, bottom: 56, maxWidth: 760},
  assessment: {left: 600, bottom: 56, maxWidth: 720},
  azhi: {left: 64, bottom: 280, maxWidth: 760},
} as const satisfies Record<SubtitlePlacement, {left: number; bottom: number; maxWidth: number}>;

export const subtitleAtSeconds = (seconds: number) =>
  subtitleEvents.find((event) => seconds >= event.startSeconds && seconds < event.endSeconds) ?? null;

export const narrationSegmentForSubtitle = (event: SubtitleEvent) =>
  narrationSegments.find((segment) => segment.id === event.segmentId) ?? null;
