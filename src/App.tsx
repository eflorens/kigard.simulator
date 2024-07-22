import { Profile } from './features/profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Container } from 'reactstrap';
import { Layout } from './components/Layout';

function App() {
  return (
    <Layout>
      <Container>
        <Profile />
      </Container>
    </Layout>
  );
}

export default App;
