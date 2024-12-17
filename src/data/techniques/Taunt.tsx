import { Row } from "reactstrap";
import { Bold, Italic } from "../../components";
import { ResumeEffect, Talent } from "../talents";
import { TechniqueId } from "./TechniqueId";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";

export const Taunt: Talent = {
  id: TechniqueId.Taunt,
  name: "Provoquer",
  usageCost: 3,
  range: { min: 1, max: 3 },
  resume: (summary) => (
  <span>
     <ResumeEffect status={[{ value: 3, status: Status.Taunt}]} />
  </span>
  ),
  getDescription: () => (
    <>
        <Row>
            <span>Réussit si <Bold>[CHA] &gt; PV/10 de la cible</Bold>.</span>
        </Row>
        <Row>
            <span>Inflige <Bold>3 <DisplayStatus status={Status.Taunt} hasLabel /></Bold> (non cumulatif).</span>
            <Italic>Note : une provocation réussie remplace la précédente.</Italic>
        </Row>
    </>
  )
};
