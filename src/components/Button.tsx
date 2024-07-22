import { Button as ButtonStrap, ButtonProps as ButtonStrapProps } from 'reactstrap';

interface ButtonProps extends ButtonStrapProps {
}

export function Button(props: Readonly<ButtonProps>) {
  return (
    <ButtonStrap {...props} />
  )
}