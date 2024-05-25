import React from 'react';

import Header from '../components/Header';
import MemeComponent from '../components/MemeComponent';

function Home() {
  return (
    <div>
        <Header />
        {/* <FileUploadForm /> */}
        <MemeComponent />
    </div>
  );
}

export default Home;