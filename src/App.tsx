import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from "./components";
import { Evolution } from "./features/evolution/Evolution";
import { Inventory } from "./features/inventory/Inventory";
import { Summary } from "./features/summary/Summary";
import ToastContainer from './features/toastr/ToastContainer';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectTab, setActiveTab, Tabs } from './features/save/saveSlice';
import { Layout } from './Layout';

function Toolbox() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectTab);
  const setActive = (tab: Tabs) => {
    dispatch(setActiveTab(tab));
  }

  return (
    <>
      <ToastContainer />
      <Nav pills >
        <NavItem active={activeTab === Tabs.Evolution} onClick={() => setActive(Tabs.Evolution)}>
          <NavLink active={activeTab === Tabs.Evolution} href='#'>Evolution</NavLink>
        </NavItem>
        <NavItem active={activeTab === Tabs.Inventory} onClick={() => setActive(Tabs.Inventory)}>
          <NavLink active={activeTab === Tabs.Inventory} href='#'>Equipement</NavLink>
        </NavItem>
        <NavItem active={activeTab === Tabs.Summary} onClick={() => setActive(Tabs.Summary)}>
          <NavLink active={activeTab === Tabs.Summary} href='#'>Résumé</NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
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
        <Toolbox />
      </Container>
    </Layout>
  );
}

export default App;

