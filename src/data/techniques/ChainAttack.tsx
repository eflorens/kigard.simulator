import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const ChainAttack: Talent = {
  id: TechniqueId.ChainAttack,
  name: "Enchaîner",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: getPrimaryWeaponRange,
  required: "Epée, Masse, Lance, Gant ou Fouet",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ accuracy: -15 }} />,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Deux attaques de l'arme principale </span>
          <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ accuracy: -15 }} />
        </span>
      </Row>
      <Row>
        <span>Le statut <Bold>Impact</Bold> n'est pas déclenché par ces attaques</span>
      </Row>
      <Row>
        <span>Confère <Bold>+4 <DisplayStatus status={Status.Impact} hasLabel /></Bold> si chaque attaque obtient <Bold>Une réussite ou un critique</Bold></span>
      </Row>
    </>
  ),
};
