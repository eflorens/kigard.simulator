import { TechniqueId } from "./TechniqueId";
import { Badge, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent } from "../talents";

export const MysticalSubterfuge: Talent = {
  id: TechniqueId.MysticalSubterfuge,
  name: "Subterfuge mystique",
  usageCost: 4,
  manaCost: true,
  area: "Soi-même",
  resume: () => <Badge pill><Bold>+3 <DisplayStatus status={Status.MysticalSubterfuge} /></Bold></Badge>,
  getDescription: () => (
    <span>
      <span>Confère <Bold>3 <DisplayStatus status={Status.MysticalSubterfuge} hasLabel /></Bold></span>
    </span>
  ),
};
