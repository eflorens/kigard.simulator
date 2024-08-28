import { TechniqueId } from "./TechniqueId";
import { Status } from "../inventory";
import { ResumeEffect, Talent } from "../talents";
import { DisplaySupport } from "../../features/talents/DisplaySupport";

export const MagicOverload: Talent = {
  id: TechniqueId.MagicOverload,
  name: "Surcharge magique",
  usageCost: 0,
  manaCost: 3,
  area: "Soi-même",
  resume: (summary) => <ResumeEffect status={[{ value: summary.intelligence / 5, status: Status.Overload }]} />,
  getDescription: (summary) => <DisplaySupport status={[{ value: summary.intelligence / 5, status: Status.Overload }]} />,
};
