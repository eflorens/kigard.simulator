import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent } from "../talents";

export const Ambush: Talent = {
  id: TechniqueId.Ambush,
  name: "Embuscade",
  resume: (<></>),
  getDescription: (summary) => (
    <>
      <Row>
        <span>Opère si vous avez le statut <Bold><DisplayStatus status={Status.Furtivity} hasLabel /></Bold></span>
      </Row>
      <Row>
        <span>
          <span>Lors d'une attaque (physique ou magique), <Bold>{Math.floor(summary.discretion / 2)}%</Bold> </span>
          <span>s'ajoute à l'attribut pour attaquer ou pour défendre</span>
        </span>
      </Row>
    </>
  )
};
