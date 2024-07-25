
export function DisplayItemImage({ id, name }: { id: number; name: string; }) {
  return <img src={`https://tournoi.kigard.fr/images/items/${id}.gif`} alt={name} />;
}
