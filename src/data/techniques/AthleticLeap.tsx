import { TechniqueId } from "./TechniqueId";
import { Badge, Bold, Row, Italic } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent, BoxType } from "../talents";

export const AthleticLeap: Talent = {
  id: TechniqueId.AthleticLeap,
  name: "Bond athlétique",
  usageCost: 4,
  range: { min: 2, max: 2 },
  area: BoxType.Empty,
  resume: (summary) => <Badge pill><Bold>+ {summary.constitution / 5} <DisplayStatus status={Status.Impact} /></Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>Permet de <Bold>bondir</Bold> sur la case ciblée</span>
      </Row>
      <Row>
        <span>Confère également <Bold>{summary.constitution / 5} <DisplayStatus status={Status.Impact} hasLabel /></Bold></span>
      </Row>
      <Row>
        <Italic>Note : subit les effets du statut <Bold><DisplayStatus status={Status.Restrained} /></Bold></Italic>
      </Row>
    </>
  ),
};
