import { TechniqueId } from "./TechniqueId";
import { Status } from "../inventory";
import { ResumeEffect, Talent } from "../talents";
import { DisplaySupport } from "../../features/talents/DisplaySupport";

export const MysticalSubterfuge: Talent = {
  id: TechniqueId.MysticalSubterfuge,
  name: "Subterfuge mystique",
  usageCost: 4,
  manaCost: true,
  area: "Soi-même",
  resume: <ResumeEffect status={[{ value: 3, status: Status.MysticalSubterfuge }]} />,
  getDescription: () => <DisplaySupport status={[{ value: 3, status: Status.MysticalSubterfuge }]} />,
};
