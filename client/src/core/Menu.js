import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  return (
    <nav>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <NavLink exact className='nav-link' to={'/'}>Home</NavLink >
        </li>
        <li className="nav-item">
          <NavLink className='nav-link' to={'/signin'}>Sing In</NavLink >
        </li>
        <li className="nav-item">
          <NavLink className='nav-link' to={'/signup'}>Sign Up</NavLink >
        </li>
      </ul >
    </nav >
  )
}

export default withRouter(Menu)
