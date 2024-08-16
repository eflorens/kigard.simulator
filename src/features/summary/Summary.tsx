
import { Fragment } from 'react/jsx-runtime';
import { useAppSelector } from '../../app/hooks';
import { Badge, Bold, Card, CardBody, CardGroup, CardHeader, Col, Container, Progress, Row } from '../../components';
import { HandSummary, selectSummary } from './SummarySlice';
import { DisplayElementaryResistance } from '../../components/DisplayElementaryResistance';
import { DisplayElement } from '../../components/DisplayElement';
import { DisplayStatus } from '../../components/DisplayStatus';
import { DisplayItemImage } from '../../components/DisplayItemImage';
import { DisplayBreed } from '../evolution/DisplayBreed';
import { DisplayTalent } from '../talents/DisplayTalent';
import { magicScrolls } from '../../data/magicScrolls';
import { TalentType } from '../evolution/evolutionSlice';
import { techniques } from '../../data/techniques';

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
      {inventory.map(({ id, name }) => (
        <span key={id} className="me-1">
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

export function Summary() {

  const summary = useAppSelector(selectSummary);
  const { talents } = summary;

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
        {talents.map(t => {
          const talent = (t.type === TalentType.MagicScroll && magicScrolls.find(talent => talent.id === t.id))
            || (t.type === TalentType.Technique && techniques.find(talent => talent.id === t.id));
          if (!talent) {
            return null;
          }
          return (
            <DisplayTalent
              key={talent.id}
              title={talent.name}
              usageCost={(typeof talent.usageCost === "function" && talent.usageCost(summary)) || talent.usageCost as (number | string)}
              manaCost={talent.manaCost}
              reusable={talent.reusable}
              range={(typeof talent.range === "function" && talent.range(summary)) || talent.range as { min: number, max: number }}
              area={talent.area}
              element={talent.element}
              required={talent.required}
              description={talent.getDescription(summary)}
            />
          );
        })}
      </CardGroup>
    </>
  );
}
