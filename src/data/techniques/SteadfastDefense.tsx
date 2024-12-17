import { Row } from "reactstrap";
import { Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { ResumeEffect, Talent } from "../talents";
import { TechniqueId } from "./TechniqueId";

export const SteadfastDefense: Talent = {
  id: TechniqueId.SteadfastDefense,
  name: "Défense obstinée",
  usageCost: 4,
  area: "Soi-même",
  required: "Bouclier ou Gant (main gauche)",
  resume: () => <ResumeEffect status={[{ value: 3, status: Status.Protect}]} />,
  getDescription: () => (
    <>
        <Row>
        <span>Gagne <Bold>3<DisplayStatus status={Status.Protect} /> Défense.</Bold></span>
        </Row>
        <Row>
        <span>Jusqu'à la prochaine activation, le statut Défense <Bold>immunise</Bold> aux actions <Bold>Pousser</Bold>
         et <Bold>Exposer.</Bold></span>
        </Row>
    </>
  )
};
