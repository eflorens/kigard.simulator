import { TechniqueId } from "./TechniqueId";
import { Row, Bold, Italic } from "../../components";

export const Ambidexterity = {
  id: TechniqueId.Ambidexterity,
  name: "Ambidextrie",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Quand vous attaquez avec l'une de vos armes, </span>
          <span>la prochaine attaque ce tour avec l'autre arme vous coûte <Bold>1 PA de moins </Bold> </span>
          <span>et bénéficie d'un <Bold>bonus de 15% PRE</Bold></span>
        </span>
      </Row>
      <Row>
        <span>Cet effet ne peut se declencher <Bold>qu'une seule fois par main</Bold></span>
      </Row>
      <Row>
        <Italic>Note : Fonctionne avec les attaques de bases et les techniques d'attaque</Italic>
      </Row>
    </>
  )
};
