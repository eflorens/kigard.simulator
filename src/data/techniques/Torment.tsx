import { getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayElement } from "../../components/DisplayElement";
import { DisplayStatus } from "../../components/DisplayStatus";
import { ElementId, Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const Torment: Talent = {
  id: TechniqueId.Torment,
  name: "Tourmenter",
  usageCost: getPrimaryWeaponUsageCost,
  range: { min: 1, max: 1 },
  manaCost: true,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Attaque de <DisplayElement element={ElementId.Dark} hasLabel /> de l'arme principale </span>
          <ResumeAttack weapon={summary?.primaryWeapon} />
          <span> avec <Bold>3<DisplayStatus status={Status.Terror} hasLabel /></Bold></span>
        </span>
      </Row>
      <Row>
        <span>Chaque niveau de <Bold>Terreur</Bold> déjà existant donne <Bold>+5 de Précision (maximum +30)</Bold></span>
      </Row>
    </>
  ),
};
