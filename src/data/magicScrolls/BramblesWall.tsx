import { Row, Col, Bold, List } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayTouch } from "../../components/DisplayTouch";
import { Status } from "../inventory";
import { Talent, BoxType, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const BramblesWall: Talent = {
  id: MagicScrollId.BramblesWall,
  name: "Mur de ronces",
  manaCost: true,
  usageCost: 4,
  area: BoxType.Empty,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: () => (
    <>
      <Row>
        <Col>Génère <Bold>des ronces</Bold> (dure environ 48h).</Col>
      </Row>
      <Row>
        <List>
          <li>Entrer sur une <Bold>case adjacente</Bold> inflige <Bold>+2 <DisplayStatus status={Status.Poisoned} /></Bold></li>
          <li><Bold>Arracher (1PA)</Bold> inflige <Bold>+4 <DisplayStatus status={Status.Poisoned} /></Bold></li>
        </List>
      </Row>
      <Row>
        <DisplayTouch semiSuccess="Elément fragile (-1PA pour Détruire)." critical="Elément solide (+1PA pour Détruire)" />
      </Row>
    </>
  ),
};
