import { Badge, CrystalGuardian, Row, Col, Bold, Card, CardHeader, CardBody, Underline, Italic } from "../../components";
import { DisplayTouch } from "../../components/DisplayTouch";
import { getMagicPower } from "../talents";
import { Talent, BoxType, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const CrystalSummon: Talent = {
  id: MagicScrollId.CrystalSummon,
  name: "Invocation du cristal",
  manaCost: true,
  usageCost: 8,
  area: BoxType.CrystalWall,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><CrystalGuardian /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row>
          <Col>Transforme un mur de cristal en un <Bold><CrystalGuardian hasLabel /></Bold>.</Col>
        </Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <CrystalGuardian hasLabel /> - Invocation majeur</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>INT : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col>MM : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col>DM : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col>MAG : <Bold>+4</Bold></Col>
            </Row>
            <Row>
              <Col>RES : <Bold>+4</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Lance de cristal</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col>MAG : <Bold>+2</Bold></Col>
            </Row>
            <Row>
              <Col>RES : <Bold>+2</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Résonnance</Bold>: les statuts positifs réçus sont également appliqués à son maître.</Col>
            </Row>
          </CardBody>
        </Card>
        <Row>
          <DisplayTouch
            critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
            semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)} />
        </Row>
      </>
    );
  },
};
