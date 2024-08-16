import { useDispatch, useSelector } from "react-redux";
import { Bold, Col, DropdownList, ListGroup, ListGroupItem, Row } from "../../components";
import { bust, allEnchantments, feet, fetish, head, Item, Modifier, hand, twoHands, Weapon, allSettings } from "../../data/inventory";
import { Inventory as InventoryItem, equipItem, equipLeftHand, equipRightHand, InventoryLocation, selectInventory, setEnchantment, setLeftHandEnchantment, setLeftHandSettings, setRightHandEnchantment, setRightHandSettings, setSettings, unequipItem, unequipLeftHand, unequipRightHand, setMagicScrolls, unsetMagicScrolls } from "./inventorySlice";
import { DisplayElementaryResistance } from "../../components/DisplayElementaryResistance";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayItemImage } from "../../components/DisplayItemImage";
import { DisplayElement } from "../../components/DisplayElement";
import { Talent } from "../../data/talents";
import { MagicScrollId, magicScrolls } from "../../data/magicScrolls";

function DisplayAttributeItem({ item }: Readonly<{ item?: Item }>) {
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
    magicalSpace,
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
      {!!magicalSpace && <span className="mx-1">{magicalSpace}<DisplayItemImage id={52} name="Parchemin" /></span>}
    </>
  );

}

function DisplayItem<T extends Item>({ item, showDetails }: Readonly<{ item?: T, showDetails?: boolean }>) {
  if (!item) {
    return <span>Aucun</span>;
  }

  return (
    <>
      <DisplayItemImage id={item.id} name={item.name} />
      <span>{item?.name}</span>
      {showDetails && <DisplayAttributeItem item={item} />}
    </>
  );
}

interface ChooseItemProps<T extends Item> {
  label: string;
  onChange: (item?: T) => void;
  onEnchantmentChange: (enchantment?: Modifier) => void;
  onSettingsChange: (settings: { first?: Modifier, second?: Modifier }) => void;
  onMagicScrollChange?: (index: number, scroll?: Talent) => void;
  source: T[];
  current?: InventoryItem<T>;
  currentMagicScrolls?: { [index: number]: MagicScrollId };
}

function ChooseItem<T extends Item>({ label, onChange, onEnchantmentChange, onSettingsChange, onMagicScrollChange, source, current, currentMagicScrolls }: Readonly<ChooseItemProps<T>>) {
  return (
    <ListGroupItem>
      <Row className="text-center">
        <Col className="text-start col-12 col-lg-2">
          <Bold>{label}</Bold>
        </Col>
        <Col className="col-12 col-lg-3">
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
          <Row>
            <Col>
              <DropdownList
                hasEmpty
                source={source}
                title="name"
                render={item => <DisplayItem item={item} showDetails />}
                renderToggle={item => <DisplayItem item={item} />}
                onChange={onChange}
                value={current?.item}
                description={label}
                search
              />
            </Col>
            {current?.item?.magicalSpace && current.item.magicalSpace > 0 && (
              Array.from(Array(current.item.magicalSpace).keys()).map((_, i) => (
                <Col sm="12" key={i}>
                  <DropdownList
                    hasEmpty
                    source={magicScrolls}
                    title="name"
                    render={item => item && <><DisplayItemImage id={52} name={item.name} /><span>{item.name}</span></>}
                    onChange={s => onMagicScrollChange && onMagicScrollChange(i, s)}
                    size="sm"
                    value={currentMagicScrolls && magicScrolls.find(scroll => scroll.id === currentMagicScrolls[i])}
                    description="Aucun parchemin"
                    search
                  />
                </Col>
              )))}
          </Row>
        </Col>
        <Col className="col-12 col-lg-3">
          <Row>
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
            {current?.item?.doubleSetting && (
              <Col>
                <DropdownList
                  hasEmpty
                  source={allSettings}
                  title="description"
                  onChange={s => onSettingsChange({ first: current?.settings?.first, second: s })}
                  value={current?.settings?.second}
                  description="Aucun sertissage"
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export function Inventory() {
  const inventory = useSelector(selectInventory);
  const dispatch = useDispatch();

  const handleMagicScrollChange = (slot: "rightHand" | "leftHand", index: number, scroll?: Talent) => {
    dispatch(scroll ? setMagicScrolls({ slot, index, scroll: scroll?.id }) : unsetMagicScrolls({ slot, index }));
  }

  const handleEnchantmentChange = (slot: keyof InventoryLocation, enchantment?: Modifier) => {
    dispatch(setEnchantment({ slot, enchantment }));
  }

  const handleRightHandEnchantmentChange = (enchantment?: Modifier) => {
    dispatch(setRightHandEnchantment({ enchantment }));
  }

  const handleLeftHandEnchantmentChange = (enchantment?: Modifier) => {
    dispatch(setLeftHandEnchantment({ enchantment }));
  }

  const handleSettingsChange = (slot: keyof InventoryLocation, settings: { first?: Modifier, second?: Modifier }) => {
    dispatch(setSettings({ slot, settings }));
  }

  const handleRightHandSettingsChange = (settings: { first?: Modifier, second?: Modifier }) => {
    dispatch(setRightHandSettings({ settings }));
  }

  const handleLeftHandSettingsChange = (settings: { first?: Modifier, second?: Modifier }) => {
    dispatch(setLeftHandSettings({ settings }));
  }

  const handleItemChange = (slot: keyof InventoryLocation, item?: Item) => {
    dispatch(item ? equipItem({ slot, item }) : unequipItem(slot));
  }

  const handleRightHandChange = (item?: Weapon | Item) => {
    dispatch(item ? equipRightHand(item) : unequipRightHand());
  }

  const handleLeftHandChange = (item?: Weapon | Item) => {
    dispatch(item ? equipLeftHand(item) : unequipLeftHand());
  }

  return (
    <ListGroup>
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
        onMagicScrollChange={(index, talent) => handleMagicScrollChange("rightHand", index, talent)}
        source={hand}
        current={inventory.hands && "rightHand" in inventory.hands ? inventory.hands.rightHand : undefined}
        currentMagicScrolls={inventory.magicScrolls.rightHand}
      />
      <ChooseItem
        label="Main gauche"
        onChange={item => handleLeftHandChange(item)}
        onEnchantmentChange={e => handleLeftHandEnchantmentChange(e)}
        onSettingsChange={s => handleLeftHandSettingsChange(s)}
        onMagicScrollChange={(index, talent) => handleMagicScrollChange("leftHand", index, talent)}
        source={hand}
        current={inventory.hands && "leftHand" in inventory.hands ? inventory.hands.leftHand : undefined}
        currentMagicScrolls={inventory.magicScrolls.leftHand}
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
    </ListGroup>
  );
}