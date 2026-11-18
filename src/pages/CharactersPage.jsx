import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';

// Stores both in-flight Promises and resolved responses across StrictMode mounts
const requestCache = {};

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({ count: 0, pages: 0, next: null, prev: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!requestCache[currentPage]) {
          requestCache[currentPage] = axios
            .get(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
            .then((res) => res.data);
        }

        const data = await requestCache[currentPage];

        if (!ignore) {
          setCharacters(data.results);
          setInfo(data.info);
        }
      } catch (err) {
        delete requestCache[currentPage];
        if (!ignore) {
          setError('Failed to load characters. Please try again later.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchCharacters();
    return () => {
      ignore = true;
    };
  }, [currentPage]);

  const handlePrevPage = () => {
    if (info.prev) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (info.next) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getStatusVariant = (status) => {
    if (status === 'Alive') return 'success';
    if (status === 'Dead') return 'danger';
    return 'secondary';
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Characters</h1>
        {info.pages > 0 && (
          <span className="text-muted">
            Page {currentPage} of {info.pages} ({info.count} total characters)
          </span>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading characters...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-4">
            {characters.map((character) => (
              <Col key={character.id}>
                <Card
                  className="h-100 shadow-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/characters/${character.id}`)}
                  data-cy="character-card"
                >
                  <Card.Img variant="top" src={character.image} alt={character.name} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{character.name}</Card.Title>
                    <div className="mb-2">
                      <Badge bg={getStatusVariant(character.status)}>{character.status}</Badge>
                    </div>
                    <Card.Text className="mb-1">
                      <strong>Species:</strong> {character.species}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <strong>Gender:</strong> {character.gender}
                    </Card.Text>
                    <Card.Text className="mb-3">
                      <strong>Origin:</strong> {character.origin?.name}
                    </Card.Text>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/characters/${character.id}`);
                      }}
                      data-cy="details-btn"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="outline-primary"
              onClick={handlePrevPage}
              disabled={!info.prev}
              data-cy="prev-btn"
            >
              &larr; Previous
            </Button>

            <span>
              Page <strong>{currentPage}</strong> of <strong>{info.pages}</strong>
            </span>

            <Button
              variant="outline-primary"
              onClick={handleNextPage}
              disabled={!info.next}
              data-cy="next-btn"
            >
              Next &rarr;
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CharactersPage;