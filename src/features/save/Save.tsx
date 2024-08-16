import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Col, Container, Input, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Tooltip } from "../../components";
import { faArrowsRotate, faCopy, faGear, faRemove, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCallback, useEffect, useState } from "react";
import { setToast } from "../toastr/toastSlice";
import { removeBackup, saveBackup, selectCurrent, selectStore, setActiveTab, Simulator, Tabs } from "./saveSlice";
import { setBreed, improve, setTalents } from "../evolution/evolutionSlice";
import { load } from "../inventory/inventorySlice";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { BreedId } from "../../data/character";

interface BackupProps {
  name: string;
  simulator: Simulator;
  onRemove: (name: string) => void;
  loadSimulator: (simulator: Simulator) => void;
}

function ShareButton({ simulator, size }: Readonly<{ simulator: Simulator, size?: SizeProp }>) {
  const dispatch = useAppDispatch();
  const token = window.btoa(JSON.stringify(simulator));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}${process.env.PUBLIC_URL}?token=${token}`);

    dispatch(setToast({
      detail: "Lien de partage copié",
      status: "success",
    }));
  };

  return (<Tooltip description="Copier le lien">
    <Badge pill role="button" onClick={() => copyToClipboard()}>
      <FontAwesomeIcon size={size} icon={faCopy} />
    </Badge>
  </Tooltip>)
}

function SaveButton({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <Badge color="primary" role="button" pill onClick={onClick}>
      <FontAwesomeIcon icon={faSave} />
    </Badge>
  );
}

function LoadButton({ simulator, loadSimulator }: Readonly<{ simulator: Simulator, loadSimulator: (simulator: Simulator) => void }>) {
  return (
    <Tooltip description="Charger">
      <Badge pill role="button" onClick={() => loadSimulator(simulator)} color="info">
        <FontAwesomeIcon icon={faUpload} />
      </Badge>
    </Tooltip>
  );
}

function RemoveButton({ name, removeSimulator }: Readonly<{ name: string, removeSimulator: (name: string) => void }>) {
  return (
    <Tooltip description="Supprimer">
      <Badge pill role="button" onClick={() => removeSimulator(name)} color="danger">
        <FontAwesomeIcon icon={faRemove} />
      </Badge>
    </Tooltip>
  );
}

function Backup({ name, simulator, onRemove, loadSimulator }: Readonly<BackupProps>) {
  return (
    <>
      <Col>{name}</Col>
      <Col xs="1" className="text-center">
        <ShareButton simulator={simulator} />
      </Col>
      <Col xs="1" className="text-center">
        <LoadButton loadSimulator={loadSimulator} simulator={simulator} />
      </Col>
      <Col xs="1" className="text-center">
        <RemoveButton name={name} removeSimulator={onRemove} />
      </Col>
    </>
  );
}

function DisplayBackUps({ loadSimulator }: Readonly<{ loadSimulator: (simulator: Simulator) => void }>) {
  const dispatch = useAppDispatch();
  const store = useAppSelector(selectStore);
  const handleRemove = (name: string) => {
    dispatch(removeBackup(name));

    dispatch(setToast({
      detail: "Simulation supprimée",
      status: "success",
    }));
  }
  return (
    <>
      {store.simulators.map((s) => (
        <Row key={s.name}>
          <Backup key={s.name} name={s.name} simulator={s.simulator} onRemove={handleRemove} loadSimulator={loadSimulator} />
        </Row>))}
    </>
  );
}

export function Save({ loadSimulator }: Readonly<{ loadSimulator: (simulator: Simulator) => void }>) {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectCurrent);
  const [currentName, setCurrentName] = useState("");

  const handleSave = (name: string, simulator: Simulator) => {
    dispatch(saveBackup({ name, simulator }));

    dispatch(setToast({
      detail: "Simulation sauvegardée",
      status: "success",
    }));
  }

  return (
    <Container>
      <Row>
        <Col>
          <Input type="text" name="name" autoComplete="off" value={currentName} onChange={e => setCurrentName(e.target.value)} placeholder="Nom de la sauvegarde" />
        </Col>
        <Col xs="1" className="text-center">
          <Tooltip description="Sauvegarder">
            <SaveButton onClick={() => handleSave(currentName, current)} />
          </Tooltip>
        </Col>
      </Row>
      <DisplayBackUps loadSimulator={loadSimulator} />
    </Container>
  );
}

export function SavePanelButton() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectCurrent);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const reset = useCallback(() => {
    dispatch(setBreed(BreedId.HUMAN));
    dispatch(load({}));
    dispatch(setTalents([]));
    dispatch(setActiveTab(Tabs.Evolution));

    dispatch(setToast({
      detail: "Simulation réinitialisée",
      status: "success",
    }));
  }, [dispatch])

  const loadSimulator = useCallback((simulator: Simulator) => {
    dispatch(setBreed(simulator.breed));

    if (simulator.improvements) {
      dispatch(improve(simulator.improvements));
    }
    if (simulator.inventory) {
      dispatch(load(simulator.inventory));
    }
    if (simulator.talents) {
      dispatch(setTalents(simulator.talents));
    }

    dispatch(setActiveTab(Tabs.Summary))

    dispatch(setToast({
      detail: "Simulation chargée",
      status: "success",
    }));
  }, [dispatch]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const loadToken = url.searchParams.get("token");
    if (!loadToken) {
      return;
    }

    const simulator = JSON.parse(window.atob(loadToken)) as Simulator;
    loadSimulator(simulator);
  }, [dispatch, loadSimulator]);

  return (
    <Row>
      <Col>
        <Tooltip description="Réintialiser">
          <Badge role="button" pill onClick={reset}>
            <FontAwesomeIcon size="2x" icon={faArrowsRotate} />
          </Badge>
        </Tooltip>
      </Col>
      <Col>
        <ShareButton size="2x" simulator={current} />
      </Col>
      <Col>
        <Tooltip description="Gérer les sauvegardes">
          <Badge role="button" pill onClick={toggle}>
            <FontAwesomeIcon size="2x" icon={faGear} />
          </Badge>
        </Tooltip>
      </Col>
      <Offcanvas direction="bottom" className="h-75" isOpen={isOpen} toggle={toggle}>
        <OffcanvasHeader toggle={toggle}>Sauvegarder</OffcanvasHeader>
        <OffcanvasBody>
          <Save loadSimulator={loadSimulator} />
        </OffcanvasBody>
      </Offcanvas>
    </Row>
  );
}