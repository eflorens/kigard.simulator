import { getPrimaryWeaponUsageCost, PrincipalWeaponAttack } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { ElementId, Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const Torment: Talent = {
  id: TechniqueId.Torment,
  name: "Tourmenter",
  usageCost: getPrimaryWeaponUsageCost,
  range: { min: 1, max: 1 },
  manaCost: true,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} element={ElementId.Dark} modifier={{ status: [{ value: 3, status: Status.Terror }] }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <PrincipalWeaponAttack summary={summary} element={ElementId.Dark} modifier={{ status: [{ value: 3, status: Status.Terror }] }} />
      </Row>
      <Row>
        <span>Chaque niveau de <Bold>Terreur</Bold> déjà existant donne <Bold>+5 de Précision (maximum +30)</Bold></span>
      </Row>
    </>
  ),
};
