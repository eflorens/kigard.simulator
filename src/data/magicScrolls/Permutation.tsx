import { Row, Col, Bold } from "../../components";
import { DisplayTouch } from "../../components/DisplayTouch";
import { MagicScrollId } from "./MagicScrollId";
import { Talent, ResumeEffect } from "../talents";

export const Permutation: Talent = {
  id: MagicScrollId.Permutation,
  name: "Permutation",
  manaCost: true,
  usageCost: "(distance x 3)",
  range: { min: 1, max: 2 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} />,
  getDescription: () => (
    <>
      <Row><Col>Echange sa position avec celle de la cible.</Col></Row>
      <DisplayTouch semiSuccess={<>comme <Bold>Echec</Bold></>} critical={<>comme <Bold>Réussite</Bold></>} />
    </>
  ),
};
