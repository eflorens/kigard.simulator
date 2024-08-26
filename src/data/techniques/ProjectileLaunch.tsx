import { TechniqueId } from "./TechniqueId";
import { Bold, Row } from "../../components";
import { Talent, AccuracyAttack, DamageAttack } from "../talents";

export const ProjectileLaunch: Talent = {
  id: TechniqueId.ProjectileLaunch,
  name: "Lancer un projectile",
  usageCost: 3,
  range: { min: 1, max: 3 },
  resume: (summary) => {
    const baseDamage = (summary.strength + summary.dexterity) / 2;

    return (
      <Bold>
        <AccuracyAttack accuracy={summary.accuracy} />
        <DamageAttack
          className="mx-2"
          blocked={Math.floor(baseDamage / 2)}
          base={Math.floor(baseDamage)}
          critical={Math.floor(baseDamage * 3 / 2)} />
      </Bold>
    );
  },
  getDescription: (summary) => {
    const baseDamage = (summary.strength + summary.dexterity) / 2;
    return (
      <>
        <Row>
          <span>Attaque d'un <Bold>projectile</Bold> de l'inventaire</span>
        </Row>
        <Row>
          <span>
            <span>Base de dégâts : </span>
            <Bold>{Math.floor(baseDamage)} </Bold>
            <Bold>[Bloqué : {Math.floor(baseDamage / 2)}] </Bold>
            <Bold>[Critique : {Math.floor(baseDamage * 3 / 2)}] </Bold>
          </span>
        </Row>
        <Row>
          <span>Le <Bold>projectile</Bold> sera considéré comme une arme</span>
        </Row>
      </>
    );
  },
};
