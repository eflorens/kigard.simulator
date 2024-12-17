import { Row } from "reactstrap";
import { Bold, Italic } from "../../components";
import { HealStatus, Talent } from "../talents";
import { TechniqueId } from "./TechniqueId";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";

export const TendWounds: Talent = {
  id: TechniqueId.TendWounds,
  name: "Opérer les blessures",
  usageCost: 4,
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
            <span>Réalise un <Bold>soin</Bold> avec <Bold>+15 de précision sur une cible blessée</Bold> ou <Bold>
            +30 de précision sur une cible agonisante</Bold>.</span>
        </Row>
        <Row>
        <span>Pour ce soin, l'effet du <DisplayStatus status={Status.Bleeding} hasLabel /> est réduit de moitié (le statut réduit les soins de X au lieu de 2X).
        </span>
        <span>
            <Italic>
                Un <Bold>fil à coudre</Bold> peut être utilisé pour obtenir <Bold>+15 de précision</Bold> et
                <Bold> ignorer le Saignement</Bold>.
            </Italic>
        </span>
        </Row>
    </>
  )
};
