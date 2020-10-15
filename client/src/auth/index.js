import axios from 'axios'

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt')
    next()
    return axios.get(`${process.env.REACT_APP_API_URL}/signout`)
      .then(res => { console.log('signout', res); })
      .catch(err => console.log(err))
  }
}

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}