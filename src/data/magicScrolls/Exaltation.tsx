import { DisplayTouch } from "../../components/DisplayTouch";
import { DisplaySupport } from "../../features/talents/DisplaySupport";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Exaltation: Talent = {
  id: MagicScrollId.Exaltation,
  name: "Exaltation",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  reusable: true,
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Exalted }]} />,
  getDescription: (summary) => (
    <>
      <DisplaySupport
        status={[{ value: getMagicPower(summary) / 5, status: Status.Exalted }]} />
      <DisplayTouch semiSuccess="-2 statuts" critical="+2 statuts" />
    </>
  ),
};
