import { Badge, Ghost, Row, Col, Bold, Card, CardHeader, CardBody, Underline, Italic } from "../../components";
import { DisplayElement } from "../../components/DisplayElement";
import { DisplayTouch } from "../../components/DisplayTouch";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { ElementId, Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, BoxType, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const SoulsAwakening: Talent = {
  id: MagicScrollId.SoulsAwakening,
  name: "Réveil des âmes",
  manaCost: true,
  usageCost: 4,
  area: BoxType.Remains,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><Ghost /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Relève un <Bold><Ghost hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <Ghost hasLabel /> - Invocation mineure</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.4 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>INT : <Bold>{Math.floor(0.4 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.2 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.4 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{mag}</Bold>  </Col>
            </Row>
            <Row>
              <Col>MM : <Bold>{mag}</Bold>   </Col>
            </Row>
            <Row>
              <Col>ESQ : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>DM : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Vulnérabilité <DisplayElement element={ElementId.Light} hasLabel /> 30%</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Siphonner</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col><Bold>Vol de magie</Bold></Col>
            </Row>
            <Row>
              <Col><Bold><DisplayAttack status={[{ value: 1, status: Status.Terror }]} /></Bold></Col>
            </Row>
            <DisplayTouch
              critical={<span>Gagne <Bold>un trait</Bold> et les bonus listés <Italic>(Valeur de MAG non augmentée)</Italic></span>}
              semiSuccess={(<span>Aucun effet (comme <Bold>Echec</Bold>)</span>)} />
          </CardBody>
        </Card>
      </>
    );
  },
};
