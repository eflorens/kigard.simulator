import { Container } from './Container';
import { Navbar, NavbarBrand } from './Navbar';

export function Layout({ children }: Readonly<{ children?: React.ReactNode }>) {
  return (
    <Container>
      <Navbar>
        <NavbarBrand>Simulateur Kigard</NavbarBrand>
      </Navbar>
      <div>
        {children}
      </div>
    </Container>
  )
}