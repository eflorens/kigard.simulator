import { allStatus, Status } from "../data/inventory";

export function DisplayStatus({ status, hasLabel, src, alt, className, ...props }: { status: Status; hasLabel?: boolean; } & Readonly<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>) {
  const statusName = allStatus.find(e => e.id === status)?.name;

  return (
    <>
      <img
        src={`https://tournoi.kigard.fr/images/modificateur/${status}.gif`}
        className={className}
        alt={alt || statusName}
        {...props}
      />
      {hasLabel && <span className="ms-1">{statusName}</span>}
    </>
  );
}
