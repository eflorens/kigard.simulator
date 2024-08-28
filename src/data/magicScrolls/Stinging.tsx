import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect, DamageType } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Stinging: Talent = {
  id: MagicScrollId.Stinging,
  name: "Piqûre",
  manaCost: true,
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 2 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} damage={summary.intelligence} modifier={{ attack: 20, damage: summary.magicPower }} />,
  getDescription: (summary) => (
    <span>
      <DisplayAttack
        baseDamage={{ value: getMagicPower(summary), type: DamageType.Magic }} />
      <span> avec +20 de MM.</span>
    </span>
  ),
};
