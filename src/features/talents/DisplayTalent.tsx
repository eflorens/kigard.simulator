import { DisplayElement } from "../../components/DisplayElement";
import { AreaType, BoxType, Range } from "../../data/talents";
import { Card, CardHeader, CardBody, Bold, CardTitle, Separator } from "../../components";
import { ElementId } from "../../data/inventory";

interface DisplayTalentProps {
  className?: string;
  title: React.ReactNode | string;
  hideSubTitle?: boolean;
  usageCost?: number | string;
  manaCost?: number | boolean;
  reusable?: boolean;
  discreet?: boolean;
  range?: Range;
  area?: AreaType | AreaType[];
  element?: ElementId;
  required?: string;
  resume?: React.ReactNode | string;
  description?: React.ReactNode | string;
}

function DisplayArea({ area }: Readonly<{ area: AreaType | AreaType[] }>) {
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
    case BoxType.Fire:
      return <span>Source de feu</span>;
  }
  if (typeof area === "string") {
    return <>{area}</>;
  }
  if (Array.isArray(area)) {
    return (
      <>
        {area.map((a, i) => (<span key={i}>{i > 0 && " ou "}<DisplayArea area={a} /></span>))}
      </>);
  }
  if (typeof area === "object" && "x" in area && "y" in area) {
    return <>Zone : {area.x} x {area.y}</>;
  }
  return <></>;
}

function DisplayRange({ range }: Readonly<{ range: Range }>) {
  if (range === "Portée Arme" || range === "Portée Arme + 1") {
    return <span>{range}</span>;
  }

  return <span>Portée : {(range.min === range.max && range.min) || `${range.min} à ${range.max}`}</span>;
}

function DisplayCost({ usageCost, manaCost }: Readonly<{ usageCost: number | string, manaCost?: number | boolean }>) {
  return (
    <span>
      <span>{usageCost} PA</span>
      {(typeof manaCost === "number" && <span> & {manaCost} PM</span>) || (manaCost && <span> & PM</span>)}
    </span>
  )
}

export function DisplayTalent({ className, title, hideSubTitle, usageCost, manaCost, reusable, discreet, range, area, element, required, resume, description }: Readonly<DisplayTalentProps>) {
  return (
    <Card className={className}>
      <CardHeader>
        <Bold className="float-start">{title}</Bold>
        <span className="float-end">{resume}</span>
      </CardHeader>
      {!hideSubTitle && <CardTitle className="text-center">
        {usageCost !== undefined && <DisplayCost usageCost={usageCost} manaCost={manaCost} />}
        {area && <><Separator /><DisplayArea area={area} /></>}
        {range && <><Separator /><DisplayRange range={range} /></>}
        {reusable && <><Separator /><span>Action libre</span></>}
        {discreet && <><Separator /><span>Action discrète</span></>}
        {element && <><Separator /><DisplayElement element={element} /></>}
        {required && <><Separator /><Bold className="text-danger">Requis : {required}</Bold></>}
      </CardTitle>}
      <CardBody>
        {description}
      </CardBody>
    </Card>
  )
}
