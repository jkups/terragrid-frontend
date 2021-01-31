// import React from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'

const MAPBOX_API_KEY = 'pk.eyJ1Ijoiamt1cHMiLCJhIjoiY2tramFsN2EyMDJmNjJwcGVodms0ZDIzeiJ9.g1MbhlX-djVh_CZYt7t-dQ'


const Routing = props => {
  let polyLine;

  if(props.points){
    const leafletElement = L.Routing.control({
      router: L.Routing.mapbox(MAPBOX_API_KEY),
      waypoints: [
        L.latLng(props.points[0]),
        L.latLng(props.points[1])
      ],
      containerClassName: 'itinerary-wrapper',
      collapsible: true,
      show: false,
      routeLine: (route, options) => {
        console.log('routeLine:', route);
        polyLine = L.polyline(route.coordinates, options);
        props.animateMarker(route.coordinates)
        return polyLine
      }
    }).addTo(props.map);
  }

  return null
}
export default Routing;
