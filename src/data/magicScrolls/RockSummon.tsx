import { Badge, StoneGolem, Row, Col, Bold, Card, CardHeader, CardBody, Underline, Italic } from "../../components";
import { DisplayTouch } from "../../components/DisplayTouch";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, BoxType, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const RockSummon: Talent = {
  id: MagicScrollId.RockSummon,
  name: "Invocation de la roche",
  manaCost: true,
  usageCost: 8,
  area: BoxType.Rock,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><StoneGolem /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un rocher en un <Bold><StoneGolem hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <StoneGolem hasLabel /> - Invocation majeur</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.6 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.6 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{mag}</Bold></Col>
            </Row>
            <Row>
              <Col>ARM : <Bold>+6</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col>ARM : <Bold>+3</Bold></Col>
            </Row>
            <Row>
              <Col><Bold><DisplayAttack status={[{ value: 1, status: Status.Stunned }]} /></Bold></Col>
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
