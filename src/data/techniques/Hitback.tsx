import { PrincipalWeaponAttack } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Badge, Bold, Row } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent } from "../talents";

export const Hitback: Talent = {
  id: TechniqueId.Hitback,
  name: "Riposter",
  usageCost: 2,
  area: "Soi-même",
  required: "Arme de corps-à-corps",
  resume: () => <Badge pill><Bold><DisplayStatus status={Status.Hitback} /></Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>Permet de préparer <Bold>une riposte <DisplayStatus status={Status.Hitback} /></Bold> pour le tour en cours (expire à l'activation)</span>
      </Row>
      <Row>
        <span>
          <span>La prochaine fois que l'utilisateur est la cible d'une attaque ou d'un sort hostile par un personnage adjacent, </span>
          <span>il <Bold>riposte par une attaque normale</Bold> <PrincipalWeaponAttack summary={summary} /></span>
        </span>
      </Row>
      <Row>
        <span>Une riposte <Bold>ne déclenche pas</Bold> d'actions programmées(<Bold>Riposter, Protéger</Bold>)</span>
      </Row>
      <Row>
        <span>L'utilisateur doit toujours être <Bold>équipé d'une arme de corps-à-corps</Bold> au moment de riposter</span>
      </Row>
    </>
  )
};
