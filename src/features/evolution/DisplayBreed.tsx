import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Container, Row, Col, DropdownList, Badge } from "../../components";
import { Breed, Breeds } from "../../data/character";
import { DisplayGift } from "./Evolution";
import { selectEvolution, setBreed } from "./evolutionSlice";


export function DisplayBreed() {
  const { character, experience, breed } = useAppSelector(selectEvolution);
  const dispatch = useAppDispatch();

  return (
    <Container className="text-center">
      <Row>
        <Col xs="1">
          <DropdownList<Breed>
            source={Breeds}
            title="label"
            value={Breeds.find(b => b.id === breed)}
            onChange={breed => dispatch(setBreed(breed?.id || Breeds[0].id))} />
        </Col>
        <Col>
          {character.breed.gifts.map((gift) => (<DisplayGift key={gift} id={gift} />))}
        </Col>
        <Col xs="1">
          <Badge pill>{experience.total} PE</Badge>
        </Col>
      </Row>
    </Container>
  );

}
