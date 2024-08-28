import { Row, Col, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { ElementId, Status } from "../inventory";
import { getMagicPower } from "../talents";
import { MagicScrollId } from "./MagicScrollId";
import { Talent, ResumeEffect, DamageType } from "../talents";

export const LifeDrain: Talent = {
  id: MagicScrollId.LifeDrain,
  name: "Drain de vie",
  reusable: true,
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 2 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} damage={summary.intelligence} modifier={{ damage: summary.magicPower }} element={ElementId.Dark} />,
  getDescription: (summary) => (
    <>
      <Row>
        <Col>
          <DisplayAttack
            element={ElementId.Dark}
            baseDamage={{ value: getMagicPower(summary), type: DamageType.Magic }} />
        </Col>
      </Row>
      <Row><Col>Soigne le lanceur de <Bold>30% des dégâts infligés</Bold>, <Bold>+5%</Bold> par <DisplayStatus status={Status.Bleeding} hasLabel /> sur la cible (<Bold>max de 30%</Bold>).</Col></Row>
    </>
  ),
};
