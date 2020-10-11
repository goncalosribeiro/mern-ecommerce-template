import React, { useState } from 'react'
import Layout from '../core/Layout'
import axios from 'axios'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: [],
    success: false
  })

  const { name, surname, email, password, passwordConfirmation } = values;

  const onChangeHandle = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, surname, email, password, passwordConfirmation }
    fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <Layout title='Sign Up' description='Create your account' className='container col-md-8'>
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" name="name" id="name" value={name} className='form-control' onChange={onChangeHandle} />
        </div>
        <div className="form-group">
          <label className="text-muted">Surname</label>
          <input type="text" name="surname" id="surname" value={surname} className='form-control' onChange={onChangeHandle} />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" name="email" id="email" value={email} className='form-control' onChange={onChangeHandle} />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input type='password' name="password" id="password" value={password} className='form-control' onChange={onChangeHandle} />
        </div>
        <div className="form-group">
          <label className="text-muted">Confirm Password</label>
          <input type="password" name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} className='form-control' onChange={onChangeHandle} />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Create Account</button>
      </form>
    </Layout>
  )
}

export default Signup