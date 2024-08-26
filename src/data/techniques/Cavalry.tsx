import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";

export const Cavalry = {
  id: TechniqueId.Cavalry,
  name: "Cavalerie",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>Permet d'utiliser les <Bold>Sortilèges</Bold> et les <Bold>Techniques d'attaque</Bold> sur une monture</span>
      </Row>
      <Row>
        <span>Le malus passe de -30% à <Bold>-15%</Bold></span>
      </Row>
      <Row>
        <span>
          <span>Pour chaque case parcourure (jusqu'à 3 maximum), </span>
          <span>la prochaine attaque de ce tour aura <Bold>+15% en Précision</Bold> (jusqu'à +45% maximum)</span>
        </span>
      </Row>
      <Row>
        <span>Ce bonus requiert d'attaque avec une <Bold>Epée</Bold>, une <Bold>Lance</Bold>, une <Bold>Masse</Bold>, une <Bold>Hache</Bold> ou un <Bold>Bouclier</Bold></span>
      </Row>
    </>
  )
};
