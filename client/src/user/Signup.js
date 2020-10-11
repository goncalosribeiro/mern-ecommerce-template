import React, { useState } from 'react'
import Layout from '../core/Layout'
import Form from '../components/Form'
import axios from 'axios'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    success: false
  })

  const { name, surname, email, password, passwordConfirmation, errors, success } = values;

  const onChangeHandle = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const clickSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, surname, email, password, passwordConfirmation }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`,
        (newUser),
        { headers: { 'Content-Type': 'application/json' } }
      )
      setValues({
        ...values,
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        success: true
      }
      )

    } catch (err) {
      setValues({
        ...values,
        errors: err.response.data.errors,
        success: false
      }
      );
    }
  }

  const showSuccess = () => (
    <div className="alert alert-info"
      style={{ display: success ? '' : 'none' }}>
      New account created. Please sign in.
    </div>
  )

  return (
    <Layout title='Sign Up' description='Create your account' className='container col-md-8'>
      <form>
        {showSuccess()}
        <Form name={'name'} lable={'Name'} type={'text'} onChange={onChangeHandle} error={errors} value={name} />
        <Form name={'surname'} lable={'Surname'} type={'text'} onChange={onChangeHandle} error={errors} value={surname} />
        <Form name={'email'} lable={'Email'} type={'email'} onChange={onChangeHandle} error={errors} value={email} />
        <Form name={'password'} lable={'Password'} type={'password'} onChange={onChangeHandle} error={errors} value={password} />
        <Form name={'passwordConfirmation'} lable={'Confirm Password'} type={'password'} onChange={onChangeHandle} error={errors} value={passwordConfirmation} />
        <button onClick={clickSubmit} className="btn btn-primary">Create Account</button>
      </form>
    </Layout >
  )
}

export default Signup