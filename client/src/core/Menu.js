import axios from 'axios'
import React, { Fragment } from 'react'
import { NavLink, withRouter, useHistory } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  let history = useHistory()

  const signout = (next) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt')
      next()
      return axios.get(`${process.env.REACT_APP_API_URL}/signout`)
        .then(res => { console.log('signout', res); })
        .catch(err => console.log(err))
    }
  }

  const isAuthenticated = () => {
    if (typeof window == 'undefined') {
      return false
    }
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'))
    } else {
      return false
    }
  }
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
