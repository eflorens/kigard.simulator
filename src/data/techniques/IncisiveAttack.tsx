import { PrincipalWeaponAttack, getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { Talent, ResumeAttack } from "../talents";

export const IncisiveAttack: Talent = {
  id: TechniqueId.IncisiveAttack,
  name: "Attaque incisive",
  usageCost: (summary) => getPrimaryWeaponUsageCost(summary, 2),
  range: { min: 1, max: 1 },
  required: "Dague, Epée ou Lance",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} />,
  getDescription: (summary) => {
    const ignoredArmor = (summary.observation + summary.discretion) / 10;
    return (
      <>
        <Row>
          <PrincipalWeaponAttack summary={summary} />
        </Row>
        <Row>
          <span><Bold>Réussite</Bold> : ignore <Bold>{ignoredArmor} d'ARM</Bold></span>
        </Row>
        <Row>
          <span><Bold>Critique</Bold> : ignore <Bold>{ignoredArmor * 2} d'ARM</Bold></span>
        </Row>
      </>
    );
  },
};
