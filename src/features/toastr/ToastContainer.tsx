import { resetToast, selectToasts } from "./toastSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCallback, useEffect, useState } from "react";
import { Alert, Progress } from "../../components";

export default function ToastContainer() {
  const toasts = useAppSelector(selectToasts);

  return (
    <div className="fixed-top" style={{ zIndex: 9999 }}>{
      toasts.map((toast) => <Toast key={toast.id} {...toast} />)
    }
    </div>
  )
}

function Toast(toast: Readonly<{ id: string, title?: string, detail: string, status: "success" | "error" }>) {
  const [remaining, setRemaining] = useState(100);
  const duration = 5000;
  const refresh = 200;

  const dispatch = useAppDispatch();
  const close = useCallback(() => {
    dispatch(resetToast(toast));
  }, [dispatch, toast]);

  const { title, detail, status } = toast;
  useEffect(() => {
    const interval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(interval);
        close();
      }

      setRemaining(r => r - 100 * refresh / duration);
    }, refresh);

    return () => clearInterval(interval);
  }, [close, remaining])

  return (
    <Alert toggle={close} title={title} color={status === "error" ? "danger" : "success"}>
      {detail}
      <Progress value={remaining} color={status === "error" ? "danger" : "success"} />
    </Alert>
  )
}