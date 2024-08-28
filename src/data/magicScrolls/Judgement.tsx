import { Row, Col, Bold } from "../../components";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { ElementId } from "../inventory";
import { Talent, ResumeEffect, DamageType } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Judgement: Talent = {
  id: MagicScrollId.Judgement,
  name: "Jugement",
  manaCost: true,
  usageCost: 6,
  element: ElementId.Light,
  range: { min: 1, max: 1 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} damage={summary.intelligence * 1.5} modifier={{ damage: summary.magicPower }} element={ElementId.Light} />,
  getDescription: (summary) => (
    <>
      <Row>
        <Col><DisplayAttack
          element={ElementId.Light}
          baseDamage={{ value: Math.floor(summary.intelligence * 1.5) + summary.magicPower, type: DamageType.Magic }} /></Col>
      </Row>
      <Row>
        <Col>MM <Bold>augmentée de 2% par niveau de statuts positifs de la cible.</Bold></Col>
      </Row>
    </>
  ),
};
