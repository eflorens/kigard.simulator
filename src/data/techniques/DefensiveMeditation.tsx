import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { ResumeEffect, Talent } from "../talents";

export const DefensiveMeditation: Talent = {
  id: TechniqueId.DefensiveMeditation,
  name: "Méditation défensive",
  usageCost: 3,
  area: "Soi-même",
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} self={[{ value: 1, status: Status.Defense }]} />,
  getDescription: () => (
    <span>
      <span>Réalise une <Bold>méditation</Bold> et gagne <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold></span>
    </span>
  )
};
