import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import Routing from './Routing'
import L from 'leaflet'
import { MapContainer, TileLayer, Popup, ZoomControl } from 'react-leaflet'
require('leaflet.motion/dist/leaflet.motion.min.js')

const MAPBOX_API_KEY = 'pk.eyJ1Ijoiamt1cHMiLCJhIjoiY2tramFsN2EyMDJmNjJwcGVodms0ZDIzeiJ9.g1MbhlX-djVh_CZYt7t-dQ'

const BASE_URL = 'http://localhost:8000'
const bounds = {} //scale&zoom map to show all routes
const routes = {} //keep track of visible routes on map
const simulationData = {} //keep track for journey simulation

// const geoLocator = () => {
//   console.log('here');
//   navigator.geolocation.getCurrentPosition(position => {
//     console.log(position.coords);
//   })
// }
//
// setInterval(geoLocator, 8000)

const TerraMap = props => {
  const [map, setMap] = useState(null)
  const [wayPoints, setWayPoints] = useState(null)
  const [wayPointsId, setWayPointsId] = useState(null)
  const [journeys, setJourneys] = useState([])
  const [driverJourneys, setDriverJourneys] = useState([])

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    if(user.userType !== 'driver'){
      axios.get(`${BASE_URL}/journeys`)
      .then( res => {
        setJourneys(res.data)
      })
      .catch( console.error )

    } else {
      axios.get(`${BASE_URL}/journeys/driver/${user._id}`)
      .then(res => {
        setDriverJourneys(res.data)
      })
      .catch(console.error)
    }
  }, [])


  const animatePolyLine = async coordinates => {
    const polyLineElement = L.motion.polyline(coordinates,
      {
        color: "transparent"
      },
      {
        auto: true,
        duration: 1000
      },
      {
        removeOnEnd: true,
        showMarker: true,
      }
    ).addTo(map);
  }

  const timer = ms => new Promise(res => setTimeout(res, ms));

  const startJourney = async ev => {
    toggleRoute(ev)

    await timer(2000)
    const coordinates = Object.values(simulationData)[0]
    //will change up this to be dynamic later

    for(let i = 0; i < coordinates.length - 1; i++){
      const coord = [ coordinates[i], coordinates[i + 1] ]

      animatePolyLine(coord);
      await timer(980)
    }
  }

  const simulateJourneys = () => {
    const coordinates = Object.values(simulationData)

    if(coordinates.length > 0){
      for(let i = 0; i < coordinates.length; i++){
        animatePolyLine(coordinates[i])
      }
    }
  }

  const toggleRoute = ev => {
    const journeyId = ev.target.id

    if(ev.target.checked === true || ev.target.name === 'driver'){
      const data = ev.target.name === 'driver' ?
        driverJourneys.find(j => j._id === journeyId) :
        journeys.find(j => j._id === journeyId);

      const waypoints = [
        [
          data.originGeoCode.lat,
          data.originGeoCode.lng
        ],
        [
          data.destinationGeoCode.lat,
          data.destinationGeoCode.lng
        ]
      ]

      showRoute(waypoints, journeyId)

    } else {
      removeRoute(journeyId)
    }
  }

  const showRoute = (waypoints, journeyId) => {
    bounds[journeyId] = waypoints
    map.fitBounds(Object.values(bounds))

    const leafletElement = L.Routing.control({
      router: L.Routing.mapbox(MAPBOX_API_KEY),
      waypoints: [
        waypoints[0],
        waypoints[1]
      ],
      containerClassName: 'itinerary-wrapper'
    }).addTo(map);

    leafletElement.on('routeselected', ev => {
      routes[journeyId] = leafletElement
      simulationData[journeyId] = ev.route.coordinates
    })
  }

  const removeRoute = journeyId => {
    const route = routes[journeyId]
    delete bounds[journeyId]
    delete routes[journeyId]
    delete simulationData[journeyId]
    route.remove()

    if(Object.keys(bounds).length > 0){
      map.fitBounds(Object.values(bounds))
    }
  }

  const setSimulationData = (leafletElement, route) => {
    routes[wayPointsId] = leafletElement
    simulationData[wayPointsId] = route.coordinates
  }

  const handleUrlRoute = url => {
    props.history.push(url)
  }

  return(
    <div>
      <NavBar
        {...props}
        journeys={journeys}
        driverJourneys={driverJourneys}
        toggleRoute={toggleRoute}
        onMapMenu={true}
        handleUrlRoute={handleUrlRoute}
        simulateJourneys={simulateJourneys}
        startJourney={startJourney}
      />
      <MapContainer center={[-37.840935, 144.946457]} zoomControl={false} zoom={13} scrollWheelZoom={false} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position={'bottomright'} />
      </MapContainer>
    </div>
  )
}

export default TerraMap
