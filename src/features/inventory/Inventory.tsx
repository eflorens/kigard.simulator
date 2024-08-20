import { useDispatch, useSelector } from "react-redux";
import { Bold, Col, DropdownList, ListGroup, ListGroupItem, Row } from "../../components";
import { bust, allEnchantments, feet, fetish, head, Item, Modifier, hand, twoHands, Weapon, allSettings } from "../../data/inventory";
import { Inventory as InventoryItem, equipItem, equipHand, InventoryLocation, selectInventory, setEnchantment, setHandEnchantment, setSettings, setHandSettings, setMagicScrolls, InventoryHands } from "./inventorySlice";
import { DisplayElementaryResistance } from "../../components/DisplayElementaryResistance";
import { DisplayStatus } from "../../components/DisplayStatus";
import { DisplayItemImage } from "../../components/DisplayItemImage";
import { DisplayElement } from "../../components/DisplayElement";
import { Talent } from "../../data/talents";
import { MagicScrollId, allMagicScrolls } from "../../data/magicScrolls";

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

export function DisplayItem<T extends Item>({ item, showDetails }: Readonly<{ item?: T, showDetails?: boolean }>) {
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
  currentMagicScrolls?: { hand: InventoryHands, index: number, scroll: MagicScrollId }[];
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
                    source={allMagicScrolls}
                    title="name"
                    render={item => item && <><DisplayItemImage id={52} name={item.name} /><span>{item.name}</span></>}
                    onChange={s => onMagicScrollChange && onMagicScrollChange(i, s)}
                    size="sm"
                    value={currentMagicScrolls && allMagicScrolls.find(scroll => scroll.id === currentMagicScrolls.find(s => s.index === i)?.scroll)}
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

  const handleMagicScrollChange = (slot: InventoryHands, index: number, scroll?: Talent) => {
    dispatch(setMagicScrolls({ hand: slot, index, scroll: scroll?.id }));
  }

  const handleEnchantmentChange = (slot: keyof Omit<InventoryLocation, "hands">, enchantment?: Modifier) => {
    dispatch(setEnchantment({ slot, enchantment }));
  }

  const handleHandEnchantmentChange = (hand: InventoryHands, enchantment?: Modifier) => {
    dispatch(setHandEnchantment({ hand, enchantment }));
  }

  const handleSettingsChange = (slot: keyof Omit<InventoryLocation, "hands">, settings: { first?: Modifier, second?: Modifier }) => {
    dispatch(setSettings({ slot, settings }));
  }

  const handleHandSettingsChange = (hand: InventoryHands, settings: { first?: Modifier, second?: Modifier }) => {
    dispatch(setHandSettings({ hand, settings }));
  }

  const handleItemChange = (slot: keyof Omit<InventoryLocation, "hands">, item?: Item) => {
    dispatch(equipItem({ slot, item }));
  }

  const handleHandChange = (hand: InventoryHands, item?: Weapon | Item) => {
    dispatch(equipHand({ hand, item}));
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
        onChange={item => handleHandChange(InventoryHands.TwoHands, item)}
        onEnchantmentChange={e => handleHandEnchantmentChange(InventoryHands.TwoHands, e)}
        onSettingsChange={s => handleHandSettingsChange(InventoryHands.TwoHands, s)}
        source={twoHands}
        current={inventory.hands?.find(h => h.hand === InventoryHands.TwoHands)?.item}
      />
      <ChooseItem
        label="Main droite"
        onChange={item => handleHandChange(InventoryHands.RightHand, item)}
        onEnchantmentChange={e => handleHandEnchantmentChange(InventoryHands.RightHand, e)}
        onSettingsChange={s => handleHandSettingsChange(InventoryHands.RightHand, s)}
        onMagicScrollChange={(index, talent) => handleMagicScrollChange(InventoryHands.RightHand, index, talent)}
        source={hand}
        current={inventory.hands?.find(h => h.hand === InventoryHands.RightHand)?.item}
        currentMagicScrolls={inventory.magicScrolls?.filter(h => h.hand === InventoryHands.RightHand)}
      />
      <ChooseItem
        label="Main gauche"
        onChange={item => handleHandChange(InventoryHands.LeftHand, item)}
        onEnchantmentChange={e => handleHandEnchantmentChange(InventoryHands.LeftHand, e)}
        onSettingsChange={s => handleHandSettingsChange(InventoryHands.LeftHand, s)}
        onMagicScrollChange={(index, talent) => handleMagicScrollChange(InventoryHands.LeftHand, index, talent)}
        source={hand}
        current={inventory.hands?.find(h => h.hand === InventoryHands.LeftHand)?.item}
        currentMagicScrolls={inventory.magicScrolls?.filter(h => h.hand === InventoryHands.LeftHand)}
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