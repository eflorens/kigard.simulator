import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const ShieldBash: Talent = {
  id: TechniqueId.ShieldBash,
  name: "Coup de bouclier",
  usageCost: 3,
  range: { min: 1, max: 1 },
  required: "Bouclier (main gauche)",
  resume: (summary) => <ResumeAttack weapon={summary?.secondaryWeapon} modifier={{ baseDamage: summary.constitution, useAsWeapon: true }} />,
  getDescription: (summary) => (
    <span>
      <span>Attaque du bouclier avec <Bold>2 <DisplayStatus status={Status.Stunned} hasLabel /></Bold> </span>
      <ResumeAttack weapon={summary?.secondaryWeapon} modifier={{ baseDamage: summary.constitution, useAsWeapon: true }} />
    </span>
  ),
};
