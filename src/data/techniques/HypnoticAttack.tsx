import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const HypnoticAttack: Talent = {
  id: TechniqueId.HypnoticAttack,
  name: "Attaque hypnotique",
  manaCost: true,
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ accuracy: Math.floor(summary.magicAttack / 2) }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <PrincipalWeaponAttack summary={summary} modifier={{ accuracy: Math.floor(summary.magicAttack / 2) }} />
      </Row>
      <Row>
        <span>Ne déclenche pas les <Bold>réactions (Riposter, Protéger, Retraite)</Bold> ni le statut <Bold><DisplayStatus status={Status.Defense} /></Bold></span>
      </Row>
      <Row>
        <span><Bold>Critique</Bold> : déprogramme les <Bold>réactions</Bold> (de la cible) et retire <Bold>1 <DisplayStatus status={Status.Defense} hasLabel /></Bold></span>
      </Row>
    </>
  ),
};
