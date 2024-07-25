import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardGroup, CardHeader, Col, DropdownList } from "../../components";
import { bust, allEnchantments, feet, fetish, head, Item, Modifier, oneHand, twoHands, Weapon, allSettings } from "../../data/inventory";
import { Inventory as InventoryItem, equipItem, equipLeftHand, equipRightHand, InventoryState, selectInventory, setEnchantment, setLeftHandEnchantment, setLeftHandSettings, setRightHandEnchantment, setRightHandSettings, setSettings, unequipItem, unequipLeftHand, unequipRightHand } from "./inventorySlice";
import { DisplayElementaryResistance } from "../../components/DisplayElementaryResistance";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayItemImage } from "../../components/DisplayItemImage";
import { DisplayElement } from "../../components/DisplayElement";

function DisplayAttributeItem({ item }: { item?: Item }) {
  if (!item) {
    return <span>Aucun</span>;
  }

  const {
    strength,
    dexterity,
    intelligence,
    constitution,
    mind,
    charisma,
    accuracy,
    dodge,
    magicAttack,
    magicDefense,
    observation,
    discretion,
    armor,
    damage,
    magicResistance,
    magicPower,
    actionPointsBonus,
    regeneration,
    status,
    elementaryResistances,
  } = item;

  const { element } = item as Weapon;

  return (
    <>
      <span className="mx-1">-</span>
      {!!strength && <span className="mx-1">FOR: {strength}</span>}
      {!!dexterity && <span className="mx-1">DEX: {dexterity}</span>}
      {!!intelligence && <span className="mx-1">INT: {intelligence}</span>}
      {!!constitution && <span className="mx-1">CON: {constitution}</span>}
      {!!mind && <span className="mx-1">ESP: {mind}</span>}
      {!!charisma && <span className="mx-1">CHA: {charisma}</span>}
      {!!accuracy && <span className="mx-1">PRE: {accuracy}%</span>}
      {!!dodge && <span className="mx-1">ESQ: {dodge}%</span>}
      {!!magicAttack && <span className="mx-1">MM: {magicAttack}%</span>}
      {!!magicDefense && <span className="mx-1">DM: {magicDefense}%</span>}
      {!!observation && <span className="mx-1">OBS: {observation}%</span>}
      {!!discretion && <span className="mx-1">DIS: {discretion}%</span>}
      {!!armor && <span className="mx-1">ARM: {armor}</span>}
      {damage !== undefined && <span className="mx-1">DGT: {damage}{!!element && <DisplayElement element={element} />}</span>}
      {!!magicResistance && <span className="mx-1">RES: {magicResistance}</span>}
      {!!magicPower && <span className="mx-1">MAG: {magicPower}</span>}
      {!!actionPointsBonus && <span className="mx-1">PA: {actionPointsBonus}%</span>}
      {!!regeneration && <span className="mx-1">REG: {regeneration}</span>}
      {!!status && status.map(s => <span key={s.status} className="mx-1">{s.value}<DisplayStatus status={s.status} /></span>)}
      {!!elementaryResistances && elementaryResistances.map(er => <span key={er.element} className="mx-1"><DisplayElementaryResistance element={er.element} value={er.value} /></span>)}
    </>
  );

}

function DisplayItem<T extends Item>({ item }: { item?: T }) {
  if (!item) {
    return <span>Aucun</span>;
  }

  return (
    <>
      <DisplayItemImage id={item.id} name={item.name} />
      <span>{item?.name}</span>
      <DisplayAttributeItem item={item} />
    </>
  );
}

interface ChooseItemProps<T extends Item> {
  label: string;
  onChange: (item?: T) => void;
  onEnchantmentChange: (enchantment?: Modifier) => void;
  onSettingsChange: (settings: { first?: Modifier, second?: Modifier }) => void;
  source: T[];
  current?: InventoryItem<T>;
}

function ChooseItem<T extends Item>({ label, onChange, onEnchantmentChange, onSettingsChange, source, current }: ChooseItemProps<T>) {
  return (
    <div className="col-sm-6">
      <Card>
        <CardHeader>{label}</CardHeader>
        <CardBody className="text-center">
          <Col>
            <DropdownList
              hasEmpty
              source={allEnchantments}
              title="description"
              onChange={onEnchantmentChange}
              value={current?.enchantment}
              description="Aucun enchantement"
            />
          </Col>
          <Col>
            <DropdownList
              hasEmpty
              source={source}
              title="name"
              render={item => <DisplayItem item={item} />}
              onChange={onChange}
              value={current?.item}
              description="Aucun"
            />
          </Col>
          <Col>
            <DropdownList
              hasEmpty
              source={allSettings}
              title="description"
              onChange={s => onSettingsChange({ first: s, second: current?.settings?.second })}
              value={current?.settings?.first}
              description="Aucun sertissage"
            />
          </Col>
          <Col>
            {current?.item?.doubleSetting && (
              <DropdownList
                hasEmpty
                source={allSettings}
                title="description"
                onChange={s => onSettingsChange({ first: current?.settings?.first, second: s })}
                value={current?.settings?.second}
                description="Aucun sertissage"
              />
            )}
          </Col>
        </CardBody>
      </Card>
    </div>
  )
}

export function Inventory() {
  const inventory = useSelector(selectInventory);
  const dispatch = useDispatch();

  const handleEnchantmentChange = (slot: keyof InventoryState, enchantment?: Modifier) => {
    dispatch(setEnchantment({ slot, enchantment }));
  }

  const handleRightHandEnchantmentChange = (enchantment?: Modifier) => {
    dispatch(setRightHandEnchantment({ enchantment }));
  }

  const handleLeftHandEnchantmentChange = (enchantment?: Modifier) => {
    dispatch(setLeftHandEnchantment({ enchantment }));
  }

  const handleSettingsChange = (slot: keyof InventoryState, settings: { first?: Modifier, second?: Modifier }) => {
    dispatch(setSettings({ slot, settings }));
  }

  const handleRightHandSettingsChange = (settings: { first?: Modifier, second?: Modifier }) => {
    dispatch(setRightHandSettings({ settings }));
  }

  const handleLeftHandSettingsChange = (settings: { first?: Modifier, second?: Modifier }) => {
    dispatch(setLeftHandSettings({ settings }));
  }

  const handleItemChange = (slot: keyof InventoryState, item?: Item) => {
    dispatch(item ? equipItem({ slot, item }) : unequipItem(slot));
  }

  const handleRightHandChange = (item?: Weapon | Item) => {
    dispatch(item ? equipRightHand(item) : unequipRightHand());
  }

  const handleLeftHandChange = (item?: Weapon | Item) => {
    dispatch(item ? equipLeftHand(item) : unequipLeftHand());
  }

  return (
    <CardGroup>
      <ChooseItem
        label="Tête"
        onChange={item => handleItemChange('head', item)}
        onEnchantmentChange={e => handleEnchantmentChange('head', e)}
        onSettingsChange={s => handleSettingsChange('head', s)}
        source={head}
        current={inventory.head}
      />
      <ChooseItem
        label="Deux mains"
        onChange={item => handleItemChange('hands', item)}
        onEnchantmentChange={e => handleEnchantmentChange('hands', e)}
        onSettingsChange={s => handleSettingsChange('hands', s)}
        source={twoHands}
        current={inventory.hands as InventoryItem<Weapon>}
      />
      <ChooseItem
        label="Main droite"
        onChange={item => handleRightHandChange(item)}
        onEnchantmentChange={e => handleRightHandEnchantmentChange(e)}
        onSettingsChange={s => handleRightHandSettingsChange(s)}
        source={oneHand}
        current={inventory.hands && "rightHand" in inventory.hands ? inventory.hands.rightHand : undefined}
      />
      <ChooseItem
        label="Main gauche"
        onChange={item => handleLeftHandChange(item)}
        onEnchantmentChange={e => handleLeftHandEnchantmentChange(e)}
        onSettingsChange={s => handleLeftHandSettingsChange(s)}
        source={oneHand}
        current={inventory.hands && "leftHand" in inventory.hands ? inventory.hands.leftHand : undefined}
      />
      <ChooseItem
        label="Buste"
        onChange={item => handleItemChange('bust', item)}
        onEnchantmentChange={e => handleEnchantmentChange('bust', e)}
        onSettingsChange={s => handleSettingsChange('bust', s)}
        source={bust}
        current={inventory.bust}
      />
      <ChooseItem
        label="Pieds"
        onChange={item => handleItemChange('feet', item)}
        onEnchantmentChange={e => handleEnchantmentChange('feet', e)}
        onSettingsChange={s => handleSettingsChange('feet', s)}
        source={feet}
        current={inventory.feet}
      />
      <ChooseItem
        label="Fétiche"
        onChange={item => handleItemChange('fetish', item)}
        onEnchantmentChange={e => handleEnchantmentChange('fetish', e)}
        onSettingsChange={s => handleSettingsChange('fetish', s)}
        source={fetish}
        current={inventory.fetish}
      />
    </CardGroup>
  );
}