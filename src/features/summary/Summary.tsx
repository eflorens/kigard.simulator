
import { Fragment } from 'react/jsx-runtime';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Badge, Bold, Card, CardBody, CardGroup, CardHeader, Col, Container, Progress, Row } from '../../components';
import { HandSummary, selectSummary, SummaryState } from './SummarySlice';
import { DisplayElementaryResistance } from '../../components/DisplayElementaryResistance';
import { DisplayElement } from '../../components/DisplayElement';
import { DisplayStatus } from '../../components/DisplayStatus';
import { DisplayItemImage } from '../../components/DisplayItemImage';
import { DisplayBreed } from '../evolution/DisplayBreed';
import { DisplayTalent } from '../talents/DisplayTalent';
import { allMagicScrolls, MagicScrollId } from '../../data/magicScrolls';
import { ChooseTalent, Talents } from '../talents/Talents';
import { DisplayItem } from '../inventory/Inventory';
import { Talent } from '../../data/talents';
import { InventoryHands, setMagicScrolls } from '../inventory/inventorySlice';
import { Item, Weapon } from '../../data/inventory';

interface AttributeProps {
  label: string;
  value: number;
  unity: "number" | "percent";
}

interface DisplayAttributeProps {
  attributes: AttributeProps[];
}
function DisplayAttribute({ attributes }: Readonly<DisplayAttributeProps>) {
  return (
    <Row>
      {attributes.map(({ label, value, unity }) => (
        <Fragment key={label}>
          <Col>{label}</Col>
          <Col>{value}{unity === "percent" && " %"}</Col>
        </Fragment>
      ))}
    </Row>
  );
}

function DisplayVitality({ vitality }: Readonly<{ vitality: number }>) {
  return (
    <Row>
      <Col xs="3">PV</Col>
      <Col><Progress value={100} color="danger">{vitality}</Progress></Col>
    </Row>
  );
}

function DisplayMana({ mana }: Readonly<{ mana: number }>) {
  return (
    <Row>
      <Col xs="3">PM</Col>
      <Col><Progress value={100} color="success">{mana}</Progress></Col>
    </Row>
  );
}

function DisplayInventory(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) {
  const { inventory } = useAppSelector(selectSummary);

  return (
    <span {...props}>
      {inventory.map(({ id, name }, index) => (
        <span key={index} className="me-1">
          <DisplayItemImage id={id} name={name} />
        </span>
      ))}
    </span>
  )

}

function DisplayWeapon({ weapon }: Readonly<{ weapon?: HandSummary }>) {
  if (!weapon) {
    return <span>Aucune arme</span>
  }

  if (!weapon.isWeapon) {
    return <span>L'objet équipé n'est pas une arme</span>
  }

  return (
    <Container>
      <Row>
        <Col xs="1"><DisplayItemImage id={weapon.id} name={weapon.name} /></Col>
        <Col>{weapon.name}</Col>
        <Col>
          <span className="text-nowrap">
            PRE&nbsp;
            {weapon.baseAccuracy + weapon.accuracy}%
          </span>
        </Col>
        <Col>
          <span className="text-nowrap">
            DGT&nbsp;
            {weapon.baseDamage + weapon.damage}&nbsp;
            {weapon.element && <DisplayElement element={weapon.element} />}
          </span>
        </Col>
        {weapon?.status?.map(({ value, status }) => (
          <Col key={status}>
            <span className="text-nowrap">{value}</span>
            <DisplayStatus status={status} />
          </Col>
        ))}
      </Row>
      {weapon.elementaryAffinity && <>
        <Row>
          <Col>
            <span className="me-1 fw-bold">Affinité élémentaire</span>
            <DisplayElement element={weapon.elementaryAffinity} />
          </Col>
        </Row>
        <Row>
          <Col className="fst-italic">
            <span className="fw-bold">MAG +2</span>
            <span> et </span>
            <span className="fw-bold">MM +10%</span>
            <span> pour lancer un sort de cet élément</span>
          </Col>
        </Row>
      </>}
    </Container>
  );
}

function DisplayWeapons() {
  const { primaryWeapon, secondaryWeapon } = useAppSelector(selectSummary);

  return (
    <>
      {primaryWeapon?.isWeapon && (
        <Card>
          <CardHeader>
            <Bold>Arme principale</Bold>
            <Badge pill color="secondary" className='float-end'>{primaryWeapon?.usageCost}PA</Badge>
          </CardHeader>
          <CardBody>
            <DisplayWeapon weapon={primaryWeapon} />
          </CardBody>
        </Card>
      )}
      {secondaryWeapon?.isWeapon && (
        <Card>
          <CardHeader>
            <Bold>Arme secondaire</Bold>
            <Badge pill color="secondary" className='float-end'>{secondaryWeapon?.usageCost}PA</Badge>
          </CardHeader>
          <CardBody>
            <DisplayWeapon weapon={secondaryWeapon} />
          </CardBody>
        </Card>
      )}
    </>
  );
}

interface MagicHandProps {
  hand: InventoryHands;
  item: Weapon | Item;
  magicScrolls: { scroll: MagicScrollId; index: number; hand: InventoryHands; }[];
  onMagicScrollChange: (index: number, hand: InventoryHands, scroll?: Talent) => void;
  summary: SummaryState;
}

function MagicHand({ hand, item, magicScrolls, onMagicScrollChange, summary }: Readonly<MagicHandProps>) {
  return (
    <Card key={hand}>
      <CardHeader><Bold><DisplayItem item={item}></DisplayItem></Bold></CardHeader>
      <CardBody>
        <CardGroup className="group-col-2">
          {Array.from(Array(item.magicalSpace).keys()).map((_, index) => {
            const scroll = magicScrolls.find(ms => ms.index === index);
            const magicScroll = scroll && allMagicScrolls.find(ms => ms.id === scroll.scroll);

            return (
              <DisplayTalent
                key={magicScroll?.id}
                title={<ChooseTalent index={index} description="Choisir un sortilège" talent={magicScroll} source={allMagicScrolls} onChange={(index, talent) => onMagicScrollChange(index, hand, talent)} />}
                usageCost={magicScroll && ((typeof magicScroll.usageCost === "function" && magicScroll.usageCost(summary)) || magicScroll.usageCost as (number | string))}
                manaCost={magicScroll?.manaCost}
                reusable={magicScroll?.reusable}
                range={magicScroll && ((typeof magicScroll.range === "function" && magicScroll.range(summary)) || magicScroll.range as { min: number; max: number; })}
                area={magicScroll?.area}
                element={magicScroll?.element}
                required={magicScroll?.required}
                resume={magicScroll && ((typeof magicScroll.resume === "function" && magicScroll.resume(summary)) || magicScroll.resume as (React.ReactNode | string))}
                description={magicScroll?.getDescription(summary)} />
            );
          })}
        </CardGroup>
      </CardBody>
    </Card>
  );
}

export function Summary() {
  const summary = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();
  const { magicScrolls } = summary;

  const onMagicScrollChange = (index: number, hand: InventoryHands, scroll?: Talent) => {
    dispatch(setMagicScrolls({ index, hand, scroll: scroll?.id }));
  }

  return (
    <>
      <h4><DisplayBreed readonly /></h4>
      <CardGroup className="group-col-2">
        <Card>
          <CardHeader>
            <Bold>Attributs</Bold>
            <DisplayInventory className="float-end" />
          </CardHeader>
          <CardBody>
            <Container className="text-center">
              <DisplayAttribute
                attributes={[
                  { label: "FOR", value: summary.strength, unity: "number" },
                  { label: "PRE", value: summary.accuracy, unity: "percent" }
                ]} />
              <DisplayAttribute
                attributes={[
                  { label: "DEX", value: summary.dexterity, unity: "number" },
                  { label: "ESQ", value: summary.dodge, unity: "percent" }
                ]} />
              <DisplayAttribute
                attributes={[
                  { label: "INT", value: summary.intelligence, unity: "number" },
                  { label: "MM", value: summary.magicAttack, unity: "percent" }
                ]} />
              <DisplayAttribute
                attributes={[
                  { label: "CON", value: summary.constitution, unity: "number" },
                  { label: "DM", value: summary.magicDefense, unity: "percent" }
                ]} />
              <DisplayAttribute
                attributes={[
                  { label: "ESP", value: summary.mind, unity: "number" },
                  { label: "OBS", value: summary.observation, unity: "percent" }
                ]} />
              <DisplayAttribute
                attributes={[
                  { label: "CHA", value: summary.charisma, unity: "number" },
                  { label: "DIS", value: summary.discretion, unity: "percent" }
                ]} />
            </Container>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Bold>Combat & Magie</Bold>
            <Badge pill color="secondary" className='float-end'>PM {summary.magicRecovery > 0 && "+"}{summary.magicRecovery}</Badge>
            {!!summary.actionPointsBonus && <Badge pill color="secondary" className='float-end'>PA {summary.actionPointsBonus > 0 && "+"}{summary.actionPointsBonus}%</Badge>}
            {!!summary.regeneration && <Badge pill color="secondary" className='float-end'>REG {summary.regeneration > 0 && "+"}{summary.regeneration}</Badge>}
          </CardHeader>
          <CardBody>
            <DisplayVitality vitality={summary.vitality} />
            <DisplayMana mana={summary.mana} />
            <DisplayAttribute
              attributes={[
                { label: "ARM", value: summary.armor, unity: "number" },
                { label: "RES", value: summary.magicResistance, unity: "number" }
              ]} />
            <DisplayAttribute
              attributes={[
                { label: "DGT", value: summary.damage, unity: "number" },
                { label: "MAG", value: summary.magicPower, unity: "number" }
              ]} />
            <DisplayAttribute
              attributes={[
                { label: "EMP", value: summary.empathie, unity: "number" },
                { label: "MEM", value: summary.memory, unity: "number" }
              ]} />
          </CardBody>
        </Card>
        <DisplayWeapons />
        <Card>
          <CardHeader><Bold>Résistances élémentaires</Bold></CardHeader>
          <CardBody>
            {summary.elementaryResistances.map(({ value, element }) => (
              <span key={element} className="mx-1">
                <DisplayElementaryResistance value={value} element={element} />
              </span>))}
          </CardBody>
        </Card>
      </CardGroup>
      <CardGroup>
        {summary.hands.map(({hand, item}) => {
          if (!item?.item?.magicalSpace) {
            return null;
          }

          return (
            <MagicHand
              key={hand}
              hand={hand}
              item={item.item}
              magicScrolls={magicScrolls.filter(scroll => scroll.hand === hand)}
              onMagicScrollChange={onMagicScrollChange}
              summary={summary}
            />
          )
        })}
      </CardGroup>
      <Talents />
    </>
  );
}
