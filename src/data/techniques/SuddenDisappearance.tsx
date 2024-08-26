import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayItemImage } from "../../components/DisplayItemImage";
import { Talent } from "../talents";

export const SuddenDisappearance: Talent = {
  id: TechniqueId.SuddenDisappearance,
  name: "Disparition soudaine",
  usageCost: 2,
  area: "Soi-même",
  resume: (<></>),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Réalise une <Bold>disparition</Bold></span>
        </span>
      </Row>
      <Row>
        <span>
          <span>Un <Bold><DisplayItemImage id={365} name="fumigène" /> fumigène</Bold> peut être utilisé pour obtenir <Bold>+30 en DIS</Bold> pendant l'action</span>
        </span>
      </Row>
    </>
  ),
};
