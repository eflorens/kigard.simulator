
import { Fragment } from 'react/jsx-runtime';
import { useAppSelector } from '../../app/hooks';
import { Badge, Card, CardBody, CardGroup, CardHeader, Col, Container, Row } from '../../components';
import { DisplayBreed } from '../evolution/DisplayBreed';
import { selectSummary } from './SummarySlice';
import { Weapon, ElementId } from '../../data/inventory';

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
    <Container className="text-center">
      <Row>
        {attributes.map(({ label, value, unity }) => (
          <Fragment key={label}>
            <Col>{label}</Col>
            <Col>{value}{unity === "percent" && " %"}</Col>
          </Fragment>
        ))}
      </Row>
    </Container>
  );
}

function DisplayElement({ element }: { element: ElementId }) {
  return (
    <img src={`https://tournoi.kigard.fr/images/elements/${element}.gif`} alt={element.toString()} />
  );
}

function DisplayElementaryResistance({ value, element }: Readonly<{ value: number, element: ElementId }>) {
  return (
    <span className="text-nowrap">{value}% <DisplayElement element={element} /></span>
  );
}

function DisplayWeapon({ weapon }: { weapon?: Weapon }) {
  if (!weapon) {
    return <Container>Aucune arme</Container>
  }

  return (
    <Container>
      <Row>
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
            {weapon.damage}
            {weapon.element && <DisplayElement element={weapon.element} />}
          </span>
        </Col>
      </Row>
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
          <Badge pill color="secondary" className='float-end'>{primaryWeapon?.usageCost}PA</Badge>
        </CardHeader>
        <CardBody>
          <DisplayWeapon weapon={primaryWeapon} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <span>Arme secondaire</span>
          <Badge pill color="secondary" className='float-end'>{secondaryWeapon?.usageCost}PA</Badge>
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
      <DisplayBreed />
      <CardGroup>
        <Card>
          <CardHeader>Attributs</CardHeader>
          <CardBody>
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
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Badge pill color="secondary" className='float-start'>PA {summary.actionPointBonus > 0 && "+"}{summary.actionPointBonus}%</Badge>
            <span>Combat & Magie</span>
            <Badge pill color="secondary" className='float-end'>PM {summary.magicRecovery > 0 && "+"}{summary.magicRecovery}</Badge>
          </CardHeader>
          <CardBody>
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
