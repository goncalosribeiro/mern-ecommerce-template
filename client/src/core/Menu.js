import axios from 'axios'
import React from 'react'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import './Menu.css'

const Menu = () => {

  const signout = (next) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt')
      next()
      return axios.get(`${process.env.REACT_APP_API_URL}/signout`)
        .then(res => { console.log('signout', res); })
        .catch(err => console.log(err))
    }
  }

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
        <li className="nav-item">
          <span className='nav-link' style={{ cursor: 'pointer', color: '#fffff' }} onClick={() => signout(() => (<Redirect to='/' />))}>Sign Out</span >
        </li>
      </ul >
    </nav >
  )
}

export default withRouter(Menu)
