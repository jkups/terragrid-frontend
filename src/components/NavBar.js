import React from 'react'
import '../Terra.css'

const NavBar = props => {
  let idx = props.idx !==null ? props.idx + 1 : 0

console.log(idx);
  return(
    <div className="navbar">
      <div
        onClick={() => props.addRoute(idx)}
        className="menu"
      >
        MENU
      </div>
      <div className="settings">
        <div>Profile</div>
        <div>Settings</div>
      </div>
    </div>
  )
}

export default NavBar
