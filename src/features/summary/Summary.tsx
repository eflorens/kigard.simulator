
import { Fragment } from 'react/jsx-runtime';
import { useAppSelector } from '../../app/hooks';
import { Badge, Card, CardBody, CardGroup, CardHeader, Col, Container, Progress, Row } from '../../components';
import { selectSummary } from './SummarySlice';
import { Weapon } from '../../data/inventory';
import { DisplayElementaryResistance } from '../../components/DisplayElementaryResistance';
import { DisplayElement } from '../../components/DisplayElement';
import { DisplayStatus } from '../../components/DisplayStatus';
import { DisplayItemImage } from '../../components/DisplayItemImage';

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

function DisplayVitality({ vitality }: { vitality: number }) {
  return (
    <Row>
      <Col xs="3">PV</Col>
      <Col><Progress value={100} color="danger">{vitality}</Progress></Col>
    </Row>
  );
}

function DisplayMana({ mana }: { mana: number }) {
  return (
    <Row>
      <Col xs="3">PM</Col>
      <Col><Progress value={100} color="success">{mana}</Progress></Col>
    </Row>
  );
}

function DisplayWeapon({ weapon }: { weapon?: Weapon }) {
  if (!weapon) {
    return <Container>Aucune arme</Container>
  }

  return (
    <Container>
      <Row>
        <Col xs="1"><DisplayItemImage id={weapon.id} name={weapon.name} /></Col>
        <Col>{weapon.name}</Col>
        <Col>
          <span className="text-nowrap">
            PRE&nbsp;
            {weapon.accuracy}%
          </span>
        </Col>
        <Col>
          <span className="text-nowrap">
            DGT&nbsp;
            {weapon.damage}&nbsp;
            {weapon.element && <DisplayElement element={weapon.element} />}
          </span>
        </Col>
        {weapon.status && weapon.status.map(({ value, status }) => (
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
      <Card>
        <CardHeader>
          <span>Arme principale</span>
          {primaryWeapon?.usageCost !== undefined && <Badge pill color="secondary" className='float-end'>{primaryWeapon?.usageCost}PA</Badge>}
        </CardHeader>
        <CardBody>
          <DisplayWeapon weapon={primaryWeapon} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <span>Arme secondaire</span>
          {secondaryWeapon?.usageCost !== undefined && <Badge pill color="secondary" className='float-end'>{secondaryWeapon?.usageCost}PA</Badge>}
        </CardHeader>
        <CardBody>
          <DisplayWeapon weapon={secondaryWeapon} />
        </CardBody>
      </Card>
    </>
  );
}

export function Summary() {

  const { primaryWeapon, secondaryWeapon, ...summary } = useAppSelector(selectSummary);

  return (
    <>
      <CardGroup>
        <Card>
          <CardHeader>Attributs</CardHeader>
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
            <span>Combat & Magie</span>
            <Badge pill color="secondary" className='float-end'>PM {summary.magicRecovery > 0 && "+"}{summary.magicRecovery}</Badge>
            {!!summary.actionPointBonus && <Badge pill color="secondary" className='float-end'>PA {summary.actionPointBonus > 0 && "+"}{summary.actionPointBonus}%</Badge>}
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
      </CardGroup>
      <DisplayWeapons />
      <CardGroup>
        <Card>
          <CardHeader>Résistances élémentaires</CardHeader>
          <CardBody>
            {summary.elementaryResistances.map(({ value, element }) => (
              <span key={element} className="mx-1">
                <DisplayElementaryResistance value={value} element={element} />
              </span>))}
          </CardBody>
        </Card>
      </CardGroup>
    </>
  );
}
