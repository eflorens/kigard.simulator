import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Row, Col, DropdownList, Badge } from "../../components";
import { Breed, Breeds } from "../../data/character";
import { DisplayGift } from '../../components/DisplayGift';
import { selectEvolution, setBreed } from "./evolutionSlice";


export function DisplayBreed() {
  const { character, experience, breed } = useAppSelector(selectEvolution);
  const dispatch = useAppDispatch();

  return (
    <Row>
        <Col>
          <DropdownList<Breed>
            source={Breeds}
            title="label"
            value={Breeds.find(b => b.id === breed)}
            onChange={breed => dispatch(setBreed(breed?.id || Breeds[0].id))} />
        </Col>
        <Col className="text-center">
          {character.breed.gifts.map((gift) => (<DisplayGift key={gift} id={gift} />))}
        </Col>
        <Col className="text-end">
          <Badge pill>{experience.total} PE</Badge>
        </Col>
    </Row>
  );

}
