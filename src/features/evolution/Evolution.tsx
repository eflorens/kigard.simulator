
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectEvolution,
  AttributeExperience,
  improve,
} from './evolutionSlice';
import { Col, Container, Row, Tooltip, Button, CardGroup, Card, CardBody } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { DisplayBreed } from './DisplayBreed';

interface DisplayAttributeProps {
  label: string;
  value: number;
  xp: AttributeExperience;
  unity?: string;
  onDecrement: () => void;
  onIncrement: () => void;
}

function DisplayAttribute({
  label,
  value,
  xp,
  unity,
  onDecrement,
  onIncrement
}: Readonly<DisplayAttributeProps>) {

  return (
    <Row className='my-1'>
      <Col className="text-nowrap" xs="2">{label}</Col>
      <Col xs="6">
        <Button
          color="primary"
          aria-label={`Decrement ${label}`}
          className='float-start'
          outline
          onClick={onDecrement}
        >
          -
        </Button>
        <span>{value}{unity ? ` ${unity}` : ''}</span>
        <Button
          color="primary"
          aria-label={`Increment ${label}`}
          className='float-end'
          outline
          onClick={onIncrement}
        >
          +
        </Button>
      </Col>
      <Col>{xp.next} PE</Col>
      <Col xs="1">
        <Tooltip description={`${xp.improvements} amélioration${xp.improvements > 1 ? "s" : ""}. Total : ${xp.total} PE`}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </Tooltip>
      </Col>
    </Row>
  );

}

export function Evolution() {
  const { character, experience } = useAppSelector(selectEvolution);
  const dispatch = useAppDispatch();

  return (
    <>
      <h4><DisplayBreed /></h4>
      <CardGroup>
        <Card>
          <CardBody>
            <Container className="text-center">
              <DisplayAttribute
                label="FOR"
                value={character.profile.strength}
                xp={experience.strength}
                onIncrement={() => dispatch(improve({ strength: 1}))}
                onDecrement={() => dispatch(improve({ strength: -1}))}
              />
              <DisplayAttribute
                label="DEX"
                value={character.profile.dexterity}
                xp={experience.dexterity}
                onIncrement={() => dispatch(improve({ dexterity: 1}))}
                onDecrement={() => dispatch(improve({ dexterity: -1}))}
              />
              <DisplayAttribute
                label="INT"
                value={character.profile.intelligence}
                xp={experience.intelligence}
                onIncrement={() => dispatch(improve({ intelligence: 1}))}
                onDecrement={() => dispatch(improve({ intelligence: -1}))}
              />
              <DisplayAttribute
                label="CON"
                value={character.profile.constitution}
                xp={experience.constitution}
                onIncrement={() => dispatch(improve({ constitution: 1}))}
                onDecrement={() => dispatch(improve({ constitution: -1}))}
              />
              <DisplayAttribute
                label="ESP"
                value={character.profile.mind}
                xp={experience.mind}
                onIncrement={() => dispatch(improve({ mind: 1}))}
                onDecrement={() => dispatch(improve({ mind: -1}))}
              />
              <DisplayAttribute
                label="CHA"
                value={character.profile.charisma}
                xp={experience.charisma}
                onIncrement={() => dispatch(improve({ charisma: 1}))}
                onDecrement={() => dispatch(improve({ charisma: -1}))}
              />
            </Container>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Container className="text-center">
              <DisplayAttribute
                label="PRE"
                value={character.profile.accuracy}
                xp={experience.accuracy}
                unity="%"
                onIncrement={() => dispatch(improve({ accuracy: 1}))}
                onDecrement={() => dispatch(improve({ accuracy: -1}))}
              />
              <DisplayAttribute
                label="ESQ"
                value={character.profile.dodge}
                xp={experience.dodge}
                unity="%"
                onIncrement={() => dispatch(improve({ dodge: 1}))}
                onDecrement={() => dispatch(improve({ dodge: -1}))}
              />
              <DisplayAttribute
                label="MM"
                value={character.profile.magicAttack}
                xp={experience.magicAttack}
                unity="%"
                onIncrement={() => dispatch(improve({ magicAttack: 1}))}
                onDecrement={() => dispatch(improve({ magicAttack: -1}))}
              />
              <DisplayAttribute
                label="DM"
                value={character.profile.magicDefense}
                xp={experience.magicDefense}
                unity="%"
                onIncrement={() => dispatch(improve({ magicDefense: 1}))}
                onDecrement={() => dispatch(improve({ magicDefense: -1}))}
              />
              <DisplayAttribute
                label="OBS"
                value={character.profile.observation}
                xp={experience.observation}
                unity="%"
                onIncrement={() => dispatch(improve({ observation: 1}))}
                onDecrement={() => dispatch(improve({ observation: -1}))}
              />
              <DisplayAttribute
                label="DIS"
                value={character.profile.discretion}
                xp={experience.discretion}
                unity="%"
                onIncrement={() => dispatch(improve({ discretion: 1}))}
                onDecrement={() => dispatch(improve({ discretion: -1}))}
              />
            </Container>
          </CardBody>
        </Card>
      </CardGroup>
    </>
  );
}
