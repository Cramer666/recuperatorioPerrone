import React from 'react';
import { Outlet } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';

const BaseLayout: React.FC = () => {
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={12} md={10} lg={8}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default BaseLayout;
