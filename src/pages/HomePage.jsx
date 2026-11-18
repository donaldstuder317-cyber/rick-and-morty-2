import { Container, Image } from 'react-bootstrap';
import rickAndMortyImg from '../assets/rick-and-morty.jpg';

function HomePage() {
  return (
    <Container className="text-center py-4">
      <h1 className="mb-4">Welcome to the Rick And Morty Explorer</h1>
      <Image
        src={rickAndMortyImg}
        alt="Rick and Morty"
        fluid
        className="home-hero-image"
        data-cy="home-hero-img"
      />
    </Container>
  );
}

export default HomePage;