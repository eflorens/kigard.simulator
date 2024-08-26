import { Row, Col, Bold } from "../../components";
import { DisplayTouch } from "../../components/DisplayTouch";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Teleportation: Talent = {
  id: MagicScrollId.Teleportation,
  name: "Téléportation",
  manaCost: true,
  usageCost: "(distance x 2)",
  range: { min: 1, max: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: () => (
    <>
      <Row><Col>Se <Bold>téléporte</Bold> sur la case.</Col></Row>
      <DisplayTouch semiSuccess={<>comme <Bold>Echec</Bold></>} critical={<>comme <Bold>Réussite</Bold></>} />
    </>
  ),
};
