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

const TerraMap = props => {
  const [map, setMap] = useState(null)
  const [wayPoints, setWayPoints] = useState(null)
  const [wayPointsId, setWayPointsId] = useState(null)
  const [journeys, setJourneys] = useState([])

  useEffect(() => {
    axios.get(`${BASE_URL}/journeys`)
    .then( res => {
      setJourneys(res.data)
    })
    .catch( console.error )
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

  const startJourney = async () => {
    const coordinates = Object.values(simulationData)[0]
    //will change up this to be dynamic later

    for(let i = 0; i < coordinates.length - 1; i++){
      const coord = [ coordinates[i], coordinates[i + 1] ]

      animatePolyLine(coord);
      await timer(800)
    }
  }

  const simulateJourneys = () => {
    let coord = []
    const coordinates = Object.values(simulationData)

    if(coordinates.length > 0){
      for(let i = 0; i < coordinates.length; i++){
        animatePolyLine(coordinates[i])
      }
    }
  }

  const toggleRoute = ev => {
    const journeyId = ev.target.id

    if(ev.target.checked === true){
      const data = journeys.find(j => j._id === journeyId);

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
        toggleRoute={toggleRoute}
        onMapMenu={true}
        handleUrlRoute={handleUrlRoute}
        simulateJourneys={simulateJourneys}
      />
      <MapContainer center={[-37.840935, 144.946457]} zoomControl={false} zoom={13} scrollWheelZoom={false} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position={'bottomright'} />
        {
          // map && wayPoints !== null ?
          // <Routing
          //   map={map}
          //   wayPoints={wayPoints}
          //   setSimulationData={setSimulationData}
          // />
          // : null
        }
      </MapContainer>
    </div>
  )
}

export default TerraMap



// let bounds = []
// let coord = null
// const TerraMap = props => {
  //
  //   const wayPoints = [
    //     {
      //       start: [-37.90574549300565, 144.7466052650177],
      //       end: [-37.81086045036506, 144.9598019963491]
      //     },
      //     {
        //       start: [-37.91067303518276, 144.76989648087897],
        //       end: [-37.92689762476188, 144.63457410870475]
        //     }
        //   ]
        //
        //   const [map, setMap] = useState(null)
        //   const [idx, setIdx] = useState(null)
        //
        //   const animateMarker = coordinates => {
          //     if(map && idx !== null){
            //       L.motion.polyline(coordinates, {
              //         color: "transparent"
              //       }, {
                //         auto: true,
                //         duration: 8000,
                //         easing: L.Motion.Ease.easeInOutQuart
                //       }, {
                  //         removeOnEnd: true,
                  //         showMarker: true,
                  //       }).addTo(map);
                  //     }
                  //   }
                  //
                  //
                  //   const addRoute = value => {
                    //     bounds = []
                    //     bounds.push(wayPoints[value].start)
                    //     bounds.push(wayPoints[value].end)
                    //
                    //     setIdx(value)
                    //     console.log('bounds:', bounds);
                    //     map.fitBounds(bounds)
                    //   }
                    //
                    //
                    //   return(
                      //     <div>
                      //       <NavBar addRoute={addRoute} idx={idx}/>
                    //       <MapContainer center={[-37.840935, 144.946457]} zoomControl={false} zoom={13} scrollWheelZoom={false} whenCreated={setMap}>
                    //         <TileLayer
                    //           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    //         />
                  //
                  //         <ZoomControl position={'bottomright'} />
                //         {
                  //           map && idx !== null ?
                  //
                  //             <Routing map={map} points={bounds} animateMarker={animateMarker}/>
                //           : null
                //         }
                //       </MapContainer>
              //     </div>
            //   )
            // }
