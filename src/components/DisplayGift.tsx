import { Badge, Tooltip } from ".";
import { GiftId, Gifts } from "../data/character";


export function DisplayGift({ id }: Readonly<{ id: GiftId; }>) {
  const gift = Gifts.find(g => g.id === id);
  if (!gift) {
    return <></>;
  }

  return (
    <Badge pill className="mx-1">
      <Tooltip description={gift.description}>
        {gift.label}
      </Tooltip>
    </Badge>
  );
}
