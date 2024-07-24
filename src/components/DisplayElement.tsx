import { ElementId } from "../data/inventory";


export function DisplayElement({ element }: { element: ElementId; }) {
  return (
    <img src={`https://tournoi.kigard.fr/images/elements/${element}.gif`} alt={element.toString()} />
  );
}
