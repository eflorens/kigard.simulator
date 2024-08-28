import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { ElementId, Status } from "../inventory";
import { getMagicPower } from "../talents";
import { MagicScrollId } from "./MagicScrollId";
import { Talent, ResumeEffect, DamageType } from "../talents";

export const FireBall: Talent = {
  id: MagicScrollId.FireBall,
  name: "Boule de feu",
  reusable: true,
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} damage={summary.intelligence} modifier={{ damage: summary.magicPower }} element={ElementId.Fire} status={[{ value: 2, status: Status.Burning }]} />,
  getDescription: (summary) => (
    <DisplayAttack
      element={ElementId.Fire}
      baseDamage={{ value: getMagicPower(summary), type: DamageType.Magic }}
      status={[{
        value: 2,
        status: Status.Burning,
      }]} />
  ),
};
