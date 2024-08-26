import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent } from "../talents";

export const Retirement: Talent = {
  id: TechniqueId.Retirement,
  name: "Retraite",
  usageCost: 2,
  area: "Soi-même",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>Permet de préparer <Bold>une retraite</Bold> pour le tour en cours (expire à l'activation)</span>
      </Row>
      <Row>
        <span>
          <span>La prochaine fois que l'utilisateur est la cible d'une attaque ou d'un sort hostile, après la résolution des effets, </span>
          <span> il <Bold>se déplace dans la direction choisie, ou si impossible, dans une des 2 directions adjacentes</Bold></span>
        </span>
      </Row>
      <Row>
        <span>En cas de blocage ou d'esquive, et si un déplacement a bien été effectué, l'attaquant subit <Bold>+2 <DisplayStatus status={Status.Exposed} hasLabel /></Bold></span>
      </Row>
    </>
  )
};
