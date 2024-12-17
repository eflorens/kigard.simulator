import { Row, Col, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect, DamageType } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const MentalShock: Talent = {
  id: MagicScrollId.MentalShock,
  name: "Choc mental",
  manaCost: true,
  usageCost: 4,
  reusable: true,
  range: { min: 1, max: 2 },
  resume: (summary) => (
    <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon}
      attack={summary.magicAttack}
      damage={summary.intelligence}
      modifier={{ damage: summary.magicPower }}
      self={[{ value: 2, status: Status.Bewitched }]} />
  ),
  getDescription: (summary) => {
    return (
      <>
        <Row>
          <Col><DisplayAttack baseDamage={{ value: getMagicPower(summary), type: DamageType.Magic }} /> et
          <Bold> 2 <DisplayStatus status={Status.Bewitched} hasLabel /></Bold>. </Col>
        </Row>
      </>
    );
  },
};
