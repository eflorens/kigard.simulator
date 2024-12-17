import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, AccuracyAttack, HealStatus } from "../talents";

export const FirstAid: Talent = {
  id: TechniqueId.FirstAid,
  name: "Premiers soins",
  usageCost: 2,
  range: { min: 0, max: 1 },
  resume: (summary) => (
    <span>
      <AccuracyAttack accuracy={summary.accuracy - 30} />
      <HealStatus
        className="mx-2"
        blocked={Math.floor(summary.intelligence / 2)}
        base={summary.intelligence}
        critical={Math.floor(3 * summary.intelligence / 2)} />
    </span>
  ),
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Réalise un </span>
          <Bold>soin de {summary.intelligence} </Bold>
          <span> avec une <Bold>PRE  de {summary.accuracy - 30} %</Bold></span>
          <Bold>[Bloqué: {Math.floor(summary.intelligence / 2)}] </Bold>
          <Bold>[Critique : {Math.floor(3 * summary.intelligence / 2)}] </Bold>
        </span>
      </Row>
      <Row>
        <span>
          <span><Bold>Réussite</Bold> : retire <Bold>1 de <DisplayStatus status={Status.Poisoned} hasLabel /> ou de <DisplayStatus status={Status.Burning} hasLabel /></Bold> (le plus haut niveau)</span>
        </span>
      </Row>
    </>
  ),
};
