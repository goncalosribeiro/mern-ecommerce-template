import React, { useState } from 'react'
import Layout from '../core/Layout'
import Form from '../components/Form'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    errors: [],
    loading: false,
    redirectToReferrer: false,
    credientialError: ''
  })

  const { email, password, errors, loading, redirectToReferrer, credientialError } = values;

  const onChangeHandle = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const clickSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password }
    setValues({ ...values, loading: true })
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signin`,
        (user),
        { headers: { 'Content-Type': 'application/json' } }
      )
      authenticate(res.data, () => {
        console.log(res.data);
        setValues({
          ...values,
          redirectToReferrer: true
        })
      })
    } catch (err) {
      setValues({
        ...values,
        errors: err.response.data.errors,
        loading: false,
      }
      );
    }
  }
  const showError = () => (
    errors.length > 0 && errors[0].msg === 'Invalid Credentials' ? <div className="alert alert-danger"><h3>{errors[0].msg}</h3></div> : '')


  const showLoading = () => (
    loading && (<div className="alert alert-info"><h2>Please wait...</h2></div>)
  )

  const redirectUser = () => (
    redirectToReferrer && (<Redirect to='/' />)
  )

  const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(data))
      next()
    }
  }

  return (
    <Layout title='Sign In' description='Log into your account' className='container col-md-8'>
      <form>
        {showLoading()}
        {showError()}
        <Form name={'email'} lable={'Email'} type={'email'} onChange={onChangeHandle} error={errors} value={email} />
        <Form name={'password'} lable={'Password'} type={'password'} onChange={onChangeHandle} error={errors} value={password} />
        <button onClick={clickSubmit} className="btn btn-primary">Create Account</button>
      </form>
      {redirectUser()}
    </Layout>
  )
}

export default Signin
