import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiBeerFill } from 'react-icons/ri';
import usePostLogin from '../../hooks/auth/usePostLogin';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { postLogin, error } = usePostLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    postLogin(email, password);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <RiBeerFill size={100} />
                <h1>craft-beer-shop</h1>
              </div>
              <h2 className="card-title text-center mb-4">Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                <div className="d-grid gap-2">
                  <Button type="submit">Login</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <p className="text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
