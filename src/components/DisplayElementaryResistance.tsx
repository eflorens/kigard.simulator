import { ElementId } from "../data/inventory";
import { DisplayElement } from './DisplayElement';

export function DisplayElementaryResistance({ value, element }: Readonly<{ value: number; element: ElementId; }>) {
  return (
    <span className="text-nowrap">{value}% <DisplayElement element={element} /></span>
  );
}
