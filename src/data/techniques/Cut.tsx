import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const Cut: Talent = {
  id: TechniqueId.Cut,
  name: "Entailler",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Dague, Epée ou Hache",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> avec <Bold>3<DisplayStatus status={Status.Bleeding} hasLabel /></Bold></span>
    </span>
  ),
};
