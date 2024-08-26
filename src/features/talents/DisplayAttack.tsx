import { Bold, Underline } from "../../components";
import { DisplayElement } from "../../components/DisplayElement";
import { DisplayStatus } from "../../components/DisplayStatus";
import { ElementId, Status } from "../../data/inventory";
import { DamageType } from "../../data/talents";

interface DamageProps {
  value: number;
  type: DamageType;
}

export function DisplayDamageType({ type }: Readonly<{ type: DamageType }>) {
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

export function DisplayDamage({ value, type, element }: DamageProps & { element?: ElementId }) {
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
  baseDamage?: { value: number, type: DamageType };
}

export function DisplayAttack({ element, baseDamage: damage, status: attackStatus }: Readonly<DisplayAttackProps>) {
  return (
    <span>
      <span>
        <span>Inflige </span>
        {damage && <DisplayDamage {...damage} element={element} />}
        {(attackStatus && damage) && <span> et </span>}
        {attackStatus?.map(({ value, status }, index) => (
          <span key={status}>
            {index > 0 && <span> et </span>}
            <span className="fw-bold">{value} </span>
            <DisplayStatus status={status} hasLabel />
          </span>
        ))}
      </span>
    </span>
  )
}