import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { Status } from "../inventory";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Bewitchment: Talent = {
  id: MagicScrollId.Bewitchment,
  name: "Envoûtement",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 5 },
  reusable: true,
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} status={[{ value: 2, status: Status.Bewitched }]} />,
  getDescription: () => (
    <DisplayAttack
      status={[{
        value: 2,
        status: Status.Bewitched,
      }]} />
  ),
};
