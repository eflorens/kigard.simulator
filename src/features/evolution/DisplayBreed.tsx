import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Row, Col, DropdownList, Badge } from "../../components";
import { Breed, Breeds } from "../../data/character";
import { DisplayGift } from '../../components/DisplayGift';
import { selectEvolution, setBreed } from "./evolutionSlice";


export function DisplayBreed({ readonly }: Readonly<{ readonly?: boolean }>) {
  const { character, experience, breed } = useAppSelector(selectEvolution);
  const dispatch = useAppDispatch();

  return (
    <Row>
      <Col>
        {!readonly && <DropdownList<Breed>
          source={Breeds}
          title="label"
          value={Breeds.find(b => b.id === breed)}
          onChange={breed => dispatch(setBreed(breed?.id ?? Breeds[0].id))} />}
        {readonly && <Badge color="primary" pill>{Breeds.find(b => b.id === breed)?.label}</Badge>}
      </Col>
      <Col xs="5" md="8" className="text-center">
        {character.breed.gifts.map((gift) => (<DisplayGift key={gift} id={gift} />))}
      </Col>
      <Col className="text-end">
        <Badge pill color="primary">{experience.total} PE</Badge>
      </Col>
    </Row>
  );

}
