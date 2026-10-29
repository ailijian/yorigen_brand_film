import type {CSSProperties, ReactNode} from "react";

type SignalProps = {
  color: string;
  label?: ReactNode;
  x: number;
  y: number;
  size?: number;
  open?: boolean;
  style?: CSSProperties;
};

export const Signal = ({color, label, x, y, size = 28, open = false, style}: SignalProps) => (
  <div style={{position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", display: "flex", alignItems: "center", gap: 24, ...style}}>
    <span
      style={{
        width: size,
        height: size,
        boxSizing: "border-box",
        borderRadius: "50%",
        border: `${Math.max(4, Math.round(size * 0.16))}px solid ${color}`,
        background: open ? "transparent" : color,
        boxShadow: open ? `0 0 0 10px ${color}18` : `0 0 0 10px ${color}14`,
        flex: "0 0 auto",
      }}
    />
    {label}
  </div>
);
