
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addStrength,
  addDexterity,
  selectProfile,
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
  setBreed,
} from './profileSlice';
import './Profile.module.css';
import { Breed, Breeds, GiftId, Gifts } from '../../data/character';
import { Badge, DropdownList, Col, Container, Row, Tooltip, Button, CardGroup, Card, CardBody } from '../../components';
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
      <Col>{label}</Col>
      <Col xs="4">
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
      <Col>
        <Tooltip description={`${xp.improvements} amélioration${xp.improvements > 1 ? "s" : ""}. Total : ${xp.total} PE`}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </Tooltip>
      </Col>
    </Row>
  );

}

function DisplayGift({ id }: Readonly<{ id: GiftId }>) {
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

export function DisplayBreed() {
  const { character, experience, breed } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <DropdownList<Breed>
            source={Breeds}
            title="label"
            value={Breeds.find(b => b.id === breed)}
            onChange={breed => dispatch(setBreed(breed?.id || Breeds[0].id))}
          />
        </Col>
        <Col>
          {character.breed.gifts.map((gift) => (<DisplayGift key={gift} id={gift} />))}
        </Col>
        <Col>
          <span>Total : {experience.total} PE</span>
        </Col>
      </Row>
    </Container>
  );

}

export function Profile() {
  const { character, experience } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  return (
    <>
      <DisplayBreed />
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
      {/* <table className="default-table text-center">
        <thead>
          <tr>
            <th>Attribut</th>
            <th>Valeur</th>
            <th>Améliorations</th>
            <th>Coût prochaine</th>
            <th>Coût total</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table> */}
    </>
  );
}
