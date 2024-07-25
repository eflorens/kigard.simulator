import {
  Nav as NavStrap,
  NavProps as NavStrapProps,
  NavItem as NavItemStrap,
  NavItemProps as NavItemStrapProps,
  NavLink as NavLinkStrap,
  NavLinkProps as NavLinkStrapProps
} from 'reactstrap';

interface NavProps extends NavStrapProps {
}

export function Nav(props: Readonly<NavProps>) {
  return (
    <NavStrap {...props} />
  )
}

interface NavItemProps extends NavItemStrapProps {
}

export function NavItem(props: Readonly<NavItemProps>) {
  return (
    <NavItemStrap {...props} />
  )
}

interface NavLinkProps extends NavLinkStrapProps {
}

export function NavLink(props: Readonly<NavLinkProps>) {
  return (
    <NavLinkStrap {...props} />
  )
}