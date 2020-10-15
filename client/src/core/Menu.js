import React, { Fragment } from 'react'
import { NavLink, withRouter, useHistory } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'
import './Menu.css'


const Menu = () => {
  let history = useHistory()

  return (
    <nav>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <NavLink exact className='nav-link' to={'/'}>Home</NavLink >
        </li>
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <NavLink className='nav-link' to={'/signin'}>Sing In</NavLink >
            </li>
            <li className="nav-item">
              <NavLink className='nav-link' to={'/signup'}>Sign Up</NavLink >
            </li>
          </Fragment>
        )}
        <li className="nav-item">
          <NavLink className='nav-link' to={'/user/dashboard'}>Dashboard</NavLink >
        </li>
        {isAuthenticated() && (
          <li className="nav-item">
            <span className='nav-link' style={{ cursor: 'pointer', color: '#fffff' }} onClick={() => signout(() => { history.push('/') })}>Sign Out</span >
          </li>
        )}

      </ul >
    </nav >
  )
}

export default withRouter(Menu)
