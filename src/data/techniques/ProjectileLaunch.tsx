import { TechniqueId } from "./TechniqueId";
import { Bold, Row } from "../../components";
import { Talent, ResumeAttack } from "../talents";
import { DisplayItemImage } from "../../components/DisplayItemImage";

export const ProjectileLaunch: Talent = {
  id: TechniqueId.ProjectileLaunch,
  name: "Lancer un projectile",
  usageCost: 3,
  range: { min: 1, max: 3 },
  resume: (summary) => {
    const noWeapon = {
      isWeapon: true,
      baseAccuracy: 0,
      accuracy: 0,
      baseDamage: 0,
      damage: 0,
      range: { min: 1, max: 3 },
    };
    return <ResumeAttack weapon={noWeapon} modifier={{ baseDamage: (summary.strength + summary.dexterity) / 2 }} />
  },
  getDescription: (summary) => {
    const noWeapon = {
      isWeapon: true,
      baseAccuracy: 0,
      accuracy: 0,
      baseDamage: 0,
      damage: 0,
      range: { min: 1, max: 3 },
    };
    const baseDamage = (summary.strength + summary.dexterity) / 2;
    const shuriken = {
      isWeapon: true,
      baseAccuracy: 0,
      accuracy: 15,
      baseDamage,
      damage: 3,
      range: { min: 1, max: 3 },
    };
    const dart = {
      isWeapon: true,
      baseAccuracy: 0,
      accuracy: 0,
      baseDamage,
      damage: 6,
      range: { min: 1, max: 3 },
    };
    return (
      <>
        <Row>
          <span>
            <span>Attaque d'un <Bold>projectile</Bold> de l'inventaire </span>
            <ResumeAttack weapon={noWeapon} modifier={{ baseDamage }} />
          </span>
        </Row>
        <Row>
          <span>Le <Bold>projectile</Bold> sera considéré comme une arme</span>
        </Row>
        <Row>
          <span>
            <DisplayItemImage id={225} name="Shuriken" />
            <ResumeAttack weapon={shuriken} modifier={{ baseDamage }} />
          </span>
        </Row>
        <Row>
          <span>
            <DisplayItemImage id={188} name="Dard en fer" />
            <ResumeAttack weapon={dart} modifier={{ baseDamage }} />
          </span>
        </Row>
      </>
    );
  },
};
