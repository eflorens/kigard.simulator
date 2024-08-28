import { DisplayElement } from "../components/DisplayElement";
import { SummaryState } from "../features/summary/SummarySlice";
import { ElementId } from "./inventory";
import { addModifier, ResumeAttack, AttackModifier } from "./talents";



export const getPrimaryWeaponUsageCost = (summary: SummaryState, modifier?: number) => {
  return (summary.primaryWeapon?.usageCost && addModifier(summary.primaryWeapon?.usageCost, modifier))
    ?? `(Coût Arme${getUsageCostModifierLabel(modifier)})`;
};

export const getPrimaryWeaponRange = (summary: SummaryState) => summary.primaryWeapon?.range || "Portée Arme";

export function PrincipalWeaponAttack({ summary, element, modifier }: Readonly<{ summary: SummaryState; element?: ElementId; modifier?: AttackModifier; }>) {
  return (
    <span>
      <span>Attaque {element && <span>de <DisplayElement element={element} hasLabel /> </span>}de l'arme principale </span>
      <ResumeAttack weapon={summary?.primaryWeapon} element={element} modifier={modifier} />
    </span>
  );
}

export const getUsageCostModifierLabel = (modifier?: number) => (modifier && ` ${(modifier > 0 && " + ") || " - "} ${modifier} PA`) || "";

