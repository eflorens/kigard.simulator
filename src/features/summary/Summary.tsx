
import { Fragment } from 'react/jsx-runtime';
import { useAppSelector } from '../../app/hooks';
import { Badge, Card, CardBody, CardGroup, CardHeader, Col, Container, Row } from '../../components';
import { DisplayBreed } from '../evolution/DisplayBreed';
import { selectEvolution } from '../evolution/evolutionSlice';

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

export function Summary() {
  const { character } = useAppSelector(selectEvolution);

  return (
    <>
      <DisplayBreed />
      <CardGroup>
        <Card>
          <CardHeader>Attributs</CardHeader>
          <CardBody>
            <DisplayAttribute
              attributes={[
                { label: "FOR", value: character.profile.strength, unity: "number" },
                { label: "PRE", value: character.profile.accuracy, unity: "percent" }
              ]} />
            <DisplayAttribute
              attributes={[
                { label: "DEX", value: character.profile.dexterity, unity: "number" },
                { label: "ESQ", value: character.profile.dodge, unity: "percent" }
              ]} />
            <DisplayAttribute
              attributes={[
                { label: "INT", value: character.profile.intelligence, unity: "number" },
                { label: "MM", value: character.profile.magicAttack, unity: "percent" }
              ]} />
            <DisplayAttribute
              attributes={[
                { label: "CON", value: character.profile.constitution, unity: "number" },
                { label: "DM", value: character.profile.magicDefense, unity: "percent" }
              ]} />
            <DisplayAttribute
              attributes={[
                { label: "ESP", value: character.profile.mind, unity: "number" },
                { label: "OBS", value: character.profile.observation, unity: "percent" }
              ]} />
            <DisplayAttribute
              attributes={[
                { label: "CHA", value: character.profile.charisma, unity: "number" },
                { label: "DIS", value: character.profile.discretion, unity: "percent" }
              ]} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <span>Combat & Magie</span>
            <Badge pill color="secondary"className='float-end'>PM {character.profile.magicRecovery > 0 && "+"}{character.profile.magicRecovery}</Badge>
          </CardHeader>
          <CardBody>
            <DisplayAttribute
              attributes={[
                { label: "ARM", value: character.profile.armor, unity: "number" },
                { label: "RES", value: character.profile.magicResistance, unity: "number" }
              ]} />
            <DisplayAttribute
              attributes={[
                { label: "DGT", value: character.profile.damage, unity: "number" },
                { label: "MAG", value: character.profile.magicPower, unity: "number" }
              ]} />
          </CardBody>
        </Card>
      </CardGroup>
    </>
  );
}
