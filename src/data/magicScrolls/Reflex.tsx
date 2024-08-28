import { DisplaySupport } from "../../features/talents/DisplaySupport";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Reflex: Talent = {
  id: MagicScrollId.Reflex,
  name: "Réflexes",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Vivacious }]} />,
  getDescription: (summary) => (
    <DisplaySupport
      status={[{ value: getMagicPower(summary) / 5, status: Status.Vivacious }]} />
  ),
};
