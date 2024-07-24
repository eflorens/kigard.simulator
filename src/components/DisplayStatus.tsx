import { Status } from "../data/inventory";

export function DisplayStatus({ status }: { status: Status; }) {
  return (
    <img src={`https://tournoi.kigard.fr/images/modificateur/${status}.gif`} alt={status.toString()} />
  );
}
