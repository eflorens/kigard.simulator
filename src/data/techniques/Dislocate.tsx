import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const Dislocate: Talent = {
  id: TechniqueId.Dislocate,
  name: "Disloquer",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Masse, Hache, Lance ou Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ status: [{ value: 3, status: Status.Piercing }] }} />,
  getDescription: (summary) =>
      <PrincipalWeaponAttack summary={summary} modifier={{ status: [{ value: 3, status: Status.Piercing }] }} />,
};
