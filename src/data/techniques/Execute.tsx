import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { Talent, ResumeAttack } from "../talents";

export const Execute: Talent = {
  id: TechniqueId.Execute,
  name: "Exécuter",
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <PrincipalWeaponAttack summary={summary} />
          <span> avec un <Bold>Avantage</Bold> si la cible est <Bold>agonisante</Bold></span>
        </span>
      </Row>
      <Row>
        <span>Si la cible est <Bold>vaincue</Bold>, le <Bold>coût est réduit à 0 PA</Bold></span>
      </Row>
    </>
  ),
};
