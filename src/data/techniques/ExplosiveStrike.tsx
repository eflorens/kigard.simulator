import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Bold, List, Row } from "../../components";
import { Talent, ResumeAttack } from "../talents";
import { DisplayElement } from "../../components/DisplayElement";
import { ElementId, Status } from "../inventory";
import { DisplayStatus } from "../../components/DisplayStatus";

export const ExplosiveStrike: Talent = {
  id: TechniqueId.ExplosiveStrike,
  name: "Attaque explosive",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 0),
  range: getPrimaryWeaponRange,
  required: "Gant, Fusil ou Arme de Feu",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ baseAccuracy: 15, baseDamage: (summary?.primaryWeapon?.baseDamage ?? 0) + 3 }} />,
  getDescription: (summary) => (
    <>
    <Row>
        <span>
            Inflige à l'utilisateur <Bold>10 dégâts purs de <DisplayElement element={ElementId.Fire} hasLabel /></Bold>.
        </span>
        <span>
            Attaque de <Bold>l'arme principale</Bold> avec <Bold>+15 en Précision</Bold> et <Bold>+3 Dégâts</Bold>.
        </span>
    </Row>
    Un objet (au choix) peut être utilisé :
    <List>
        <li>
            Une <Bold>fiole incendiaire</Bold> ajoute <Bold>l'élément du
            {" "} <DisplayElement element={ElementId.Fire} hasLabel /></Bold> et <Bold>+3
            {" "} <DisplayStatus status={Status.Burning} hasLabel /></Bold>.
        </li>
        <li>
        Une <Bold>poudre noire</Bold> ajoute <Bold>+15 en Précision</Bold> et <Bold>+3 Dégâts</Bold>.
        </li>
    </List>
    </>
  ),
};
