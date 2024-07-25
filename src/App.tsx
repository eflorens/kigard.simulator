import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { Layout, Nav, NavItem, NavLink, TabContent, TabPane } from "./components";
import { Evolution } from "./features/evolution/Evolution";
import { Inventory } from "./features/inventory/Inventory";
import { useState } from "react";
import { Summary } from "./features/summary/Summary";
import { DisplayBreed } from './features/evolution/DisplayBreed';

enum Tabs {
  Evolution = 1,
  Inventory = 2,
  Summary = 3,
}

function Toolbox() {
  const [open, setOpen] = useState(Tabs.Evolution);

  return (
    <>
      <Nav pills >
        <NavItem active={open === Tabs.Evolution} onClick={() => setOpen(Tabs.Evolution)}>
          <NavLink active={open === Tabs.Evolution} href='#'>Evolution</NavLink>
        </NavItem>
        <NavItem active={open === Tabs.Inventory} onClick={() => setOpen(Tabs.Inventory)}>
          <NavLink active={open === Tabs.Inventory} href='#'>Equipement</NavLink>
        </NavItem>
        <NavItem active={open === Tabs.Summary} onClick={() => setOpen(Tabs.Summary)}>
          <NavLink active={open === Tabs.Summary} href='#'>Résumé</NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={open}>
        <TabPane tabId={Tabs.Evolution}>
          <Evolution />
        </TabPane>
        <TabPane tabId={Tabs.Inventory}>
          <Inventory />
        </TabPane>
        <TabPane tabId={Tabs.Summary}>
          <Summary />
        </TabPane>
      </TabContent>
    </>
  );
}

function App() {
  return (
    <Layout>
      <Container>
        <DisplayBreed />
        <Toolbox />
      </Container>
    </Layout>
  );
}

export default App;
