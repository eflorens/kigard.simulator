import { Progress as ProgressStrap, ProgressProps as ProgressStrapProps } from 'reactstrap';

interface ProgressProps extends ProgressStrapProps {
}

export function Progress(props: Readonly<ProgressProps>) {
  return (
    <ProgressStrap {...props} />
  )
}