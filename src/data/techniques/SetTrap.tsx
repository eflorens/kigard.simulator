import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayItemImage } from "../../components/DisplayItemImage";
import { Talent, BoxType, ResumeAttack } from "../talents";

export const SetTrap: Talent = {
  id: TechniqueId.SetTrap,
  name: "Poser un piège",
  usageCost: 3,
  range: { min: 1, max: 1 },
  area: BoxType.Empty,
  discreet: true,
  resume: (summary) => {
    const noWeapon = {
      isWeapon: true,
      baseAccuracy: 0,
      accuracy: 0,
      baseDamage: 0,
      damage: 0,
      range: { min: 1, max: 1 },
    };
    return <ResumeAttack weapon={noWeapon} modifier={{ baseDamage: summary.dexterity, baseAccuracy: summary.discretion }} />;
  },
  getDescription: (summary) => {
    const noWeapon = {
      isWeapon: true,
      baseAccuracy: 0,
      accuracy: 0,
      baseDamage: 0,
      damage: 0,
      range: { min: 1, max: 1 },
    };
    return (
      <>
        <Row>
          <span>
            <span>Pose un <Bold>piège</Bold> sur une case vide, qui sera <Bold>invisible</Bold> sauf pour les personnages alliés</span>
          </span>
        </Row>
        <Row>
          <span>Unpiège peut être découvert lors d'un <Bold>action de recherche</Bold>, lors de laquelle sa <Bold>Dis ({summary.discretion})</Bold> aide à le cacher</span>
        </Row>
        <Row>
          <span>
            <span>Un piège se déclenche lorsqu'un personnage entre sur la case piégée ou la fouille. </span>
            <span>Ceci se résoud comme une attaque. </span>
            <span>L'<Bold>Obs</Bold> est urilisée pour se défendre (au lieu de l'Esq)</span>
          </span>
        </Row>
        <Row>
          <span>
            <span>Il inflige des dégats physiques </span>
            <ResumeAttack weapon={noWeapon} modifier={{ baseDamage: summary.dexterity, baseAccuracy: summary.discretion }} />
          </span>
        </Row>
        <Row>
          <span>L'objet utilisé pour le piège compte ses bonus de DGT et de PRE ainsi que ses statuts, comme une arme</span>
        </Row>
        <Row>
          <span>Les objets servants à poser des pièges sont <DisplayItemImage id={16} name="Flèche" /> et <DisplayItemImage id={352} name="Piège à ours" /></span>
        </Row>
      </>
    );
  },
};
