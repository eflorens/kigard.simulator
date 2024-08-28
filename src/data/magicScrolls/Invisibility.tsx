import { Italic } from "../../components";
import { DisplayTouch } from "../../components/DisplayTouch";
import { DisplaySupport } from "../../features/talents/DisplaySupport";
import { Status } from "../inventory";
import { Talent, ResumeEffect } from "../talents";
import { MagicScrollId } from "./MagicScrollId";

export const Invisibility: Talent = {
  id: MagicScrollId.Invisibility,
  name: "Invisibilité",
  manaCost: true,
  usageCost: 4,
  range: { min: 0, max: 2 },
  resume: (summary) => <ResumeEffect primaryWeapon={summary.primaryWeapon} secondaryWeapon={summary.secondaryWeapon} attack={summary.magicAttack} status={[{ value: 4, status: Status.Furtivity }]} />,
  getDescription: (summary) => (
    <>
      <DisplaySupport
        status={[{ value: 4, status: Status.Furtivity }]} />
      <DisplayTouch semiSuccess="-2 statuts" critical="+2 statuts" />
      <Italic>Note : Ne fonctionne pas sur un personnage sur une monture.</Italic>
    </>
  ),
};
