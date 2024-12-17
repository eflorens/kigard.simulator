import { TechniqueId } from "./TechniqueId";
import { Bold } from "../../components";
import { Talent } from "../talents";

export const BeastMastery: Talent = {
  id: TechniqueId.BeastMastery,
  name: "Maîtrise des bêtes",
  resume: (<></>),
  getDescription: () => (
    <span>Vous pouvez déployer un maximum  de <Bold>3 compagnons animaux</Bold> (au lieu d'un seul)</span>
  )
};
