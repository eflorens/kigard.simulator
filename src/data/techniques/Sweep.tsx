import { PrincipalWeaponAttack, getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { Talent, ResumeAttack } from "../talents";

export const Sweep: Talent = {
  id: TechniqueId.Sweep,
  name: "Balayer",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: { min: 1, max: 1 },
  area: "Arc de 3",
  required: "Arme 2 mains de contact",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> sur <Bold>un arc de 3 cases</Bold>, dans le sens horaire</span>
    </span>
  ),
};
