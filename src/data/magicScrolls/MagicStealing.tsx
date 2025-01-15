import { Row, Col, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayTouch } from "../../components/DisplayTouch";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const MagicStealing: Talent = {
  id: MagicScrollId.MagicStealing,
  name: "Vol de magie",
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} />,
  getDescription: (summary) => {
    return (
      <>
        <Row>
          <Col>Vole <Bold>{getMagicPower(summary) / 5} PM</Bold> et <Bold>dissipe 2 <DisplayStatus status={Status.Aegis} hasLabel />.</Bold></Col>
        </Row>
        <Row>
          <Col>Regagne <Bold>2 PM</Bold> par  <Bold>Niveau de <DisplayStatus status={Status.Aegis} hasLabel /> dissipé</Bold>.</Col>
        </Row>
        <DisplayTouch semiSuccess="-1 statut disspé" critical="+1 statut disspé" />
      </>
    );
  }
};
