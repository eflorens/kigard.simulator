import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { DisplayElement } from "../../components/DisplayElement";
import { ElementId } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const SacredAttack: Talent = {
  id: TechniqueId.SacredAttack,
  name: "Attaque sacrée",
  usageCost: getPrimaryWeaponUsageCost,
  manaCost: true,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseDamage: 3 * ((summary.primaryWeapon?.baseDamage ?? 0) + summary.intelligence) / 4 }} />,
  getDescription: (summary) => {
    const baseDamage = 3 * ((summary.primaryWeapon?.baseDamage ?? 0) + summary.intelligence) / 4;
    return (
      <span>
        <span>Attaque de <DisplayElement element={ElementId.Light} hasLabel /> de l'arme principale </span>
        <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseDamage }} />
      </span>
    );
  },
};
