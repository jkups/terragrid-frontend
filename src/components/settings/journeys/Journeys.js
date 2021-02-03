import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../../NavBar'

const BASE_URL = 'http://localhost:8000'

const Journeys = props => {

  const [vehicles, setVehicles] = useState([])
  const [journeys, setJourneys] = useState([])
  const [addJourney, setAddJourney] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState('')

  useEffect(() => {
    axios.get(`${BASE_URL}/vehicles`)
    .then(res => {
      const mapVehicleProps = res.data.map( vehicle => {
        return {
          id: vehicle._id,
          code: vehicle.code,
          plateNumber: vehicle.plateNumber,
          imageUrl: vehicle.imageUrl
        }
      })

      setVehicles(mapVehicleProps)
    })
    .catch(console.error)
  }, [])

  const getJourneys = ev => {
    const vehicleId = ev.target.value

    if(vehicleId !== "none"){
      axios.get(`${BASE_URL}/journeys/vehicle/${vehicleId}`)
      .then( res => {
        setJourneys(res.data)
        setAddJourney(true)
        setSelectedVehicle(vehicleId)
      })
      .catch(console.error)
    } else {
      setJourneys([])
      setAddJourney(false)
      setSelectedVehicle('')
    }
  }

  const handleUrlRoute = url => {
    props.history.push(url)
  }

  return(
    <div>
      <NavBar
        {...props}
        onMapMenu={false}
        handleUrlRoute={handleUrlRoute}
      />
      <div className="admin-wrapper">
        <div>
          <div className="admin-sidebar">
            <div>Users</div>
            <div onClick={() => handleUrlRoute('/settings/drivers')}>Drivers</div>

            <div onClick={() => handleUrlRoute('/settings/vehicles')}>Vehicles</div>

            <div onClick={() => handleUrlRoute('/settings/journeys')}>Journeys</div>
          </div>
          <div className="admin-list">
            <div>
              <select onChange={getJourneys} className="standard">
                <option value="none">Select a vehicle</option>
                {
                  vehicles.map( (vehicle, idx) =>
                    <option key={idx} value={vehicle.id}>
                      {vehicle.code} / {vehicle.plateNumber}
                    </option>
                  )
                }
              </select>
              <button
                onClick={() => handleUrlRoute(`/settings/journeys/vehicle/${selectedVehicle}/new`)}
                disabled={ !addJourney }
                >
                Add a Journey
              </button>
            </div>
            <div className="entity-list">
              <ul className="heading">
                <li></li>
                <li>Origin</li>
                <li>Destination</li>
                <li>Duration</li>
                <li>Instruction</li>
                <li>Driver Assigned</li>
                <li>Status</li>
                <li>Action</li>
              </ul>
              {
                journeys.map( (journey, idx) =>
                  <ul key={idx}>
                    <li>{idx + 1}</li>
                    <li>{journey.origin}</li>
                    <li>{journey.destination}</li>
                    <li></li>
                    <li>{journey.instruction}</li>
                    <li>
                      {journey.driver.firstName} {journey.driver.lastName}
                    </li>
                    <li>{journey.status}</li>
                    <li>action</li>
                  </ul>
                )
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Journeys
