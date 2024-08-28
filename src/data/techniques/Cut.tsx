import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const Cut: Talent = {
  id: TechniqueId.Cut,
  name: "Entailler",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Dague, Epée ou Hache",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ status: [{ value: 3, status: Status.Bleeding }] }} />,
  getDescription: (summary) => 
      <PrincipalWeaponAttack summary={summary} modifier={{ status: [{ value: 3, status: Status.Bleeding }] }} />,
};
