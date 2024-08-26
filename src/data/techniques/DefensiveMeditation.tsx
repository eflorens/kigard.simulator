import { TechniqueId } from "./TechniqueId";
import { Badge, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent } from "../talents";

export const DefensiveMeditation: Talent = {
  id: TechniqueId.DefensiveMeditation,
  name: "Méditation défensive",
  usageCost: 3,
  area: "Soi-même",
  resume: () => <Badge pill><Bold>+ 1 <DisplayStatus status={Status.Defense} /></Bold></Badge>,
  getDescription: () => (
    <span>
      <span>Réalise une <Bold>méditation</Bold> et gagne <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold></span>
    </span>
  )
};
