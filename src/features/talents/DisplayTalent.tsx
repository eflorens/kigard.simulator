import { SummaryState } from "../summary/SummarySlice";
import { DisplayElement } from "../../components/DisplayElement";
import { ElementId } from "../../data/inventory";
import { BoxType } from "../../data/talents";
import { Card, CardHeader, CardBody, Bold, CardTitle } from "../../components";

interface DisplayTalentProps {
  className?: string;
  name: string;
  usageCost: number | string;
  reusable?: boolean;
  range: { min: number, max: number };
  area?: BoxType | { x: number, y: number };
  element?: ElementId;
  summary: SummaryState;
  getDescription: (summary: SummaryState) => React.ReactNode;
}

function DisplayArea({ area }: { area: BoxType | { x: number, y: number } }) {
  switch (area) {
    case BoxType.Empty:
      return <span>Case libre</span>;
    case BoxType.Tree:
      return <span>Arbre</span>;
    case BoxType.Rock:
      return <span>Rocher</span>;
    case BoxType.CrystalWall:
      return <span>Mur de cristal</span>;
    case BoxType.IceWall:
      return <span>Mur de glace</span>;
    case BoxType.Remains:
      return <span>Dépouille</span>;
  }
  if (typeof area === "object") {
    return <>Zone : {area.x} x {area.y}</>;
  }
  return <></>;
}

export function Separator() {
  return <span className="mx-1">-</span>;
}

export function DisplayTalent({ className, name, usageCost, reusable, range, area, element, summary, getDescription }: DisplayTalentProps) {
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <Bold>{name}</Bold>
      </CardHeader>
      <CardTitle className="text-center">
        <span>{usageCost} PA&PM</span>
        {area && <><Separator /><DisplayArea area={area} /></>}
        {range && <><Separator /><span>Portée : {(range.min === range.max && range.min) || `${range.min} à ${range.max}`}</span></>}
        {reusable && <><Separator /><span>Action libre</span></>}
        {element && <><Separator /><DisplayElement element={element} /></>}
      </CardTitle>
      <CardBody>
        {getDescription(summary)}
      </CardBody>
    </Card>
  )
}
