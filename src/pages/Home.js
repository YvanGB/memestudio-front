import React from 'react';
import Header from '../components/Header';
import MemeComponent from '../components/MemeComponent';
import Footer from '../components/Footer';

function Home() {
  return (
    <div style={styles.app}>
      <Header />
      <div style={styles.content}>
        <MemeComponent />
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    paddingBottom: '60px', // same height as the footer to ensure it doesn't cover content
  },
};

export default Home;
