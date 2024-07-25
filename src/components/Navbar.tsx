import {
  Navbar as NavbarStrap,
  NavbarProps as NavbarStrapProps,
  NavbarBrand as NavbarBrandStrap,
  NavbarBrandProps as NavbarBrandStrapProps,
  NavbarText as NavbarTextStrap,
  NavbarTextProps as NavbarTextStrapProps,
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

interface NavbarTextProps extends NavbarTextStrapProps {
}

export function NavbarText(props: Readonly<NavbarTextProps>) {
  return (
    <NavbarTextStrap {...props} />
  )
}