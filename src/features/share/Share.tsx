import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectShare, Simulator } from "./ShareSlice";
import { useEffect, useMemo } from "react";
import { improve, setBreed } from "../evolution/evolutionSlice";
import { Badge, Tooltip } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { load } from "../inventory/inventorySlice";

export function Share() {
  const share = useAppSelector(selectShare);
  const dispatch = useAppDispatch();

  const token = useMemo(() => {
    return window.btoa(JSON.stringify(share));
  }, [share]);

  const copyToClipboard = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${process.env.PUBLIC_URL}?token=${token}`);

    alert("Lien de partage copié");
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const loadToken = url.searchParams.get("token");
    if (!loadToken) {
      return;
    }

    const simulator = JSON.parse(window.atob(loadToken)) as Simulator;
    dispatch(setBreed(simulator.breed));

    if (simulator.improvements) {
      dispatch(improve(simulator.improvements));
    }
    if (simulator.inventory) {
      dispatch(load(simulator.inventory));
    }
  }, [dispatch]);

  return (
    <Tooltip description="Copier un lien de partage dans le presse papier">
      <Badge color="primary" onClick={() => copyToClipboard(token)}>
        <FontAwesomeIcon icon={faFloppyDisk} />
      </Badge>
    </Tooltip>
  );
}
