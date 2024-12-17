import { getPrimaryWeaponRange , getPrimaryWeaponUsageCost } from "../PrimaryWeapon";
import { TechniqueId } from "./TechniqueId";
import { Row, Bold, List } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, ResumeAttack } from "../talents";

export const ProvokingStrike: Talent = {
  id: TechniqueId.ProvokingStrike,
  name: "Attaque provocante",
  usageCost: getPrimaryWeaponUsageCost,
  range: getPrimaryWeaponRange,
  required: "Requis : ni Arc ni Fusil",
  resume: (summary) => <ResumeAttack weapon={summary?.primaryWeapon} modifier={{ criticalFactor: 1, self: [{ value: 1, status: Status.Defense }] }} />,
  getDescription: () => (
    <>
      <Row>
        <span>Attaque de <Bold>l'arme principale</Bold>.</span>
        <span>Si <Bold>[CHA] &gt; PV/10 de la cible</Bold> : </span>
      </Row>
      <List>
        <li>
            <Bold>Réussite</Bold> : inflige <Bold>2 <DisplayStatus status={Status.Taunt} hasLabel /></Bold> (non cumulatif)
        </li>
        <li>
            <Bold>Critique</Bold> : inflige <Bold>3 <DisplayStatus status={Status.Taunt} hasLabel /></Bold> (non cumulatif)
        </li>
      </List>
    </>
  ),
};
