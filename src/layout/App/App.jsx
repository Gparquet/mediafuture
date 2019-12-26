import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Name } from '@axa-fr/react-toolkit-layout-header';
import { Footer } from '@axa-fr/react-toolkit-layout-footer';
import Routes from '../Routes/Routes';
import './App.scss';

const data = require('../../version.json');

function App() {
  return (
    <Router>
      <Header>
        <Name
          title="Media Future"
          subtitle="Update your life"
          img="rocket.png"
          alt="Logo Media Future"
          onClick={() => {}}
        />
      </Header>
      <Routes />
      <Footer
        icon={'rocket.png'}
        copyright={`@ 2020 Media Future Company - ${data.version}`}
      ></Footer>
    </Router>
  );
}

export default App;
