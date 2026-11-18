import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar.jsx';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Container className="pb-5">
        <Outlet />
      </Container>
    </>
  );
}

export default App;