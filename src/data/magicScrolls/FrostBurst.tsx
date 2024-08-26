import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { ElementId, Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect, DamageType } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const FrostBurst: Talent = {
  id: MagicScrollId.FrostBurst,
  name: "Rafale de givre",
  manaCost: true,
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} damage={summary.intelligence} modifier={{ damage: summary.magicPower }} element={ElementId.Ice} status={[{ value: 2, status: Status.Freeze }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      element={ElementId.Ice}
      baseDamage={{ value: getMagicPower(summary), type: DamageType.Magic }}
      status={[{ value: 2, status: Status.Freeze }]} />
  ),
};
