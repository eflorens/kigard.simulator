export function DisplayModificator({ id, name }: { id: number; name: string; }) {
  return <img src={`https://tournoi.kigard.fr/images/modificateur/${id}.gif`} alt={name} />;
}
