import { Badge, Treant, Row, Col, Bold, Card, CardHeader, CardBody, Underline, Italic } from "../../components";
import { DisplayElement } from "../../components/DisplayElement";
import { DisplayTouch } from "../../components/DisplayTouch";
import { ElementId } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, BoxType, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const ForestSummon: Talent = {
  id: MagicScrollId.ForestSummon,
  name: "Invocation de la forêt",
  manaCost: true,
  usageCost: 8,
  area: BoxType.Tree,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <span>
      <ResumeEffect attack={summary.magicAttack} />
      <Badge pill><Treant /></Badge>
    </span>
  ),
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row><Col>Transforme un arbre en un <Bold><Treant hasLabel /></Bold>.</Col></Row>
        <Card>
          <CardHeader>
            <Bold>Profil du <Treant hasLabel /> - Invocation majeur</Bold>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>FOR : <Bold>{Math.floor(0.7 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>CON : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>ESP : <Bold>{Math.floor(0.5 * mag)}</Bold></Col>
            </Row>
            <Row>
              <Col>PRE : <Bold>{Math.floor(1.5 * mag)}</Bold></Col>
            </Row>
            <Row></Row>
            <Row>
              <Col>DGT : <Bold>         +4</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Vulnérabilité <DisplayElement element={ElementId.Fire} /> 30%</Bold></Col>
            </Row>
            <Row>
              <Col><Underline><Bold>Bonus critique</Bold></Underline></Col>
            </Row>
            <Row>
              <Col>DGT : <Bold>+2</Bold></Col>
            </Row>
            <Row>
              <Col><Bold>Attaque puissante</Bold></Col>
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
