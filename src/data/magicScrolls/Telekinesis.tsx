import { Row, Col, Bold } from "../../components";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Telekinesis: Talent = {
  id: MagicScrollId.Telekinesis,
  name: "Télékinésie",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: () => (
    <Row>
      <Col>Deplace la cible <Bold>vers une case vide adjacente.</Bold></Col>
    </Row>
  )
};
