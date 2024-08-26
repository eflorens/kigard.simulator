import { Badge, Bold, Row, Col } from "../../components";
import { DisplayElement } from "../../components/DisplayElement";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayTouch } from "../../components/DisplayTouch";
import { DisplayDamageType } from "../../features/talents/DisplayAttack";
import { ElementId, Status } from "../inventory";
import { Talent, AccuracyAttack, DamageType } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Incineration: Talent = {
  id: MagicScrollId.Incineration,
  name: "Incinération",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  element: ElementId.Fire,
  resume: (summary) => (
    <span>
      <AccuracyAttack accuracy={summary.magicAttack} />
      <Badge pill><Bold>4x <DisplayStatus status={Status.Burning} /> PV <DisplayElement element={ElementId.Fire} /></Bold></Badge>
    </span>
  ),
  getDescription: () => {
    return (
      <>
        <Row>
          <Col>Inflige <Bold> (4x niveau <DisplayStatus status={Status.Burning} hasLabel /> sur cible) <DisplayDamageType type={DamageType.Pure} /> de <DisplayElement element={ElementId.Fire} hasLabel /></Bold>.</Col>
        </Row>
        <Row>
          <Col>Retire <Bold>Toute la Brûlure</Bold>.</Col>
        </Row>
        <DisplayTouch semiSuccess="-50% de dégats" critical="+50% de dégats" />
      </>
    );
  }
};
