import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="text-center my-5">
      <Alert variant="warning">
        <Alert.Heading>404 - Page Not Found</Alert.Heading>
        <p>Oops! The page you are looking for does not exist in this dimension.</p>
        <hr />
        <Button as={Link} to="/" variant="primary">
          Return Home
        </Button>
      </Alert>
    </div>
  );
}

export default NotFound;