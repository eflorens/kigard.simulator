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
} | "Arc de 3" | "Soi-même" | "Cible alliée";

export type Range = { min: number, max: number } | "Portée Arme" | "Portée Arme + 1";

export interface AttackModifier {
  baseDamage?: number;
  baseAccuracy?: number;
  criticalFactor?: number;
  accuracy?: number;
  damage?: number;
  useAsWeapon?: boolean;
  status?: StatusProps[];
  self?: StatusProps[];
}

type LightWeapon = Omit<HandSummary, "id" | "name" | "usageCost" | "elementaryAffinity">;

export const addModifier = (value: number, modifier?: number) => value + (modifier ?? 0);

export const aggregateStatus = (first?: StatusProps[], second?: StatusProps[]) =>
  [...(first || []), ...(second || [])]
    .reduce((previous, current) => {
      const previousStatus = previous.find(s => s.status === current.status);
      if (previousStatus) {
        return [
          ...previous.filter(s => s.status !== current.status),
          {
            value: previousStatus.value + current.value,
            status: current.status
          }
        ]
      }
      return [...previous, current];
    }, [] as StatusProps[]);

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

interface StatusProps {
  value: number;
  status: Status;
}

interface ResumeEffectProps {
  primaryWeapon?: HandSummary;
  secondaryWeapon?: HandSummary;
  attack?: number;
  damage?: number;
  modifier?: { attack?: number, damage?: number, status?: StatusProps[], self?: StatusProps[] };
  element?: ElementId;
  status?: StatusProps[];
  self?: StatusProps[];
}

export function ResumeEffect({ primaryWeapon, secondaryWeapon, attack, damage, modifier, element, status, self }: ResumeEffectProps) {
  const elementaryAffinity = primaryWeapon?.elementaryAffinity ?? secondaryWeapon?.elementaryAffinity
  const modifierWithAffinity = (elementaryAffinity && elementaryAffinity === element && {
    attack: addModifier(modifier?.attack ?? 0, 10),
    damage: addModifier(modifier?.damage ?? 0, 2),
  }) || modifier;

  const effectStatus = aggregateStatus(status, modifier?.status);
  const effectSelf = aggregateStatus(self, modifier?.self);
  return (
    <Bold>
      {attack !== undefined && <AccuracyAttack accuracy={attack + (modifierWithAffinity?.attack ?? 0)} />}
      {damage !== undefined && (
        <DamageAttack
          blocked={Math.floor(damage / 2) + (modifierWithAffinity?.damage ?? 0)}
          base={Math.floor(damage) + (modifierWithAffinity?.damage ?? 0)}
          critical={Math.floor(damage * 1.5) + (modifierWithAffinity?.damage ?? 0)}
          element={element}
        />
      )}
      {damage === undefined && element && <Badge pill><DisplayElement element={element} /></Badge>}
      {effectStatus.length > 0 && (
        <Badge pill>
          {effectStatus.map(({ value, status: s }) => (
            <span key={s}>
              <Bold>{value !== 0 ? value : ""}<DisplayStatus className="mx-1 img-fluid" status={s} /></Bold>
            </span>
          ))}
        </Badge>
      )}
      {effectSelf.length > 0 && (
        <Badge pill>
          <span className="me-1"><FontAwesomeIcon icon={faUser} /></span>
          {effectSelf.map(({ value, status: s }) => (
            <span key={s}>
              <Bold>{value !== 0 ? value : ""}<DisplayStatus className="mx-1 img-fluid" status={s} /></Bold>
            </span>
          ))}
        </Badge>
      )}
    </Bold>
  )
}

export function ResumeAttack({ weapon, modifier, element }: Readonly<{ weapon?: LightWeapon, modifier?: AttackModifier, element?: ElementId }>) {
  const baseDamage = modifier?.baseDamage ?? weapon?.baseDamage ?? 0;
  const criticalBaseDamage = baseDamage * (modifier?.criticalFactor ?? (3 / 2));
  const baseAccuracy = modifier?.baseAccuracy ?? weapon?.baseAccuracy ?? 0;
  const isWeapon = weapon && (modifier?.useAsWeapon || weapon.isWeapon);
  const attackStatus = aggregateStatus(weapon?.status, modifier?.status);
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
          {attackStatus.length > 0 && (
            <Badge pill>
              {attackStatus.map(({ value, status }) => (
                <span key={status}>
                  <Bold>{value !== 0 ? value : ""}<DisplayStatus className="mx-1 img-fluid" status={status} /></Bold>
                </span>
              ))}
            </Badge>
          )}
          {modifier?.self && (
            <Badge pill>
              <span className="me-1"><FontAwesomeIcon icon={faUser} /></span>
              {modifier.self.map(({ value, status: s }) => (
                <span key={s}>
                  <Bold>{value !== 0 ? value : ""}<DisplayStatus className="mx-1 img-fluid" status={s} /></Bold>
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
export const getMagicPower = (summary: SummaryState) => (summary.magicPower + summary.intelligence);
