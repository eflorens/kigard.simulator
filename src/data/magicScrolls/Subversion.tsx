import { Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Subversion: Talent = {
  id: MagicScrollId.Subversion,
  name: "Subversion",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => {
    const value = getMagicPower(summary) / 10;
    return (
      <ResumeEffect
        attack={summary.magicAttack}
        status={[{ value, status: Status.Terror }]}
        self={[{ value, status: Status.Will }]} />
    );
  },
  getDescription: (summary) => {
    const value = getMagicPower(summary) / 10;
    return (
      <>
        <DisplayAttack
          status={[{ value, status: Status.Terror }]} />
        <span> et confère au lanceur <Bold>{value} <DisplayStatus status={Status.Will} hasLabel /></Bold></span>
      </>
    );
  }
};
