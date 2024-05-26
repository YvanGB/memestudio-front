import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p style={styles.footerText}>© {new Date().getFullYear()} Yvan GBAFFONOU. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#000',
    color: '#ffffff',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    padding: '10px 0',
    height: '60px',
  },
  footerText: {
    margin: 0,
  },
};

export default Footer;
