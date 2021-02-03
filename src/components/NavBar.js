import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../Terra.css'

const NavBar = props => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    axios.defaults.headers.common['Authorization'] = undefined

    props.history.push('/login');
  }

  const toggleRoute = ev => {
    const journeyId = ev.target.id

    if(ev.target.checked === true){
      const data = props.journeys.find(j => j._id === journeyId);

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

      props.showRoute(waypoints, journeyId)
    } else {
      props.removeRoute(journeyId)
    }
  }

  return(
    <div className="navbar">
      {
        props.onMapMenu ?
        <div className="menu collapsed">
          <span>MENU</span>
          <div className="menu-items">
            {
              props.journeys.map( (j, idx) =>
                <div key={idx} className="item">
                  <div className="first">
                    <span>{j.vehicle.code}</span>
                    <input
                      id={j._id}
                      type="checkbox"
                      onClick={props.toggleRoute}
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
        {
          user.userType !== 'driver' ?
          <div onClick={props.simulateJourneys}>Simulate</div> : null
        }
        <div onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <div className="profile-image" >
            {user.firstName} {user.lastName} O
          </div>
          {
            showDropdown ?
            <div className="dropdown-wrapper">
              <div className="dropdown">
                <div>Profile</div>
                {
                  user.userType !== 'admin' ?
                  null : props.onMapMenu ?
                  <div onClick={() => props.handleUrlRoute('/settings')}>Settings</div> :
                  <div onClick={() => props.handleUrlRoute('/maps')}>Maps</div>
                }
                <div onClick={handleLogout}>Logout</div>
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
