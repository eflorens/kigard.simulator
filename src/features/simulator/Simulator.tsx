
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addStrength,
  addDexterity,
  selectSimulator,
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
} from './simulatorSlice';
import styles from './Simulator.module.css';
import { Breeds, GiftId, Gifts } from '../../data/character';

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
    <tr>
      <td>{label}</td>
      <td>
        <button
          className={styles.button}
          aria-label={`Decrement ${label}`}
          onClick={onDecrement}
        >
          -
        </button>
        <span className={styles.value}>{value}{unity ? ` ${unity}` : ''}</span>
        <button
          className={styles.button}
          aria-label={`Increment ${label}`}
          onClick={onIncrement}
        >
          +
        </button>
      </td>
      <td>{xp.improvements}</td>
      <td>{xp.next} PE</td>
      <td>{xp.total} PE</td>
    </tr>
  );

}

function DisplayGift({ id }: Readonly<{ id: GiftId }>) {
  const gift = Gifts.find(g => g.id === id);
  if (!gift) {
    return <></>
  }

  return (
    <div className={styles.row}>
      <span>{gift.label} : {gift.description}</span>
    </div>
  );
}

export function Simulator() {
  const { character, experience } = useAppSelector(selectSimulator);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.row}>
        <select onChange={e => dispatch(setBreed(Number.parseInt(e.target.value)))}>
          {Breeds.map((breed) => (<option key={breed.id} value={breed.id}>{breed.label}</option>))}
        </select>
        <span className={styles.value}>{experience.total} PE</span>
      </div>
      {character.breed.gifts.map((gift) => (<DisplayGift key={gift} id={gift} />))}
      <table className={styles["default-table"]}>
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
        </tbody>
      </table>
    </>
  );
}
