import { PrincipalWeaponAttack, getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Talent, ResumeAttack } from "../talents";

export const SneakAttack: Talent = {
  id: TechniqueId.SneakAttack,
  name: "Attaque sournoise",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: { min: 1, max: 1 },
  required: "Dague ou Gant",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseDamage: summary.strength / 2 + summary.dexterity, criticalFactor: 2 }} />,
  getDescription: (summary) => {
    const baseDamage = summary.strength / 2 + summary.dexterity;
    return <PrincipalWeaponAttack summary={summary} modifier={{ baseDamage, criticalFactor: 2 }} />;
  },
};
