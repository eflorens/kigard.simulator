import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { Talent } from "../talents";

export const Vigilance: Talent = {
  id: TechniqueId.Vigilance,
  name: "Vigilance",
  resume: (<></>),
  getDescription: (summary) => (
    <>
      <Row>
        <span>Opère lorsque vous avez l'<Bold>Avantage</Bold> ou que votre adversaire a le <Bold>Désavantage</Bold></span>
      </Row>
      <Row>
        <span>
          <span>Lors d'une attaque (physique ou magique), <Bold>{Math.floor(summary.observation / 2)}%</Bold> </span>
          <span>s'ajoute à l'attribut pour attaquer ou pour défendre</span>
        </span>
      </Row>
    </>
  )
};
