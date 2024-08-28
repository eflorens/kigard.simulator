import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { MagicScrollId } from "./MagicScrollId";
import { Talent, ResumeEffect } from "../talents";

export const Restraining: Talent = {
  id: MagicScrollId.Restraining,
  name: "Entrave",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 4 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Restrained }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      status={[{
        value: getMagicPower(summary) / 5,
        status: Status.Restrained,
      }]} />
  ),
};
