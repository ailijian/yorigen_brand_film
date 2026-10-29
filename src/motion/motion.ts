import {Easing, interpolate} from "remotion";

const controlledEase = Easing.bezier(0.33, 0, 0.2, 1);

export const motionValue = (
  frame: number,
  inputRange: number[],
  outputRange: number[],
) =>
  interpolate(frame, inputRange, outputRange, {
    easing: controlledEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const fadeIn = (frame: number, from: number, to: number) =>
  motionValue(frame, [from, to], [0, 1]);

export const fadeOut = (frame: number, from: number, to: number) =>
  motionValue(frame, [from, to], [1, 0]);

export const cameraTransform = (scale: number) =>
  Math.abs(scale - 1) < 0.000001 ? undefined : `scale(${scale})`;
