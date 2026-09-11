import type { ReactNode } from "react";

export type AppId =
  "about" | "projects" | "terminal" | "safari" | "resume" | "mail" | "research" | "video";

export type WindowState = {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  payload?: Record<string, unknown>;
};

export type AppDef = {
  id: AppId;
  name: string;
  icon: ReactNode;
  defaultSize: { width: number; height: number };
  render: (win: WindowState) => ReactNode;
};
