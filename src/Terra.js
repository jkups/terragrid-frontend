import React from 'react'
import { Route, HashRouter as Router } from 'react-router-dom'
import TerraMap from './components/map/TerraMap'
import './Terra.css';

const Terra = () => {
  return (
    <Router>
      <Route component={ TerraMap }/>
    </Router>
  );
}

export default Terra;
