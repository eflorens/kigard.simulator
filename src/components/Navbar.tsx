import {
  Navbar as NavbarStrap,
  NavbarProps as NavbarStrapProps,
  NavbarBrand as NavbarBrandStrap,
  NavbarBrandProps as NavbarBrandStrapProps
} from 'reactstrap';

interface NavbarProps extends NavbarStrapProps {
}

export function Navbar(props: Readonly<NavbarProps>) {
  return (
    <NavbarStrap {...props} />
  )
}

interface NavbarBrandProps extends NavbarBrandStrapProps {
}

export function NavbarBrand(props: Readonly<NavbarBrandProps>) {
  return (
    <NavbarBrandStrap {...props} />
  )
}