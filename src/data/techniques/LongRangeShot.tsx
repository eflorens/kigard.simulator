import { PrincipalWeaponAttack, getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { Talent, ResumeAttack } from "../talents";

export const LongRangeShot: Talent = {
  id: TechniqueId.LongRangeShot,
  name: "Tir lointain",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: (summary) => (summary.primaryWeapon?.range && { min: summary.primaryWeapon.range.min, max: summary.primaryWeapon.range.max + 1 })
    || "Portée Arme + 1",
  required: "Arc ou Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> avec une <Bold>portée maximale augmentée  de 1 case</Bold></span>
    </span>
  ),
};
