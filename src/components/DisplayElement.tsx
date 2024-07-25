import { ElementId } from "../data/inventory";


export function DisplayElement({ element, src, alt, className, ...props }: { element: ElementId; } & Readonly<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>) {
  return (
    <img
      src={`https://tournoi.kigard.fr/images/elements/${element}.gif`}
      className={className}
      alt={alt || element.toString()}
      {...props}
    />
  );
}
