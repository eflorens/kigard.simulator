import { Alert as AlertStrap, AlertProps as AlertStrapProps } from 'reactstrap';

interface AlertProps extends AlertStrapProps {
}

export function Alert(props: Readonly<AlertProps>) {
  return (
    <AlertStrap {...props} />
  )
}