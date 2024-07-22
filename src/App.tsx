import { Evolution } from './features/evolution/Evolution';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Container } from 'reactstrap';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Layout } from './components';
import { Summary } from './features/summary/Summary';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState("1");

  const toggle = (id: string) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };
  
  return (
    <Layout>
      <Container>
      <Summary />
      <Accordion flush open={open} toggle={toggle} className="mt-1">
          <AccordionItem>
            <AccordionHeader targetId="1">Evolution</AccordionHeader>
            <AccordionBody accordionId="1">
              <Evolution />
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">Equipement</AccordionHeader>
            <AccordionBody accordionId="2">
              <span>A venir</span>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </Container>
    </Layout>
  );
}

export default App;
