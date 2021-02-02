import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../Terra.css'

const BASE_URL = 'http://localhost:8000'

const NavBar = props => {
  const [journey, setJourney] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    axios.get(`${BASE_URL}/journeys`)
    .then( res => {
      setJourney(res.data)
    })
    .catch( console.error )
  }, [])

  const handleClick = ev => {
    const journeyId = ev.target.id

    if(ev.target.checked === true){
      const data = journey.find(j => j._id === journeyId);

      const waypoints = [
        [
          data.originGeoCode[0].lat,
          data.originGeoCode[0].lng
        ],
        [
          data.destinationGeoCode[0].lat,
          data.destinationGeoCode[0].lng
        ]
      ]

      props.showRoute(waypoints, journeyId)
    } else {
      props.removeRoute(journeyId)
    }
  }


  return(
    <div className="navbar">
      {
        props.showMapMenu ?
        <div className="menu collapsed">
          <span>MENU</span>
          <div className="menu-items">
            {
              journey.map( (j, idx) =>
                <div key={idx} className="item">
                  <div className="first">
                    <span>{j.vehicle.code}</span>
                    <input
                      id={j._id}
                      type="checkbox"
                      onClick={handleClick}
                    />
                  </div>
                  <div className="second">
                    <span>{j.status}</span>
                    <span>OR</span>
                    <span>DT</span>
                  </div>
                </div>
              )
            }
          </div>
        </div> : null
      }
      <div className="settings">
        <div onClick={props.simulateJourneys}>Simulate</div>
        <div onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <div className="profile-image" >
            John Kupoluyi O
          </div>
          {
            showDropdown ?
            <div className="dropdown-wrapper">
              <div className="dropdown">
                <div>Profile</div>
                {
                  props.showMapMenu ?
                  <div onClick={() => props.handleUrlRoute('/settings')}>Settings</div> :
                  <div onClick={() => props.handleUrlRoute('/maps')}>Maps</div>
                }
                <div>Logout</div>
              </div>
            </div> : null
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar

// const NavBar = props => {
//   let idx = props.idx !==null ? props.idx + 1 : 0
//
// console.log(idx);
//   return(
//     <div className="navbar">
//       <div
//         onClick={() => props.addRoute(idx)}
//         className="menu"
//       >
//         MENU
//       </div>
//       <div className="settings">
//         <div>Profile</div>
//         <div>Settings</div>
//       </div>
//     </div>
//   )
// }
//
// export default NavBar
