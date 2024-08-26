import { TechniqueId } from "./TechniqueId";
import { Badge, Bold, Row } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, AccuracyAttack, HealStatus } from "../talents";

export const StimulatingTreatment: Talent = {
  id: TechniqueId.StimulatingTreatment,
  name: "Soin stimulant",
  usageCost: 4,
  range: { min: 0, max: 1 },
  resume: (summary) => (
    <span>
      <AccuracyAttack accuracy={summary.accuracy} />
      <HealStatus
        className="mx-2"
        blocked={Math.floor(summary.intelligence / 2)}
        base={summary.intelligence}
        critical={Math.floor(3 * summary.intelligence / 2)} />
      <Badge pill><Bold>+1 <DisplayStatus status={Status.Defense} /></Bold></Badge>
    </span>
  ),
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Réalise un </span>
          <Bold>soin de {summary.intelligence} </Bold>
          <span> avec une <Bold>PRE  de {summary.accuracy} %</Bold></span>
          <Bold>[Bloqué: {Math.floor(summary.intelligence / 2)}] </Bold>
          <Bold>[Critique : {summary.intelligence}] </Bold>
          <span>et confère <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold> à la cible</span>
        </span>
      </Row>
      <Row>
        <span>
          <span><Bold>Critique</Bold> : au lieu des soins augmentés, <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold> supplémentaire.</span>
        </span>
      </Row>
    </>
  ),
};
