import { Bold } from "../../components";
import { getMagicPower } from "../talents";
import { MagicScrollId } from "./MagicScrollId";
import { Talent, ResumeEffect, HealStatus } from "../talents";

export const Healing: Talent = {
  id: MagicScrollId.Healing,
  name: "Guérison",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 3 },
  resume: (summary) => (
    <span>
      <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} />
      <HealStatus
        blocked={Math.floor(summary.intelligence / 2) + summary.magicPower}
        base={summary.intelligence + summary.magicPower}
        critical={Math.floor(summary.intelligence * 1.5) + summary.magicPower} />
    </span>
  ),
  getDescription: (summary) => (
    <span>Soigne <Bold>{getMagicPower(summary)} PV</Bold></span>
  )
};
