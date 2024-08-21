import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../app/hooks";
import { Tooltip, Badge } from "../../components";
import { setToast } from "../toastr/toastSlice";
import { compress, Simulator } from "./saveSlice";

export function ShareButton({ simulator, size }: Readonly<{ simulator: Simulator; size?: SizeProp; }>) {
  const dispatch = useAppDispatch();
  const token = window.btoa(compress(simulator));

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
  </Tooltip>);
}
