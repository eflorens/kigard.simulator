import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold, Italic } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const MysticAttack: Talent = {
  id: TechniqueId.MysticAttack,
  name: "Attaque mystique",
  usageCost: getPrimaryWeaponUsageCost,
  manaCost: true,
  range: getPrimaryWeaponRange,
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => {
    return (
      <>
        <Row>
          <span>Gagne <Bold>2 niveaux de statut</Bold> au choix parmi ceux actifs sur l'attaquant, ou <Bold>3</Bold> sur un <Bold>jet de {summary.magicDefense} réussi</Bold></span>
        </Row>
        <Row>
          <span>
            <span>Attaque ensuite de l'arme principale</span>
            <ResumeAttack weapon={summary?.primaryWeapon} />
          </span>
        </Row>
        <Row>
          <Italic>Note : L'augmentation de statut est facultative.</Italic>
        </Row>
        <Row>
          <span>
            <Italic>Statuts éligibles : </Italic>
            <DisplayStatus status={Status.Aegis} />
            <DisplayStatus status={Status.Endurance} />
            <DisplayStatus status={Status.Hability} />
            <DisplayStatus status={Status.Immunity} />
            <DisplayStatus status={Status.Impact} />
            <DisplayStatus status={Status.Inspiration} />
            <DisplayStatus status={Status.Regeneration} />
            <DisplayStatus status={Status.MysticalSubterfuge} />
            <DisplayStatus status={Status.Force} />
            <DisplayStatus status={Status.Vivacious} />
            <DisplayStatus status={Status.Will} />
            <DisplayStatus status={Status.Overload} />
          </span>
        </Row>
      </>
    );
  }
};
