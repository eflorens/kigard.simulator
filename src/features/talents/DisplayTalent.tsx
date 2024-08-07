import { SummaryState } from "../summary/SummarySlice";
import { DisplayElement } from "../../components/DisplayElement";
import { ElementId } from "../../data/inventory";
import { BoxType } from "../../data/talents";
import { Card, CardHeader, CardBody, Row, Col } from "../../components";

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

export function DisplayTalent({ className, name, usageCost, reusable, range, area, element, summary, getDescription }: DisplayTalentProps) {
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <Row>
          <Col>{name}</Col>
        </Row>
        <Row className="small">
          <Col>{usageCost} PA&PM</Col>
          {area && <Col><DisplayArea area={area} /></Col>}
          {range && <Col>Portée : {(range.min === range.max && range.min) || `${range.min} à ${range.max}`}</Col>}
          {reusable && <Col>Action libre</Col>}
          {element && <Col><DisplayElement element={element} /></Col>}
        </Row>
      </CardHeader>
      <CardBody>
        {getDescription(summary)}
      </CardBody>
    </Card>
  )
}
