
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addStrength,
  addDexterity,
  selectEvolution,
  AttributeExperience,
  addIntelligence,
  addConsitution,
  addMind,
  addCharisma,
  addAccuracy,
  addDodge,
  addMagicAttack,
  addMagicDefense,
  addObservation,
  addDiscretion,
} from './evolutionSlice';
import { GiftId, Gifts } from '../../data/character';
import { Badge, Col, Container, Row, Tooltip, Button, CardGroup, Card, CardBody } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

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

export function DisplayGift({ id }: Readonly<{ id: GiftId }>) {
  const gift = Gifts.find(g => g.id === id);
  if (!gift) {
    return <></>
  }

  return (
    <Badge pill color="primary" className="mx-1">
      <Tooltip description={gift.description}>
        {gift.label}
      </Tooltip>
    </Badge>
  );
}

export function Evolution() {
  const { character, experience } = useAppSelector(selectEvolution);
  const dispatch = useAppDispatch();

  return (
    <>
      <CardGroup>
        <Card>
          <CardBody>
            <Container className="text-center">
              <DisplayAttribute
                label="FOR"
                value={character.profile.strength}
                xp={experience.strength}
                onIncrement={() => dispatch(addStrength(1))}
                onDecrement={() => dispatch(addStrength(-1))}
              />
              <DisplayAttribute
                label="DEX"
                value={character.profile.dexterity}
                xp={experience.dexterity}
                onIncrement={() => dispatch(addDexterity(1))}
                onDecrement={() => dispatch(addDexterity(-1))}
              />
              <DisplayAttribute
                label="INT"
                value={character.profile.intelligence}
                xp={experience.intelligence}
                onIncrement={() => dispatch(addIntelligence(1))}
                onDecrement={() => dispatch(addIntelligence(-1))}
              />
              <DisplayAttribute
                label="CON"
                value={character.profile.constitution}
                xp={experience.constitution}
                onIncrement={() => dispatch(addConsitution(1))}
                onDecrement={() => dispatch(addConsitution(-1))}
              />
              <DisplayAttribute
                label="ESP"
                value={character.profile.mind}
                xp={experience.mind}
                onIncrement={() => dispatch(addMind(1))}
                onDecrement={() => dispatch(addMind(-1))}
              />
              <DisplayAttribute
                label="CHA"
                value={character.profile.charisma}
                xp={experience.charisma}
                onIncrement={() => dispatch(addCharisma(1))}
                onDecrement={() => dispatch(addCharisma(-1))}
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
                onIncrement={() => dispatch(addAccuracy(1))}
                onDecrement={() => dispatch(addAccuracy(-1))}
              />
              <DisplayAttribute
                label="ESQ"
                value={character.profile.dodge}
                xp={experience.dodge}
                unity="%"
                onIncrement={() => dispatch(addDodge(1))}
                onDecrement={() => dispatch(addDodge(-1))}
              />
              <DisplayAttribute
                label="MM"
                value={character.profile.magicAttack}
                xp={experience.magicAttack}
                unity="%"
                onIncrement={() => dispatch(addMagicAttack(1))}
                onDecrement={() => dispatch(addMagicAttack(-1))}
              />
              <DisplayAttribute
                label="DM"
                value={character.profile.magicDefense}
                xp={experience.magicDefense}
                unity="%"
                onIncrement={() => dispatch(addMagicDefense(1))}
                onDecrement={() => dispatch(addMagicDefense(-1))}
              />
              <DisplayAttribute
                label="OBS"
                value={character.profile.observation}
                xp={experience.observation}
                unity="%"
                onIncrement={() => dispatch(addObservation(1))}
                onDecrement={() => dispatch(addObservation(-1))}
              />
              <DisplayAttribute
                label="DIS"
                value={character.profile.discretion}
                xp={experience.discretion}
                unity="%"
                onIncrement={() => dispatch(addDiscretion(1))}
                onDecrement={() => dispatch(addDiscretion(-1))}
              />
            </Container>
          </CardBody>
        </Card>
      </CardGroup>
    </>
  );
}
