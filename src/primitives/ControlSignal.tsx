import {filmTokens} from "../tokens/filmTokens";

type ControlSignalProps = {
  x?: number;
  y?: number;
  compact?: boolean;
  activeIndex?: number;
  activation?: number;
};

export const ControlSignal = ({x = 0, y = 0, compact = false, activeIndex = 1, activation = 1}: ControlSignalProps) => {
  const gap = compact ? 150 : 210;
  return (
    <div style={{position: "absolute", left: x, top: y, width: 680, height: gap * 3 + 60}}>
      <div style={{position: "absolute", left: 29, top: 30, width: 8, height: gap * 2, background: filmTokens.colors.hairline, borderRadius: 99}} />
      {[
        {label: "AI 声明"},
        {label: "你确认范围"},
        {label: "证据成立"},
      ].map((item, index) => (
        <div key={item.label} style={{position: "absolute", top: index * gap, display: "flex", alignItems: "center", gap: 30}}>
          <div style={{width: 66, height: 66, borderRadius: "50%", boxSizing: "border-box", background: index === activeIndex ? (activation >= 1 ? filmTokens.colors.control : `rgba(89,104,242,${activation})`) : filmTokens.colors.warmCanvas, border: `8px solid ${index === activeIndex ? filmTokens.colors.control : filmTokens.colors.ghost}`, boxShadow: index === activeIndex && activation >= 1 ? "0 0 0 14px rgba(89,104,242,0.11)" : undefined}} />
          <div style={{fontSize: 32, letterSpacing: 3.2, color: index === activeIndex ? filmTokens.colors.control : filmTokens.colors.muted, fontWeight: 600}}>{item.label}</div>
        </div>
      ))}
    </div>
  );
};
