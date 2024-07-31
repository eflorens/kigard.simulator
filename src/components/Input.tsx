import { Input as InputStrap, InputProps as InputStrapProps } from 'reactstrap';

interface InputProps extends InputStrapProps {
}

export function Input(props: Readonly<InputProps>) {
  return (
    <InputStrap {...props} />
  )
}