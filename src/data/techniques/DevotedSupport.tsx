import { TechniqueId } from "./TechniqueId";
import { Badge, Bold, Row, Italic } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { GiftId } from "../character";
import { Status } from "../inventory";
import { Talent } from "../talents";

export const DevotedSupport: Talent = {
  id: TechniqueId.DevotedSupport,
  name: "Soutien dévoué",
  usageCost: 3,
  range: { min: 1, max: 2 },
  resume: (summary) => <Badge pill><Bold>+ {(summary.charisma / 5) + (summary.gifts.includes(GiftId.MUTUALAID) ? 1 : 0)} <DisplayStatus status={Status.Inspiration} /> PA</Bold></Badge>,
  getDescription: (summary) => (
    <>
      <Row>
        <span>Réalise un <Bold>soutien</Bold> qui confère <Bold>{(summary.charisma / 5) + (summary.gifts.includes(GiftId.MUTUALAID) ? 1 : 0)}</Bold> au lieu de 2</span>
      </Row>
      <Row>
        <Italic>Note : Le don <Bold>Entraide</Bold> fonctionne normalement</Italic>
      </Row>
    </>
  ),
};
