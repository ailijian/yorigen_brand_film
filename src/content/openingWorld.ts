export const openingOrigin = {
  x: 1670,
  y: 1200,
} as const;

export const openingAccelerationPath =
  "M 1670 1200 C 1650 870, 1660 620, 1760 330";

export const openingOutputs = [
  {label: "ANALYSIS COMPLETE", x: 430, y: 470, width: 740},
  {label: "TASK COMPLETED", x: 2390, y: 330, width: 660},
  {label: "42 FILES CHANGED", x: 2720, y: 1210, width: 720},
  {label: "RECOMMENDATION READY", x: 350, y: 1510, width: 790},
  {label: "AGENT RUNNING", x: 1460, y: 270, width: 620},
] as const;

export const openingAccelerationPaths = [
  "M 1670 1200 C 1330 1070, 1090 790, 790 520",
  "M 1670 1200 C 1930 920, 2320 640, 2720 390",
  "M 1670 1200 C 2100 1190, 2560 1270, 3040 1260",
  "M 1670 1200 C 1310 1290, 1060 1510, 770 1590",
  openingAccelerationPath,
] as const;

export const openingMotionPaths = [
  "M 1670 1200 C 1330 1070, 1090 760, 790 470",
  "M 1670 1200 C 1930 920, 2320 610, 2720 330",
  "M 1670 1200 C 2030 1190, 2390 1210, 2720 1210",
  "M 1670 1200 C 1310 1290, 1060 1460, 770 1510",
  "M 1670 1200 C 1650 870, 1660 590, 1760 270",
] as const;
