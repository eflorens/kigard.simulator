import { TechniqueId } from "./TechniqueId";
import { Bold, Row, List } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { ResumeEffect, Talent } from "../talents";

export const Protect: Talent = {
  id: TechniqueId.Protect,
  name: "Protéger",
  usageCost: 2,
  range: { min: 1, max: 1 },
  resume: () => <ResumeEffect status={[{ value: 0, status: Status.Protect}]} />,
  getDescription: () => (
    <>
      <Row>
        <span>Permet de <Bold>protéger <DisplayStatus status={Status.Protect} /></Bold> sa cible jusqu'au prochain tour de l'utilisateur (le protecteur)</span>
      </Row>
      <Row>
        <span>
          <span>La prochaine fois que le <Bold>personnage protégé</Bold> est ciblé par une action hostile (attaque, technique ou sort), </span>
          <span>le <Bold>protecteur</Bold> prend sa place et devient ainsi la nouvelle cible</span>
        </span>
        <List>
          <li>La protection n'est pas déclenchée si le protecteur n'est <Bold>plus adjacent</Bold> au protégé</li>
          <li>Elle est annulée au prochain tour du protecteur, même si elle n'a pas été déclenchée</li>
          <li>Si la technique est utilisée sur une cible <Bold>déjà protégée</Bold>, l'utilisateur devient <Bold>le nouveau protecteur</Bold></li>
        </List>
      </Row>
    </>
  )
};
