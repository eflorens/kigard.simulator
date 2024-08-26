import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Poisoning: Talent = {
  id: MagicScrollId.Poisoning,
  name: "Maléfice de poison",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: getMagicPower(summary) / 5, status: Status.Poisoned }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      status={[{ value: getMagicPower(summary) / 5, status: Status.Poisoned }]} />),
};
