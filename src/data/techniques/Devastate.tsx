import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const Devastate: Talent = {
  id: TechniqueId.Devastate,
  name: "Ravager",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <>
      <Row>
        <PrincipalWeaponAttack summary={summary} />
      </Row>
      <Row>
        <span>
          <span>Les statuts suivants ont leurs effets <Bold>doublés pendant l'action</Bold> </span>
          <span>
            <DisplayStatus status={Status.Stunned} />
            <DisplayStatus status={Status.Piercing} />
            <DisplayStatus status={Status.Impact} />
          </span>
        </span>
      </Row>
    </>
  ),
};
