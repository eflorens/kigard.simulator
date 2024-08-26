import { TechniqueId } from "./TechniqueId";
import { Row, Bold, Italic } from "../../components";
import { Talent } from "../talents";

export const Incant: Talent = {
  id: TechniqueId.Incant,
  name: "Incanter",
  usageCost: 3,
  area: "Soi-même",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Réalise une <Bold>méditation</Bold></span>
          <span> et remplit un emplacement de <Bold>Mémoire</Bold> avec un <Bold>sort aléatoire</Bold></span>
        </span>
      </Row>
      <Row>
        <span>
          <Italic>Note : les sorts possibles dépendent du Domaine où se trouve le personnage,</Italic>
          <Italic> mais incluent toujours <Bold>Piqûre, Exaltation</Bold> et <Bold>Envoûtement</Bold></Italic>
        </span>
      </Row>
    </>
  ),
};
