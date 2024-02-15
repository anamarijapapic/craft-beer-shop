import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiBeerFill } from 'react-icons/ri';
import usePostRegister from '../../hooks/auth/usePostRegister';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { postRegister, error } = usePostRegister();

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    postRegister(email, password);
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
              <h2 className="card-title text-center mb-4">Register</h2>
              <Form onSubmit={handleRegister}>
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
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                <div className="d-grid gap-2">
                  <Button type="submit">Register</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
