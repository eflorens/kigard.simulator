import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { Talent, ResumeAttack } from "../talents";

export const ShapAttack: Talent = {
  id: TechniqueId.ShapAttack,
  name: "Attaque précise",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Dague, Epée, Lance, Arc ou Fouet",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span>avec un <Bold>Avantage</Bold></span>
    </span>
  ),
};
