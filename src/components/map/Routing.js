import React from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'

const MAPBOX_API_KEY = 'pk.eyJ1Ijoiamt1cHMiLCJhIjoiY2tramFsN2EyMDJmNjJwcGVodms0ZDIzeiJ9.g1MbhlX-djVh_CZYt7t-dQ'


const Routing = props => {
  console.log("am at the top");

  const leafletElement = L.Routing.control({
    router: L.Routing.mapbox(MAPBOX_API_KEY),
    waypoints: [
      props.wayPoints[0],
      props.wayPoints[1]
    ],
    containerClassName: 'itinerary-wrapper'
  }).addTo(props.map);

  leafletElement.on('routeselected', ev => {
    console.log('am inside the event');
    
    props.setSimulationData(leafletElement, ev.route);
  })

  return null
}

export default Routing;
