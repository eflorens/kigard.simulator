import { TechniqueId } from "./TechniqueId";
import { Badge, Bold, Row } from "../../components";
import { DisplayElement } from "../../components/DisplayElement";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayDamage } from "../../features/talents/DisplayAttack";
import { ElementId, Status } from "../inventory";
import { Talent, DamageType } from "../talents";

export const BloodSacrifice: Talent = {
  id: TechniqueId.BloodSacrifice,
  name: "Offrir son sang",
  usageCost: 0,
  area: "Soi-même",
  resume: () => (
    <span>
      <Badge pill><Bold><DisplayElement element={ElementId.Dark} /> -10PV</Bold></Badge>
      <Badge pill><Bold>+2 <DisplayStatus status={Status.Bleeding} /></Bold></Badge>
    </span>
  ),
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Inflige à l'utilisateur <Bold><DisplayDamage value={10} type={DamageType.Pure} element={ElementId.Dark} /></Bold></span>
          <span> et <Bold>2 <DisplayStatus status={Status.Bleeding} hasLabel /></Bold></span>
        </span>
      </Row>
      <Row>
        <span>Réalise ensuite une <Bold>méditation</Bold></span>
      </Row>
    </>
  ),
};
