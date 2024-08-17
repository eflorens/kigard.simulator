import { faBullseye, faShieldHalved, faCircleDot, faBurst, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Bold } from "../components";
import { DisplayStatus } from "../components/DisplayStatus";
import { HandSummary, SummaryState } from "../features/summary/SummarySlice";
import { ElementId, Status } from "./inventory";
import { DisplayElement } from "../components/DisplayElement";

export enum DamageType {
  Pure,
  Physical,
  Magic,
}

export enum BoxType {
  Empty = "empty",
  Tree = "tree",
  Rock = "rock",
  CrystalWall = "crystalWall",
  IceWall = "iceWall",
  Remains = "remains",
  Fire = "fire",
}
export type AreaType = BoxType | {
  x: number;
  y: number;
} | "Arc de 3" | "Soi-même";

export type Range = { min: number, max: number } | "Portée Arme" | "Portée Arme + 1";

export interface WeaponModifier {
  baseDamage?: number;
  baseAccuracy?: number;
  criticalFactor?: number;
  accuracy?: number;
  damage?: number;
  forceWeapon?: boolean;
}

type LightWeapon = Omit<HandSummary, "id" | "name" | "usageCost" | "elementaryAffinity">;

export const addModifier = (value: number, modifier?: number) => value + (modifier ?? 0);

export function AccuracyAttack({ className, accuracy }: Readonly<{ className?: string, accuracy: number }>) {
  return (
    <Badge pill className={className}>
      <span><FontAwesomeIcon size="2xs" className="me-1" icon={faBullseye} />{accuracy}%</span>
    </Badge>
  );
}

export function HealStatus({ className, blocked, base, critical }: Readonly<{ className?: string, blocked: number, base: number, critical: number }>) {
  return (
    <Badge pill className={className}>
      <span><FontAwesomeIcon size="2xs" className="me-1" icon={faShieldHalved} />{blocked}PV</span>
      <span className="mx-1">-</span>
      <span><FontAwesomeIcon size="2xs" className="me-1" icon={faCircleDot} />{base}PV</span>
      <span className="mx-1">-</span>
      <span><FontAwesomeIcon size="2xs" className="me-1" icon={faBurst} />{critical}PV</span>
    </Badge>
  );
}

export function DamageAttack({ className, blocked, base, critical, element }: Readonly<{ className?: string, blocked: number, base: number, critical: number, element?: ElementId }>) {
  return (
    <Badge pill className={className}>
      <span><FontAwesomeIcon size="2xs" className="me-1" icon={faShieldHalved} />{blocked}</span>
      <span className="mx-1">-</span>
      <span><FontAwesomeIcon size="2xs" className="me-1" icon={faCircleDot} />{base}</span>
      <span className="mx-1">-</span>
      <span><FontAwesomeIcon size="2xs" className="me-1" icon={faBurst} />{critical}</span>
      {element && <DisplayElement className="ms-1" element={element} />}
    </Badge>
  );
}

export function ResumeEffect({ attack, damage, modifier, element, status, self }
  : { attack?: number, damage?: number, modifier?: { attack?: number, damage?: number }, element?: ElementId, status?: { value: number, status: Status }[], self?: { value: number, status: Status }[] }
) {
  return (
    <Bold>
      {attack !== undefined && <AccuracyAttack accuracy={attack + (modifier?.attack ?? 0)} />}
      {damage !== undefined && (
        <DamageAttack
          blocked={Math.floor(damage / 2) + (modifier?.damage ?? 0)}
          base={Math.floor(damage) + (modifier?.damage ?? 0)}
          critical={Math.floor(damage * 1.5) + (modifier?.damage ?? 0)}
          element={element}
        />
      )}
      {damage === undefined && element && <Badge pill><DisplayElement element={element} /></Badge>}
      {status && (
        <Badge pill>
          {status.map(({ value, status: s }) => (
            <span key={s}>
              <Bold>{value}<DisplayStatus className="mx-1 img-fluid" status={s} /></Bold>
            </span>
          ))}
        </Badge>
      )}
      {self && (
        <Badge pill>
          <span className="me-1"><FontAwesomeIcon icon={faUser} /></span>
          {self.map(({ value, status: s }) => (
            <span key={s}>
              <Bold>{value}<DisplayStatus className="mx-1 img-fluid" status={s} /></Bold>
            </span>
          ))}
        </Badge>
      )}
    </Bold>
  )
}

export function ResumeAttack({ weapon, modifier, element }: Readonly<{ weapon?: LightWeapon, modifier?: WeaponModifier, element?: ElementId }>) {
  const baseDamage = modifier?.baseDamage ?? weapon?.baseDamage ?? 0;
  const criticalBaseDamage = baseDamage * (modifier?.criticalFactor ?? (3 / 2));
  const baseAccuracy = modifier?.baseAccuracy ?? weapon?.baseAccuracy ?? 0;
  const isWeapon = weapon && (modifier?.forceWeapon || weapon.isWeapon);
  return (
    <span>
      {isWeapon && (
        <Bold>
          <AccuracyAttack accuracy={addModifier(Math.floor(baseAccuracy) + weapon.accuracy, modifier?.accuracy)} />
          <DamageAttack
            className="mx-2"
            blocked={addModifier(Math.floor(baseDamage / 2) + weapon.damage, modifier?.damage)}
            base={addModifier(Math.floor(baseDamage) + weapon.damage, modifier?.damage)}
            critical={addModifier(Math.floor(criticalBaseDamage) + weapon.damage, modifier?.damage)}
            element={element}
          />
          {weapon.status && (
            <Badge pill>
              {weapon.status.map(({ value, status }) => (
                <span key={status}>
                  <Bold>{value}<DisplayStatus className="mx-1 img-fluid" status={status} /></Bold>
                </span>
              ))}
            </Badge>
          )}
        </Bold>
      )}
    </span>
  );
}

export interface Talent {
  id: number;
  name: string;
  usageCost?: number | string | ((summary: SummaryState) => number | string);
  manaCost?: number | boolean;
  reusable?: boolean;
  discreet?: boolean;
  range?: Range | ((summary: SummaryState) => Range);
  area?: AreaType | AreaType[];
  element?: ElementId;
  required?: string;
  resume: React.ReactNode | string | ((summary: SummaryState) => React.ReactNode | string);
  getDescription: (summary: SummaryState) => React.ReactNode | string;
}