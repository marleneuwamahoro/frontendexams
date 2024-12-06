import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, ListGroup, Card, Alert } from "react-bootstrap";

const UserDashboard = ({ firstname, lastname, username }) => {
  const [allowedMenus, setAllowedMenus] = useState([]);
  const [role, setRole] = useState('');

  // Fetch allowedMenus and role from localStorage when the component mounts
  useEffect(() => {
    const menus = JSON.parse(localStorage.getItem('allowedMenus'));
    const role = localStorage.getItem('role');
    setRole(role);
    if (menus) {
      setAllowedMenus(menus);
    }
  }, []);

  return (
    <Container className="mt-5">
      {/* Header Section */}
      <Row className="text-center mb-4">
        <Col>
          <Card className="bg-primary text-white shadow">
            <Card.Body>
              <h1>User Dashboard</h1>
              <p>Welcome to your personalized dashboard</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Information Section */}
      <Row className="text-center mb-4">
        <Col>
          <Card className="shadow p-4 bg-light">
            <Card.Body>
              <h3>Hello, {firstname} {lastname}!</h3>
              <p>
                You are logged in as{" "}
                <strong style={{ fontSize: "1.5rem", color: "green" }}>{role}</strong>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Menu */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow p-4">
            <Card.Body>
              <h4>{role}'s Menu</h4>
              {allowedMenus.length > 0 ? (
                <ListGroup horizontal className="flex-wrap justify-content-center">
                  {allowedMenus.map((menu, index) => (
                    <ListGroup.Item key={index} className="m-2">
                      <Button
                        variant="primary"
                        href={`/${menu.toLowerCase().replace(" ", "-")}`}
                        className="w-100"
                      >
                        {menu}
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Alert variant="warning" className="text-center">
                  No menus available.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Logout Section */}
      <Row className="text-end">
        <Col>
          <Button href="/login" variant="danger" className="w-25">
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
