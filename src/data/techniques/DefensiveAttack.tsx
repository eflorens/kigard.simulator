import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const DefensiveAttack: Talent = {
  id: TechniqueId.DefensiveAttack,
  name: "Attaque défensive",
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ criticalFactor: 1 }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <PrincipalWeaponAttack summary={summary} modifier={{ criticalFactor: 1 }} />
          <span> et gagne 1<DisplayStatus status={Status.Defense} hasLabel /></span>
        </span>
      </Row>
      <Row>
        <span><Bold>Critique</Bold> : au lieu des dégâts augmentés, <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold> supplémentaire</span>
      </Row>
    </>
  ),
};
