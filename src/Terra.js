import React, {useState, useEffect} from 'react'
import { Route, Redirect, HashRouter as Router } from 'react-router-dom'
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

const Terra = props => {

  const getCurrentUser = () => {
    const user = sessionStorage.getItem('user')
    return user ? user : false
  }

  const isAdmin= () => {
    const user = sessionStorage.getItem('user')
    return user && JSON.parse(user).userType === 'admin' ? user : false
  }

  return (
    <Router>
      <Route exact path='/login'render={props => (
        getCurrentUser() ?
        <Redirect to='/maps' /> :
        <Login {...props} />
      )}/>

      <Route exact path='/maps'render={props => (
        getCurrentUser() ?
        <TerraMap {...props} /> :
        <Redirect to='/login' />
      )}/>

      <Route exact path='/settings'render={props => (
        isAdmin() ? <Settings {...props} /> :
        getCurrentUser() ? <Redirect to='/maps' /> :
        <Redirect to='/login' />
      )}/>

      <Route exact path='/settings/drivers'render={props => (
        isAdmin() ? <Drivers {...props} /> :
        getCurrentUser() ? <Redirect to='/maps' /> :
        <Redirect to='/login' />
      )}/>

      <Route exact path='/settings/drivers/new'render={props => (
        isAdmin() ? <NewDriver {...props} /> :
        getCurrentUser() ? <Redirect to='/maps' /> :
        <Redirect to='/login' />
      )}/>

      <Route exact path='/settings/drivers/:id/edit'render={props => (
        isAdmin() ? <UpdateDriver {...props} /> :
        getCurrentUser() ? <Redirect to='/maps' /> :
        <Redirect to='/login' />
      )}/>

      <Route exact path='/settings/vehicles'render={props => (
        isAdmin() ? <Vehicles {...props} /> :
        getCurrentUser() ? <Redirect to='/maps' /> :
        <Redirect to='/login' />
      )}/>

      <Route exact path='/settings/vehicles/new'render={props => (
        isAdmin() ? <NewVehicle {...props} /> :
        getCurrentUser() ? <Redirect to='/maps' /> :
        <Redirect to='/login' />
      )}/>

      <Route exact path='/settings/vehicles/:id/edit'render={props => (
        isAdmin() ? <UpdateVehicle {...props} /> :
        getCurrentUser() ? <Redirect to='/maps' /> :
        <Redirect to='/login' />
      )}/>


      <Route exact path='/settings/journeys' component={Journeys} />
    </Router>
  );
}

export default Terra;
