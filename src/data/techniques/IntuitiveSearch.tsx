import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { Talent } from "../talents";

export const IntuitiveSearch: Talent = {
  id: TechniqueId.IntuitiveSearch,
  name: "Recherche intuitive",
  usageCost: 1,
  area: "Soi-même",
  discreet: true,
  resume: (<></>),
  getDescription: () => (
    <span>Réalise une <Bold>recherche</Bold></span>
  ),
};
