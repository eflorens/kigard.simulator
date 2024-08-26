import { TechniqueId } from "./TechniqueId";
import { Badge, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent } from "../talents";

export const MagicOverload: Talent = {
  id: TechniqueId.MagicOverload,
  name: "Surcharge magique",
  usageCost: 0,
  manaCost: 3,
  area: "Soi-même",
  resume: (summary) => <Badge pill><Bold>+ {summary.intelligence / 5} <DisplayStatus status={Status.Overload} /></Bold></Badge>,
  getDescription: (summary) => (
    <span>
      <span>Confère <Bold>{summary.intelligence / 5} <DisplayStatus status={Status.Overload} hasLabel /></Bold></span>
    </span>
  ),
};
