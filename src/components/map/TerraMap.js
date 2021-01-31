import React, { useState } from 'react'
import NavBar from '../NavBar'
import Routing from './Routing'
import L from 'leaflet'
import { MapContainer, TileLayer, Popup, ZoomControl } from 'react-leaflet'

require('leaflet.motion/dist/leaflet.motion.min.js')

let bounds = []
let coord = null
const TerraMap = props => {

  const wayPoints = [
    {
      start: [-37.90574549300565, 144.7466052650177],
      end: [-37.81086045036506, 144.9598019963491]
    },
    {
      start: [-37.91067303518276, 144.76989648087897],
      end: [-37.92689762476188, 144.63457410870475]
    }
  ]

  const [map, setMap] = useState(null)
  const [idx, setIdx] = useState(null)

  const animateMarker = coordinates => {
    if(map && idx !== null){
      L.motion.polyline(coordinates, {
        color: "transparent"
      }, {
        auto: true,
        duration: 8000,
        easing: L.Motion.Ease.easeInOutQuart
      }, {
        removeOnEnd: true,
        showMarker: true,
      }).addTo(map);
    }
  }


  const addRoute = value => {
    bounds = []
    bounds.push(wayPoints[value].start)
    bounds.push(wayPoints[value].end)

    setIdx(value)
    console.log('bounds:', bounds);
    map.fitBounds(bounds)
  }


  return(
    <div>
      <NavBar addRoute={addRoute} idx={idx}/>
      <MapContainer center={[-37.840935, 144.946457]} zoomControl={false} zoom={13} scrollWheelZoom={false} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position={'bottomright'} />
        {
          map && idx !== null ?

            <Routing map={map} points={bounds} animateMarker={animateMarker}/>
          : null
        }
      </MapContainer>
    </div>
  )
}

export default TerraMap
