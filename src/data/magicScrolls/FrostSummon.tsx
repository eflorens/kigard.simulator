import { Badge, IceElemental, Row, Col, Bold, Card, CardHeader, CardBody, Underline, Italic } from "../../components";
import { DisplayElement } from "../../components/DisplayElement";
import { DisplayTouch } from "../../components/DisplayTouch";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { ElementId, Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, BoxType, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const FrostSummon: Talent = {
  id: MagicScrollId.FrostSummon,
  name: "Invocation du givre",
  manaCost: true,
  usageCost: 8,
  area: BoxType.IceWall,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} />
      <Badge pill><IceElemental /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un mur de glace en un <Bold><IceElemental hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <IceElemental hasLabel /> - Invocation majeur</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>INT : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.5 * mag)}</Bold>
              </Col></Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.5 * mag)}</Bold>
              </Col></Row>
            <Row>
              <Col>PRE : <Bold>{Math.floor(1.5 * mag)}</Bold>
              </Col></Row>
            <Row>
              <Col>MM : <Bold>{Math.floor(1.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>MAG : <Bold>+4</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Rafale de givre</Bold></Col></Row>
            <Row>
              <Col><Bold>Résistance <DisplayElement element={ElementId.Ice} hasLabel /> 20%</Bold></Col></Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col>MAG : <Bold>+2</Bold></Col>
            </Row>
            <Row>
              <Col>
                <Bold>Résistance <DisplayElement element={ElementId.Ice} hasLabel /> 20%</Bold>
              </Col>
            </Row>
            <Row>
              <Col>
                <Bold><DisplayAttack status={[{ value: 1, status: Status.Freeze }]} /></Bold>
              </Col>
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
