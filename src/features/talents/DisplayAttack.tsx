import { Bold, Col, Row, Underline } from "../../components";
import { DisplayElement } from "../../components/DisplayElement";
import { DisplayStatus } from "../../components/DisplayStatus";
import { ElementId, Status } from "../../data/inventory";
import { DamageType } from "../../data/talents";

interface DamageProps {
  value: number;
  type: DamageType;
}

export function DisplayDamageType({ type }: { type: DamageType }) {
  const damageTypeToString = (type: DamageType) => {
    switch (type) {
      case DamageType.Pure:
        return "dégâts purs";
      case DamageType.Physical:
        return "dégâts physiques";
      case DamageType.Magic:
        return "dégâts magiques";
    }
  };

  return (
    <Bold><Underline>{damageTypeToString(type)}</Underline></Bold>
  )
}

function Damage({ value, type, element }: DamageProps & { element?: ElementId }) {
  return (
    <>
      <span className="fw-bold">{value} </span>
      <DisplayDamageType type={type} />
      {element && <span> de <DisplayElement hasLabel element={element} /></span>}
    </>
  )
}

interface DisplayAttackProps {
  element?: ElementId;
  status?: { value: number, status: Status }[];
  damage?: { value: number, type: DamageType };
}

export function DisplayAttack({ element, damage, status: attackStatus }: DisplayAttackProps) {
  return (
    <Row>
      <Col>
        <span>Inflige </span>
        {damage && <Damage {...damage} element={element} />}
        {(attackStatus && damage) && <span> et </span>}
        {attackStatus && attackStatus.map(({ value, status }, index) => (
          <span key={status}>
            {index > 0 && <span> et </span>}
            <span className="fw-bold">{value} </span>
            <DisplayStatus status={status} hasLabel />
          </span>
        ))}
      </Col>
    </Row>
  )
}