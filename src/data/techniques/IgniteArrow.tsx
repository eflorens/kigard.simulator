import { TechniqueId } from "./TechniqueId";
import { Row, Bold, Italic, DisplayModificator } from "../../components";
import { Talent, BoxType } from "../talents";

export const IgniteArrow: Talent = {
  id: TechniqueId.IgniteArrow,
  name: "Enflammer une flèche",
  usageCost: 2,
  range: { min: 0, max: 1 },
  area: [BoxType.Fire, "Soi-même"],
  resume: (<DisplayModificator id={45} name="Flèche enflammé" />),
  getDescription: (summary) => (
    <>
      <Row>
        <span>
          <span>Consomme une flèche de l'inventaire et prépare une munition <DisplayModificator id={45} name="Flèche enflammé" /> pour 3 tours,</span>
          <span> qui sera automatiquement utilisée lors de la prochaine attaque avec l'arc à la place d'une flèche normale</span>
        </span>
      </Row>
      <Row>
        <span>
          <span>Sur une source de feu (Brasero, Campement, Incendie) le coût de cette action est <Bold>réduit à 0 PA</Bold></span>
        </span>
      </Row>
      <Row>
        <Italic>Note : la munition est perdue si le perso deséquipe ou échange son arme en main</Italic>
      </Row>
    </>
  ),
};
