import { Row, Col, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayTouch } from "../../components/DisplayTouch";
import { Status } from "../inventory";
import { Talent, BoxType, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const CrystalWall: Talent = {
  id: MagicScrollId.CrystalWall,
  name: "Mur de cristal",
  manaCost: true,
  usageCost: 4,
  area: BoxType.Empty,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} self={[{ value: 1, status: Status.Aegis }]} />,
  getDescription: () => (
    <>
      <Row>
        <Col>Génère <Bold>un mur de cristal</Bold> (5PA pour Détruire, dure environ 48h).</Col>
      </Row>
      <Row>
        <Col>Confère au lanceur 1 <Bold><DisplayStatus status={Status.Aegis} hasLabel /></Bold></Col>
      </Row>
      <DisplayTouch semiSuccess="Elément fragile (-1PA pour Détruire)." critical="Elément solide (+1PA pour Détruire)" />
    </>
  ),
};
