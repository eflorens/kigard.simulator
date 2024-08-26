import { SummaryState } from "../features/summary/SummarySlice";
import { addModifier, ResumeAttack, WeaponModifier } from "./talents";



export const getPrimaryWeaponUsageCost = (summary: SummaryState, modifier?: number) => {
  return (summary.primaryWeapon?.usageCost && addModifier(summary.primaryWeapon?.usageCost, modifier))
    ?? `(Coût Arme${getUsageCostModifierLabel(modifier)})`;
};export const getPrimaryWeaponRange = (summary: SummaryState) => summary.primaryWeapon?.range || "Portée Arme";
export function PrincipalWeaponAttack({ summary, modifier }: Readonly<{ summary: SummaryState; modifier?: WeaponModifier; }>) {
  return (
    <span>
      <span>Attaque de l'arme principale </span>
      <ResumeAttack weapon={summary?.primaryWeapon} modifier={modifier} />
    </span>
  );
}
export const getUsageCostModifierLabel = (modifier?: number) => (modifier && ` ${(modifier > 0 && " + ") || " - "} ${modifier} PA`) || "";

