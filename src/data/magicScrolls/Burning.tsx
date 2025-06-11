import { Row, Col, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { Status } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Burning: Talent = {
  id: MagicScrollId.Burning,
  name: "Incendie",
  manaCost: true,
  usageCost: 6,
  range: { min: 1, max: 3 },
  area: { x: 3, y: 3 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} status={[{ value: 2, status: Status.Burning }, { value: getMagicPower(summary) / 5, status: Status.Fire }]} />,
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row>
          <Col><Bold>Sur case centrale, si libre</Bold> : Génère <Bold>un <DisplayStatus status={Status.Fire} hasLabel /></Bold> de <Bold>{mag / 5} <DisplayStatus status={Status.Fire} /></Bold> intensité.</Col>
        </Row>
        <Row>
          <Col><Bold>Sur décor d'arbre ou d'herbe</Bold> : Devient <Bold>un <DisplayStatus status={Status.Fire} hasLabel /></Bold> de <Bold>{mag / 5} <DisplayStatus status={Status.Fire} /></Bold> intensité.</Col>
        </Row>
        <Row>
          <Col><Bold>Sur personnage</Bold> : Inflige <Bold>{mag / 5} <DisplayStatus status={Status.Burning} hasLabel /></Bold>.</Col>
        </Row>
      </>
    );
  },
};
