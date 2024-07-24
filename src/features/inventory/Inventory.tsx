import { useDispatch, useSelector } from "react-redux";
import { Col, Container, DropdownList, Row } from "../../components";
import { bust, allEnchantments, feet, fetish, head, Item, Modifier, oneHand, twoHands, Weapon, allSettings } from "../../data/inventory";
import { equipItem, equipLeftHand, equipRightHand, InventoryState, selectInventory, setEnchantment, setLeftHandEnchantment, setLeftHandSettings, setRightHandEnchantment, setRightHandSettings, setSettings, unequipItem, unequipLeftHand, unequipRightHand } from "./inventorySlice";

interface WornItem<T extends Item> {
  enchantment?: Modifier;
  item?: T;
  settings?: { first?: Modifier, second?: Modifier };
}

interface ItemProps<T extends Item> {
  label: string;
  onChange: (item?: T) => void;
  onEnchantmentChange: (enchantment?: Modifier) => void;
  onSettingsChange: (settings: { first?: Modifier, second?: Modifier }) => void;
  source: T[];
  current?: WornItem<T>;
}

function DisplayItem<T extends Item>({ label, onChange, onEnchantmentChange, onSettingsChange, source, current }: ItemProps<T>) {
  return (
    <>
      <Col>{label}</Col>
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
          onChange={onChange}
          value={current?.item}
          description="Aucun"
        />
      </Col>
      <Col xs="2">
        <DropdownList
          hasEmpty
          source={allSettings}
          title="description"
          onChange={s => onSettingsChange({ first: s, second: current?.settings?.second })}
          value={current?.settings?.first}
          description="Aucun sertissage"
        />
      </Col>
      <Col xs="2">
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
    </>
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
    <Container>
      <Row className="my-1">
        <DisplayItem
          label="Tête"
          onChange={item => handleItemChange('head', item)}
          onEnchantmentChange={e => handleEnchantmentChange('head', e)}
          onSettingsChange={s => handleSettingsChange('head', s)}
          source={head}
          current={inventory.head}
        />
      </Row>
      <Row className="my-1">
        <DisplayItem
          label="Main droite"
          onChange={item => handleRightHandChange(item)}
          onEnchantmentChange={e => handleRightHandEnchantmentChange(e)}
          onSettingsChange={s => handleRightHandSettingsChange(s)}
          source={oneHand}
          current={inventory.hands && "rightHand" in inventory.hands ? inventory.hands.rightHand : undefined}
        />
      </Row>
      <Row className="my-1">
        <DisplayItem
          label="Main gauche"
          onChange={item => handleLeftHandChange(item)}
          onEnchantmentChange={e => handleLeftHandEnchantmentChange(e)}
          onSettingsChange={s => handleLeftHandSettingsChange(s)}
          source={oneHand}
          current={inventory.hands && "leftHand" in inventory.hands ? inventory.hands.leftHand : undefined}
        />
      </Row>
      <Row className="my-1">
        <DisplayItem
          label="Deux mains"
          onChange={item => handleItemChange('hands', item)}
          onEnchantmentChange={e => handleEnchantmentChange('hands', e)}
          onSettingsChange={s => handleSettingsChange('hands', s)}
          source={twoHands}
          current={inventory.hands as WornItem<Weapon>}
        />
      </Row>
      <Row className="my-1">
        <DisplayItem
          label="Buste"
          onChange={item => handleItemChange('bust', item)}
          onEnchantmentChange={e => handleEnchantmentChange('bust', e)}
          onSettingsChange={s => handleSettingsChange('bust', s)}
          source={bust}
          current={inventory.bust}
        />
      </Row>
      <Row className="my-1">
        <DisplayItem
          label="Pieds"
          onChange={item => handleItemChange('feet', item)}
          onEnchantmentChange={e => handleEnchantmentChange('feet', e)}
          onSettingsChange={s => handleSettingsChange('feet', s)}
          source={feet}
          current={inventory.feet}
        />
      </Row>
      <Row className="my-1">
        <DisplayItem
          label="Fétiche"
          onChange={item => handleItemChange('fetish', item)}
          onEnchantmentChange={e => handleEnchantmentChange('fetish', e)}
          onSettingsChange={s => handleSettingsChange('fetish', s)}
          source={fetish}
          current={inventory.fetish}
        />
      </Row>
    </Container>
  );
}