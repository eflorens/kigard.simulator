import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const QuickAttack: Talent = {
  id: TechniqueId.QuickAttack,
  name: "Attaque rapide",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, -2),
  range: getPrimaryWeaponRange,
  required: "Dague, Epée ou Arc",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ accuracy: -30 }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <PrincipalWeaponAttack summary={summary} modifier={{ accuracy: -30 }} />
      </Row>
      <Row>
        <span>Si la cible a le <Bold>statut <DisplayStatus status={Status.Exposed} hasLabel /></Bold>, inflige <Bold>1<DisplayStatus status={Status.Exposed} hasLabel /></Bold></span>
      </Row>
    </>
  ),
};
