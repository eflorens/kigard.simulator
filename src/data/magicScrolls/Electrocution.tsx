import { ElementId, Status } from "../inventory";
import { MagicScrollId } from "./MagicScrollId";
import { Talent, ResumeEffect } from "../talents";
import { Row } from "reactstrap";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayElement } from "../../components/DisplayElement";
import { Bold } from "../../components";

export const Electrocution: Talent = {
  id: MagicScrollId.Electrocution,
  name: "Electrocution",
  reusable: true,
  manaCost: true,
  usageCost: 4,
  range: { min: 1, max: 3 },
  resume: (summary) => (
    <ResumeEffect
      primaryWeapon={summary.primaryWeapon}
      secondaryWeapon={summary.secondaryWeapon}
      attack={summary.magicAttack}
      damage={summary.intelligence}
      modifier={{ damage: summary.magicPower }}
      element={ElementId.Thunder}
    />
  ),
  getDescription: () => (
    <>
      <Row>
        <span>
          Inflige des dégâts magique de <DisplayElement element={ElementId.Thunder} hasLabel />.
        </span>
        <span>
          Confère au lanceur 2 <DisplayStatus status={Status.Overload} hasLabel />.
        </span>
      </Row>
      <Row>
        <span>
          Le statut <Bold>Surcharge</Bold> n'est pas déclenché par ce sortilège.
        </span>
      </Row>
    </>
  ),
};
