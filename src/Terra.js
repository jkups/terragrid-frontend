import React, {useState, useEffect} from 'react'
import { Route, HashRouter as Router } from 'react-router-dom'
import axios from 'axios'

import Login from './components/Login'
import TerraMap from './components/map/TerraMap'
import Settings from './components/settings/Settings'

import Drivers from './components/settings/drivers/Drivers'
import NewDriver from './components/settings/drivers/NewDriver'
import UpdateDriver from './components/settings/drivers/UpdateDriver'

import Vehicles from './components/settings/vehicles/Vehicles'
import NewVehicle from './components/settings/vehicles/NewVehicle'
import UpdateVehicle from './components/settings/vehicles/UpdateVehicle'

import Journeys from './components/settings/Journeys'
import './Terra.css';

const Terra = () => {

  const [currentUser, setCurrentUser] = useState(null)

  const handleLogout = () => {
    setCurrentUser(null)
    sessionStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = null
  }

  const getToken = () => {
    const token = sessionStorage.getItem('token');
    return JSON.parse(token);
  }


  return (
    <Router>

      <Route exact path='/login' component={ Login } setCurrentUser={(user) => setCurrentUser(user)}/>

      <Route exact path='/maps' component={ TerraMap }/>
      <Route exact path='/settings' component={Settings} />

      <Route exact path='/settings/drivers' component={Drivers} />
      <Route exact path='/settings/drivers/new' component={NewDriver} />
      <Route exact path='/settings/drivers/:id/edit' component={UpdateDriver} />

      <Route exact path='/settings/vehicles' component={Vehicles} />
      <Route exact path='/settings/vehicles/new' component={NewVehicle} />
      <Route exact path='/settings/vehicles/:id/edit' component={UpdateVehicle} />

      <Route exact path='/settings/journeys' component={Journeys} />
    </Router>
  );
}

export default Terra;
