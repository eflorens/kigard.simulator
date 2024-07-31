import {
  Offcanvas as OffcanvasStrap,
  OffcanvasProps as OffcanvasStrapProps,
  OffcanvasBody as OffcanvasBodyStrap,
  OffcanvasBodyProps as OffcanvasBodyStrapProps,
  OffcanvasHeader as OffcanvasHeaderStrap,
  OffcanvasHeaderProps as OffcanvasHeaderStrapProps,
} from 'reactstrap';

interface OffcanvasProps extends OffcanvasStrapProps {
}

export function Offcanvas(props: Readonly<OffcanvasProps>) {
  return (
    <OffcanvasStrap {...props} />
  )
}

interface OffcanvasBodyProps extends OffcanvasBodyStrapProps {
}

export function OffcanvasBody(props: Readonly<OffcanvasBodyProps>) {
  return (
    <OffcanvasBodyStrap {...props} />
  )
}

interface OffcanvasHeaderProps extends OffcanvasHeaderStrapProps {
}

export function OffcanvasHeader(props: Readonly<OffcanvasHeaderProps>) {
  return (
    <OffcanvasHeaderStrap {...props} />
  )
}