import { TechniqueId } from "./TechniqueId";
import { Badge, Bold, Row, Italic } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { Talent } from "../talents";

export const Inspire: Talent = {
  id: TechniqueId.Inspire,
  name: "Inspirer",
  usageCost: 6,
  area: "Soi-même",
  resume: (summary) => <Badge pill><Bold>+ {summary.charisma / 5} <DisplayStatus status={Status.Inspiration} /></Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>Confère à soi-même et aux personnages alliés adjacents <Bold>{summary.charisma / 5} <DisplayStatus status={Status.Inspiration} hasLabel /></Bold></span>
      </Row>
      <Row>
        <Italic>Note : les personnages alliés sont ceux qui appartiennent au même clan ou qui ont un lien d'empathie, ainsi que tout leurs compagnons</Italic>
      </Row>
    </>
  ),
};
