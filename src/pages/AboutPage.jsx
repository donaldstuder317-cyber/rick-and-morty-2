import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Badge } from 'react-bootstrap';

function AboutPage() {
  const [stats, setStats] = useState({ characters: null, locations: null, episodes: null });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [charRes, locRes, epRes] = await Promise.all([
          axios.get('https://rickandmortyapi.com/api/character'),
          axios.get('https://rickandmortyapi.com/api/location'),
          axios.get('https://rickandmortyapi.com/api/episode'),
        ]);
        setStats({
          characters: charRes.data.info.count,
          locations: locRes.data.info.count,
          episodes: epRes.data.info.count,
        });
      } catch (error) {
        console.error('Error fetching show stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="mb-4">About Rick and Morty</h1>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2">The Show</Card.Title>
          <Card.Text>
            <strong>Rick and Morty</strong> is an American adult animated science-fiction sitcom
            created by Justin Roiland and Dan Harmon for Cartoon Network&apos;s nighttime programming
            block Adult Swim.
          </Card.Text>
          <Card.Text>
            The series follows the misadventures of Rick Sanchez, a cynical mad scientist, and his
            good-hearted but fretful grandson Morty Smith, who split their time between domestic
            family life and interdimensional adventures across infinite realities.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="g-3">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Characters</Card.Title>
              <h3>
                <Badge bg="primary">{stats.characters ?? '826'}</Badge>
              </h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Locations</Card.Title>
              <h3>
                <Badge bg="success">{stats.locations ?? '126'}</Badge>
              </h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Episodes</Card.Title>
              <h3>
                <Badge bg="info">{stats.episodes ?? '51'}</Badge>
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AboutPage;