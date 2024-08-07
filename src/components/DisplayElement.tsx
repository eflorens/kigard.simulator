import { allElements, ElementId } from "../data/inventory";


export function DisplayElement({ element, hasLabel, src, alt, className, ...props }: { element: ElementId; hasLabel?: boolean; } & Readonly<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>) {
  const elementName = allElements.find(e => e.id === element)?.name;
  return (
    <>
      {hasLabel && <span className="me-1">{elementName}</span>}
      <img
        src={`https://tournoi.kigard.fr/images/elements/${element}.gif`}
        className={className}
        alt={alt || elementName}
        {...props}
      />
    </>
  );
}