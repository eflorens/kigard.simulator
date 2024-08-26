import { TechniqueId } from "./TechniqueId";
import { Badge, Bold, Row } from "../../components";
import { Talent, AccuracyAttack } from "../talents";

export const FutureRead: Talent = {
  id: TechniqueId.FutureRead,
  name: "Lire l'avenir",
  usageCost: 0,
  range: { min: 0, max: 4 },
  resume: (summary) => <Badge pill><Bold><AccuracyAttack accuracy={summary.magicAttack + summary.observation} /></Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Permet de connaître le <Bold>prochain tirage des dés de PA</Bold> de sa cible</span>
          <span> ainsi que <Bold>l'horaire de son prochain tour</Bold></span>
        </span>
      </Row>
      <Row>
        <span>Requiert de réussir une touche avec <Bold>{summary.magicAttack + summary.observation}</Bold></span>
      </Row>
      <Row>
        <span>Si la cible n'est pas un allié, elle se défend avec <Bold>(DM + DIS)</Bold></span>
      </Row>
      <Row>
        <span>Les dés les plus à droite seront perdus si la cible est <Bold>en surcharge</Bold> ou <Bold>agonisante</Bold> à son activation</span>
      </Row>
    </>
  ),
};
