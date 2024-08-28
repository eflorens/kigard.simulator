import { TechniqueId } from "./TechniqueId";
import { Row, Bold } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../inventory";
import { ResumeEffect, Talent } from "../talents";

export const CombatMagic: Talent = {
  id: TechniqueId.CombatMagic,
  name: "Magie de combat",
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} status={[{ value: 0, status: Status.Overload}, { value: 0, status: Status.Impact}]} />,
  getDescription: () => (
    <>
      <Row>
        <span>
          <span>Quand vous infligez des <Bold>dégâts physiques, </Bold></span>
          <span>vous gagnez <Bold>+[dégâts infligés/5] <DisplayStatus status={Status.Overload} /></Bold></span>
        </span>
      </Row>
      <Row>
        <span>
          <span>Quand vous infligez des <Bold>dégâts magiques, </Bold></span>
          <span>vous gagnez <Bold>+[dégâts infligés/5] <DisplayStatus status={Status.Impact} /></Bold></span>
        </span>
      </Row>
      <Row>
        <span>
          <span>Chacun de ses effets se déclenchent maximum une fois par tour</span>
        </span>
      </Row>
    </>
  )
};
