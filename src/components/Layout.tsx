import { Navbar, NavbarBrand } from './Navbar';
import { Container } from './Container';

export function Layout({ children }: Readonly<{ children?: React.ReactNode }>) {
  return (
    <Container data-bs-theme="dark">
      <Navbar>
        <NavbarBrand>Simulateur Kigard</NavbarBrand>
      </Navbar>
      <Container className="text-center">
        {children}
      </Container>
    </Container>
  )
}