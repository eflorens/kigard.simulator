import { Container } from './components/Container';
import { Navbar, NavbarBrand, NavbarText } from './components/Navbar';
import { SavePanelButton } from './features/save/Save';

export function Layout({ children }: Readonly<{ children?: React.ReactNode }>) {
  return (
    <Container>
      <Navbar>
        <NavbarBrand>Simulateur Kigard</NavbarBrand>
        <NavbarText className="float-end">
          <SavePanelButton />
        </NavbarText>
      </Navbar>
      <div>
        {children}
      </div>
    </Container>
  )
}