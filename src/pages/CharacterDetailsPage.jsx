import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { Card, Row, Col, Button, Spinner, Alert, Badge, ListGroup } from 'react-bootstrap';

function CharacterDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchCharacterDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        if (!ignore) {
          setCharacter(response.data);
        }
      } catch (err) {
        if (!ignore) {
          setError('Unable to load character details. Please verify the character ID.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchCharacterDetails();
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleGoBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/characters');
    }
  };

  const getStatusVariant = (status) => {
    if (status === 'Alive') return 'success';
    if (status === 'Dead') return 'danger';
    return 'secondary';
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading character details...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => navigate('/characters')}>
          &larr; Back to Characters
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={handleGoBack}
        className="mb-4"
        data-cy="back-btn"
      >
        &larr; Back to Characters
      </Button>

      {character && (
        <Card className="shadow-sm" data-cy="character-details-card">
          <Row className="g-0">
            <Col md={4}>
              <Card.Img
                src={character.image}
                alt={character.name}
                className="img-fluid rounded-start h-100 object-fit-cover"
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title as="h1" className="mb-0">
                    {character.name}
                  </Card.Title>
                  <Badge bg={getStatusVariant(character.status)} className="fs-6">
                    {character.status}
                  </Badge>
                </div>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Species:</strong> {character.species}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Type:</strong> {character.type || 'Standard / None'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Gender:</strong> {character.gender}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Origin:</strong> {character.origin?.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Last Known Location:</strong> {character.location?.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Episode Appearances:</strong> {character.episode?.length ?? 0}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}

export default CharacterDetailsPage;