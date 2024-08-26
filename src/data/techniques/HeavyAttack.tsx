import { PrincipalWeaponAttack, getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Talent, ResumeAttack } from "../talents";

export const HeavyAttack: Talent = {
  id: TechniqueId.HeavyAttack,
  name: "Attaque puissante",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: { min: 1, max: 1 },
  required: "Epée, Masse ou Hache",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseDamage: Math.floor(summary.strength * 3 / 2), accuracy: -15 }} />,
  getDescription: (summary) => (
    <PrincipalWeaponAttack summary={summary} modifier={{ baseDamage: Math.floor(summary.strength * 3 / 2), accuracy: -15 }} />
  ),
};
