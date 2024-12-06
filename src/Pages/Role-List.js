import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoleListPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://backendapps-0d3a0920208f.herokuapp.com/roles');
        setRoles(response.data);
      } catch (error) {
        setError('Error fetching roles');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <Container fluid className="bg-light min-vh-100 p-4">
      {/* Header */}
      <header className="text-center bg-primary text-white py-4 rounded shadow mb-4">
        <h1 className="display-4">Role Management</h1>
      </header>

      {/* Actions */}
      <Row className="mb-4">
        <Col className="text-center">
          <Button variant="outline-secondary" href="/AdminDaschboard" className="me-3">
            Back to Dashboard
          </Button>
          <Button variant="success" href="/AddRole">
            Add New Role
          </Button>
        </Col>
      </Row>

      {/* Content */}
      <Row>
        <Col>
          {loading && (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <Table bordered hover responsive className="bg-white shadow-sm rounded">
              <thead className="bg-primary text-white">
                <tr>
                  <th>ID</th>
                  <th>Role Name</th>
                  <th>Allowed Menus</th>
                </tr>
              </thead>
              <tbody>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <tr key={role.id}>
                      <td>{role.id}</td>
                      <td>{role.name}</td>
                      <td>{Array.isArray(role.allowedMenus) ? role.allowedMenus.join(', ') : role.allowedMenus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No roles available.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RoleListPage;
