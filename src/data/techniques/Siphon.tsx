import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { Talent, ResumeAttack } from "../talents";

export const Siphon: Talent = {
  id: TechniqueId.Siphon,
  name: "Siphonner",
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  required: "ni Arc ni Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <span>
      <PrincipalWeaponAttack summary={summary} />
      <span> et vole <Bold>{summary.mind / 5} PM</Bold></span>
    </span>
  ),
};
