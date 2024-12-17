import { Row } from "reactstrap";
import { Bold, Italic } from "../../components";
import { HealStatus, Talent } from "../talents";
import { TechniqueId } from "./TechniqueId";

export const ApplyPotion: Talent = {
  id: TechniqueId.ApplyPotion,
  name: "Administrer une potion",
  usageCost: 4,
  area: "Cible alliée",
  range: { min: 0, max: 1 },
  resume: (summary) => (
  <span>
     <HealStatus className="mx-2"
        blocked={Math.floor(summary.intelligence / 2)}
        base={summary.intelligence}
        critical={Math.floor(3 * summary.intelligence / 2)} />
  </span>
  ),
  getDescription: () => (
    <>
        <Row>
        <span>Réalise un <Bold>soin</Bold> et fait <Bold>boire une potion</Bold> à la cible.</span>
        </Row>
        <Row>
        <span>Ne compte pas dans la limite par tour de l'action <Bold>boire</Bold>.</span>
        <span>
            <Italic>
                Note : impossible d'utiliser un philtre d'oubli, une potion de rappel ou une potion d'expérience.
            </Italic>
        </span>
        </Row>
    </>
  )
};
