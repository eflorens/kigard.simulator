import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Bleeding: Talent = {
  id: MagicScrollId.Bleeding,
  name: "Maléfice de saignement",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Bleeding }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      status={[{ value: getMagicPower(summary) / 5, status: Status.Bleeding }]} />),
};
