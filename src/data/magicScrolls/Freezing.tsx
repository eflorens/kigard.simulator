import { Row, Col, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayTouch } from "../../components/DisplayTouch";
import { ElementId, Status } from "../inventory";
import { getMagicPower } from "../talents";
import { MagicScrollId } from "./MagicScrollId";
import { Talent, ResumeEffect } from "../talents";

export const Freezing: Talent = {
  id: MagicScrollId.Freezing,
  name: "Congélation",
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  element: ElementId.Ice,
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} element={ElementId.Ice} status={[{ value: getMagicPower(summary) / 5, status: Status.Freeze }]} />,
  getDescription: (summary) => {
    return (
      <>
        <Row><Col><Bold>Sur personnage :</Bold> Inflige <Bold>{getMagicPower(summary) / 5} <DisplayStatus status={Status.Freeze} hasLabel />.</Bold></Col></Row>
        <Row><Col><Bold>Sur case libre :</Bold> Génère <Bold>un block de glace.</Bold> (5PA pour détruire, dure environ 48h).</Col></Row>
        <Row><Col><DisplayTouch semiSuccess="Elément fragile (-1PA pour le détruire)." critical="Elément solide (+1PA pour le détruire)" /></Col></Row>
      </>
    );
  }
};
