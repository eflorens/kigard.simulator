import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange, getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const Stun: Talent = {
  id: TechniqueId.Stun,
  name: "Assommer",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Masse, gant ou Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ status: [{ value: 3, status: Status.Stunned }] }} />,
  getDescription: (summary) =>
      <PrincipalWeaponAttack summary={summary} modifier={{ status: [{ value: 3, status: Status.Stunned }] }} />,
};
