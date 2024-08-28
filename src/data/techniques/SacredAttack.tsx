import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost, PrincipalWeaponAttack } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { ElementId } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const SacredAttack: Talent = {
  id: TechniqueId.SacredAttack,
  name: "Attaque sacrée",
  usageCost: getPrimaryWeaponUsageCost,
  manaCost: true,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} element={ElementId.Light} modifier={{ baseDamage: 3 * ((summary.primaryWeapon?.baseDamage ?? 0) + summary.intelligence) / 4 }} />,
  getDescription: (summary) => {
    return (
      <PrincipalWeaponAttack summary={summary} element={ElementId.Light} modifier={{ baseDamage: 3 * ((summary.primaryWeapon?.baseDamage ?? 0) + summary.intelligence) / 4 }} />
    );
  },
};
