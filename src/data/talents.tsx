import { SummaryState } from "../features/summary/SummarySlice";
import { ElementId } from "./inventory";

export enum DamageType {
  Pure,
  Physical,
  Magic,
}

export enum BoxType {
  Empty = "empty",
  Tree = "tree",
  Rock = "rock",
  CrystalWall = "crystalWall",
  IceWall = "iceWall",
  Remains = "remains",
  Fire = "fire",
}
export type AreaType = BoxType | {
  x: number;
  y: number;
} | "Arc de 3" | "Soi-même";

export type Range = { min: number, max: number } | "Portée Arme" | "Portée Arme + 1";

export interface Talent {
  id: number;
  name: string;
  usageCost?: number | string | ((summary: SummaryState) => number | string);
  manaCost?: number | boolean;
  reusable?: boolean;
  discreet?: boolean;
  range?: Range | ((summary: SummaryState) => Range);
  area?: AreaType | AreaType[];
  element?: ElementId;
  required?: string;
  getDescription: (summary: SummaryState) => React.ReactNode | string;
}