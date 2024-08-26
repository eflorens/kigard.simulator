import { Row, Col, Italic, Bold } from "../../components";
import { DisplayAttack } from "../../features/talents/DisplayAttack";
import { ElementId } from "../inventory";
import { getMagicPower } from "../talents";
import { Talent, ResumeEffect, DamageType } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Thunder: Talent = {
  id: MagicScrollId.Thunder,
  name: "Foudre",
  manaCost: true,
  usageCost: 6,
  range: { min: 1, max: 3 },
  area: { x: 3, y: 3 },
  resume: (summary) => <ResumeEffect attack={summary.magicAttack} damage={summary.intelligence} modifier={{ damage: summary.magicPower }} element={ElementId.Thunder} />,
  getDescription: (summary) => {
    const mag = getMagicPower(summary);
    return (
      <>
        <Row>
          <Col>
            <DisplayAttack
              baseDamage={{ value: mag, type: DamageType.Magic }} element={ElementId.Thunder} />
            <span> à la cible centrale.</span>
          </Col>
        </Row>
        <Row>
          <Col>Inflige <span>{Math.floor(mag / 2)}</span> aux personnages adjacents.</Col>
        </Row>
        <Row>
          <Col><Italic>Note : ne déclenche les réactions <Bold>(Retraite, Riposter, Protéger)</Bold> que sur la cible principale.</Italic></Col>
        </Row>
      </>
    );
  },
};
